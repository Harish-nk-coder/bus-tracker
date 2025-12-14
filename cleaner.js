// Cleaner Attendance System

// Demo student data organized by stop
const DEMO_STUDENTS = {
  route1: {
    name: "Route 1 - School Bus (Morning Shift)",
    stops: [
      {
        id: "S1",
        name: "Tambaram Railway Station",
        students: [
          { id: "ST001", name: "Rahul Sharma", parentPhone: "+91-9876543210" },
          { id: "ST002", name: "Priya Patel", parentPhone: "+91-9876543211" },
          { id: "ST003", name: "Amit Kumar", parentPhone: "+91-9876543212" },
        ],
      },
      {
        id: "S2",
        name: "Tambaram Bus Stand",
        students: [
          { id: "ST004", name: "Sneha Reddy", parentPhone: "+91-9876543213" },
          { id: "ST005", name: "Vikram Singh", parentPhone: "+91-9876543214" },
        ],
      },
      {
        id: "S3",
        name: "Tambaram Sanatorium",
        students: [
          { id: "ST006", name: "Anjali Verma", parentPhone: "+91-9876543215" },
          { id: "ST007", name: "Rohit Gupta", parentPhone: "+91-9876543216" },
          { id: "ST008", name: "Kavya Iyer", parentPhone: "+91-9876543217" },
        ],
      },
      {
        id: "S4",
        name: "Tambaram East",
        students: [
          { id: "ST009", name: "Arjun Nair", parentPhone: "+91-9876543218" },
        ],
      },
    ],
  },
  route2: {
    name: "Route 2 - Tambaram College Bus (Afternoon Shift)",
    stops: [
      {
        id: "A1",
        name: "Tambaram College Main Gate",
        students: [
          { id: "ST010", name: "Meera Joshi", parentPhone: "+91-9988776655" },
          { id: "ST011", name: "Karan Malhotra", parentPhone: "+91-9900112234" },
        ],
      },
      {
        id: "A2",
        name: "Tambaram Student Hostel",
        students: [
          { id: "ST012", name: "Neha Kapoor", parentPhone: "+91-9988776656" },
        ],
      },
    ],
  },
  route3: {
    name: "Route 3 - Tambaram School Bus (Evening Return)",
    stops: [
      {
        id: "U1",
        name: "Tambaram School Gate",
        students: [
          { id: "ST013", name: "Ravi Tiwari", parentPhone: "+91-9012345678" },
          { id: "ST014", name: "Shreya Nair", parentPhone: "+91-9012345679" },
        ],
      },
    ],
  },
};

// Attendance data storage
let attendanceData = {};
let currentRoute = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  if (typeof checkAuthAndRedirect === "function") {
    checkAuthAndRedirect();
  }

  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  if (!user || user.role !== "cleaner") {
    alert("Access denied. Cleaner access required.");
    window.location.href = "login.html";
    return;
  }

  // Set current date
  const dateEl = document.getElementById("currentDate");
  if (dateEl) {
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Load route for cleaner
  const routeId = user.routeId || "route1";
  currentRoute = DEMO_STUDENTS[routeId];
  if (!currentRoute) {
    currentRoute = DEMO_STUDENTS.route1;
  }

  // Load saved attendance for today
  loadTodayAttendance();

  // Render UI
  renderRouteInfo();
  renderStopsList();
  updateSummary();

  // Setup logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (typeof logout === "function") {
        logout();
        window.location.href = "login.html";
      }
    });
  }
});

