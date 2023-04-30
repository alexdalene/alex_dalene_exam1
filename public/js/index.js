const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinks = document.querySelector(".navbar-links");

let isOpen = false;

navbarMenu.addEventListener("click", () => {
  if (isOpen) {
    navbarLinks.setAttribute("isOpen", false);
    navbarMenu.style.transform = "rotate(0deg)";
    isOpen = false;
  } else {
    navbarLinks.setAttribute("isOpen", true);
    navbarMenu.style.transform = "rotate(-90deg)";
    isOpen = true;
  }
});

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

  // is progress more than 20% -> show the left button
  if (val > 20) {
    scrollButtonLeft.style.opacity = 1;
  } else {
    scrollButtonLeft.style.opacity = 0;
  }

  // is progress more than 80% -> hide the right button
  if (val > 80) {
    scrollButtonRight.style.opacity = 0;
  } else {
    scrollButtonRight.style.opacity = 1;
  }
}

carouselContainer.addEventListener("scroll", scrollProgressBar);
