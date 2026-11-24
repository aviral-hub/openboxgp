// ============================================================================
// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW:
// ============================================================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwj82z7wQTsWVUHjZhXjaAquyhBWh-M4kqAADiGnAU7GRZyc5hS4LNIVTR30faPjvwLYA/exec";

let currentUser = JSON.parse(localStorage.getItem("openbox_user")) || null;
let completedLessons = JSON.parse(localStorage.getItem("openbox_progress")) || {};
let watchedVideos = JSON.parse(localStorage.getItem("openbox_watched_videos")) || {};
let taskStepsProgress = JSON.parse(localStorage.getItem("openbox_task_steps")) || {};
let quizResults = JSON.parse(localStorage.getItem("openbox_quiz_results")) || {};
let approvedCourses = JSON.parse(localStorage.getItem("openbox_approved")) || [];

let currentTrack = null;
let currentLessonIdx = 0;
let activeCategory = "All";
let authMode = "login";

// YouTube Watch-to-End Enforcement Variables
let ytPlayerInstance = null;
let ytWatchInterval = null;
let maxWatchedTime = 0;

// Auto-inject YouTube IFrame API if not already present in HTML
if (!window.YT && !document.querySelector('script[src*="youtube.com/iframe_api"]')) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

// ============================================================================
// 1. LANDING PAGE TERMINAL & THEME CONTROLLERS
// ============================================================================
const tabData = {
  1: {
    title: "openbox-vetting_pipeline.sh",
    status: "VETTING STATUS: IN_PROGRESS",
    content: `
      <p class="text-gray-500">// Processing incoming candidate credentials...</p>
      <p class="text-blue-400">$ openbox parse --resume --github</p>
      <div class="p-3 bg-white/5 rounded border border-white/5 text-gray-400 space-y-1 mt-2">
        <p class="text-white font-medium">[SYSTEM LOG]: Parsing applicant data...</p>
        <p>↳ Core development syntax stack familiarity verified.</p>
        <p class="text-yellow-500">⚠️ Flagged: Cookie-cutter clone repositories located on profile.</p>
        <p class="text-green-400">✓ Approved: Baseline logical aptitude matches code standards.</p>
      </div>
      <p class="text-green-500 mt-2">● Verification step 01 locked. Passing to system module assignment.</p>
    `
  },
  2: {
    title: "allocate_startup_module.js",
    status: "SCOPE STATUS: ALLOCATED",
    content: `
      <p class="text-gray-500">// Fetching live isolated database branches...</p>
      <p class="text-blue-400">$ git checkout -b openbox-feature/high-throughput-checkout</p>
      <div class="p-3 bg-white/5 rounded border border-white/5 text-gray-400 space-y-1 mt-2">
        <p class="text-white font-medium">[SYSTEM SCOPE]: System Engine Module</p>
        <p>🚀 Target: Implement strict atomic states inside checkout hooks.</p>
        <p>🛠️ Env Architecture: Next.js, Stripe SDK, PostgreSQL</p>
        <p class="text-red-400">✗ No Tutorial Guidelines: Must build via production spec sheets.</p>
      </div>
      <p class="text-blue-400 mt-2">● Dynamic environment variables generated successfully.</p>
    `
  },
  3: {
    title: "brutal_review_panel.py",
    status: "REVIEW STATUS: CRITICAL_FEEDBACK",
    content: `
      <p class="text-blue-400">$ git push origin openbox-feature/high-throughput-checkout</p>
      <p class="text-gray-500">// Automated test runner and lead dev feedback logs:</p>
      <div class="p-3 bg-white/5 rounded border border-white/5 text-gray-400 space-y-1 mt-2 font-mono">
        <p class="text-red-400 font-medium">[REJECTION]: Memory Leak Detected on Hook Unmount</p>
        <p class="text-gray-400">"Your database connection pools are remaining open. Rewrite the cleanup mechanism using explicit connection terminates."</p>
        <p class="text-yellow-500">→ Advice: Avoid nested async waits inside state tracking blocks.</p>
      </div>
    `
  },
  4: {
    title: "production_deploy_stream.sh",
    status: "DEPLOY STATUS: LIVE_COMMITTED",
    content: `
      <p class="text-blue-400">$ openbox-pipeline --trigger-production-merge</p>
      <p class="text-gray-400">Optimizing core engine bundles... done.</p>
      <p class="text-gray-400">Uploading signed structural application builds to Edge networks...</p>
      <div class="p-3 bg-emerald-950/40 rounded border border-emerald-500/20 text-emerald-400 space-y-1 mt-2">
        <p class="font-bold">✓ DEPLOYMENT SUCCESSFUL [V4.12.0]</p>
        <p class="text-xs">Live Verification Link generated for resume credentials.</p>
        <p class="text-xs">Reference verification letter logged inside system partner index.</p>
      </div>
    `
  }
};