function loadTodayAttendance() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const key = `attendance_${today}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      attendanceData = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not load attendance data", e);
    attendanceData = {};
  }
}

function saveTodayAttendance() {
  const today = new Date().toISOString().split("T")[0];
  const key = `attendance_${today}`;
  try {
    localStorage.setItem(key, JSON.stringify(attendanceData));
  } catch (e) {
    console.error("Could not save attendance data", e);
  }
}

function renderRouteInfo() {
  const routeInfoEl = document.getElementById("routeInfo");
  if (!routeInfoEl || !currentRoute) return;

  routeInfoEl.innerHTML = `
    <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">${currentRoute.name}</div>
    <div style="font-size: 12px; color: var(--text-soft);">
      ${currentRoute.stops.length} stops
    </div>
  `;
}

function renderStopsList() {
  const stopsListEl = document.getElementById("stopsList");
  if (!stopsListEl || !currentRoute) return;

  stopsListEl.innerHTML = currentRoute.stops
    .map((stop) => {
      const studentsHtml = stop.students
        .map((student) => {
          const attendance = getAttendance(student.id);
          const isMarked = attendance !== null;
          const status = attendance === true ? "YES" : attendance === false ? "NO" : null;

          return `
            <div class="student-item ${isMarked ? "marked" : ""}">
              <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-id">ID: ${student.id}</div>
              </div>
              <div class="student-actions">
                <button 
                  class="btn attendance-btn yes-btn ${attendance === true ? "active" : ""} ${isMarked ? "disabled" : ""}"
                  data-student-id="${student.id}"
                  data-action="yes"
                  ${isMarked ? "disabled" : ""}
                >
                  ${attendance === true ? "✓ YES" : "YES"}
                </button>
                <button 
                  class="btn attendance-btn no-btn ${attendance === false ? "active" : ""} ${isMarked ? "disabled" : ""}"
                  data-student-id="${student.id}"
                  data-action="no"
                  ${isMarked ? "disabled" : ""}
                >
                  ${attendance === false ? "✗ NO" : "NO"}
                </button>
                ${isMarked ? `<div class="attendance-timestamp">${getAttendanceTime(student.id)}</div>` : ""}
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <div class="stop-card">
          <div class="stop-header">
            <h3>${stop.name}</h3>
            <span class="stop-id">${stop.id}</span>
          </div>
          <div class="students-list">
            ${studentsHtml}
          </div>
        </div>
      `;
    })
    .join("");

  // Add event listeners
  stopsListEl.querySelectorAll(".attendance-btn").forEach((btn) => {
    if (!btn.disabled) {
      btn.addEventListener("click", handleAttendanceClick);
    }
  });
}

function handleAttendanceClick(e) {
  const btn = e.target;
  const studentId = btn.dataset.studentId;
  const action = btn.dataset.action;
  const isYes = action === "yes";

  // Mark attendance
  const timestamp = new Date().toISOString();
  attendanceData[studentId] = {
    status: isYes,
    timestamp: timestamp,
    date: new Date().toISOString().split("T")[0],
  };

  // Save locally
  saveTodayAttendance();

  // Send to backend
  sendAttendanceToBackend(studentId, isYes, timestamp);

  // Update UI
  renderStopsList();
  updateSummary();
}

function getAttendance(studentId) {
  const record = attendanceData[studentId];
  return record ? record.status : null;
}

function getAttendanceTime(studentId) {
  const record = attendanceData[studentId];
  if (!record || !record.timestamp) return "";
  const date = new Date(record.timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateSummary() {
  if (!currentRoute) return;

  let totalStudents = 0;
  let markedCount = 0;

  currentRoute.stops.forEach((stop) => {
    totalStudents += stop.students.length;
    stop.students.forEach((student) => {
      if (getAttendance(student.id) !== null) {
        markedCount++;
      }
    });
  });

  const totalEl = document.getElementById("totalStudents");
  const markedEl = document.getElementById("markedCount");
  const pendingEl = document.getElementById("pendingCount");

  if (totalEl) totalEl.textContent = totalStudents;
  if (markedEl) markedEl.textContent = markedCount;
  if (pendingEl) pendingEl.textContent = totalStudents - markedCount;
}

async function sendAttendanceToBackend(studentId, isPresent, timestamp) {
  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  if (!user) return;

  const attendanceRecord = {
    studentId: studentId,
    status: isPresent ? "YES" : "NO",
    timestamp: timestamp,
    date: new Date().toISOString().split("T")[0],
    cleanerEmail: user.email,
    cleanerName: user.name,
    routeId: user.routeId || "route1",
  };

  try {
    // Send to backend API
    const response = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceRecord),
    });

    if (response.ok) {
      console.log("Attendance sent to backend successfully", attendanceRecord);
      // Show success notification
      showToast("Attendance saved successfully", "success");
    } else {
      console.warn("Backend API not available, saved locally only");
      showToast("Saved locally (backend unavailable)", "info");
    }
  } catch (error) {
    console.warn("Could not send to backend, saved locally:", error);
    showToast("Saved locally (offline mode)", "info");
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

