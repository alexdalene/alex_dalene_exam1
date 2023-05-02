async function getPosts() {
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal"
  );
  const result = await response.json();
  result.forEach((result) => {
    console.log(result);
    makePost(result);
  });
}

getPosts();

function makePost(post) {
  const postContainer = document.querySelector(".carousel-container");
  postContainer.innerHTML += `
  <li class="carousel">
    <a href="/public/pages/animal.html?id=${post.id}">
      <article class="post-wrapper">
        <img
          src="${post.acf.url}"
          alt="${post.acf.alt}"
          class="post-img"
        />
        <section class="post-container">
          <h3 class="post-title">${post.acf.header}</h3>
          <p class="post-paragraph">
            ${post.acf.paragraphTop}
          </p>
        </section>
        <footer class="post-footer">
          <p>${post.acf.author}</p>
          <p>${post.acf.date}</p>
        </footer>
      </article>
    </a>
  </li>
  `;
}
