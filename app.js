// Main Bus Tracker Application
// Enhanced with all tracking and user features

const map = L.map("map", {
  zoomControl: true,
  attributionControl: false,
}).setView([12.9249, 80.1000], 13); // Tambaram, Tamil Nadu

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Enhanced route data with stops, capacity, and ETA information
// Routes for School & College Students
let routes = {
  route1: {
    name: "Route 1 - School Bus (Morning Shift)",
    color: "#22c55e",
    stops: [
      { id: "S1", name: "Tambaram Railway Station", lat: 12.9249, lng: 80.1000, order: 1 },
      { id: "S2", name: "Tambaram Bus Stand", lat: 12.9300, lng: 80.1050, order: 2 },
      { id: "S3", name: "Tambaram Sanatorium", lat: 12.9200, lng: 80.0950, order: 3 },
      { id: "S4", name: "Tambaram East", lat: 12.9150, lng: 80.1100, order: 4 },
    ],
    buses: [
      {
        id: "C-101",
        lat: 12.9300,
        lng: 80.1050,
        speed: 28,
        capacity: 45,
        occupancy: 32,
        nextStop: "S2",
        driver: { name: "Raj Kumar", phone: "+91-9876500001" },
        parents: [
          { name: "Mr. Sharma", phone: "+91-9876543210" },
          { name: "Mrs. Sharma", phone: "+91-9876543211" },
        ],
      },
      {
        id: "C-102",
        lat: 12.9200,
        lng: 80.0950,
        speed: 32,
        capacity: 45,
        occupancy: 28,
        nextStop: "S3",
        driver: { name: "Amit Singh", phone: "+91-9876500002" },
        parents: [
          { name: "Mr. Singh", phone: "+91-9123456780" },
          { name: "Mrs. Singh", phone: "+91-9123456781" },
        ],
      },
      {
        id: "C-103",
        lat: 12.9249,
        lng: 80.1000,
        speed: 25,
        capacity: 45,
        occupancy: 38,
        nextStop: "S1",
        driver: { name: "Vikram Mehta", phone: "+91-9876500003" },
        parents: [
          { name: "Mr. Patel", phone: "+91-9876543212" },
          { name: "Mrs. Patel", phone: "+91-9876543213" },
        ],
      },
      {
        id: "C-104",
        lat: 12.9150,
        lng: 80.1100,
        speed: 30,
        capacity: 45,
        occupancy: 22,
        nextStop: "S2",
        driver: { name: "Suresh Yadav", phone: "+91-9876500004" },
        parents: [
          { name: "Mr. Gupta", phone: "+91-9876543214" },
        ],
      },
      {
        id: "C-105",
        lat: 12.9100,
        lng: 80.0900,
        speed: 27,
        capacity: 50,
        occupancy: 42,
        nextStop: "S4",
        driver: { name: "Mohan Das", phone: "+91-9876500005" },
        parents: [
          { name: "Mr. Verma", phone: "+91-9876543215" },
          { name: "Mrs. Verma", phone: "+91-9876543216" },
        ],
      },
    ],
  },
  route2: {
    name: "Route 2 - Tambaram College Bus (Afternoon Shift)",
    color: "#eab308",
    stops: [
      { id: "A1", name: "Tambaram College Main Gate", lat: 12.9250, lng: 80.1020, order: 1 },
      { id: "A2", name: "Tambaram Student Hostel", lat: 12.9280, lng: 80.1080, order: 2 },
      { id: "A3", name: "Tambaram Library Stop", lat: 12.9220, lng: 80.1120, order: 3 },
    ],
    buses: [
      {
        id: "A-201",
        lat: 12.9250,
        lng: 80.1020,
        speed: 48,
        capacity: 50,
        occupancy: 15,
        nextStop: "A2",
        driver: { name: "Vikram Mehta", phone: "+91-9876500006" },
        parents: [{ name: "Mr. Kapoor", phone: "+91-9988776655" }],
      },
      {
        id: "A-202",
        lat: 12.9280,
        lng: 80.1080,
        speed: 42,
        capacity: 50,
        occupancy: 22,
        nextStop: "A3",
        driver: { name: "Suresh Patel", phone: "+91-9876500007" },
        parents: [{ name: "Mrs. Rao", phone: "+91-9900112233" }],
      },
      {
        id: "A-203",
        lat: 12.9220,
        lng: 80.1120,
        speed: 45,
        capacity: 50,
        occupancy: 18,
        nextStop: "A1",
        driver: { name: "Ramesh Kumar", phone: "+91-9876500008" },
        parents: [
          { name: "Mr. Joshi", phone: "+91-9988776656" },
          { name: "Mrs. Joshi", phone: "+91-9988776657" },
        ],
      },
      {
        id: "A-204",
        lat: 12.9300,
        lng: 80.1150,
        speed: 40,
        capacity: 50,
        occupancy: 35,
        nextStop: "A3",
        driver: { name: "Anil Sharma", phone: "+91-9876500009" },
        parents: [
          { name: "Mr. Malhotra", phone: "+91-9900112234" },
        ],
      },
      {
        id: "A-205",
        lat: 12.9200,
        lng: 80.1040,
        speed: 44,
        capacity: 50,
        occupancy: 28,
        nextStop: "A2",
        driver: { name: "Pradeep Singh", phone: "+91-9876500010" },
        parents: [
          { name: "Mr. Khanna", phone: "+91-9900112235" },
          { name: "Mrs. Khanna", phone: "+91-9900112236" },
        ],
      },
      {
        id: "A-206",
        lat: 12.9270,
        lng: 80.1000,
        speed: 38,
        capacity: 50,
        occupancy: 12,
        nextStop: "A1",
        driver: { name: "Deepak Verma", phone: "+91-9876500011" },
        parents: [
          { name: "Mr. Agarwal", phone: "+91-9900112237" },
        ],
      },
    ],
  },
  route3: {
    name: "Route 3 - Tambaram School Bus (Evening Return)",
    color: "#f97316",
    stops: [
      { id: "U1", name: "Tambaram School Gate", lat: 12.9249, lng: 80.1000, order: 1 },
      { id: "U2", name: "Tambaram Sports Complex", lat: 12.9180, lng: 80.0980, order: 2 },
      { id: "U3", name: "Tambaram Student Drop-off", lat: 12.9120, lng: 80.0920, order: 3 },
    ],
    buses: [
      {
        id: "U-301",
        lat: 12.9249,
        lng: 80.1000,
        speed: 22,
        capacity: 40,
        occupancy: 35,
        nextStop: "U2",
        driver: { name: "Mohan Das", phone: "+91-9876500012" },
        parents: [{ name: "Mr. Verma", phone: "+91-9012345678" }],
      },
      {
        id: "U-302",
        lat: 12.9180,
        lng: 80.0980,
        speed: 24,
        capacity: 40,
        occupancy: 18,
        nextStop: "U3",
        driver: { name: "Ramesh Yadav", phone: "+91-9876500013" },
        parents: [{ name: "Mrs. Gupta", phone: "+91-9023456789" }],
      },
      {
        id: "U-303",
        lat: 12.9120,
        lng: 80.0920,
        speed: 20,
        capacity: 40,
        occupancy: 30,
        nextStop: "U1",
        driver: { name: "Sunil Kumar", phone: "+91-9876500014" },
        parents: [
          { name: "Mr. Reddy", phone: "+91-9012345679" },
          { name: "Mrs. Reddy", phone: "+91-9012345680" },
        ],
      },
      {
        id: "U-304",
        lat: 12.9150,
        lng: 80.0950,
        speed: 26,
        capacity: 40,
        occupancy: 25,
        nextStop: "U3",
        driver: { name: "Kiran Patel", phone: "+91-9876500015" },
        parents: [
          { name: "Mr. Iyer", phone: "+91-9023456790" },
        ],
      },
      {
        id: "U-305",
        lat: 12.9210,
        lng: 80.1030,
        speed: 23,
        capacity: 40,
        occupancy: 20,
        nextStop: "U2",
        driver: { name: "Naveen Tiwari", phone: "+91-9876500016" },
        parents: [
          { name: "Mr. Nair", phone: "+91-9023456791" },
          { name: "Mrs. Nair", phone: "+91-9023456792" },
        ],
      },
    ],
  },
};

