import { POSTS_URL } from "./config.js";

const titleEl = document.getElementById("post-title");
const metaEl = document.getElementById("post-meta");
const imgEl = document.getElementById("post-image");
const contentEl = document.getElementById("post-content");

function formatDate(iso) {
  if (!iso) return "";

  return String(iso).slice(0, 10);
}

function normalizePost(p) {
  return {
    id: p.id,
    title: p.title || "Untitled",
    body: p.body || "",
    image: p.media?.url || "https://placehold.co/900x600",
    alt: p.media?.alt || p.title || "Blog post image",
    created: p.created || "",
    author: p.author?.name || "Us Bloggers",
  };
}

async function loadSpecific() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    if (titleEl) titleEl.textContent = "No post ID provided";
    return;
  }

  try {
    const res = await fetch(`${POSTS_URL}/${id}`);
    const json = await res.json();

    const data = json.data ? json.data : null;
    if (!data) throw new Error("No data");

    const post = normalizePost(data);

    if (titleEl) titleEl.textContent = post.title;
    if (metaEl) metaEl.textContent = `${post.author} · ${formatDate(post.created)}`;
    if (imgEl) {
      imgEl.src = post.image;
      imgEl.alt = post.alt;
    }
    if (contentEl) contentEl.textContent = post.body;
  } catch (err) {
    console.error("Failed to load post:", err);
    if (titleEl) titleEl.textContent = "Post not found";
  }
}

loadSpecific();