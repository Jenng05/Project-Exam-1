import { isLoggedIn, logout } from "./auth.js";

export function initNavGuard() {
    const loggedIn = isLoggedIn();

    const loginLink = document.getElementById("nav-login");
    const registerLink = document.getElementById("nav-register");
    const createLink = document.getElementById("nav-create");
    const logoutLink = document.getElementById("nav-logout");


    if (loggedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (createLink) createLink.style.display = "inline-block";
    if (logoutLink) logoutLink.style.display = "inline-block";
  } 
  else {
    if (loginLink) loginLink.style.display = "inline-block";
    if (registerLink) registerLink.style.display = "inline-block";
    if (createLink) createLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "none";
  }

  // Logout klikker
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
      window.location.href = "./index.html";
    });
  }
}

import { isLoggedIn } from "./auth.js";

export function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = "./login.html";
    }
}
