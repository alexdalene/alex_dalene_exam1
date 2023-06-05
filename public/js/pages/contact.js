const form = document.querySelector(".contact-form");
const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const submitBtn = document.querySelector(".contact-button");

// regex for name, at least 6 characters and only letters allowed and spaces
const nameRegex = /^[a-zA-Z ]{6,}$/;
// regex for email, must contain @ and .
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// regex for subject, at least 16 characters and allow spaces
const subjectRegex = /^[a-zA-Z ]{16,}$/;
// regex for message, at least 26 characters and allow spaces and numbers
const messageRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]{26,}$/;

// name validation
userName.addEventListener("keyup", () => {
  if (nameRegex.test(userName.value)) {
    userName.classList.add("valid");
    userName.classList.remove("invalid");
  } else {
    userName.classList.add("invalid");
    userName.classList.remove("valid");
  }
});

// email validation
email.addEventListener("keyup", () => {
  if (emailRegex.test(email.value)) {
    email.classList.add("valid");
    email.classList.remove("invalid");
  } else {
    email.classList.add("invalid");
    email.classList.remove("valid");
  }
});

// subject validation
subject.addEventListener("keyup", () => {
  if (subjectRegex.test(subject.value)) {
    subject.classList.add("valid");
    subject.classList.remove("invalid");
  } else {
    subject.classList.add("invalid");
    subject.classList.remove("valid");
  }
});

// message validation
message.addEventListener("keyup", () => {
  if (messageRegex.test(message.value)) {
    message.classList.add("valid");
    message.classList.remove("invalid");
  } else {
    message.classList.add("invalid");
    message.classList.remove("valid");
  }
});

// remove disabled from button if all fields are valid
form.addEventListener("keyup", () => {
  if (
    userName.classList.contains("valid") &&
    email.classList.contains("valid") &&
    subject.classList.contains("valid") &&
    message.classList.contains("valid")
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

// hide success message before form is submitted
document.querySelector(".contact-success").style.display = "none";

async function postFormData() {
  // WordPress REST API authentication
  let login = "wildatrisk.dalene.digital";
  let password = "OPGt NtV7 7xqj C1Wu LrGG hx51";
  let authHeader = "Basic " + btoa(login + ":" + password);

  // form data
  const data = {
    title: subject.value,
    content: message.value + "\n\n" + userName.value + "\n" + email.value,
    status: "publish",
  };

  // WordPress API authentication
  try {
    // start loader
    document.querySelector(".loader").style.display = "block";

    const response = await fetch(
      "https://wordpress-1011658-3574829.cloudwaysapps.com/wp-json/wp/v2/contact_form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(data),
      }
    );

    // check if response is good
    if (response.ok) {
      // stop loader
      document.querySelector(".loader").style.display = "none";

      const result = await response.json();
      console.log("Post created:", result);

      // reset the form
      form.reset();
      userName.classList.remove("valid");
      email.classList.remove("valid");
      subject.classList.remove("valid");
      message.classList.remove("valid");
      submitBtn.disabled = true;

      // show success message
      document.querySelector(".contact-success").style.display = "grid";
      setTimeout(function () {
        document.querySelector(".contact-success").style.display = "none";
      }, 5000);
    } else {
      // make error container and message
      const errorContainer = document.createElement("div");
      errorContainer.classList.add("errorContainer");
      const errorMessage = document.createElement("h3");
      errorContainer.append(errorMessage);

      // error message template
      const ERROR_TO_DISPLAY = {
        code: response.status,
        status: response.statusText ? response.statusText : "NO MESSAGE FOUND",
        message:
          "Please refresh and try again, or contact administration if problems persists.",
      };

      // check errors
      if (response.status === 401) {
        errorMessage.innerHTML = `Unauthorized access. Code: ${ERROR_TO_DISPLAY.code} with message: ${ERROR_TO_DISPLAY.status}. ${ERROR_TO_DISPLAY.message}`;
      } else if (response.status === 403) {
        errorMessage.innerHTML = `Forbidden access. Code: ${ERROR_TO_DISPLAY.code} with message: ${ERROR_TO_DISPLAY.status}. ${ERROR_TO_DISPLAY.message}`;
      } else {
        errorMessage.innerHTML = `An error has occured. Code: ${ERROR_TO_DISPLAY.code} with message: ${ERROR_TO_DISPLAY.status}. ${ERROR_TO_DISPLAY.message}`;
      }

      // append the message to frontend
      form.append(errorContainer);
    }
  } catch (error) {
    console.log(error);
  }
}

// submit form to WordPress REST API
form.addEventListener("submit", (e) => {
  e.preventDefault();
  postFormData();
});