function switchTab(tabId) {
  const titleEl = document.getElementById("terminal-title");
  if (!titleEl) return;
  titleEl.innerText = tabData[tabId].title;
  document.getElementById("terminal-status").innerText = "Pipeline Status: " + tabData[tabId].status;
  document.getElementById("terminal-content").innerHTML = tabData[tabId].content;

  document.querySelectorAll(".tab-btn").forEach((btn, index) => {
    const currentId = index + 1;
    const numBadge = document.getElementById(`step-num-${currentId}`);
    if (currentId === tabId) {
      btn.classList.add("bg-blue-600/10", "border-blue-500/30");
      btn.classList.remove("bg-[var(--card)]", "border-slate-200", "dark:border-white/5");
      numBadge.className = "heading-font text-lg font-bold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20";
    } else {
      btn.classList.remove("bg-blue-600/10", "border-blue-500/30");
      btn.classList.add("bg-[var(--card)]", "border-slate-200", "dark:border-white/5");
      numBadge.className = "heading-font text-lg font-bold text-[var(--muted-text)] bg-[var(--muted-bg)] px-2.5 py-1 rounded border border-transparent";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  switchTab(1);
  updateAuthUI();
  renderTracks();

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  const searchInput = document.getElementById("course-search");
  if (searchInput) searchInput.addEventListener("input", renderTracks);

  document.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-pill").forEach(p => {
        p.classList.remove("bg-blue-600", "text-white");
        p.classList.add("bg-[var(--card)]", "text-[var(--muted-text)]");
      });
      e.target.classList.add("bg-blue-600", "text-white");
      e.target.classList.remove("bg-[var(--card)]", "text-[var(--muted-text)]");
      activeCategory = e.target.dataset.cat;
      renderTracks();
    });
  });

  // Auto-open track workspace if redirected back from exam.html?track=<id>
  const urlParams = new URLSearchParams(window.location.search);
  const resumeTrackId = urlParams.get("track");
  if (resumeTrackId && currentUser && typeof OPENBOX_TRACKS !== "undefined") {
    const exists = OPENBOX_TRACKS.some(t => t.id === resumeTrackId);
    if (exists) {
      if (document.getElementById("view-portal")) switchView("portal");
      openTrackPlayer(resumeTrackId);
    }
  }
});

