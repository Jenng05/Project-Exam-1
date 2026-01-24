const API_BASE = "https://api.noroff.dev/api/v1/blog/posts/USERNAME";

export async function getPosts() {
  const response = await fetch(API_BASE);
  return response.json();
}