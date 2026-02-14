const API_BASE = "https://api.noroff.dev/api/v1/blog/posts/USERNAME";

export async function getPosts() {
  const response = await fetch(API_BASE);
  return response.json();
}
document.getElementById("create-post-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Create post (API kommer senere)");
});

document.getElementById("edit-post-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Update post (API kommer senere)");
});

document.getElementById("delete-post")?.addEventListener("click", () => {
  const ok = confirm("Delete this post?");
  if (ok) alert("Delete post (API kommer senere)");
});
