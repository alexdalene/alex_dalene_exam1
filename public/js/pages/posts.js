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

// make post function
function makePost(post) {
  const postContainer = document.querySelector(".posts-container");
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
              ${post.acf.paragraph1}
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

    if (aHeader < bHeader) {
      return -1;
    } else if (aHeader > bHeader) {
      return 1;
    } else {
      return 0;
    }
  });

  if (sortBtn.textContent === "Sort by: A-Z") {
    sortBtn.textContent = "Sort by: Z-A";
    postsArray.reverse();
  } else {
    sortBtn.textContent = "Sort by: A-Z";
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
