async function searchIndex() {
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal?_embed&per_page=100"
  );
  const result = await response.json();
  result.forEach((result) => {
    searchPost(result);
  });
}

searchIndex();

const searchInput = document.querySelector("#search-input");
const searchContainer = document.querySelector(".search-results");
let searchResults = []; // initialize an empty array to store the search results

function searchPost(post) {
  searchInput.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const header = post.acf.header.toLowerCase();
    if (header.includes(searchString)) {
      searchContainer.classList.add("show");
      // check if the post is already in the searchResults array
      const postExists = searchResults.find((item) => item.id === post.id);
      if (!postExists) {
        // add the post to the searchResults array if it doesn't already exist
        searchResults.push(post);
        // clear the content of the search container before adding the new search results
        searchContainer.innerHTML = "";
        searchResults.forEach((result) => {
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
      } else if (postExists) {
        searchContainer.innerHTML = "";
        searchContainer.innerHTML += `
        <li class="search-result">
          <a href="/public/pages/animal.html?id=${postExists.id}">
            <article class="search-wrapper">
                <img
                src="${postExists.acf.url}"
                alt="${postExists.acf.alt}"
                class="search-img"
                />
                <section class="search-info">
                <p class="search-title">${postExists.acf.header}</p>
                <p class="search-paragraph">${postExists.acf.paragraph1}</p>
                </section>
                <button class="search-button">See</button>
            </article>
          </a>
        </li>
        `;
      }
    }

    if (searchString === "") {
      searchContainer.innerHTML = "";
      searchContainer.classList.remove("show");
      searchResults = []; // clear the searchResults array
    }
  });
}

// close the search results container when scrolling
window.addEventListener("scroll", () => {
  searchContainer.classList.remove("show");
  searchResults = []; // clear the searchResults array
});

// close the search results container when clicking outside of it
window.addEventListener("click", (e) => {
  if (!searchContainer.contains(e.target) && e.target !== searchInput) {
    searchContainer.classList.remove("show");
    searchResults = []; // clear the searchResults array
  }
});
