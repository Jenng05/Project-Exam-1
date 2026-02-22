import { saveAuth } from "./auth.js";

const form = document.getElementById("login-form");
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

  if (!email || !password) {
    setMessage("Please fill in email and password.", "error");
    return;
  }

  // bytte denne delen til API senere
  const user = { email, name: email.split("@")[0] };

  saveAuth(user);
  setMessage("Logged in Redirecting...");

  setTimeout(() => {
    window.location.href = "../../index.html";
  }, 700);
});
