const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinks = document.querySelector(".navbar-links");

navbarMenu.addEventListener("click", () => {
  navbarLinks.classList.toggle("shown");
  navbarMenu.classList.toggle("rotate");
});
