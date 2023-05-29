const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function getAnimal() {
  document.querySelector(".loader1").style.display = "block";

  try {
    const response = await fetch(
      "https://wordpress-722208-3560103.cloudwaysapps.com/wp-json/wp/v2/animal/" +
        postId
    );

    if (response.ok) {
      const result = await response.json();
      makeAnimal(result);
      backBtn();
      getComments();
      document.querySelector(".loader1").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

getAnimal();

function makeAnimal(animal) {
  // change title based on animal
  document.title = "Wild at Risk | " + animal.acf.header;

  // change meta desc based on animal
  const metaDesc = document.querySelector('meta[name="description"]');
  metaDesc.setAttribute("content", animal.acf.paragraph1);

  const animalContainer = document.querySelector(".animal-container");

  animalContainer.innerHTML += `
    <article class="animal-wrapper">
        <a href="javascript:history.back()" class="back-button"> <img src="/public/svg/back.svg" alt=""/>Back</a>
        <h1>${animal.acf.header}</h1>
        <p class="animal-status">${animal.acf.status}</p>
        <p class="animal-photographer">Images taken by: ${animal.acf.photographer}</p>
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
            <p class="animal-callout"><span class="fun-fact">FUN FACT</span>${animal.acf.callout}</p>
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

  // remove photographer if empty
  if (animal.acf.photographer == "") {
    document.querySelector(".animal-photographer").remove();
  }

  getImages();
}

// dynamic back button
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

// click on image to open modal
function getImages() {
  const images = document.querySelectorAll(".animal-img");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      // create overlay and children
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");

      const overlayBlur = document.createElement("div");
      overlayBlur.classList.add("overlay-blur");

      const imagesContainer = document.createElement("div");
      imagesContainer.classList.add("images-container");

      const overlayImage = document.createElement("img");
      overlayImage.classList.add("overlay-image");
      overlayImage.src = image.src;

      const overlayClose = document.createElement("button");
      overlayClose.classList.add("overlay-close");
      overlayClose.innerHTML = `<img src="/public/svg/close.svg" alt=""/>`;

      const overlayButtonsContainer = document.createElement("div");
      overlayButtonsContainer.classList.add("overlay-buttons-container");

      const overlayNext = document.createElement("button");
      overlayNext.classList.add("overlay-next");
      overlayNext.innerHTML = `<img src="/public/svg/chevron.svg" alt=""/>`;

      const overlayPrev = document.createElement("button");
      overlayPrev.classList.add("overlay-prev");
      overlayPrev.innerHTML = `<img src="/public/svg/chevron.svg" alt=""/>`;

      const overlayAmount = document.createElement("p");
      overlayAmount.classList.add("overlay-amount");
      overlayAmount.innerHTML = `1 / ${images.length}`;

      // append elements to overlay
      overlay.appendChild(overlayBlur);
      overlay.appendChild(overlayClose);
      overlay.appendChild(overlayImage);
      overlay.appendChild(overlayButtonsContainer);
      overlayButtonsContainer.appendChild(overlayPrev);
      overlayButtonsContainer.appendChild(overlayAmount);
      overlayButtonsContainer.appendChild(overlayNext);
      document.body.appendChild(overlay);

      // close overlay
      overlayClose.addEventListener("click", () => {
        overlay.remove();
      });

      // index used for carousel
      let index = 0;

      // replace src of image with next in array
      overlayNext.addEventListener("click", () => {
        if (index >= images.length - 1) {
          index = 0;
        } else {
          index++;
        }

        overlayAmount.innerHTML = `${index + 1} / ${images.length}`;
        overlayImage.src = images[index].src;
      });

      // replace src of image with previous in array
      overlayPrev.addEventListener("click", () => {
        if (index === 0) {
          index = images.length - 1;
        } else {
          index--;
        }

        overlayAmount.innerHTML = `${index + 1} / ${images.length}`;
        overlayImage.src = images[index].src;
      });

      // set background iomage to same as image clicked
      overlay.style.backgroundImage = `url(${image.src})`;
    });
  });
}
