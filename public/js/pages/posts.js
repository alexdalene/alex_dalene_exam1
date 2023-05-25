const postContainer = document.querySelector(".posts-container");

async function getPosts() {
  document.querySelector(".loader").style.display = "block";
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal?_embed&per_page=100"
  );
  const result = await response.json();
  document.querySelector(".loader").style.display = "none";

  makePost(result);
}

getPosts();

// make post function
function makePost(post) {
  // sort posts by date
  const sortedPosts = post.sort((a, b) => {
    const aHeader = a.acf.header;
    const bHeader = b.acf.header;

    if (aHeader < bHeader) {
      return -1;
    } else if (aHeader > bHeader) {
      return 1;
    } else {
      return 0;
    }
  });

  post = sortedPosts;

  for (let i = 0; i <= 9; i++) {
    postContainer.innerHTML += `
    <li class="carousel">
            <a href="/public/pages/animal.html?id=${post[i].id}">
              <article class="post-wrapper">
                <img
                  src="${post[i].acf.url}"
                  alt="${post[i].acf.alt}"
                  class="post-img"
                />
                  <section class="post-container">
                    <h3 class="post-title">${post[i].acf.header}</h3>
                    <p class="post-status">${post[i].acf.status}</p>
                    <p class="post-paragraph">
                      ${post[i].acf.paragraph1}
                    </p>
                  </section>
                  <footer class="post-footer">
                    <p>${post[i].acf.author}</p>
                    <p>${post[i].acf.date}</p>
                  </footer>
              </article>
            </a>
          </li>
          `;
  }

  loadMore(post);
}

// load more button after posts
const loadMoreBtn = document.createElement("button");
loadMoreBtn.classList.add("load-more-btn");
loadMoreBtn.textContent = "Load more";
postContainer.after(loadMoreBtn);

// load more button function
function loadMore(post) {
  loadMoreBtn.addEventListener("click", () => {
    for (let i = 10; i <= post.length; i++) {
      // check if post[i] is true, if not then break the loop to prevent error
      if (post[i]) {
        postContainer.innerHTML += `
        <li class="carousel">
            <a href="/public/pages/animal.html?id=${post[i].id}">
              <article class="post-wrapper">
                <img
                  src="${post[i].acf.url}"
                  alt="${post[i].acf.alt}"
                  class="post-img"
                />
                  <section class="post-container">
                    <h3 class="post-title">${post[i].acf.header}</h3>
                    <p class="post-status">${post[i].acf.status}</p>
                    <p class="post-paragraph">
                      ${post[i].acf.paragraph1}
                    </p>
                  </section>
                  <footer class="post-footer">
                    <p>${post[i].acf.author}</p>
                    <p>${post[i].acf.date}</p>
                  </footer>
              </article>
            </a>
          </li>
          `;
      } else {
        break;
      }
    }

    // update button
    loadMoreBtn.textContent = "No more animals :(";
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "default";
  });
}

// disable default form behavior
const form = document.querySelector(".options");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// sort button
const sortBtn = document.querySelector(".options-button");
sortBtn.addEventListener("click", () => {
  sortPosts();
});

// sort function
function sortPosts() {
  const posts = document.querySelectorAll(".carousel");
  const postsArray = Array.from(posts);

  postsArray.sort((a, b) => {
    const aHeader = a.querySelector(".post-title").textContent;
    const bHeader = b.querySelector(".post-title").textContent;

    if (aHeader > bHeader) {
      return -1;
    } else if (aHeader < bHeader) {
      return 1;
    } else {
      return 0;
    }
  });

  // update sort button
  if (sortBtn.textContent === "Sort by: Z-A") {
    sortBtn.textContent = "Sort by: A-Z";
    postsArray.reverse();
  } else {
    sortBtn.textContent = "Sort by: Z-A";
  }

  const postsContainer = document.querySelector(".posts-container");
  postsContainer.innerHTML = "";
  postsArray.forEach((post) => {
    postsContainer.appendChild(post);
  });
}

// search
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keyup", searchPosts);

// search function
function searchPosts() {
  const posts = document.querySelectorAll(".carousel");
  const postsArray = Array.from(posts);

  postsArray.forEach((post) => {
    const postHeader = post.querySelector(".post-title").textContent;
    if (postHeader.toLowerCase().includes(searchInput.value.toLowerCase())) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

// hide load more button if search input is not empty
searchInput.addEventListener("keyup", () => {
  if (searchInput.value !== "") {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
});
