const POSTS_KEY = "usbloggers_posts";

export function getStoredPosts() {
  const raw = localStorage.getItem(POSTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveStoredPosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function addPost(post) {
  const posts = getStoredPosts();
  posts.unshift(post);
  saveStoredPosts(posts);
}