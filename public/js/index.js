const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinks = document.querySelector(".navbar-links");

let isOpen = false;

navbarMenu.addEventListener("click", () => {
  if (isOpen) {
    navbarLinks.removeAttribute("isOpen");
    isOpen = false;
  } else {
    navbarLinks.setAttribute("isOpen", true);
    isOpen = true;
  }

  navbarMenu.classList.toggle("rotate");
});
