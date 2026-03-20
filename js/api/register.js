import { saveAuth } from "./auth.js";

const form = document.getElementById("register-form");
const msg = document.getElementById("register-message");

function setMessage(text, type = "info") {
  if (!msg) return;
  msg.textContent = text;
  msg.style.color = type === "error" ? "crimson" : "green";
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("register-name")?.value.trim();
  const email = document.getElementById("register-email")?.value.trim();
  const password = document.getElementById("register-password")?.value;
  const confirm = document.getElementById("register-confirm")?.value;

  if (!name ||!email || !password || !confirm) {
    setMessage("Please fill in all fields.", "error");
    return;
  }

  if (password.length < 8) {
    setMessage("Password must be at least 8 characters.", "error");
    return;
  }

  if (password !== confirm) {
    setMessage("Passwords do not match.", "error");
    return;
  }

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setMessage(json.errors?.[0]?.message || "Registration failed.", "error");
      return;
    }

    setMessage("Account created! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 700);

  } catch (err) {
    setMessage("Something went wrong. Try again.", "error");
  }
});