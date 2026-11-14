// ============================================================================
// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW:
// ============================================================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwj82z7wQTsWVUHjZhXjaAquyhBWh-M4kqAADiGnAU7GRZyc5hS4LNIVTR30faPjvwLYA/exec";

let currentUser = JSON.parse(localStorage.getItem("openbox_user")) || null;
let completedLessons = JSON.parse(localStorage.getItem("openbox_progress")) || {};
let approvedCourses = JSON.parse(localStorage.getItem("openbox_approved")) || [];
let currentTrack = null;
let currentLessonIdx = 0;
let activeCategory = "All";
let authMode = "login";

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
  document.getElementById("terminal-title").innerText = tabData[tabId].title;
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

  document.getElementById("theme-toggle").addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });

  document.getElementById("course-search").addEventListener("input", renderTracks);
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
});

// ============================================================================
// 2. VIEW SWITCHER (LANDING <-> PORTAL <-> MENTOR ADMIN)
// ============================================================================
function switchView(viewName) {
  document.getElementById("view-landing").classList.add("hidden");
  document.getElementById("view-portal").classList.add("hidden");
  document.getElementById("view-admin").classList.add("hidden");

  if (viewName === "portal") {
    document.getElementById("view-portal").classList.remove("hidden");
    closeCoursePlayer();
  } else if (viewName === "admin") {
    document.getElementById("view-admin").classList.remove("hidden");
    loadAdminDashboard();
  } else {
    document.getElementById("view-landing").classList.remove("hidden");
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

  if (currentUser) {
    loginBtn.classList.add("hidden");
    userPill.classList.remove("hidden");
    userName.textContent = `${currentUser.name} (${isUserAccelerator() ? "₹99 Pro" : "Free"})`;
    mobileLogout.classList.remove("hidden");

    if (currentUser.isAdmin) {
      navAdmin.classList.remove("hidden");
      mobileAdmin.classList.remove("hidden");
    } else {
      navAdmin.classList.add("hidden");
      mobileAdmin.classList.add("hidden");
    }

    if (tierBanner) {
      tierBanner.innerHTML = isUserAccelerator()
        ? `Active Plan: <strong class="text-emerald-500">Full Accelerator Track (₹99)</strong> — All tracks & certificates unlocked.`
        : `Active Plan: <strong class="text-blue-500">Free 4-Week Sprint (₹0)</strong> — <button onclick="openUpgradeModal()" class="underline text-amber-500 font-bold cursor-pointer">Upgrade to ₹99 Accelerator</button> to unlock Pro tracks.`;
    }
  } else {
    loginBtn.classList.remove("hidden");
    userPill.classList.add("hidden");
    mobileLogout.classList.add("hidden");
    navAdmin.classList.add("hidden");
    mobileAdmin.classList.add("hidden");
    if (tierBanner) {
      tierBanner.textContent = "Login or create a free student account to track progress and submit internship deliverables.";
    }
  }
}

function openAuthModal(mode = "login") {
  setAuthMode(mode);
  document.getElementById("auth-modal").classList.remove("hidden");
  document.getElementById("auth-feedback").textContent = "";
}

function closeAuthModal() {
  document.getElementById("auth-modal").classList.add("hidden");
}

function openUpgradeModal() {
  document.getElementById("upgrade-modal").classList.remove("hidden");
}

function closeUpgradeModal() {
  document.getElementById("upgrade-modal").classList.add("hidden");
}

function setAuthMode(mode) {
  authMode = mode;
  const tabLogin = document.getElementById("auth-tab-login");
  const tabReg = document.getElementById("auth-tab-register");
  const nameWrap = document.getElementById("auth-name-wrap");
  const ghWrap = document.getElementById("auth-github-wrap");
  const submitBtn = document.getElementById("auth-submit-btn");

  if (mode === "register") {
    tabReg.classList.add("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    tabLogin.classList.remove("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    nameWrap.classList.remove("hidden");
    ghWrap.classList.remove("hidden");
    submitBtn.textContent = "Create Student Account";
  } else {
    tabLogin.classList.add("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    tabReg.classList.remove("bg-[var(--card)]", "text-[var(--foreground)]", "shadow-sm");
    nameWrap.classList.add("hidden");
    ghWrap.classList.add("hidden");
    submitBtn.textContent = "Login to Portal";
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
// 4. CATALOG RENDERER WITH TIER LOCKING
// ============================================================================
function renderTracks() {
  const grid = document.getElementById("courses-grid");
  const search = document.getElementById("course-search").value.toLowerCase();
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

    const tagsHtml = track.techStack
      .map(t => `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--muted-bg)] text-[var(--muted-text)]">${t}</span>`)
      .join("");

    const card = document.createElement("div");
    card.className = "flex flex-col justify-between p-6 rounded-2xl bg-[var(--card)] border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all shadow-sm";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${track.requiresAccelerator ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}">
            ${track.tier}
          </span>
          <span class="text-xs font-bold ${locked ? 'text-amber-500' : 'text-emerald-500'}">
            ${locked ? '<i class="fa-solid fa-lock"></i> Locked' : pct + '% Done'}
          </span>
        </div>

        <h3 class="heading-font text-lg font-bold text-[var(--foreground)] mb-2">${track.title}</h3>
        <p class="text-xs text-[var(--muted-text)] leading-relaxed mb-4">${track.description}</p>
        <div class="flex flex-wrap gap-1.5 mb-6">${tagsHtml}</div>
      </div>

      <button onclick="openTrackPlayer('${track.id}')"
        class="w-full py-2.5 px-4 rounded-xl text-xs font-bold ${locked ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-black' : 'bg-blue-600 hover:bg-blue-500 text-white'} transition-all cursor-pointer flex items-center justify-center gap-2">
        <span>${locked ? "Unlock with ₹99 Accelerator" : (track.isInternship ? "Open Internship Sprint" : "Start Course")}</span>
        <i class="fa-solid ${locked ? 'fa-lock-open' : 'fa-arrow-right'}"></i>
      </button>
    `;
    grid.appendChild(card);
  });
}

// ============================================================================
// 5. COURSE PLAYER, PROGRESS, TASKS & CERTIFICATE ELIGIBILITY
// ============================================================================
function openTrackPlayer(trackId) {
  if (!currentUser) {
    openAuthModal("login");
    const fb = document.getElementById("auth-feedback");
    fb.textContent = "Please login or register to enter the workspace.";
    fb.className = "text-xs font-semibold text-center text-blue-500";
    return;
  }

  const track = OPENBOX_TRACKS.find(t => t.id === trackId);
  if (track.requiresAccelerator && !isUserAccelerator()) {
    openUpgradeModal();
    return;
  }

  currentTrack = track;
  currentLessonIdx = 0;

  document.getElementById("portal-catalog").classList.add("hidden");
  document.getElementById("portal-player").classList.remove("hidden");
  document.getElementById("sidebar-track-title").textContent = currentTrack.title;

  renderSyllabusSidebar();
  loadLessonModule(0);
  renderInternshipTasks();
  renderModuleQuiz();
  checkCertificateEligibility();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeCoursePlayer() {
  document.getElementById("portal-player").classList.add("hidden");
  document.getElementById("portal-catalog").classList.remove("hidden");
  renderTracks();
}

function renderSyllabusSidebar() {
  const list = document.getElementById("sidebar-lessons-list");
  list.innerHTML = "";

  currentTrack.lessons.forEach((lesson, idx) => {
    const isDone = !!completedLessons[lesson.id];
    const isActive = idx === currentLessonIdx;
    const li = document.createElement("li");
    li.onclick = () => loadLessonModule(idx);
    li.className = `p-3 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
      isActive ? "bg-blue-600/10 border-blue-500/40 text-[var(--foreground)] font-bold" : "bg-[var(--muted-bg)] border-transparent text-[var(--muted-text)]"
    }`;
    li.innerHTML = `
      <span>${lesson.title}</span>
      <span class="${isDone ? 'text-emerald-500' : 'text-blue-500'}">
        <i class="fa-solid ${isDone ? 'fa-circle-check' : 'fa-circle-play'}"></i>
      </span>
    `;
    list.appendChild(li);
  });

  const total = currentTrack.lessons.length;
  const done = currentTrack.lessons.filter(l => completedLessons[l.id]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById("sidebar-progress-bar").style.width = `${pct}%`;
  document.getElementById("sidebar-progress-text").textContent = `${pct}% Completed (${done}/${total} modules)`;
}

function loadLessonModule(idx) {
  currentLessonIdx = idx;
  const lesson = currentTrack.lessons[idx];

  document.getElementById("player-video-box").innerHTML = `
    <iframe class="w-full h-full" src="https://www.youtube.com/embed/${lesson.videoId}" allowfullscreen></iframe>
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

  const btn = document.getElementById("player-complete-btn");
  if (completedLessons[lesson.id]) {
    btn.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Completed`;
    btn.className = "px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-pointer shrink-0";
  } else {
    btn.textContent = "Mark as Complete";
    btn.className = "px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shrink-0";
  }

  renderSyllabusSidebar();
  checkCertificateEligibility();
}

function toggleLessonComplete() {
  const lesson = currentTrack.lessons[currentLessonIdx];
  const nowComplete = !completedLessons[lesson.id];

  if (nowComplete) completedLessons[lesson.id] = true;
  else delete completedLessons[lesson.id];

  localStorage.setItem("openbox_progress", JSON.stringify(completedLessons));
  loadLessonModule(currentLessonIdx);

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
  if (!currentTrack || !currentTrack.isInternship) {
    certBox.classList.add("hidden");
    return;
  }
  const allLessonsDone = currentTrack.lessons.every(l => completedLessons[l.id]);
  const taskApproved = approvedCourses.includes(currentTrack.id) || currentUser.isAdmin;

  if (allLessonsDone && taskApproved) {
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

  // Dark Navy/Obsidian Background
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, 1200, 850);

  // Subtle Outer & Inner Borders
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, 1128, 778);

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(54, 54, 1092, 742);

  // Brand Header
  ctx.fillStyle = "#3b82f6";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("OPENBOX GROWTH PARTNER", 600, 130);

  // Title
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 52px sans-serif";
  ctx.fillText("CERTIFICATE OF INTERNSHIP", 600, 210);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "22px sans-serif";
  ctx.fillText("This certifies that", 600, 290);

  // Student Name
  ctx.fillStyle = "#60a5fa";
  ctx.font = "bold 56px sans-serif";
  ctx.fillText(currentUser.name.toUpperCase(), 600, 370);

  // Underline
  ctx.strokeStyle = "rgba(96,165,250,0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(300, 392);
  ctx.lineTo(900, 392);
  ctx.stroke();

  // Body Text
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "23px sans-serif";
  ctx.fillText("has successfully completed all production modules and practical deliverables for", 600, 455);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText(currentTrack.title, 600, 515);

  // Footer Metadata
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
// 7. TASK SUBMISSIONS & QUIZZES
// ============================================================================
function renderInternshipTasks() {
  const box = document.getElementById("player-tasks-box");
  const list = document.getElementById("player-tasks-list");
  const select = document.getElementById("submit-task-select");
  document.getElementById("task-submit-feedback").textContent = "";

  if (!currentTrack.tasks || currentTrack.tasks.length === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  list.innerHTML = "";
  select.innerHTML = "";

  currentTrack.tasks.forEach(task => {
    const item = document.createElement("div");
    item.className = "p-4 rounded-xl bg-[var(--muted-bg)] border-l-4 border-blue-500";
    item.innerHTML = `
      <div class="flex items-center justify-between gap-2 mb-1">
        <h4 class="heading-font text-sm font-bold text-[var(--foreground)]">${task.title}</h4>
        <span class="text-[10px] font-mono text-blue-500 font-bold">${task.deadline}</span>
      </div>
      <p class="text-xs text-[var(--muted-text)] leading-relaxed">${task.instructions}</p>
    `;
    list.appendChild(item);

    const opt = document.createElement("option");
    opt.value = task.title;
    opt.textContent = task.title;
    select.appendChild(opt);
  });
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
      fb.textContent = "✓ Deliverable logged! Mentors will review your repo.";
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

function renderModuleQuiz() {
  const box = document.getElementById("player-quiz-box");
  const container = document.getElementById("player-quiz-questions");
  document.getElementById("quiz-score-msg").textContent = "";

  if (!currentTrack.quiz || currentTrack.quiz.length === 0) {
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  container.innerHTML = "";

  currentTrack.quiz.forEach((q, qIdx) => {
    const div = document.createElement("div");
    div.className = "space-y-2";
    div.innerHTML = `<p class="text-xs font-bold text-[var(--foreground)]">${qIdx + 1}. ${q.question}</p>`;
    q.options.forEach((opt, optIdx) => {
      div.innerHTML += `
        <label class="flex items-center gap-2 text-xs text-[var(--muted-text)] cursor-pointer hover:text-[var(--foreground)]">
          <input type="radio" name="obx-q-${qIdx}" value="${optIdx}" class="accent-blue-600" />
          <span>${opt}</span>
        </label>
      `;
    });
    container.appendChild(div);
  });
}

function gradeQuiz() {
  let score = 0;
  currentTrack.quiz.forEach((q, qIdx) => {
    const chosen = document.querySelector(`input[name="obx-q-${qIdx}"]:checked`);
    if (chosen && parseInt(chosen.value) === q.answer) score++;
  });
  const msg = document.getElementById("quiz-score-msg");
  msg.textContent = `Score: ${score} / ${currentTrack.quiz.length} Verified`;
  msg.className = score === currentTrack.quiz.length ? "text-xs font-bold text-emerald-500" : "text-xs font-bold text-blue-500";
}

// ============================================================================
// 8. MENTOR ADMIN DASHBOARD (APPROVE TASKS & UPGRADE STUDENT TIERS)
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
