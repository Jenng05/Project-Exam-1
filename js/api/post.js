// Hent id fra URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("Post ID from URL:", id);

// FAKE POSTS (midlertidig)
const dummyPosts = [
  {
    id: "1",
    title: "My first blog post",
    author: "Us Bloggers",
    date: "2026-02-01",
    image: "https://placehold.co/900x600",
    content: "This is the content of post 1."
  },
  {
    id: "2",
    title: "Learning frontend",
    author: "Us Bloggers",
    date: "2026-02-02",
    image: "https://placehold.co/900x600",
    content: "This is the content of post 2."
  },
  {
    id: "3",
    title: "Design tips",
    author: "Us Bloggers",
    date: "2026-02-03",
    image: "https://placehold.co/900x600",
    content: "This is the content of post 3."
  }
];

// Finn riktig post
const post = dummyPosts.find(p => p.id === id);

// Hvis post finnes → render
if (post) {
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-meta").textContent =
    `${post.author} · ${post.date}`;
  document.getElementById("post-image").src = post.image;
  document.getElementById("post-content").textContent = post.content;
}
