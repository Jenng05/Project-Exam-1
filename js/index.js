const STORAGE_KEY = "usbloggers_posts";

function getStoredPosts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function renderPostGrid(posts) {
  const postFeed = document.getElementById("post-feed");
  if (!postFeed) return;

  postFeed.innerHTML = "";

  if (posts.length === 0) {
    postFeed.innerHTML = "<p>No posts yet. Be the first to create one!</p>";
    return;
  }

  posts.forEach(post => {
    const card = document.createElement("a");
    card.className = "post-card";
    card.href = `./specific.html?id=${post.id}`;

    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <h4>${post.title}</h4>
    `;

    postFeed.appendChild(card);
  });
}

const posts = getStoredPosts();
renderPostGrid(posts);

