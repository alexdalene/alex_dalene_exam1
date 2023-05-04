// the container that is scrollable
const carouselContainer = document.querySelector(".carousel-container");

// scroll buttons
const scrollButtonLeft = document.querySelector("#scroll-button-left");
const scrollButtonRight = document.querySelector("#scroll-button-right");

function scrollProgressBar() {
  // the bar that is going to fill up as the container scrolls
  const progressFill = document.querySelector(".progress-fill");

  let scrollDistance = carouselContainer.scrollLeft;
  let progressPercentage =
    (scrollDistance /
      (carouselContainer.scrollWidth - document.documentElement.clientWidth)) *
    100;

  let val = Math.floor(progressPercentage);
  progressFill.style.width = val + "%";

  if (val < 0) {
    progressFill.style.width = "0%";
  }

  // is progress more than 10% -> show the left button
  if (val > 10) {
    scrollButtonLeft.style.opacity = 1;
  } else {
    scrollButtonLeft.style.opacity = 0;
  }

  // is progress more than 90% -> hide the right button
  if (val > 90) {
    scrollButtonRight.style.opacity = 0;
  } else {
    scrollButtonRight.style.opacity = 1;
  }
}

carouselContainer.addEventListener("scroll", scrollProgressBar);

// scroll left
function scrollLeft() {
  carouselContainer.scrollLeft -= 308;
}

scrollButtonLeft.addEventListener("click", scrollLeft);

// scroll right
function scrollRight() {
  carouselContainer.scrollLeft += 308;
}

scrollButtonRight.addEventListener("click", scrollRight);
