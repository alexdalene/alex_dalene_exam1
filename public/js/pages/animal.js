const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function getAnimal() {
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal/" + postId
  );
  const result = await response.json();
  makeAnimal(result);
  console.log(result);
  backBtn();
}

getAnimal();

function makeAnimal(animal) {
  // change title based on animal
  document.title = "Wild at Risk | " + animal.acf.header;

  // change meta desc based on animal
  const metaDesc = document.querySelector('meta[name="description"]');
  metaDesc.setAttribute("content", animal.acf.paragraphTop);

  const animalContainer = document.querySelector(".animal-container");

  animalContainer.innerHTML += `
    <article class="animal-wrapper">
        <a href="javascript:history.back()" class="back-button"> <img src="/public/svg/back.svg" alt=""/>Back</a>
        <h1>${animal.acf.header}</h1>
        <section class="animal-outer-container">
          <div class="animal-img-container">
              <img
                  src="${animal.acf.url}"
                  alt="${animal.acf.alt}"
                  class="animal-img"
              />
              <img
                  src="${animal.acf.image1}"
                  alt="${animal.acf.alt1}"
                  class="animal-img"
              />
              <img
                  src="${animal.acf.image2}"
                  alt="${animal.acf.alt2}"
                  class="animal-img"
              />
              <img
                  src="${animal.acf.image3}"
                  alt="${animal.acf.alt3}"
                  class="animal-img"
              />
          </div>
          <aside class="animal-categories">
              <div class="animal-category">
              <img src="/public/svg/habitat.svg" alt="" class="category-icon"/>
              <h3>Habitat</h3>
              <p>${animal.acf.habitat}</p>
              </div>
              <div class="animal-category">
              <img src="/public/svg/diet.svg" alt="" class="category-icon"/>
              <h3>Diet</h3>
              <p>${animal.acf.diet}</p>
              </div>
              <div class="animal-category">
              <img src="/public/svg/population.svg" alt="" class="category-icon"/>
              <h3>Population</h3>
              <p>${animal.acf.population}</p>
              </div>
          </aside>
        </section>
        <section class="animal-info">
            <h2 class="animal-title">${animal.acf.title}</h2>
            <p class="animal-paragraph">
                ${animal.acf.paragraph1}
            </p>
            <p class="animal-paragraph">
                ${animal.acf.paragraph2}
            </p>
            <p class="animal-callout">${animal.acf.callout}</p>
            <p class="animal-paragraph">
            ${animal.acf.paragraph3}
            </p>
            <p class="animal-paragraph">
            ${animal.acf.paragraph4}
            </p>
        </section>
        <footer class="animal-footer">
            <p>${animal.acf.author}</p>
            <p>${animal.acf.date}</p>
        </footer>
    </article>
    `;
}

function backBtn() {
  const backBtn = document.querySelector(".back-button");
  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 2) {
      backBtn.classList.add("back-button-visible");
    } else {
      backBtn.classList.remove("back-button-visible");
    }
  });
}
