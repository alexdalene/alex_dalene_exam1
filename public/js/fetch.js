async function getPosts() {
  document.querySelector(".loader").style.display = "block";
  try {
    const response = await fetch(
      "https://wordpress-722208-3560103.cloudwaysapps.com/wp-json/wp/v2/animal"
    );

    if (response.ok) {
      const result = await response.json();
      makePost(result);
      document.querySelector(".loader").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

getPosts();

function makePost(post) {
  const postContainer = document.querySelector(".carousel-container");

  const sortedPosts = post.sort((a, b) => {
    return new Date(b.acf.date) - new Date(a.acf.date);
  });

  for (let i = 0; i <= 7; i++) {
    postContainer.innerHTML += `
    <li class="carousel">
      <a href="/public/pages/animal.html?id=${sortedPosts[i].id}">
        <article class="post-wrapper">
          <img
            src="${sortedPosts[i].acf.url}"
            alt="${sortedPosts[i].acf.alt}"
            class="post-img"
          />
          <section class="post-container">
            <h3 class="post-title">${sortedPosts[i].acf.header}</h3>
            <p class="post-status">${sortedPosts[i].acf.status}</p>
            <p class="post-paragraph">
              ${sortedPosts[i].acf.paragraph1}
            </p>
          </section>
          <footer class="post-footer">
            <p>${sortedPosts[i].acf.author}</p>
            <p>${sortedPosts[i].acf.date}</p>
          </footer>
        </article>
      </a>
    </li>
    `;
  }
}
