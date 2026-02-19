import { saveAuth } from "./auth.js";

const form = document.getElementById("register-form");
const msg = document.getElementById("form-message");

function setMessage(text, type = "info") {
  if (!msg) return;
  msg.textContent = text;
  msg.style.color = type === "error" ? "crimson" : "green";
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;
  const confirm = document.getElementById("confirm-password")?.value;

  if (!email || !password || !confirm) {
    setMessage("Please fill in all fields.", "error");
    return;
  }

  if (password.length < 6) {
    setMessage("Password must be at least 6 characters.", "error");
    return;
  }

  if (password !== confirm) {
    setMessage("Passwords do not match.", "error");
    return;
  }

  //  MIDLERIDIG REGISTER (fake)
  // Senere: kall API /auth/register
  const user = { email, name: email.split("@")[0] };

  saveAuth(user);
  setMessage("Account created ✅ Redirecting...");

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 700);
});
