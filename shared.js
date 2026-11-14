// ============================================================================
// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW:
// ============================================================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwj82z7wQTsWVUHjZhXjaAquyhBWh-M4kqAADiGnAU7GRZyc5hS4LNIVTR30faPjvwLYA/exec";
const UNLOCK_ALL_FOR_TESTING = true;

// Shared Session State
let currentUser = JSON.parse(localStorage.getItem("openbox_user")) || null;
let completedLessons = JSON.parse(localStorage.getItem("openbox_progress")) || {};
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
  localStorage.removeItem("openbox_approved");
  localStorage.removeItem("openbox_submissions");
  window.location.href = "index.html";
}

// Live Catalog Fetcher
async function fetchLiveTracks() {
  const res = await fetch(APPS_SCRIPT_URL);
  const data = await res.json();
  return data.status === "success" ? (data.tracks || []) : [];
}

document.addEventListener("DOMContentLoaded", () => {
  syncNavbarAuth();
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});