function loadAuthUser() {
  // Use the new auth system if available
  if (typeof getCurrentUser === "function") {
    const user = getCurrentUser();
    if (user) {
      return { role: user.role, name: user.name, email: user.email };
    }
  }
  // Fallback to old system
  try {
    const stored = localStorage.getItem("authUser");
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("Could not load auth user", e);
  }
  return { role: "student", name: "Student" };
}

function saveAuthUser() {
  // Note: Auth is now handled by auth.js, but we keep this for compatibility
  // The actual auth is stored in auth.js's AUTH_KEY
}

function loadRoutesFromStorage() {
  try {
    const stored = localStorage.getItem("routesData");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.route1 && parsed.route2 && parsed.route3) {
        routes = parsed;
      }
    }
  } catch (e) {
    console.warn("Could not load routes from storage", e);
  }
}

function saveRoutesToStorage() {
  localStorage.setItem("routesData", JSON.stringify(routes));
}

// Global state
let currentRouteKey = "route1";
let markers = [];
let stopMarkers = [];
let routePolyline = null; // Store the route polyline
let routeShadowPolyline = null; // Store the shadow polyline for glow effect
let busToStopLines = []; // Store lines from buses to their next stops
let simInterval = null;
let simRunning = true;
let refreshRate = 2000;
let userLocation = null;
let backendLoaded = false;
let currentUser = loadAuthUser(); // { role, name }