// ============================================================================
// 2. VIEW SWITCHER (LANDING <-> PORTAL <-> MENTOR ADMIN)
// ============================================================================
function switchView(viewName) {
  document.getElementById("view-landing")?.classList.add("hidden");
  document.getElementById("view-portal")?.classList.add("hidden");
  document.getElementById("view-admin")?.classList.add("hidden");

  if (viewName === "portal") {
    document.getElementById("view-portal")?.classList.remove("hidden");
    closeCoursePlayer();
  } else if (viewName === "admin") {
    document.getElementById("view-admin")?.classList.remove("hidden");
    loadAdminDashboard();
  } else {
    document.getElementById("view-landing")?.classList.remove("hidden");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================================
// 3. AUTHENTICATION & TIER STATE
// ============================================================================
function isUserAccelerator() {
  if (!currentUser) return false;
  if (currentUser.isAdmin) return true;
  return (currentUser.tier || "").toLowerCase().includes("accelerator");
}

function updateAuthUI() {
  const loginBtn = document.getElementById("header-login-btn");
  const userPill = document.getElementById("user-pill");
  const userName = document.getElementById("user-name-display");
  const mobileLogout = document.getElementById("mobile-logout-btn");
  const navAdmin = document.getElementById("nav-admin-btn");
  const mobileAdmin = document.getElementById("mobile-admin-btn");
  const tierBanner = document.getElementById("portal-tier-banner");

  if (!loginBtn) return;

  if (currentUser) {
    loginBtn.classList.add("hidden");
    userPill?.classList.remove("hidden");
    if (userName) userName.textContent = `${currentUser.name} (${isUserAccelerator() ? "₹99 Pro" : "Free"})`;
    mobileLogout?.classList.remove("hidden");

    if (currentUser.isAdmin) {
      navAdmin?.classList.remove("hidden");
      mobileAdmin?.classList.remove("hidden");
    } else {
      navAdmin?.classList.add("hidden");
      mobileAdmin?.classList.add("hidden");
    }

    if (tierBanner) {
      tierBanner.innerHTML = isUserAccelerator()
        ? `Active Plan: <strong class="text-emerald-500">Full Accelerator Track (₹99)</strong> — All tracks & verified credentials unlocked.`
        : `Active Plan: <strong class="text-blue-500">Free 4-Week Sprint (₹0)</strong> — <button onclick="openUpgradeModal()" class="underline text-amber-500 font-bold cursor-pointer">Upgrade to ₹99 Accelerator</button> to unlock Pro tracks.`;
    }
  } else {
    loginBtn.classList.remove("hidden");
    userPill?.classList.add("hidden");
    mobileLogout?.classList.add("hidden");
    navAdmin?.classList.add("hidden");
    mobileAdmin?.classList.add("hidden");
    if (tierBanner) {
      tierBanner.textContent = "Login or create a free student account to track progress, complete tasks, and unlock certificates.";
    }
  }
}

function openAuthModal(mode = "login") {
  setAuthMode(mode);
  document.getElementById("auth-modal")?.classList.remove("hidden");
  const fb = document.getElementById("auth-feedback");
  if (fb) fb.textContent = "";
}

function closeAuthModal() {
  document.getElementById("auth-modal")?.classList.add("hidden");
}

function openUpgradeModal() {
  document.getElementById("upgrade-modal")?.classList.remove("hidden");
}

function closeUpgradeModal() {
  document.getElementById("upgrade-modal")?.classList.add("hidden");
}

function setAuthMode(mode) {
  authMode = mode;
  const tabLogin = document.getElementById("auth-tab-login");
  const tabReg = document.getElementById("auth-tab-register");
  const nameWrap = document.getElementById("auth-name-wrap");
  const ghWrap = document.getElementById("auth-github-wrap");
  const submitBtn = document.getElementById("auth-submit-btn");

  if (mode === "register") {
    tabReg?.classList.add("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    tabLogin?.classList.remove("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    nameWrap?.classList.remove("hidden");
    ghWrap?.classList.remove("hidden");
    if (submitBtn) submitBtn.textContent = "Create Student Account";
  } else {
    tabLogin?.classList.add("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    tabReg?.classList.remove("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    nameWrap?.classList.add("hidden");
    ghWrap?.classList.add("hidden");
    if (submitBtn) submitBtn.textContent = "Login to Portal";
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("auth-submit-btn");
  const feedback = document.getElementById("auth-feedback");

  const name = document.getElementById("auth-name").value.trim();
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value.trim();
  const github = document.getElementById("auth-github").value.trim();

  if (authMode === "register" && !name) {
    feedback.textContent = "Please enter your full name.";
    feedback.className = "text-xs font-semibold text-center text-red-400";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Syncing with Openbox...";

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: authMode, name, email, password, github })
    });
    const data = await response.json();

    if (data.status === "success") {
      currentUser = data.user;
      localStorage.setItem("openbox_user", JSON.stringify(currentUser));

      if (data.completedLessons) {
        completedLessons = data.completedLessons;
        localStorage.setItem("openbox_progress", JSON.stringify(completedLessons));
      }
      if (data.approvedCourses) {
        approvedCourses = data.approvedCourses;
        localStorage.setItem("openbox_approved", JSON.stringify(approvedCourses));
      }

      updateAuthUI();
      closeAuthModal();
      renderTracks();
    } else {
      feedback.textContent = data.message || "Authentication failed.";
      feedback.className = "text-xs font-semibold text-center text-red-400";
    }
  } catch (err) {
    feedback.textContent = "Connection error. Verify your Apps Script Web App URL.";
    feedback.className = "text-xs font-semibold text-center text-red-400";
  } finally {
    btn.disabled = false;
    btn.textContent = authMode === "login" ? "Login to Portal" : "Create Student Account";
  }
}

function logoutUser() {
  currentUser = null;
  completedLessons = {};
  approvedCourses = [];
  localStorage.removeItem("openbox_user");
  localStorage.removeItem("openbox_progress");
  localStorage.removeItem("openbox_approved");
  updateAuthUI();
  switchView("landing");
}

// ============================================================================
// 4. EXECUTIVE CATALOG RENDERER WITH TIER LOCKING
// ============================================================================
function renderTracks() {
  const grid = document.getElementById("courses-grid");
  if (!grid || typeof OPENBOX_TRACKS === "undefined") return;

  const search = (document.getElementById("course-search")?.value || "").toLowerCase();
  grid.innerHTML = "";

  const filtered = OPENBOX_TRACKS.filter(track => {
    const matchCat = activeCategory === "All" || track.category === activeCategory;
    const matchText = track.title.toLowerCase().includes(search) ||
                      track.description.toLowerCase().includes(search) ||
                      track.techStack.some(t => t.toLowerCase().includes(search));
    return matchCat && matchText;
  });

  filtered.forEach(track => {
    const total = track.lessons.length;
    const done = track.lessons.filter(l => completedLessons[l.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const locked = track.requiresAccelerator && !isUserAccelerator();
    const quizData = quizResults[track.id];

    const tagsHtml = track.techStack
      .map(t => `<span class="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--muted-bg)] border border-slate-200/60 dark:border-white/5 text-[var(--muted-text)]">${t}</span>`)
      .join("");

    const card = document.createElement("div");
    card.className = "group flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all shadow-sm overflow-hidden";
    card.innerHTML = `
      <div>
        <div class="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between gap-2 border-b border-white/10">
          <span class="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${track.requiresAccelerator ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'}">
            ${track.tier}
          </span>
          <span class="text-xs font-extrabold ${locked ? 'text-amber-400' : 'text-emerald-400'}">
            ${locked ? '<i class="fa-solid fa-lock mr-1"></i> Pro Locked' : `${pct}% Complete`}
          </span>
        </div>

        <div class="p-6 pb-4">
          <div class="flex items-center justify-between text-[11px] font-bold text-[var(--muted-text)] mb-2">
            <span>${track.category || "Verified Track"}</span>
            <span>${total} Modules ${quizData?.passed ? '• ✓ Exam Passed' : ''}</span>
          </div>
          <h3 class="heading-font text-lg font-extrabold text-[var(--foreground)] group-hover:text-blue-500 transition-colors mb-2">${track.title}</h3>
          <p class="text-xs text-[var(--muted-text)] leading-relaxed mb-4">${track.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-4">${tagsHtml}</div>
        </div>
      </div>

      <div class="px-6 pb-6 pt-2">
        <div class="w-full h-1.5 rounded-full bg-[var(--muted-bg)] overflow-hidden mb-4">
          <div class="h-full bg-blue-600 transition-all duration-300" style="width: ${pct}%"></div>
        </div>
        <button onclick="openTrackPlayer('${track.id}')"
          class="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold ${locked ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-black' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'} transition-all cursor-pointer flex items-center justify-center gap-2">
          <span>${locked ? "Unlock with ₹99 Accelerator" : (track.isInternship ? "Enter Internship Workspace" : "Enter Course Workspace")}</span>
          <i class="fa-solid ${locked ? 'fa-lock-open' : 'fa-arrow-right'}"></i>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============================================================================
// 5. COURSE PLAYER & STRICT WATCH-TO-END VIDEO ENFORCEMENT
// ============================================================================
function openTrackPlayer(trackId) {
  if (!currentUser) {
    openAuthModal("login");
    const fb = document.getElementById("auth-feedback");
    if (fb) {
      fb.textContent = "Please login or register to enter the workspace.";
      fb.className = "text-xs font-semibold text-center text-blue-500";
    }
    return;
  }

  const track = OPENBOX_TRACKS.find(t => t.id === trackId);
  if (!track) return;

  if (track.requiresAccelerator && !isUserAccelerator()) {
    openUpgradeModal();
    return;
  }

  currentTrack = track;
  currentLessonIdx = 0;

  document.getElementById("portal-catalog")?.classList.add("hidden");
  document.getElementById("portal-player")?.classList.remove("hidden");
  const titleEl = document.getElementById("sidebar-track-title");
  if (titleEl) titleEl.textContent = currentTrack.title;

  renderSyllabusSidebar();
  loadLessonModule(0);
  renderInternshipTasks();
  renderModuleQuiz();
  checkCertificateEligibility();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeCoursePlayer() {
  stopWatchTracker();
  if (ytPlayerInstance && typeof ytPlayerInstance.stopVideo === "function") {
    ytPlayerInstance.stopVideo();
  }
  document.getElementById("portal-player")?.classList.add("hidden");
  document.getElementById("portal-catalog")?.classList.remove("hidden");
  renderTracks();
}

function renderSyllabusSidebar() {
  const list = document.getElementById("sidebar-lessons-list");
  if (!list) return;
  list.innerHTML = "";

  currentTrack.lessons.forEach((lesson, idx) => {
    const isDone = !!completedLessons[lesson.id];
    const isActive = idx === currentLessonIdx;
    const li = document.createElement("li");
    li.onclick = () => loadLessonModule(idx);
    li.className = `p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
      isActive
        ? "bg-blue-600/10 border-blue-500/40 text-[var(--foreground)] font-extrabold shadow-sm"
        : "bg-[var(--muted-bg)] border-transparent text-[var(--muted-text)] hover:border-slate-300 dark:hover:border-white/10"
    }`;
    li.innerHTML = `
      <span class="line-clamp-1">${idx + 1}. ${lesson.title}</span>
      <span class="${isDone ? 'text-emerald-500' : 'text-blue-500'} shrink-0">
        <i class="fa-solid ${isDone ? 'fa-circle-check' : 'fa-circle-play'}"></i>
      </span>
    `;
    list.appendChild(li);
  });

  const total = currentTrack.lessons.length;
  const done = currentTrack.lessons.filter(l => completedLessons[l.id]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const bar = document.getElementById("sidebar-progress-bar");
  const txt = document.getElementById("sidebar-progress-text");
  if (bar) bar.style.width = `${pct}%`;
  if (txt) txt.textContent = `${pct}% Completed (${done}/${total} modules)`;
}

function loadLessonModule(idx) {
  currentLessonIdx = idx;
  const lesson = currentTrack.lessons[idx];
  const isAlreadyWatched = !!watchedVideos[lesson.id] || !!completedLessons[lesson.id];

  // Build Enforced YouTube Player + Live Watch Bar inside #player-video-box
  const videoBox = document.getElementById("player-video-box");
  videoBox.innerHTML = `
    <div class="relative w-full h-full flex flex-col bg-slate-950">
      <div id="obx-yt-mount" class="w-full flex-1"></div>
      <div class="px-4 py-2 bg-slate-900 border-t border-white/10 flex items-center justify-between gap-3 text-[11px]">
        <span id="obx-watch-status" class="font-bold ${isAlreadyWatched ? 'text-emerald-400' : 'text-amber-400'}">
          ${isAlreadyWatched ? '<i class="fa-solid fa-lock-open mr-1"></i> Full Video Verified (100%)' : '<i class="fa-solid fa-lock mr-1"></i> Watch full video till end to unlock completion (0%)'}
        </span>
        <div class="w-32 sm:w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div id="obx-watch-bar" class="h-full ${isAlreadyWatched ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-300" style="width: ${isAlreadyWatched ? '100%' : '0%'}"></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("player-lesson-title").textContent = lesson.title;
  document.getElementById("player-lesson-desc").textContent = lesson.description;

  const resBox = document.getElementById("player-resource-box");
  if (lesson.resourceLink) {
    resBox.classList.remove("hidden");
    resBox.innerHTML = `<i class="fa-solid fa-code-branch mr-1.5"></i> <strong>Starter Repo / Docs:</strong> <a href="${lesson.resourceLink}" target="_blank" class="underline font-bold">Open Resource →</a>`;
  } else {
    resBox.classList.add("hidden");
  }

  refreshCompleteButtonState(lesson);
  initEnforcedYouTubePlayer(lesson);
  renderSyllabusSidebar();
  checkCertificateEligibility();
}

function refreshCompleteButtonState(lesson) {
  const btn = document.getElementById("player-complete-btn");
  if (!btn) return;
  const isDone = !!completedLessons[lesson.id];
  const isWatched = !!watchedVideos[lesson.id] || isDone;

  if (!isWatched) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-lock mr-1.5"></i> Watch Till End`;
    btn.className = "px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed shrink-0";
  } else if (isDone) {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-circle-check mr-1.5"></i> Completed`;
    btn.className = "px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-pointer shrink-0";
  } else {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-check mr-1.5"></i> Mark as Complete`;
    btn.className = "px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shrink-0";
  }
}

function initEnforcedYouTubePlayer(lesson) {
  stopWatchTracker();
  maxWatchedTime = 0;

  if (!window.YT || !window.YT.Player) {
    setTimeout(() => initEnforcedYouTubePlayer(lesson), 300);
    return;
  }

  ytPlayerInstance = new YT.Player("obx-yt-mount", {
    videoId: lesson.videoId,
    playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
    events: {
      onReady: () => startWatchTracker(lesson),
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.PLAYING) startWatchTracker(lesson);
        if (e.data === YT.PlayerState.ENDED) markVideoFullyWatched(lesson);
      }
    }
  });
}

function startWatchTracker(lesson) {
  stopWatchTracker();
  ytWatchInterval = setInterval(() => {
    if (!ytPlayerInstance || typeof ytPlayerInstance.getCurrentTime !== "function") return;
    const dur = ytPlayerInstance.getDuration() || 0;
    const cur = ytPlayerInstance.getCurrentTime() || 0;

    if (dur > 0) {
      // Prevent fast-forwarding past furthest watched second
      if (!watchedVideos[lesson.id] && cur > maxWatchedTime + 3) {
        ytPlayerInstance.seekTo(maxWatchedTime, true);
        return;
      }
      if (cur > maxWatchedTime) maxWatchedTime = cur;

      const pct = Math.min(100, Math.round((maxWatchedTime / dur) * 100));
      const bar = document.getElementById("obx-watch-bar");
      const status = document.getElementById("obx-watch-status");
      if (!watchedVideos[lesson.id]) {
        if (bar) bar.style.width = `${pct}%`;
        if (status) status.innerHTML = `<i class="fa-solid fa-lock mr-1"></i> Watch full video till end to unlock completion (${pct}%)`;
      }
      if (pct >= 96) {
        markVideoFullyWatched(lesson);
      }
    }
  }, 800);
}

function stopWatchTracker() {
  if (ytWatchInterval) {
    clearInterval(ytWatchInterval);
    ytWatchInterval = null;
  }
}

function markVideoFullyWatched(lesson) {
  if (!watchedVideos[lesson.id]) {
    watchedVideos[lesson.id] = true;
    localStorage.setItem("openbox_watched_videos", JSON.stringify(watchedVideos));
  }
  const bar = document.getElementById("obx-watch-bar");
  const status = document.getElementById("obx-watch-status");
  if (bar) {
    bar.style.width = "100%";
    bar.className = "h-full bg-emerald-500 transition-all duration-300";
  }
  if (status) {
    status.className = "font-bold text-emerald-400";
    status.innerHTML = `<i class="fa-solid fa-lock-open mr-1"></i> Full Video Verified (100%)`;
  }
  refreshCompleteButtonState(lesson);
}

function toggleLessonComplete() {
  const lesson = currentTrack.lessons[currentLessonIdx];
  if (!watchedVideos[lesson.id] && !completedLessons[lesson.id]) {
    alert("Please watch the entire video until the end before marking this module complete.");
    return;
  }

  const nowComplete = !completedLessons[lesson.id];
  if (nowComplete) completedLessons[lesson.id] = true;
  else delete completedLessons[lesson.id];

  localStorage.setItem("openbox_progress", JSON.stringify(completedLessons));
  refreshCompleteButtonState(lesson);
  renderSyllabusSidebar();
  checkCertificateEligibility();

  if (currentUser && APPS_SCRIPT_URL.startsWith("http")) {
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "progress",
        email: currentUser.email,
        courseId: currentTrack.id,
        lessonId: lesson.id,
        status: nowComplete ? "Completed" : "Incomplete"
      })
    }).catch(() => {});
  }
}

