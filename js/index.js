const USERNAME = "jenng05";
const API_URL = `https://v2.api.noroff.dev/blog/posts/${USERNAME}`;

function renderPostGrid(posts) {
  const postFeed = document.getElementById("post-feed");
  if (!postFeed) return;

  postFeed.innerHTML = ""; // tømmer

  posts.slice(0, 12).forEach((post) => {
    const title = post.title || "Untitled post";
    const image = post.image || "https://placehold.co/600x400";

    const card = document.createElement("article");
    card.className = "blog-card";
    card.innerHTML = `
      <img src="${image}" alt="${title}">
      <h4>${title}</h4>
    `;

    postFeed.appendChild(card);
  });
}

const dummyPosts = Array.from({ length: 12 }, (_, i) => ({
  title: `Blog Post ${i + 1}`,
  image: "https://placehold.co/600x400",
}));

renderPostGrid(dummyPosts);