// Update global references
window.currentRouteKey = currentRouteKey;
window.markers = markers;

// DOM elements
const busListEl = document.getElementById("busList");
const routeSelectEl = document.getElementById("routeSelect");
const locateMeBtn = document.getElementById("locateMeBtn");
const toggleSimBtn = document.getElementById("toggleSimBtn");
const busCountEl = document.getElementById("busCount");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authStatusEl = document.getElementById("authStatus");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginRole = document.getElementById("loginRole");
const loginName = document.getElementById("loginName");
const adminCard = document.getElementById("adminCard");
const busForm = document.getElementById("busForm");
const busSelectAdmin = document.getElementById("busSelectAdmin");
const busIdInput = document.getElementById("busIdInput");
const busLatInput = document.getElementById("busLatInput");
const busLngInput = document.getElementById("busLngInput");
const busSpeedInput = document.getElementById("busSpeedInput");
const busCapacityInput = document.getElementById("busCapacityInput");
const busOccupancyInput = document.getElementById("busOccupancyInput");
const busNextStopInput = document.getElementById("busNextStopInput");
const busDriverNameInput = document.getElementById("busDriverNameInput");
const busDriverPhoneInput = document.getElementById("busDriverPhoneInput");
const busDeleteBtn = document.getElementById("busDeleteBtn");

// Global state - make accessible to modules
window.routes = routes;
window.currentRouteKey = "route1";
window.markers = [];
window.userLocation = null;

// Initialize modules
let etaModule, notificationsModule, favoritesModule, searchModule;
let chatModule, analyticsModule, sosModule, themeModule;
let accessibilityModule, offlineModule, feedbackModule, routePlanningModule;

// Initialize application
async function init() {
  // Check authentication
  if (typeof checkAuthAndRedirect === "function") {
    checkAuthAndRedirect();
  }

  // Load persisted routes if any
  loadRoutesFromStorage();

  // Make routes and currentRouteKey globally accessible
  window.routes = routes;
  window.currentRouteKey = currentRouteKey;
  
  // Load saved preferences
  loadPreferences();

  // Auth UI
  updateAuthUI();
  populateAdminBusSelect();
  
  // Initialize feature modules (wait for DOM)
  setTimeout(() => {
    if (typeof ETA !== 'undefined') etaModule = new ETA(map, routes);
    if (typeof Notifications !== 'undefined') {
      notificationsModule = new Notifications();
      window.notificationsModule = notificationsModule;
    }
    if (typeof Favorites !== 'undefined') {
      favoritesModule = new Favorites();
      window.favoritesModule = favoritesModule;
    }
    if (typeof Search !== 'undefined') {
      searchModule = new Search(map, routes);
      window.searchModule = searchModule;
    }
    if (typeof Chat !== 'undefined') {
      chatModule = new Chat();
      window.chatModule = chatModule;
    }
    if (typeof Analytics !== 'undefined') analyticsModule = new Analytics();
    if (typeof SOS !== 'undefined') sosModule = new SOS();
    if (typeof Theme !== 'undefined') themeModule = new Theme();
    if (typeof Accessibility !== 'undefined') accessibilityModule = new Accessibility();
    if (typeof Offline !== 'undefined') offlineModule = new Offline();
    if (typeof Feedback !== 'undefined') feedbackModule = new Feedback();
    if (typeof RoutePlanning !== 'undefined') routePlanningModule = new RoutePlanning(map, routes);
  }, 100);
  
  // Setup event listeners
  setupEventListeners();
  
  // Try to load backend data
  const backendUrl = "/data/buses.json";
  const ok = await fetchBackendData(backendUrl);
  
  if (!ok) {
    resetMarkers();
    fitRouteBounds();
    renderBusList();
    renderStops();
    startSimulation();
  }
  
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function setupEventListeners() {
routeSelectEl.addEventListener("change", (e) => {
  currentRouteKey = e.target.value;
  window.currentRouteKey = currentRouteKey;
  resetMarkers();
  fitRouteBounds();
  renderBusList();
  renderStops();
  if (etaModule) etaModule.updateETAs();
  if (analyticsModule) analyticsModule.recordCurrentTrip();
    populateAdminBusSelect();
});

  locateMeBtn.addEventListener("click", locateUser);
  toggleSimBtn.addEventListener("click", toggleSimulation);

  if (loginBtn) {
    loginBtn.addEventListener("click", openLoginModal);
  }
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (typeof logout === "function") {
        logout();
        window.location.href = "login.html";
      } else {
        currentUser = { role: "student", name: "Student" };
        saveAuthUser();
        updateAuthUI();
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Redirect to login page for proper authentication
      window.location.href = "login.html";
    });
  }

  const loginModalClose = loginModal?.querySelector(".modal-close");
  if (loginModalClose) {
    loginModalClose.addEventListener("click", closeLoginModal);
  }
  if (loginModal) {
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) closeLoginModal();
    });
  }

  if (busForm) {
    busForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (currentUser.role !== "admin") {
        alert("Only admins can modify buses.");
        return;
      }
      addOrUpdateBus();
    });
  }

  if (busSelectAdmin) {
    busSelectAdmin.addEventListener("change", () => {
      const id = busSelectAdmin.value;
      if (id && id !== "new") {
        populateBusForm(id);
      } else {
        clearBusForm();
      }
    });
  }

  if (busDeleteBtn) {
    busDeleteBtn.addEventListener("click", () => {
      if (currentUser.role !== "admin") {
        alert("Only admins can delete buses.");
        return;
      }
      const id = busIdInput?.value?.trim();
      if (!id) {
        alert("Select a bus to delete.");
        return;
      }
      deleteBus(id);
    });
  }
  
  // Refresh rate slider
  const refreshRateSlider = document.getElementById("refreshRateSlider");
  const refreshRateValue = document.getElementById("refreshRateValue");
  if (refreshRateSlider && refreshRateValue) {
    refreshRateSlider.addEventListener("input", (e) => {
      refreshRate = e.target.value * 1000;
      refreshRateValue.textContent = `${e.target.value}s`;
      if (simInterval) {
        startSimulation();
      }
    });
  }
  
  // Menu toggle for mobile
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const sidebar = document.getElementById("sidebar");
  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });
  }
}