function checkCertificateEligibility() {
  const certBox = document.getElementById("certificate-box");
  if (!certBox || !currentTrack) return;

  const allLessonsDone = currentTrack.lessons.every(l => completedLessons[l.id]);
  const taskApproved = approvedCourses.includes(currentTrack.id) || currentUser?.isAdmin;
  const hasQuiz = currentTrack.quiz && currentTrack.quiz.length > 0;
  const quizPassed = !hasQuiz || (quizResults[currentTrack.id]?.passed === true);

  if (allLessonsDone && taskApproved && quizPassed) {
    certBox.classList.remove("hidden");
  } else {
    certBox.classList.add("hidden");
  }
}

// ============================================================================
// 6. BRANDED HTML5 CANVAS CERTIFICATE GENERATOR
// ============================================================================
function generateCertificate() {
  document.getElementById("cert-modal").classList.remove("hidden");
  const canvas = document.getElementById("cert-canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, 1200, 850);

  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, 1128, 778);

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(54, 54, 1092, 742);

  ctx.fillStyle = "#3b82f6";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("OPENBOX GROWTH PARTNER", 600, 130);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 52px sans-serif";
  ctx.fillText(currentTrack.isInternship ? "CERTIFICATE OF INTERNSHIP" : "CERTIFICATE OF COMPLETION", 600, 210);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "22px sans-serif";
  ctx.fillText("This certifies that", 600, 290);

  ctx.fillStyle = "#60a5fa";
  ctx.font = "bold 56px sans-serif";
  ctx.fillText(currentUser.name.toUpperCase(), 600, 370);

  ctx.strokeStyle = "rgba(96,165,250,0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(300, 392);
  ctx.lineTo(900, 392);
  ctx.stroke();

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "23px sans-serif";
  ctx.fillText("has successfully completed all production modules, step-by-step tasks, and proctored assessment for", 600, 455);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText(currentTrack.title, 600, 515);

  const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const certId = "OBX-" + btoa(currentUser.email + currentTrack.id).slice(0, 8).toUpperCase();

  ctx.textAlign = "left";
  ctx.fillStyle = "#94a3b8";
  ctx.font = "18px monospace";
  ctx.fillText(`ISSUED: ${dateStr}`, 110, 700);
  ctx.fillText(`CREDENTIAL ID: ${certId}`, 110, 732);

  ctx.textAlign = "right";
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("Aviral Pathak", 1090, 695);
  ctx.fillStyle = "#3b82f6";
  ctx.font = "16px sans-serif";
  ctx.fillText("Founder & Lead Mentor, Openbox", 1090, 725);
}

