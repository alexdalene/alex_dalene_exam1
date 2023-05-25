async function getComments() {
  try {
    const response = await fetch(
      "https://wildatrisk.dalene.digital/wp-json/wp/v2/comments?post=" + postId
    );

    if (response.ok) {
      const result = await response.json();
      makeComments(result);
      commentForm();
    }
  } catch (error) {
    console.log(error);
  }
}

// show existing comments
function makeComments(comments) {
  const commentContainer = document.createElement("section");
  commentContainer.classList.add("comment-container");
  commentContainer.innerHTML = "<h3 class='comment-title'>Comments</h3>";
  document.querySelector(".animal-wrapper").appendChild(commentContainer);

  // make date a readable format
  comments.forEach((comment) => {
    let date = new Date(comment.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    commentContainer.innerHTML += `
          <div class="comment">
            <div class="comment-header">
              <div class="comment-avatar">
                <img src="${comment.author_avatar_urls[48]}" alt="" />
              </div>
              <h3 class="comment-name">${comment.author_name}</h3>
              <p class="comment-date">${date}</p>
            </div>
              ${comment.content.rendered}
          </div>
          `;
  });

  if (comments.length == 0) {
    commentContainer.innerHTML += `
          <p class="no-comments">No comments yet. Be the first to comment!</p>
          `;
  }
}

// create comment form
function commentForm() {
  const commentForm = document.createElement("form");

  commentForm.classList.add("comment-form");
  commentForm.innerHTML = `
      <h3 class="comment-title">Leave a reply</h3>
      <div class="comment-form-container">
      <div class="comment-form-input">
        <label for="comment">Comment</label>
          <textarea name="comment" id="comment" placeholder="Your comment here..." required></textarea>
        </div>
        <div class="comment-form-input">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" required />
        </div>
        <div class="comment-form-input">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" required />
        </div>
        <button type="submit" class="comment-form-submit" disabled="true" >Submit</button>
      </div>
      `;

  document.querySelector(".animal-wrapper").appendChild(commentForm);

  // comment validation
  const comment = document.querySelector("#comment");
  const commentRegex = /^.{10,}$/;

  comment.addEventListener("keyup", () => {
    if (commentRegex.test(comment.value)) {
      comment.classList.add("valid");
      comment.classList.remove("invalid");
    } else {
      comment.classList.add("invalid");
      comment.classList.remove("valid");
    }
  });

  // name validation
  const name = document.querySelector("#name");
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

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
  const email = document.querySelector("#email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  email.addEventListener("keyup", () => {
    if (emailRegex.test(email.value)) {
      email.classList.add("valid");
      email.classList.remove("invalid");
    } else {
      email.classList.add("invalid");
      email.classList.remove("valid");
    }
  });

  // enable submit button if all fields are valid
  const submit = document.querySelector(".comment-form-submit");

  commentForm.addEventListener("keyup", () => {
    if (
      comment.classList.contains("valid") &&
      name.classList.contains("valid") &&
      email.classList.contains("valid")
    ) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  });

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postComment();
  });
}

// post comment to WordPress REST API
async function postComment() {
  const comment = document.querySelector("#comment").value;
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  // reset form
  document.querySelector(".comment-form").reset();
  document.querySelector("#comment").classList.remove("valid");
  document.querySelector("#name").classList.remove("valid");
  document.querySelector("#email").classList.remove("valid");
  document.querySelector(".comment-form-submit").disabled = true;

  // make form data
  const data = {
    author_name: name,
    author_email: email,
    content: comment,
    post: postId,
  };

  try {
    const response = await fetch(
      "https://wildatrisk.dalene.digital/wp-json/wp/v2/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result);

      updateComment(result);
    }
  } catch (error) {
    console.log(error);
  }
}

// update comment section with new comment
function updateComment(comment) {
  const commentContainer = document.querySelector(".comment-container");

  if (commentContainer.querySelector(".no-comments")) {
    commentContainer.querySelector(".no-comments").remove();
  }

  // make date a readable format
  let date = new Date(comment.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  commentContainer.innerHTML += `
      <div class="comment">
        <div class="comment-header">
          <div class="comment-avatar">
            <img src="${comment.author_avatar_urls[48]}" alt="" />
          </div>
          <h3 class="comment-name">${comment.author_name}</h3>
          <p class="comment-date">${date}</p>
        </div>
          ${comment.content.rendered}
      </div>
      `;
}
