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
        <h1>${animal.acf.header}</h1>
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
            <h3>Habitat</h3>
            ${animal.acf.habitat}
            </div>
            <div class="animal-category">
            <h3>Diet</h3>
            ${animal.acf.diet}
            </div>
            <div class="animal-category">
            <h3>Population</h3>
            ${animal.acf.population}
            </div>
        </aside>
        <section class="animal-container">
            <h2 class="animal-title">${animal.acf.title}</h2>
            <p class="animal-paragraph">
                ${animal.acf.paragraphTop}
            </p>
            <p class="animal-callout">${animal.acf.callout}</p>
            <p class="animal-paragraph">
            ${animal.acf.paragraphBot}
        </p>
        </section>
        <footer class="animal-footer">
            <p>${animal.acf.author}</p>
            <p>${animal.acf.date}</p>
        </footer>
    </article>
    `;
}
