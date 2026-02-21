import { getAuth } from "./auth.js";

const auth = getAuth();
if (!auth) {
  window.location.href = "./login.html";
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function getStoredPosts() {
  const raw = localStorage.getItem("usbloggers_posts");
  return raw ? JSON.parse(raw) : [];
}

function saveStoredPosts(posts) {
  localStorage.setItem("usbloggers_posts", JSON.stringify(posts));
}

const form = document.getElementById("edit-post-form");

const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const imageInput = document.getElementById("image");

// Finn riktig post i localStorage
const posts = getStoredPosts();
const postIndex = posts.findIndex((p) => String(p.id) === String(id));

if (postIndex === -1) {
  alert("Post not found in localStorage - cannot edit.");
} else {
  const post = posts[postIndex];
  titleInput.value = post.title || "";
  bodyInput.value = post.body || "";
  imageInput.value = post.image || "";
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const image = imageInput.value.trim();

  if (!title || !body) {
    alert("Title and body are required.");
    return;
  }

  const updated = {
    ...posts[postIndex],
    title,
    body,
    image: image || "https://placehold.co/900x600",
    date: new Date().toISOString().slice(0, 10),
  };

  posts[postIndex] = updated;
  saveStoredPosts(posts);

  console.log("Updated post:", updated);

  window.location.href = `./specific.html?id=${updated.id}`;
});