function locateUser() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported in this browser. Please use a modern browser or manually navigate to Tambaram on the map.");
    // Fallback: Center on Tambaram
    const tambaramLat = 12.9249;
    const tambaramLng = 80.1000;
    map.setView([tambaramLat, tambaramLng], 13);
    return;
  }

  locateMeBtn.disabled = true;
  locateMeBtn.textContent = "Locating…";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      userLocation = { lat: latitude, lng: longitude };
      window.userLocation = userLocation;
      map.setView([latitude, longitude], 15);
      
      const userMarker = L.circleMarker([latitude, longitude], {
        radius: 7,
        color: "#3b82f6",
        fillColor: "#3b82f6",
        fillOpacity: 0.9,
      })
        .addTo(map)
        .bindPopup("<b>You are here</b>")
        .openPopup();
      
      // Show nearby stops if walking distance feature is enabled
      if (routePlanningModule) {
        routePlanningModule.showNearbyStops(latitude, longitude);
      }
      
      locateMeBtn.disabled = false;
      locateMeBtn.textContent = "My Location";
      
      // Show success notification
      if (window.notificationsModule) {
        window.notificationsModule.addNotification(
          "update",
          "Location Found",
          `Your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          { type: "location" }
        );
      }
    },
    (error) => {
      let errorMessage = "Unable to fetch your location.";
      let fallbackMessage = "";
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied. Please allow location access in your browser settings.";
          fallbackMessage = "\n\nUsing Tambaram as default location.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information unavailable. Please check your device's location settings.";
          fallbackMessage = "\n\nUsing Tambaram as default location.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out. Please try again.";
          fallbackMessage = "\n\nUsing Tambaram as default location.";
          break;
        default:
          errorMessage = "An unknown error occurred while fetching location.";
          fallbackMessage = "\n\nUsing Tambaram as default location.";
          break;
      }
      
      // Show error notification
      if (window.notificationsModule) {
        window.notificationsModule.addNotification(
          "alert",
          "Location Error",
          errorMessage + fallbackMessage,
          { type: "location_error" }
        );
      } else {
        alert(errorMessage + fallbackMessage);
      }
      
      // Fallback: Center on Tambaram, Tamil Nadu
      const tambaramLat = 12.9249;
      const tambaramLng = 80.1000;
      map.setView([tambaramLat, tambaramLng], 13);
      
      // Add a marker for Tambaram
      L.circleMarker([tambaramLat, tambaramLng], {
        radius: 8,
        color: "#00d4ff",
        fillColor: "#00d4ff",
        fillOpacity: 0.7,
      })
        .addTo(map)
        .bindPopup("<b>Tambaram, Tamil Nadu</b><br>Default location")
        .openPopup();
      
      locateMeBtn.disabled = false;
      locateMeBtn.textContent = "My Location";
    },
    {
      enableHighAccuracy: false, // Changed to false for faster response
      timeout: 15000, // Increased timeout to 15 seconds
      maximumAge: 60000, // Accept cached location up to 1 minute old
    }
  );
}

function openLoginModal() {
  if (loginModal) loginModal.classList.remove("hidden");
}

function closeLoginModal() {
  if (loginModal) loginModal.classList.add("hidden");
}

function updateAuthUI() {
  // Get current user from auth system
  if (typeof getCurrentUser === "function") {
    const user = getCurrentUser();
    if (user) {
      currentUser = { role: user.role, name: user.name, email: user.email };
    }
  }

  if (authStatusEl) {
    const roleName = currentUser.role === "admin" ? "Admin" : 
                     currentUser.role === "cleaner" ? "Cleaner" :
                     currentUser.role === "parent" ? "Parent" : "Student";
    authStatusEl.textContent = `Role: ${roleName}`;
  }
  
  // Show/hide login/logout based on authentication
  const authenticated = typeof window.isAuthenticated === "function" ? window.isAuthenticated() : currentUser.role !== "student";
  if (loginBtn) loginBtn.classList.toggle("hidden", authenticated);
  if (logoutBtn) logoutBtn.classList.toggle("hidden", !authenticated);
  if (adminCard) adminCard.classList.toggle("hidden", currentUser.role !== "admin");
  populateAdminBusSelect();
}

function populateAdminBusSelect() {
  if (!busSelectAdmin) return;
  const route = routes[currentRouteKey];
  if (!route || !route.buses) return;
  busSelectAdmin.innerHTML = `<option value="new">+ New Bus</option>` + route.buses
    .map((b) => `<option value="${b.id}">${b.id} (${route.name})</option>`)
    .join("");
}

function populateBusForm(busId) {
  const route = routes[currentRouteKey];
  if (!route || !route.buses) return;
  const bus = route.buses.find((b) => b.id === busId);
  if (!bus) return;
  if (busIdInput) busIdInput.value = bus.id;
  if (busLatInput) busLatInput.value = bus.lat;
  if (busLngInput) busLngInput.value = bus.lng;
  if (busSpeedInput) busSpeedInput.value = bus.speed;
  if (busCapacityInput) busCapacityInput.value = bus.capacity || 0;
  if (busOccupancyInput) busOccupancyInput.value = bus.occupancy || 0;
  if (busNextStopInput) busNextStopInput.value = bus.nextStop || "";
  if (busDriverNameInput) busDriverNameInput.value = bus.driver?.name || "";
  if (busDriverPhoneInput) busDriverPhoneInput.value = bus.driver?.phone || "";
}

function clearBusForm() {
  [busIdInput, busLatInput, busLngInput, busSpeedInput, busCapacityInput, busOccupancyInput, busNextStopInput, busDriverNameInput, busDriverPhoneInput].forEach((el) => {
    if (el) el.value = "";
  });
  if (busSelectAdmin) busSelectAdmin.value = "new";
}

function addOrUpdateBus() {
  const route = routes[currentRouteKey];
  if (!route) return;
  const id = busIdInput?.value?.trim();
  if (!id) {
    alert("Bus ID is required.");
    return;
  }
  const lat = parseFloat(busLatInput?.value);
  const lng = parseFloat(busLngInput?.value);
  const speed = parseFloat(busSpeedInput?.value) || 0;
  const capacity = parseInt(busCapacityInput?.value || "0", 10);
  const occupancy = parseInt(busOccupancyInput?.value || "0", 10);
  const nextStop = busNextStopInput?.value?.trim() || route.stops?.[0]?.id || "";
  const driverName = busDriverNameInput?.value?.trim() || "Driver";
  const driverPhone = busDriverPhoneInput?.value?.trim() || "+91-0000000000";

  const existing = route.buses.find((b) => b.id === id);
  if (existing) {
    existing.lat = lat;
    existing.lng = lng;
    existing.speed = speed;
    existing.capacity = capacity;
    existing.occupancy = occupancy;
    existing.nextStop = nextStop;
    existing.driver = { name: driverName, phone: driverPhone };
  } else {
    route.buses.push({
      id,
      lat,
      lng,
      speed,
      capacity,
      occupancy,
      nextStop,
      driver: { name: driverName, phone: driverPhone },
      parents: [],
    });
  }

  saveRoutesToStorage();
  resetMarkers();
  renderBusList();
  populateAdminBusSelect();
  clearBusForm();
}

function deleteBus(busId) {
  const route = routes[currentRouteKey];
  if (!route || !route.buses) return;
  const index = route.buses.findIndex((b) => b.id === busId);
  if (index === -1) {
    alert("Bus not found.");
    return;
  }
  route.buses.splice(index, 1);
  saveRoutesToStorage();
  resetMarkers();
  renderBusList();
  populateAdminBusSelect();
  clearBusForm();
}

function toggleSimulation() {
  simRunning = !simRunning;
  toggleSimBtn.textContent = simRunning ? "Pause Demo" : "Resume Demo";
}

async function fetchBackendData(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (typeof data === "object" && data !== null) {
      routes = data;
      backendLoaded = true;
      resetMarkers();
      fitRouteBounds();
      renderBusList();
      renderStops();
      if (etaModule) etaModule.updateETAs();
      console.log("Backend data loaded from", url);
      return true;
    }
  } catch (err) {
    console.warn("Could not load backend data:", err);
  }
  return false;
}

function resetMarkers() {
  markers.forEach((m) => m.marker.remove());
  markers = [];
  stopMarkers.forEach((m) => m.remove());
  stopMarkers = [];
  
  // Remove existing route polylines
  if (routePolyline) {
    routePolyline.remove();
    routePolyline = null;
  }
  if (routeShadowPolyline) {
    routeShadowPolyline.remove();
    routeShadowPolyline = null;
  }
  
  // Remove bus-to-stop lines
  busToStopLines.forEach((line) => line.remove());
  busToStopLines = [];

  const route = routes[currentRouteKey];
  if (!route || !route.buses) return;

  route.buses.forEach((bus) => {
    const marker = L.marker([bus.lat, bus.lng], {
      icon: createBusIcon(route.color, bus),
    })
      .addTo(map)
      .bindPopup(createPopup(bus, route.name));

    markers.push({ id: bus.id, marker, data: bus });
    
    // Draw line from bus to next stop
    drawBusToStopLine(bus, route);
  });
  
  // Draw route path
  drawRoutePath();
  
  // Update global reference
  window.markers = markers;
}

function renderStops() {
  const route = routes[currentRouteKey];
  if (!route || !route.stops) return;

  route.stops.forEach((stop) => {
    const stopIcon = L.divIcon({
      className: "stop-marker",
      html: `<div style="background: ${route.color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px ${route.color}40;"></div>`,
      iconSize: [12, 12],
    });

    const stopMarker = L.marker([stop.lat, stop.lng], { icon: stopIcon })
      .addTo(map)
      .bindPopup(`<b>${stop.name}</b><br>Stop ${stop.id}`);
    
    stopMarkers.push(stopMarker);
  });
}

function drawRoutePath() {
  const route = routes[currentRouteKey];
  if (!route || !route.stops || route.stops.length < 2) return;

  // Sort stops by order
  const sortedStops = [...route.stops].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // Create array of coordinates for the polyline
  const latLngs = sortedStops.map(stop => [stop.lat, stop.lng]);
  
  // Create a closed loop by adding the first stop at the end
  latLngs.push([sortedStops[0].lat, sortedStops[0].lng]);

  // Add a shadow/glow effect with a slightly offset polyline
  routeShadowPolyline = L.polyline(latLngs, {
    color: route.color,
    weight: 10,
    opacity: 0.25,
    interactive: false
  }).addTo(map);
  
  // Draw the route polyline with highlighting
  routePolyline = L.polyline(latLngs, {
    color: route.color,
    weight: 6, // Thick line for visibility
    opacity: 0.9,
    fillOpacity: 0.3,
    dashArray: '15, 8', // Dashed line for visual appeal
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(map);
  
  // Keep shadow behind the main line
  routeShadowPolyline.bringToBack();
  routePolyline.bringToFront();

  // Add popup to show route info
  routePolyline.bindPopup(`<b>${route.name}</b><br>Route Path - Click to view details`);
  
  // Add animation for highlighting effect
  routePolyline.on('add', function() {
    const path = routePolyline.getElement();
    if (path) {
      path.style.transition = 'opacity 0.3s ease';
      path.style.animation = 'routePulse 2s ease-in-out infinite';
    }
  });
}

function drawBusToStopLine(bus, route) {
  if (!bus.nextStop) return;
  
  const nextStop = route.stops?.find(s => s.id === bus.nextStop);
  if (!nextStop) return;
  
  // Draw a line from bus to next stop
  const line = L.polyline(
    [[bus.lat, bus.lng], [nextStop.lat, nextStop.lng]],
    {
      color: route.color,
      weight: 2,
      opacity: 0.5,
      dashArray: '5, 5',
      interactive: false
    }
  ).addTo(map);
  
  busToStopLines.push({ busId: bus.id, line });
}

function updateBusToStopLine(bus, route) {
  if (!bus.nextStop) return;
  
  const nextStop = route.stops?.find(s => s.id === bus.nextStop);
  if (!nextStop) return;
  
  const lineObj = busToStopLines.find(l => l.busId === bus.id);
  if (lineObj) {
    lineObj.line.setLatLngs([[bus.lat, bus.lng], [nextStop.lat, nextStop.lng]]);
  } else {
    // Create new line if it doesn't exist
    drawBusToStopLine(bus, route);
  }
}

function createBusIcon(color, bus) {
  const occupancyPercent = bus.occupancy && bus.capacity 
    ? Math.round((bus.occupancy / bus.capacity) * 100) 
    : 0;
  
  // Color based on occupancy
  let capacityColor = "#22c55e"; // Green for low
  if (occupancyPercent > 80) capacityColor = "#ef4444"; // Red for high
  else if (occupancyPercent > 60) capacityColor = "#f97316"; // Orange for medium-high

  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="13" rx="3" ry="3" fill="${color}" />
      <rect x="5" y="6" width="14" height="7" rx="1" ry="1" fill="white" opacity="0.9" />
      <circle cx="8" cy="18" r="2" fill="#020617" />
      <circle cx="16" cy="18" r="2" fill="#020617" />
      <rect x="4" y="3" width="16" height="2" rx="1" fill="${capacityColor}" />
    </svg>
  `);

  return L.icon({
    iconUrl: `data:image/svg+xml,${svg}`,
    iconSize: [36, 36],
    iconAnchor: [18, 30],
    popupAnchor: [0, -20],
  });
}

