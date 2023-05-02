async function searchIndex() {
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal"
  );
  const result = await response.json();
  result.forEach((result) => {
    console.log(result);
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
                <article class="post-wrapper">
                    <img
                    src="${result.acf.url}"
                    alt="${result.acf.alt}"
                    class="post-img"
                    />
                    <section class="post-container">
                    <h3 class="post-title">${result.acf.header}</h3>
                    <p class="post-paragraph">
                        ${result.acf.paragraph1}
                    </p>
                    </section>
                    <footer class="post-footer">
                    <p>${result.acf.author}</p>
                    <p>${result.acf.date}</p>
                    </footer>
                </article>
                </a>
            </li>
            `;
        });
      } else if (postExists) {
        console.log(
          `The post ${postExists.acf.header} already exists in the array`
        );
        searchContainer.innerHTML = "";
        searchContainer.innerHTML += `
        <li class="search-result">
            <a href="/public/pages/animal.html?id=${postExists.id}">
            <article class="post-wrapper">
                <img
                src="${postExists.acf.url}"
                alt="${postExists.acf.alt}"
                class="post-img"
                />
                <section class="post-container">
                <h3 class="post-title">${postExists.acf.header}</h3>
                <p class="post-paragraph">
                    ${postExists.acf.paragraph1}
                </p>
                </section>
                <footer class="post-footer">
                <p>${postExists.acf.author}</p>
                <p>${postExists.acf.date}</p>
                </footer>
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
