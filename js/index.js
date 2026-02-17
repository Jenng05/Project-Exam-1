// dummy now,swap to API later

const dummyPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  excerpt: "Short previewed text",
  image: "https://placehold.co/900x600",
}));

function renderPostGrid(posts) {
  const postFeed = document.getElementById("post-feed");
  if (!postFeed) return;

  postFeed.innerHTML = "";

  posts.slice(0, 12).forEach((post) => {
    const card = document.createElement("a");
    card.className = "blog-card";
    card.href = `./specific.html?id=${post.id}`;
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <h4>${post.title}</h4>
    `;
    postFeed.appendChild(card);
  });
}

function initCarousel(posts) {
  const track = document.getElementById("carousel-track");
  const dotsWrap = document.getElementById("carousel-dots");
  const readMore = document.getElementById("carousel-readmore");

  const prevBtn = document.querySelector(".carousel-btn--prev");
  const nextBtn = document.querySelector(".carousel-btn--next");

  if (!track || !dotsWrap || !readMore || !prevBtn || !nextBtn) {
    console.warn("Carousel elements missing. Check your HTML ids/classes.");
    return;
  }

  const slides = posts.slice(0, 3);
  let currentIndex = 0;

  // dots basert på antall slides
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = i;
      renderSlide();
    });
    dotsWrap.appendChild(dot);
  });

  function renderSlide() {
    const post = slides[currentIndex];

    // Oppdater slide-innholdet 
    const img = track.querySelector("img");
    const h3 = track.querySelector(".carousel-panel h3");
    const p = track.querySelector(".carousel-panel p");

    if (img) {
      img.src = post.image;
      img.alt = post.title;
    }
    if (h3) h3.textContent = post.title;
    if (p) p.textContent = post.excerpt;

    // Oppdater read more link
    readMore.href = `./specific.html?id=${post.id}`;

    // Oppdater dots active state
    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentIndex);
    });

    console.log("Carousel current post:", post); // debug
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    renderSlide();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    renderSlide();
  });

  renderSlide(); // start
}

// INIT
renderPostGrid(dummyPosts);
initCarousel(dummyPosts);
