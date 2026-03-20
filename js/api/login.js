import { saveAuth } from "./auth.js";

const form = document.getElementById("login-form");
const msg = document.getElementById("form-message");

function setMessage(text, type = "info") {
  if (!msg) return;
  msg.textContent = text;
  msg.style.color = type === "error" ? "crimson" : "green";
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    setMessage("Please fill in email and password.", "error");
    return;
  }

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setMessage(json.errors?.[0]?.message || "Login failed.", "error");
      return;
    }

    saveAuth(json.data);
    setMessage("Logged in! Redirecting...");
    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 700)

  } catch (err) {
    setMessage("Something went wrong. Try again.", "error");
  }
});