function downloadCertificatePNG() {
  const canvas = document.getElementById("cert-canvas");
  const link = document.createElement("a");
  link.download = `Openbox_Certificate_${currentUser.name.replace(/\s+/g, "_")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ============================================================================
// 7. INTERACTIVE STEP-BY-STEP TASKS & PROCTORED EXAM REDIRECT
// ============================================================================
function getInteractiveSteps(task) {
  if (Array.isArray(task.steps) && task.steps.length > 0) return task.steps;
  const sentences = task.instructions
    .split(/\.\s+/)
    .map(s => s.replace(/\.$/, "").trim())
    .filter(Boolean);
  return sentences.length >= 2
    ? sentences
    : [
        `Review specification & acceptance criteria for "${task.title}"`,
        task.instructions,
        `Push clean deliverables to GitHub / Google Drive and verify public access permissions`
      ];
}

function toggleTaskStep(taskIdx, stepIdx) {
  const key = `${currentTrack.id}__${taskIdx}`;
  if (!taskStepsProgress[key]) taskStepsProgress[key] = [];
  const arr = taskStepsProgress[key];
  const pos = arr.indexOf(stepIdx);
  if (pos === -1) arr.push(stepIdx);
  else arr.splice(pos, 1);

  localStorage.setItem("openbox_task_steps", JSON.stringify(taskStepsProgress));
  renderInternshipTasks();
}

function renderInternshipTasks() {
  const box = document.getElementById("player-tasks-box");
  const list = document.getElementById("player-tasks-list");
  const select = document.getElementById("submit-task-select");
  const form = document.getElementById("task-submission-form");
  const fb = document.getElementById("task-submit-feedback");
  if (fb) fb.textContent = "";

  if (!currentTrack.tasks || currentTrack.tasks.length === 0) {
    box?.classList.add("hidden");
    return;
  }

  box?.classList.remove("hidden");
  list.innerHTML = "";
  if (select) select.innerHTML = "";

  let allTasksStepsFinished = true;

  currentTrack.tasks.forEach((task, tIdx) => {
    const steps = getInteractiveSteps(task);
    const key = `${currentTrack.id}__${tIdx}`;
    const doneSteps = taskStepsProgress[key] || [];
    const taskReady = doneSteps.length >= steps.length;
    if (!taskReady) allTasksStepsFinished = false;

    const item = document.createElement("div");
    item.className = "p-5 rounded-2xl bg-[var(--muted-bg)] border border-slate-200 dark:border-white/10 space-y-3";
    item.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h4 class="heading-font text-sm font-extrabold text-[var(--foreground)]">${task.title}</h4>
        <div class="flex items-center gap-2">
          <span class="text-[11px] font-bold ${taskReady ? 'text-emerald-500' : 'text-blue-500'}">
            ${doneSteps.length}/${steps.length} Steps
          </span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold">${task.deadline}</span>
        </div>
      </div>

      <div class="space-y-2">
        ${steps
          .map((stepText, sIdx) => {
            const checked = doneSteps.includes(sIdx);
            return `
          <button
            type="button"
            onclick="toggleTaskStep(${tIdx}, ${sIdx})"
            class="w-full text-left p-3 rounded-xl border text-xs flex items-start gap-3 transition cursor-pointer ${
              checked
                ? "bg-emerald-500/10 border-emerald-500/30 text-[var(--foreground)]"
                : "bg-[var(--card)] border-slate-200 dark:border-white/10 text-[var(--muted-text)] hover:border-blue-500"
            }"
          >
            <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5 ${
              checked ? "bg-emerald-600 text-white" : "bg-[var(--muted-bg)] text-[var(--muted-text)]"
            }">
              ${checked ? "✓" : sIdx + 1}
            </span>
            <span class="${checked ? "line-through opacity-75" : ""}">${stepText}</span>
          </button>
        `;
          })
          .join("")}
      </div>
    `;
    list.appendChild(item);

    if (select) {
      const opt = document.createElement("option");
      opt.value = task.title;
      opt.textContent = `${taskReady ? "✓ " : "🔒 "}${task.title}`;
      select.appendChild(opt);
    }
  });

  // Gate the submission form until interactive task steps are completed
  if (form) {
    const submitBtn = document.getElementById("submit-task-btn");
    let lockBanner = document.getElementById("task-step-lock-banner");
    if (!lockBanner) {
      lockBanner = document.createElement("div");
      lockBanner.id = "task-step-lock-banner";
      form.parentNode.insertBefore(lockBanner, form);
    }

    if (!allTasksStepsFinished) {
      form.classList.add("opacity-50", "pointer-events-none");
      if (submitBtn) submitBtn.disabled = true;
      lockBanner.className = "p-3 mb-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold";
      lockBanner.innerHTML = `<i class="fa-solid fa-lock mr-1.5"></i> Complete all interactive task steps above to unlock final deliverable submission.`;
    } else {
      form.classList.remove("opacity-50", "pointer-events-none");
      if (submitBtn) submitBtn.disabled = false;
      lockBanner.className = "p-3 mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold";
      lockBanner.innerHTML = `<i class="fa-solid fa-lock-open mr-1.5"></i> All task steps verified! Submit your deliverable link below.`;
    }
  }
}

