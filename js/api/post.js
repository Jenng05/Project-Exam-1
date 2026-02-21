import { getAuth } from "../api/auth.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("Post ID from URL:", id);

function getStoredPosts() {
  const raw = localStorage.getItem("usbloggers_posts");
  return raw ? JSON.parse(raw) : [];
}

const dummyPosts = [
  {
    id: "1",
    title: "My first blog post",
    author: "Us Bloggers",
    date: "2026-02-01",
    image: "https://placehold.co/900x600",
    body: "This is the content of post 1.",
  },
  {
    id: "2",
    title: "Learning frontend",
    author: "Us Bloggers",
    date: "2026-02-02",
    image: "https://placehold.co/900x600",
    body: "This is the content of post 2.",
  },
  {
    id: "3",
    title: "Design tips",
    author: "Us Bloggers",
    date: "2026-02-03",
    image: "https://placehold.co/900x600",
    body: "This is the content of post 3.",
  },
];

const stored = getStoredPosts();
const post =
  stored.find((p) => String(p.id) === String(id)) ||
  dummyPosts.find((p) => String(p.id) === String(id));

if (!post) {
  document.getElementById("post-title").textContent = "Post not found";
} else {
  document.getElementById("post-title").textContent = post.title || "Untitled";
  document.getElementById("post-meta").textContent = `${post.author || "Us Bloggers"} · ${post.date || ""}`;
  document.getElementById("post-image").src = post.image || "https://placehold.co/900x600";

  const contentEl = document.getElementById("post-content");
  contentEl.textContent = post.body || post.content || "" ;
}

// Vis edit-link kun hvis logget inn
const auth = getAuth();
const editLink = document.getElementById("edit-link");

if (auth && editLink && id) {
  editLink.hidden = false;
  editLink.href = `./edit.html?id=${id}`;
}

// 7) Share button
const shareBtn = document.getElementById("share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied ✅");
    } catch {
      prompt("Copy this link:", url);
    }
  });
}