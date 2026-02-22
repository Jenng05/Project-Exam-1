import { POSTS_URL } from "./api/config.js";
import { initNavGuard } from "./api/guard.js";

initNavGuard();

console.log("index.js loaded", POSTS_URL);

async function getPosts() {
  try {
    const res = await fetch(POSTS_URL);
    const json = await res.json();
    console.log("POSTS FROM API ", json);

    return json.data ?? [];
  } catch (err) {
    console.error("Failed to fetch posts", err);
    return [];
  }
}

getPosts();

function getLocalPosts() {
  const stored = localStorage.getItem("usbloggers_posts");
  return stored ? JSON.parse(stored) : [];
}

const dummyPosts = [
  {
    id: "1",
    title: "My first blog post",
    image: "https://placehold.co/900x600",
    body: "This is the content of post 1.",
  },
  {
    id: "2",
    title: "Learning frontend",
    image: "https://placehold.co/900x600",
    body: "This is the content of post 2.",
  },
  {
    id: "3",
    title: "Design tips",
    image: "https://placehold.co/900x600",
    body: "This is the content of post 3.",
  },
];

function renderPosts(posts) {
  const feed = document.getElementById("post-feed");
  if (!feed) return;

  feed.innerHTML = "";

  posts.forEach((post) => {
    const a = document.createElement("a");
    a.className = "post-card";
    a.href = `./specific.html?id=${post.id}`;

    const img = document.createElement("img");
    img.src = post.image || "https://placehold.co/900x600";
    img.alt = post.title || "Blog post image";

    const h4 = document.createElement("h4");
    h4.textContent = post.title || "Untitled";

    a.append(img, h4);
    feed.appendChild(a);
  });
}


const all = [...getLocalPosts(), ...dummyPosts];
renderPosts(all);