async function getPosts() {
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal?_embed&per_page=100"
  );
  const result = await response.json();
  // result.forEach((result) => {
  //   console.log(result);
  // });

  makePost(result);
  console.log(result);
}

getPosts();

const postContainer = document.querySelector(".posts-container");

// make post function
function makePost(post) {
  // sort posts by date
  post.sort((a, b) => {
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

  let index = 0;
  const postsToShow = 10;

  // count posts
  for (let i = 0; i < post.length; i++) {
    index++;
  }

  console.log(index);

  // display posts if index is less than or equal to 10
  for (let i = 0; i < index; i++) {
    // check if post[i] is true, if not then break the loop
    if (post[i]) {
      console.log(post[i]);
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

  // hide posts if index is more than 10
  for (let i = postsToShow; i < index; i++) {
    document.querySelector(
      ".carousel:nth-child(" + (i + 1) + ")"
    ).style.display = "none";
  }
}

// load more button after posts
const loadMoreBtn = document.createElement("button");
loadMoreBtn.classList.add("load-more-btn");
loadMoreBtn.textContent = "Load more";
postContainer.after(loadMoreBtn);

// load more button function
loadMoreBtn.addEventListener("click", () => {
  const posts = document.querySelectorAll(".carousel");
  const postsArray = Array.from(posts);

  let index = 0;
  const postsToShow = 10;

  // count posts
  for (let i = 0; i < postsArray.length; i++) {
    index++;
  }

  // display posts if index is more than 10
  for (let i = postsToShow; i < index; i++) {
    document.querySelector(
      ".carousel:nth-child(" + (i + 1) + ")"
    ).style.display = "block";
  }
});

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
