const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinks = document.querySelector(".navbar-links");

navbarMenu.addEventListener("click", () => {
  console.log("clicked");
  navbarLinks.classList.toggle("shown");
});
