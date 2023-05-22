async function searchIndex() {
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal?_embed&per_page=100"
  );
  const result = await response.json();
  searchPost(result);
}

searchIndex();

const searchInput = document.querySelector("#search-input");
const searchContainer = document.querySelector(".search-results");

function searchPost(post) {
  searchInput.addEventListener("keyup", (e) => {
    searchContainer.classList.add("show");
    searchContainer.innerHTML = "";
    const searchString = e.target.value.toLowerCase();

    const filteredPosts = post.filter((post) => {
      const header = post.acf.header.toLowerCase();
      return header.includes(searchString);
    });

    filteredPosts.forEach((result) => {
      console.log(result);
      searchContainer.innerHTML += `
              <li class="search-result">
                  <a href="/public/pages/animal.html?id=${result.id}">
                  <article class="search-wrapper">
                      <img
                      src="${result.acf.url}"
                      alt="${result.acf.alt}"
                      class="search-img"
                      />
                      <section class="search-info">
                      <p class="search-title">${result.acf.header}</p>
                      <p class="search-paragraph">${result.acf.paragraph1}</p>
                      </section>
                      <button class="search-button">See</button>
                  </article>
                  </a>
              </li>
              `;
    });

    if (searchString === "") {
      searchContainer.innerHTML = "";
      searchContainer.classList.remove("show");
    }
  });
}

// close the search results container when scrolling
window.addEventListener("scroll", () => {
  searchContainer.classList.remove("show");
});

// close the search results container when clicking outside of it
window.addEventListener("click", (e) => {
  if (!searchContainer.contains(e.target) && e.target !== searchInput) {
    searchContainer.classList.remove("show");
  }
});
