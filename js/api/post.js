// post.js (specific page) — dummy now, easy to swap to API later

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("Post ID from URL:", id);

const titleEl = document.getElementById("post-title");
const metaEl = document.getElementById("post-meta");
const imgEl = document.getElementById("post-image");
const contentEl = document.getElementById("post-content");

if (titleEl) {
  titleEl.textContent = id ? `Post #${id}` : "No post id provided 😭";
}
if (metaEl) {
  metaEl.textContent = "Author name • Date";
}
if (imgEl) {
  imgEl.src = "https://placehold.co/900x600";
  imgEl.alt = "Blog post image";
}
if (contentEl) {
  contentEl.innerHTML = `
    <p>This is dummy content for post <strong>#${id ?? "?"}</strong>.</p>
    <p>Later you’ll fetch the real content from the API using the ID.</p>
  `;
}

// Share button
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
