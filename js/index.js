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

function renderPosts(posts) {
  const feed = document.getElementById("post-feed");
  if (!feed) return;

  feed.innerHTML = "";

  posts.forEach((post) => {
    const a = document.createElement("a");
    a.className = "post-card";
    a.href = `../../post/index.html?id=${post.id}`;

    const img = document.createElement("img");
    img.src = post.media?.url || "https://placehold.co/900x600";
    img.alt = post.title || "Blog post image";

    const h4 = document.createElement("h4");
    h4.textContent = post.title || "Untitled";

    a.append(img, h4);
    feed.appendChild(a);
  });
}


const posts = await getPosts();
renderPosts(posts);
initCarousel(posts);


const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("is-open");
});

function initCarousel(posts) {
  const slides = posts.slice(0, 3);
  let current = 0;

  function showSlide(index) {
  const post = slides[index];
  
  document.getElementById("carousel-image").src = post.media?.url || "https://placehold.co/600x400";
  document.getElementById("carousel-title").textContent = post.title || "Untitled";
  document.getElementById("carousel-excerpt").textContent = post.body?.slice(0, 100) + "..." || "";
  document.getElementById("carousel-readmore").href = `./post/index.html?id=${post.id}`;
}

showSlide(current);

document.getElementById("carousel-next").addEventListener("click", () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

document.getElementById("carousel-prev").addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});
}