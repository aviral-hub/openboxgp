// ============================================================================
// OPENBOX GROWTH PARTNER — SHARED CONTROLLER & LIVE GOOGLE SHEETS CONNECTION
// ============================================================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuF_hLOONhYsg0YsCUevyFGpJRuE1FJoSz8nWl6bLsI2ALnTwk49tP1B7bvbfS4ZjzDQ/exec";
const UNLOCK_ALL_FOR_TESTING = true;

// Shared Session State (Persisted across logins & page reloads)
let currentUser = JSON.parse(localStorage.getItem("openbox_user")) || null;
let completedLessons = JSON.parse(localStorage.getItem("openbox_progress")) || {};
let videoWatchMap = JSON.parse(localStorage.getItem("openbox_video_watch")) || {};
let enrolledCourses = JSON.parse(localStorage.getItem("openbox_enrolled")) || [];
let approvedCourses = JSON.parse(localStorage.getItem("openbox_approved")) || [];
let mySubmissions = JSON.parse(localStorage.getItem("openbox_submissions")) || [];

// Theme Boot
(function initTheme() {
  if (localStorage.getItem("theme") === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
})();

function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Role Helpers
function getNormalizedRole() {
  if (!currentUser) return "Guest";
  const email = (currentUser.email || "").toLowerCase().trim();
  if (email === "aviral@openbox.in" || email === "aviralpathakwork@gmail.com") return "Admin";
  return currentUser.role || "Student";
}

function isStaff() {
  const r = getNormalizedRole();
  return r === "Admin" || r === "Mentor";
}

function isAdmin() {
  return getNormalizedRole() === "Admin";
}

// Hydrate full session from login response (used by login.html)
function hydrateUserSession(data) {
  currentUser = data.user;
  completedLessons = data.completedLessons || {};
  videoWatchMap = data.videoWatch || {};
  enrolledCourses = data.enrolledCourses || [];
  approvedCourses = data.approvedCourses || [];
  mySubmissions = data.mySubmissions || [];

  localStorage.setItem("openbox_user", JSON.stringify(currentUser));
  localStorage.setItem("openbox_progress", JSON.stringify(completedLessons));
  localStorage.setItem("openbox_video_watch", JSON.stringify(videoWatchMap));
  localStorage.setItem("openbox_enrolled", JSON.stringify(enrolledCourses));
  localStorage.setItem("openbox_approved", JSON.stringify(approvedCourses));
  localStorage.setItem("openbox_submissions", JSON.stringify(mySubmissions));
}

// Save partial or full video watch progress locally & sync to Google Sheets
let _lastCloudSyncTs = 0;
function saveVideoWatchProgress(courseId, lessonId, watchedSec, durationSec, forceCloudSync = false) {
  if (!courseId || !lessonId || durationSec <= 0) return;

  const pct = Math.min(100, Math.round((watchedSec / durationSec) * 100));
  const prev = videoWatchMap[lessonId] || { watchedSec: 0, durationSec: 0, percent: 0 };

  const updated = {
    watchedSec: Math.max(prev.watchedSec, Math.round(watchedSec)),
    durationSec: Math.max(prev.durationSec, Math.round(durationSec)),
    percent: Math.max(prev.percent, pct)
  };
  videoWatchMap[lessonId] = updated;
  localStorage.setItem("openbox_video_watch", JSON.stringify(videoWatchMap));

  if (!enrolledCourses.includes(courseId)) {
    enrolledCourses.push(courseId);
    localStorage.setItem("openbox_enrolled", JSON.stringify(enrolledCourses));
  }

  // Throttle cloud sync to once every 12 seconds unless paused/ended/forced
  const now = Date.now();
  if (currentUser && (forceCloudSync || now - _lastCloudSyncTs > 12000)) {
    _lastCloudSyncTs = now;
    postToOpenboxApi({
      action: "video_watch",
      email: currentUser.email,
      courseId: courseId,
      lessonId: lessonId,
      watchedSec: updated.watchedSec,
      durationSec: updated.durationSec,
      percent: updated.percent,
      status: updated.percent >= 96 ? "Completed" : "In Progress"
    }).catch(() => {});
  }
}

// Shared Navbar Updater
function syncNavbarAuth() {
  const loginBtn = document.getElementById("header-login-btn");
  const userPill = document.getElementById("user-pill");
  const userName = document.getElementById("user-name-display");
  const roleBadge = document.getElementById("user-role-badge");
  const navStudio = document.getElementById("nav-studio-link");
  const mobileStudio = document.getElementById("mobile-studio-link");
  const mobileLogout = document.getElementById("mobile-logout-btn");

  if (!loginBtn) return;

  if (currentUser) {
    const role = getNormalizedRole();
    loginBtn.classList.add("hidden");
    if (userPill) {
      userPill.classList.remove("hidden");
      userName.textContent = currentUser.name;
      roleBadge.textContent = role;
    }
    if (mobileLogout) mobileLogout.classList.remove("hidden");

    if (isStaff()) {
      if (navStudio) {
        navStudio.classList.remove("hidden");
        navStudio.innerHTML = `<i class="fa-solid fa-sliders"></i> ${isAdmin() ? "Admin Studio" : "Mentor Studio"}`;
      }
      if (mobileStudio) mobileStudio.classList.remove("hidden");
    }
  } else {
    loginBtn.classList.remove("hidden");
    if (userPill) userPill.classList.add("hidden");
    if (navStudio) navStudio.classList.add("hidden");
    if (mobileStudio) mobileStudio.classList.add("hidden");
    if (mobileLogout) mobileLogout.classList.add("hidden");
  }
}

function logoutUser() {
  localStorage.removeItem("openbox_user");
  localStorage.removeItem("openbox_progress");
  localStorage.removeItem("openbox_video_watch");
  localStorage.removeItem("openbox_enrolled");
  localStorage.removeItem("openbox_approved");
  localStorage.removeItem("openbox_submissions");
  window.location.href = "index.html";
}

async function postToOpenboxApi(payload) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Apps Script returned non-JSON response. Verify deployment access is 'Anyone'.");
  }
}

async function fetchLiveTracks() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal
    });
    clearTimeout(timer);

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error("Apps Script returned HTML instead of JSON. Ensure deployment 'Who has access' is set to 'Anyone'.");
    }

    if (data.status === "success") {
      localStorage.setItem("openbox_cached_tracks", JSON.stringify(data.tracks || []));
      return data.tracks || [];
    } else {
      throw new Error(data.message || "Sheet error");
    }
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new Error("Request timed out (12s). Check your Apps Script deployment.");
    }
    throw err;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  syncNavbarAuth();
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});
