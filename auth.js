// Simple demo authentication helper for the demo app.
// Replace with real backend auth in production.

const AUTH_KEY = 'bt_auth_v1';

// Demo user database - in production, this would be on a backend
const DEMO_USERS = {
  'student@demo.com': { password: 'demo', role: 'student', name: 'Student User', childId: 'ST001' },
  'parent@demo.com': { password: 'demo', role: 'parent', name: 'Parent User', childId: 'ST001' },
  'cleaner@demo.com': { password: 'demo', role: 'cleaner', name: 'Cleaner User', routeId: 'route1' },
  'admin@demo.com': { password: 'demo', role: 'admin', name: 'Admin User' },
};

function isAuthenticated() {
  try {
    const v = localStorage.getItem(AUTH_KEY);
    if (!v) return false;
    const obj = JSON.parse(v);
    // Basic token expiry check
    if (obj && obj.token && (!obj.expires || obj.expires > Date.now())) return true;
  } catch (e) {
    return false;
  }
  return false;
}

function getCurrentUser() {
  try {
    const v = localStorage.getItem(AUTH_KEY);
    if (!v) return null;
    const obj = JSON.parse(v);
    if (obj && obj.token && (!obj.expires || obj.expires > Date.now())) {
      return { email: obj.email, role: obj.role, name: obj.name, childId: obj.childId, routeId: obj.routeId };
    }
  } catch (e) {
    return null;
  }
  return null;
}

async function loginDemo({ email, password, remember }) {
  // Demo rule: check against DEMO_USERS
  // In a real app, call your backend here and store secure token.
  if (!email || !password) return false;
  
  const user = DEMO_USERS[email.toLowerCase()];
  if (!user || user.password !== password) return false;

  const tokenObj = {
    email: email.toLowerCase(),
    role: user.role,
    name: user.name,
    childId: user.childId,
    routeId: user.routeId,
    token: 'demo-token-' + Math.random().toString(36).slice(2, 9),
    expires: remember ? Date.now() + 1000 * 60 * 60 * 24 * 30 : Date.now() + 1000 * 60 * 60 * 4, // 30d or 4h
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(tokenObj));
  return tokenObj;
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
}

function checkAuthAndRedirect() {
  const onLoginPage = location.pathname.endsWith('login.html') || location.pathname === '/login.html';
  const onCleanerPage = location.pathname.endsWith('cleaner.html') || location.pathname === '/cleaner.html';
  const onParentPage = location.pathname.endsWith('parent.html') || location.pathname === '/parent.html';
  
  if (!isAuthenticated() && !onLoginPage) {
    // Redirect to login preserving current page if needed
    const next = encodeURIComponent(location.pathname + (location.search || ''));
    location.href = 'login.html?next=' + next;
    return;
  }

  // If already authenticated, redirect based on role
  if (isAuthenticated() && onLoginPage) {
    const user = getCurrentUser();
    const params = new URLSearchParams(location.search);
    let next = params.get('next');
    
    // Role-based redirection
    if (!next) {
      if (user.role === 'cleaner') {
        next = 'cleaner.html';
      } else if (user.role === 'parent') {
        next = 'parent.html';
      } else if (user.role === 'admin') {
        next = 'index.html';
      } else {
        next = 'index.html'; // student or default
      }
    }
    
    location.replace(next);
    return;
  }

  // Check role-based access
  if (isAuthenticated()) {
    const user = getCurrentUser();
    if (onCleanerPage && user.role !== 'cleaner') {
      // Redirect to appropriate page based on role
      if (user.role === 'parent') location.replace('parent.html');
      else if (user.role === 'admin') location.replace('index.html');
      else location.replace('index.html');
      return;
    }
    if (onParentPage && user.role !== 'parent') {
      if (user.role === 'cleaner') location.replace('cleaner.html');
      else if (user.role === 'admin') location.replace('index.html');
      else location.replace('index.html');
      return;
    }
  }

  // Attach logout handler if button exists
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      location.href = 'login.html';
    });
  }
}

// Expose functions for pages
window.isAuthenticated = isAuthenticated;
window.loginDemo = loginDemo;
window.logout = logout;
window.checkAuthAndRedirect = checkAuthAndRedirect;
window.getCurrentUser = getCurrentUser;

// Auto-run check when auth.js loads on pages
try { checkAuthAndRedirect(); } catch (e) { /* ignore in non-browser env */ }
