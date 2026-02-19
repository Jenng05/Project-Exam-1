import { getAuth, logout } from "./auth.js";

export function initNavGuard() {
    const user = getAuth();

    const loginLink = document.querySelector('[data-nav="login"]');
    const registerLink = document.querySelector('[data-nav="register"]');
    const createLink = document.querySelector('[data-nav="create"]');
    const logoutLink = document.querySelector('[data-nav="logout"]');


    if (user) {
        if (createLink) createLink.style.display = loggedIn ? "inline-block" : "none";
        if (loginLink) loginLink.style.display = loggedIn ? "inline-block" : "none";
        if (loginLink) loginLink.style.display = loggedIn ? "none" : "inline-block";
        if (registerLink) registerLink.style.display = loggedIn ? "none" : "inline-block";

    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
            window.location.href = "./index.html";
        });
    }

} else {
    if (loginLink) loginLink.style.display = "inline-block";
    if (registerLink) registerLink.style.display = "inline-block";
    if (createLink) createLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "none";

  }
}