async function submitInternshipTask(e) {
  e.preventDefault();
  const btn = document.getElementById("submit-task-btn");
  const fb = document.getElementById("task-submit-feedback");

  const taskTitle = document.getElementById("submit-task-select").value;
  const link = document.getElementById("submit-task-link").value.trim();
  const notes = document.getElementById("submit-task-notes").value.trim();

  btn.disabled = true;
  btn.textContent = "Submitting...";

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "submit_task",
        name: currentUser.name,
        email: currentUser.email,
        courseId: currentTrack.id,
        taskTitle,
        link,
        notes
      })
    });
    const data = await res.json();
    if (data.status === "success") {
      fb.textContent = "✓ Deliverable logged! Mentors will review your submission.";
      fb.className = "text-xs font-semibold text-emerald-500";
      document.getElementById("task-submission-form").reset();
    } else {
      fb.textContent = "Error: " + data.message;
      fb.className = "text-xs font-semibold text-red-400";
    }
  } catch (err) {
    fb.textContent = "Network error. Check APPS_SCRIPT_URL.";
    fb.className = "text-xs font-semibold text-red-400";
  } finally {
    btn.disabled = false;
    btn.innerHTML = `Submit Task to Mentor <i class="fa-solid fa-paper-plane ml-1"></i>`;
  }
}

