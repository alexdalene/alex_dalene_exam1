// create footer element

const footer = document.createElement("footer");
footer.classList.add("footer-wrapper");

footer.innerHTML = `
<div class="footer-container">
    <img src="/public/svg/logo-icon.svg" alt="" class="footer-logo">
    <h4 class="footer-title">WILD AT RISK</h4>
    <p class="footer-paragraph">
    Protecting wildlife, <br />
    preserving the planet.
    </p>
    </div>
`;

document.body.append(footer);
