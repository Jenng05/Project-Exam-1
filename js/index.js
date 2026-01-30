const posts = [
  {
    title: "Why I started blogging",
    image: "https://via.placeholder.com/400x250",
  },
  {
    title: "My journey into frontend",
    image: "https://via.placeholder.com/400x250",
  },
  {
    title: "Design tips for beginners",
    image: "https://via.placeholder.com/400x250",
  },
];

const postFeed = document.getElementById("post-feed");

posts.forEach(post => {
  const card = document.createElement("div");
  card.classList.add("blog-card");

  card.innerHTML = `
    <img src="${post.image}" alt="${post.title}">
    <h4>${post.title}</h4>
  `;

  postFeed.appendChild(card);
});