// ============================================================================
// 8. DEDICATED ANTI-CHEAT PROCTORED ASSESSMENT GATEWAY (REDIRECTS TO exam.html)
// ============================================================================
function renderModuleQuiz() {
  const box = document.getElementById("player-quiz-box");
  if (!box) return;

  if (!currentTrack.quiz || currentTrack.quiz.length === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  const result = quizResults[currentTrack.id];
  const passed = result?.passed === true;

  box.innerHTML = `
    <div class="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <i class="fa-solid fa-shield-halved mr-1"></i> Proctored Anti-Cheat Exam
        </span>
        <span class="text-xs font-extrabold ${passed ? 'text-emerald-400' : 'text-slate-300'}">
          ${result ? `Last Score: ${result.percent}% (${passed ? 'PASSED' : 'NEED 75%'})` : 'Passing Score: 75%'}
        </span>
      </div>

      <div>
        <h3 class="heading-font text-base font-extrabold mb-1">Final Verification Assessment (${currentTrack.quiz.length} Questions)</h3>
        <p class="text-xs text-slate-300 leading-relaxed">
          Clicking below redirects you to a locked, full-screen testing environment. Tab switching, minimizing the browser, right-clicking, or copying text will trigger an automatic exam termination after 2 warnings.
        </p>
      </div>

      <button
        type="button"
        onclick="redirectToProctoredExam('${currentTrack.id}')"
        class="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold tracking-wide cursor-pointer transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        <span>${passed ? 'Retake Proctored Assessment' : 'Launch Proctored Assessment →'}</span>
      </button>
    </div>
  `;
}

function redirectToProctoredExam(trackId) {
  window.location.href = `exam.html?track=${encodeURIComponent(trackId)}`;
}

// ============================================================================
// 9. MENTOR ADMIN DASHBOARD (APPROVE TASKS & UPGRADE STUDENT TIERS)
// ============================================================================
async function loadAdminDashboard() {
  if (!currentUser || !currentUser.isAdmin) return;
  const msg = document.getElementById("admin-loading-msg");
  msg.textContent = "Fetching live records from Google Sheets...";

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "admin_fetch", adminEmail: currentUser.email })
    });
    const data = await res.json();

    if (data.status === "success") {
      msg.textContent = `Synced ${data.submissions.length} submissions and ${data.users.length} student accounts.`;
      renderAdminSubmissions(data.submissions);
      renderAdminUsers(data.users);
    } else {
      msg.textContent = "Error: " + data.message;
    }
  } catch (err) {
    msg.textContent = "Failed to load admin data. Ensure Code.gs was redeployed as a New Version.";
  }
}

