// Parent Dashboard

// Demo child data
const DEMO_CHILD_DATA = {
  ST001: {
    name: "Rahul Sharma",
    studentId: "ST001",
    route: "Route 1 - School Bus (Morning Shift)",
    stop: "Tambaram Railway Station (S1)",
    busId: "C-101",
  },
};

let childData = null;
let refreshInterval = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  if (typeof checkAuthAndRedirect === "function") {
    checkAuthAndRedirect();
  }

  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  if (!user || user.role !== "parent") {
    alert("Access denied. Parent access required.");
    window.location.href = "login.html";
    return;
  }

  // Load child data
  const childId = user.childId || "ST001";
  childData = DEMO_CHILD_DATA[childId] || DEMO_CHILD_DATA.ST001;

  // Render UI
  renderChildInfo();
  updateDashboard();

  // Setup refresh button
  const refreshBtn = document.getElementById("refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      updateDashboard();
      showToast("Status refreshed", "success");
    });
  }

  // Auto-refresh every 30 seconds
  refreshInterval = setInterval(() => {
    updateDashboard();
  }, 30000);

  // Setup logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (refreshInterval) clearInterval(refreshInterval);
      if (typeof logout === "function") {
        logout();
        window.location.href = "login.html";
      }
    });
  }
});

function renderChildInfo() {
  const childInfoEl = document.getElementById("childInfo");
  if (!childInfoEl || !childData) return;

  childInfoEl.innerHTML = `
    <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--accent);">
      ${childData.name}
    </div>
    <div style="font-size: 13px; color: var(--text-soft); margin-bottom: 4px;">
      Student ID: ${childData.studentId}
    </div>
    <div style="font-size: 13px; color: var(--text-soft); margin-bottom: 4px;">
      Route: ${childData.route}
    </div>
    <div style="font-size: 13px; color: var(--text-soft);">
      Stop: ${childData.stop}
    </div>
  `;
}

function updateDashboard() {
  if (!childData) return;

  // Get today's attendance
  const today = new Date().toISOString().split("T")[0];
  const key = `attendance_${today}`;
  let attendanceRecord = null;

  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const attendanceData = JSON.parse(saved);
      attendanceRecord = attendanceData[childData.studentId];
    }
  } catch (e) {
    console.warn("Could not load attendance data", e);
  }

  // Update boarding status
  updateBoardingStatus(attendanceRecord);

  // Update route status
  updateRouteStatus();

  // Update last updated time
  updateLastUpdated(attendanceRecord);
}

function updateBoardingStatus(attendanceRecord) {
  const statusIndicator = document.getElementById("statusIndicator");
  const statusDetails = document.getElementById("statusDetails");

  if (!statusIndicator || !statusDetails) return;

  if (!attendanceRecord) {
    // Pending
    statusIndicator.innerHTML = `
      <span class="status-icon">⏳</span>
      <span class="status-text">Pending</span>
    `;
    statusIndicator.className = "status-indicator pending";
    statusDetails.innerHTML = `
      <p style="color: var(--text-soft);">Waiting for attendance to be marked...</p>
    `;
  } else if (attendanceRecord.status === true) {
    // Boarded (YES)
    statusIndicator.innerHTML = `
      <span class="status-icon">✓</span>
      <span class="status-text">BOARDED</span>
    `;
    statusIndicator.className = "status-indicator success";
    const time = new Date(attendanceRecord.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    statusDetails.innerHTML = `
      <p style="color: var(--success); font-weight: 600;">Your child has boarded the bus</p>
      <p style="color: var(--text-soft); font-size: 12px; margin-top: 4px;">Marked at ${time}</p>
    `;
  } else {
    // Absent (NO)
    statusIndicator.innerHTML = `
      <span class="status-icon">✗</span>
      <span class="status-text">ABSENT</span>
    `;
    statusIndicator.className = "status-indicator danger";
    const time = new Date(attendanceRecord.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    statusDetails.innerHTML = `
      <p style="color: var(--danger); font-weight: 600;">Your child did not board the bus</p>
      <p style="color: var(--text-soft); font-size: 12px; margin-top: 4px;">Marked at ${time}</p>
    `;
  }
}

function updateRouteStatus() {
  const routeStatusText = document.getElementById("routeStatusText");
  const routeDetails = document.getElementById("routeDetails");

  if (!routeStatusText || !routeDetails) return;

  // Simulate route status (in production, this would come from backend)
  // For demo, we'll check if attendance is marked to determine if route is completed
  const today = new Date().toISOString().split("T")[0];
  const key = `attendance_${today}`;
  let hasAttendance = false;

  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const attendanceData = JSON.parse(saved);
      hasAttendance = attendanceData[childData.studentId] !== undefined;
    }
  } catch (e) {
    // Ignore
  }

  // Simple logic: if attendance is marked, route might be in progress or completed
  // For demo, we'll show "On Route" if attendance is marked, otherwise "Pending"
  if (hasAttendance) {
    const currentHour = new Date().getHours();
    // If it's after 2 PM, assume route is completed
    if (currentHour >= 14) {
      routeStatusText.textContent = "Completed";
      routeDetails.innerHTML = `
        <p style="color: var(--success);">Route completed for today</p>
      `;
    } else {
      routeStatusText.textContent = "On Route";
      routeDetails.innerHTML = `
        <p style="color: var(--info);">Bus is currently on route</p>
        <p style="color: var(--text-soft); font-size: 12px; margin-top: 4px;">Route: ${childData.route}</p>
        <p style="color: var(--text-soft); font-size: 12px;">Bus: ${childData.busId}</p>
      `;
    }
  } else {
    routeStatusText.textContent = "Pending";
    routeDetails.innerHTML = `
      <p style="color: var(--text-soft);">Waiting for route to start...</p>
    `;
  }
}

function updateLastUpdated(attendanceRecord) {
  const lastUpdatedEl = document.getElementById("lastUpdated");
  if (!lastUpdatedEl) return;

  if (attendanceRecord && attendanceRecord.timestamp) {
    const date = new Date(attendanceRecord.timestamp);
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    lastUpdatedEl.textContent = `Last updated: ${timeStr}`;
  } else {
    lastUpdatedEl.textContent = "No updates yet";
  }
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type} show`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

