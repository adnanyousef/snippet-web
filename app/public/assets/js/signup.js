$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("#signup-form");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // POST to signup route
  function signUpUser(email, password) {
    $.ajax({
      url: "/api/signup",
      data: {email: email, password: password},
      method: "POST"
    }).then(function(data) {
      console.log(data);
      if (data.errors) {
        return alert("Email already registered");
      }
      window.location.replace(data);
    }).fail(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err);
  }
});