function createPopup(bus, routeName) {
  const route = routes[currentRouteKey];
  const occupancyPercent = bus.occupancy && bus.capacity 
    ? Math.round((bus.occupancy / bus.capacity) * 100) 
    : 0;
  
  let capacityStatus = "Available";
  let capacityColor = "#22c55e";
  if (occupancyPercent > 80) {
    capacityStatus = "Crowded";
    capacityColor = "#ef4444";
  } else if (occupancyPercent > 60) {
    capacityStatus = "Moderate";
    capacityColor = "#f97316";
  }

  const parentsHtml = bus.parents
    ? bus.parents
        .map(
          (p) =>
            `<div style="margin-top:6px;"><a href="tel:${p.phone}" style="color: #facc15; text-decoration: none;">${p.name}: ${p.phone}</a></div>`
        )
        .join("")
    : "";

  const driverHtml = bus.driver
    ? `<div style="margin-top:6px;"><strong>Driver:</strong> ${bus.driver.name}<br><a href="tel:${bus.driver.phone}" style="color: #3b82f6; text-decoration: none;">📞 ${bus.driver.phone}</a></div>`
    : "";

  const nextStop = route.stops?.find(s => s.id === bus.nextStop);
  const nextStopHtml = nextStop
    ? `<div style="margin-top:6px;"><strong>Next Stop:</strong> ${nextStop.name}</div>`
    : "";

  let etaHtml = "";
  if (etaModule && nextStop) {
    const eta = etaModule.calculateETA(bus, nextStop);
    if (eta) {
      etaHtml = `<div style="margin-top:6px; color: #22c55e;"><strong>ETA:</strong> ${eta} min</div>`;
    }
  }

  return `
    <div style="font-size:12px;">
      <div style="font-weight:600;">School Bus ${bus.id}</div>
      <div style="color:#9ca3af;">${routeName}</div>
      <div style="margin-top:4px;">
        <span style="color:#22c55e;">●</span>
        <span style="margin-left:4px;">Speed: ${bus.speed} km/h</span>
      </div>
      <div style="margin-top:4px;">
        <span style="color:${capacityColor};">●</span>
        <span style="margin-left:4px;">Students: ${bus.occupancy || 0}/${bus.capacity || 0} (${capacityStatus})</span>
      </div>
      ${nextStopHtml}
      ${etaHtml}
      ${driverHtml}
      <div style="margin-top:6px; font-size:11px; color:#9ca3af;">Parents/Guardians:</div>
      ${parentsHtml}
      <div style="margin-top:8px;">
        <button onclick="window.chatModule?.openChat('${bus.id}')" style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">💬 Contact Driver</button>
      </div>
    </div>
  `;
}

