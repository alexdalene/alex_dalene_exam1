const form = document.querySelector(".contact-form");
const name = document.querySelector("#name");
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
name.addEventListener("keyup", () => {
  if (nameRegex.test(name.value)) {
    name.classList.add("valid");
    name.classList.remove("invalid");
  } else {
    name.classList.add("invalid");
    name.classList.remove("valid");
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
    name.classList.contains("valid") &&
    email.classList.contains("valid") &&
    subject.classList.contains("valid") &&
    message.classList.contains("valid")
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

// submit form to WordPress REST API
$(document).ready(function () {
  $(form).submit(function (e) {
    e.preventDefault(); // prevent the form from submitting normally

    // capture the form data
    var formData = {
      title: $(subject).val(),
      content:
        $(message).val() + "\n\n" + $(name).val() + "\n" + $(email).val(),
      status: "publish",
    };

    let login = "wildatrisk.dalene.digital";
    let password = "M8a7 t39g mOLY VioF 73h0 L2hc";

    let authHeader = "Basic " + btoa(login + ":" + password);

    // send an AJAX request to the WordPress REST API with authentication
    $.ajax({
      method: "POST",
      url: "https://wildatrisk.dalene.digital/wp-json/wp/v2/contact_form",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", authHeader);
      },
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (data) {
        console.log("Post created:", data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error creating post:", errorThrown);
      },
    });
  });
});