function renderAdminSubmissions(submissions) {
  const tbody = document.getElementById("admin-submissions-tbody");
  tbody.innerHTML = "";

  submissions.forEach(sub => {
    const isApproved = sub.status.toLowerCase() === "approved";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-4">
        <div class="font-bold text-[var(--foreground)]">${sub.name}</div>
        <div class="text-[11px] text-[var(--muted-text)]">${sub.email}</div>
      </td>
      <td class="p-4 max-w-xs">
        <div class="font-semibold text-[var(--foreground)]">${sub.taskTitle}</div>
        <div class="text-[11px] text-[var(--muted-text)] truncate">${sub.notes || "—"}</div>
      </td>
      <td class="p-4">
        <a href="${sub.link}" target="_blank" class="text-blue-500 underline font-semibold">Open Link ↗</a>
      </td>
      <td class="p-4">
        <span class="px-2 py-1 rounded text-[10px] font-bold ${isApproved ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}">
          ${sub.status}
        </span>
      </td>
      <td class="p-4 space-x-1.5">
        <button onclick="adminUpdateTask(${sub.rowIndex}, 'Approved')" class="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold cursor-pointer">Approve</button>
        <button onclick="adminUpdateTask(${sub.rowIndex}, 'Needs Revision')" class="px-2.5 py-1 rounded bg-red-600/80 text-white font-bold cursor-pointer">Revise</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function adminUpdateTask(rowIndex, newStatus) {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "admin_review_task",
      adminEmail: currentUser.email,
      rowIndex,
      newStatus
    })
  });
  loadAdminDashboard();
}

function renderAdminUsers(users) {
  const tbody = document.getElementById("admin-users-tbody");
  tbody.innerHTML = "";

  users.forEach(u => {
    const isPro = u.tier.toLowerCase().includes("accelerator");
    const nextTier = isPro ? "Free 4-Week Sprint" : "Accelerator (₹99)";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-4 font-bold text-[var(--foreground)]">${u.name}</td>
      <td class="p-4">${u.email}</td>
      <td class="p-4">${u.github ? `<a href="${u.github}" target="_blank" class="text-blue-500 underline">GitHub</a>` : "—"}</td>
      <td class="p-4">
        <span class="px-2 py-1 rounded text-[10px] font-bold ${isPro ? 'bg-blue-500/15 text-blue-400' : 'bg-[var(--muted-bg)] text-[var(--muted-text)]'}">
          ${u.tier}
        </span>
      </td>
      <td class="p-4">
        <button onclick="adminUpdateTier(${u.rowIndex}, '${nextTier}')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer">
          Switch to ${isPro ? "Free" : "₹99 Pro"}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function adminUpdateTier(rowIndex, newTier) {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "admin_update_tier",
      adminEmail: currentUser.email,
      rowIndex,
      newTier
    })
  });
  loadAdminDashboard();
}