function fitRouteBounds() {
  const route = routes[currentRouteKey];
  if (!route || !route.buses) return;
  
  const latLngs = route.buses.map((b) => [b.lat, b.lng]);
  if (route.stops) {
    route.stops.forEach(s => latLngs.push([s.lat, s.lng]));
  }
  const bounds = L.latLngBounds(latLngs);
  map.fitBounds(bounds.pad(0.3));
}

function renderBusList() {
  const route = routes[currentRouteKey];
  if (!route || !route.buses) return;
  
  busListEl.innerHTML = "";
  if (busCountEl) busCountEl.textContent = route.buses.length;

  route.buses.forEach((bus) => {
    const occupancyPercent = bus.occupancy && bus.capacity 
      ? Math.round((bus.occupancy / bus.capacity) * 100) 
      : 0;
    
    let capacityClass = "capacity-low";
    if (occupancyPercent > 80) capacityClass = "capacity-high";
    else if (occupancyPercent > 60) capacityClass = "capacity-medium";

    const li = document.createElement("li");
    li.className = "bus-item";
    li.innerHTML = `
      <div class="bus-main-row">
        <span class="bus-id">${bus.id}</span>
        <span class="bus-status"><span class="status-dot"></span>Live</span>
      </div>
      <div class="bus-sub-row">
        <span>${route.name}</span>
        <span>${bus.speed} km/h</span>
      </div>
      <div class="bus-capacity ${capacityClass}">
        <span>Students: ${bus.occupancy || 0}/${bus.capacity || 0} (${occupancyPercent}%)</span>
      </div>
      <div class="parent-contacts" style="margin-top:6px; font-size:11px; color: var(--text-soft);">
        Parents/Guardians: ${
          bus.parents
            ? bus.parents
                .map((p) => `<a href="tel:${p.phone}" style="color: #facc15; text-decoration: none; margin-left:6px">${p.name}</a>`)
                .join("")
            : "—"
        }
      </div>
      <div class="bus-actions" style="margin-top:6px; display: flex; gap: 4px;">
        <button class="btn-small" onclick="window.favoritesModule?.toggleFavorite('${bus.id}')" title="Add to Favorites">⭐</button>
        <button class="btn-small" onclick="window.chatModule?.openChat('${bus.id}')" title="Chat with Driver">💬</button>
      </div>
    `;
    li.addEventListener("click", () => {
      const m = markers.find((mk) => mk.id === bus.id);
      if (m) {
        map.setView(m.marker.getLatLng(), 15);
        m.marker.openPopup();
      }
    });
    busListEl.appendChild(li);
  });
}

