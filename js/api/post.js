// Hent id fra URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("Post ID from URL:", id);

const stored = localStorage.getItem("usbloggers_posts");
const posts = stored ? JSON.parse(stored) : [];

const post = posts.find(p => p.id === id);

if (!post) {
  console.log("No post found for ID:", id);
  const titleEl = document.getElementById("post-title");
  if (titleEl) titleEl.textContent = "Post not found";
} else {
  console.log("Loaded post", post);

  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-meta").textContent = 
  `${post.author} · ${new Date(post.date).toLocaleDateString()}`;

  document.getElementById("post-image").src = post.image || "https://placehold.co/900x600";

}

const createForm = document.getElementById("create-post-form");

createForm?.addEventListener("submit", (e) => {
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
    id:crypto.randomUUID(),
    title,
    body,
    image: image || "https://placehold.co/900x600",
    author: "You",
    date: new Date().toISOString()
  };

  posts.unshift(newPost);

  localStorage.setItem("usbloggers_posts", JSON.stringify(posts));

  console.log("New post created:", newPost);

 window.location.href = `./specific.html?id=${newPost.id}`;
});