import { getAuth } from "./auth.js";
import { POSTS_URL } from "./config.js";

const isSpecificPage = document.getElementById("post-title");
const isCreatePage = document.getElementById("create-post-form");

// ------ Specific page -------

if (isSpecificPage) {
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("Post ID from URL:", id);

const stored = localStorage.getItem("usbloggers_posts");
const localPosts = stored ? JSON.parse(stored) : [];

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

const allPosts = [...localPosts, ...dummyPosts];
const post = allPosts.find((p) => String(p.id) === String(id));

if (!post) {
  document.getElementById("post-title").textContent = "Post not found";
  } else {
    document.getElementById("post-title").textContent = post.title || "Untitled";
    document.getElementById("post-meta").textContent =
      `${post.author || "Us Bloggers"} · ${post.date || ""}`.trim();
    document.getElementById("post-image").src = post.image || "https://placehold.co/900x600";
    document.getElementById("post-image").alt = post.title || "Blog post image";
    document.getElementById("post-content").textContent = post.body || post.content || "";
  }

const editLink = document.getElementById("edit-link");
if (editLink && id) {
  editLink.href = `../../edit.html?id=${id}`;
}
}


// ---------------- Create page ----------------
if (isCreatePage) {
  console.log("Create page loaded");

  isCreatePage.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title")?.value.trim();
    const body = document.getElementById("body")?.value.trim();
    const image = document.getElementById("image")?.value.trim();

    if (!title || !body) {
      alert("Title and body are required.");
      return;
    }

    const stored = localStorage.getItem("usbloggers_posts");
    const posts = stored ? JSON.parse(stored) : [];

    const newPost = {
      id: crypto.randomUUID(),
      title,
      body,
      image: image || "https://placehold.co/900x600",
      author: "You",
      date: new Date().toISOString().slice(0, 10),
    };

    const auth = getAuth();

    const response = await fetch(POSTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify({ title, body, media: { url: image, alt: title } }),
    });

    const json = await response.json();

    if (!response.ok) {
      alert(json.errors?.[0]?.message || "Could not create post.");
      return;
    }

    window.location.href = `../../post/index.html?id=${json.data.id}`;
      });
}

// ------------Edit Page ----------------

const editForm = document.getElementById("edit-post-form");

if (editForm) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("No post ID found.");
    window.location.href = "../../index.html";
  }

  // Hent eksisterende post og fyll inn skjemaet
  async function loadPost() {
    const auth = getAuth();
    const res = await fetch(`${POSTS_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`,
      },
    });
    const json = await res.json();
    const post = json.data;

    document.getElementById("title").value = post.title || "";
    document.getElementById("body").value = post.body || "";
    document.getElementById("image").value = post.media?.url || "";
  }

  loadPost();

  // Oppdater post
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    const image = document.getElementById("image").value.trim();

    const response = await fetch(`${POSTS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify({ title, body, media: { url: image, alt: title } }),
    });

    const json = await response.json();

    if (!response.ok) {
      alert(json.errors?.[0]?.message || "Could not update post.");
      return;
      
    }

    window.location.href = `../../post/index.html?id=${id}`;
  });

  // Slett post
  const deleteBtn = document.getElementById("delete-post");
  deleteBtn?.addEventListener("click", async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const auth = getAuth();
    const response = await fetch(`${POSTS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`,
      },
    });

    if (response.ok) {
      alert("Post deleted!");
      window.location.href = "../../index.html";
    } else {
      alert("Could not delete post.");
    }
  });

  

}


  // -------------Delete Post----------------

  const deleteBtn = document.getElementById("delete-post");

  deleteBtn?.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) return;
    const updatePosts = posts.filter((p) => String(p.id) !== String(id));

    localStorage.setItem("usbloggers_posts", JSON.stringify(updatePosts));

    alert("Post deleted.");
    window.location.href = "../../index.html";
  });

