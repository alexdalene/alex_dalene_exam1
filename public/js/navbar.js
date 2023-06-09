const navbar = document.createElement("header");
navbar.classList.add("navbar-container");
document.body.prepend(navbar);

window.addEventListener("load", () => {
  makeNavbar();
});

function makeNavbar() {
  if (document.documentElement.clientWidth < 905) {
    navbar.innerHTML += `
          <nav class="navbar">
            <a href="/index.html" id="navbar-logo">
              <img src="/public/svg/logo-icon.svg" alt="a simplistic logo with a panda inside a circle" />
            </a>
              <img src="/public/svg/menu.svg" alt="burger-menu" id="navbar-menu" />
              <ul class="navbar-links-mobile" isopen="false">
                <li><a href="/index.html" class="link">Home</a></li>
                <li><a href="/public/pages/posts.html" class="link">Posts</a></li>
                <li><a href="/public/pages/contact.html" class="link">Contact</a></li>
                <li><a href="/public/pages/about.html" class="link">About</a></li>
              </ul>
            </nav>
          `;
    mobileNavbar();
  } else {
    navbar.innerHTML += `
        <nav class="navbar">
          <a href="/index.html">
            <img src="/public/svg/logo-icon.svg" alt="a simplistic logo with a panda inside a circle" id="navbar-logo" />
          </a>
            <ul class="navbar-links-desktop">
              <li><a href="/public/pages/contact.html">Contact</a></li>
              <li><a href="/public/pages/about.html">About</a></li>
              <li><a href="/public/pages/posts.html" id="blog-button" >Posts</a></li>
            </ul>
          </nav>
        `;
  }
}

function mobileNavbar() {
  const navbarMenu = document.querySelector("#navbar-menu");
  const navbarLinks = document.querySelector(".navbar-links-mobile");

  let isOpen = false;

  function openNavbar() {
    if (isOpen) {
      navbarLinks.setAttribute("isOpen", false);
      navbarMenu.classList.remove("rotate");
      isOpen = false;
    } else {
      navbarLinks.setAttribute("isOpen", true);
      navbarMenu.classList.add("rotate");
      isOpen = true;
    }
  }

  navbarMenu.addEventListener("click", openNavbar);

  // the observer
  const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    },
    observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("link-animation");
        } else {
          entry.target.classList.remove("link-animation");
        }
      });
    }, options);

  // the targets
  const targets = document.querySelectorAll(".link");

  // the observer is observing the targets
  targets.forEach((target) => {
    observer.observe(target);
  });
}
