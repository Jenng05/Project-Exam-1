const STORAGE_KEY = "usbloggers_auth";

export function saveAuth(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getAuth() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isLoggedIn() {
  return !!getAuth();
}
