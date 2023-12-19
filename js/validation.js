document
  .getElementById("contactform")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    // Validate form fields
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
    } else {
      alert(
        "Form submitted successfully!\n\nName: " +
          name +
          "\nEmail: " +
          email +
          "\nMessage: " +
          message
      );
    }
  });

document
  .getElementById("subscribeform")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    // Validate form fields
    var email = document.getElementsByName("email")[1].value;

    if (email === "") {
      alert("Please fill in all fields.");
    } else {
      alert("Form submitted successfully!\n\nEmail: " + email);
    }
  });