function startSimulation() {
  if (simInterval) clearInterval(simInterval);
  simInterval = setInterval(() => {
    if (!simRunning) return;

    const route = routes[currentRouteKey];
    if (!route || !route.buses) return;

    route.buses.forEach((bus) => {
      // Simulate movement
      const deltaLat = (Math.random() - 0.5) * 0.003;
      const deltaLng = (Math.random() - 0.5) * 0.003;
      bus.lat += deltaLat;
      bus.lng += deltaLng;
      bus.speed = Math.max(10, Math.min(60, bus.speed + (Math.random() - 0.5) * 6));
      
      // Simulate capacity changes
      if (bus.capacity) {
        bus.occupancy = Math.max(0, Math.min(bus.capacity, 
          bus.occupancy + Math.floor((Math.random() - 0.5) * 5)));
      }

      const markerObj = markers.find((m) => m.id === bus.id);
      if (markerObj) {
        markerObj.marker.setLatLng([bus.lat, bus.lng]);
        markerObj.marker.setIcon(createBusIcon(route.color, bus));
        markerObj.marker.setPopupContent(createPopup(bus, route.name));
        markerObj.data = bus;
        
        // Update bus-to-stop line
        updateBusToStopLine(bus, route);
      }
    });

    renderBusList();
    if (etaModule) etaModule.updateETAs();
    if (notificationsModule) notificationsModule.checkProximityAlerts();
  }, refreshRate);
}

function loadPreferences() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && themeModule) {
    themeModule.setTheme(savedTheme);
  }
  
  const savedFontSize = localStorage.getItem("fontSize");
  if (savedFontSize && accessibilityModule) {
    accessibilityModule.setFontSize(savedFontSize);
  }
}

// Make modules globally accessible
window.chatModule = chatModule;
window.favoritesModule = favoritesModule;

// Initialize on load
document.addEventListener("DOMContentLoaded", init);
