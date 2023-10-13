// User Registration
function showError(elementId, message) {
  const errorElement = $(elementId);
  errorElement.text(message).css({ color: "red", display: "block" });
}

function hideError(elementId) {
  const errorElement = $(elementId);
  errorElement.text("").css({ display: "none" });
}

$(document).ready(function () {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("emailAddress").value = "";
  document.getElementById("signUpPassword").value = "";
  document.getElementById("signUpConfirmPassword").value = "";
  document.getElementById("checkbox").value = false;

  // Add input event listeners to hide and show error messages on input
  $("#firstName").on("input", function () {
    const firstName = $(this).val();
    if (!firstName) {
      showError("#fnameerror", "First Name should not be blank");
    } else {
      hideError("#fnameerror");
    }
  });

  $("#lastName").on("input", function () {
    const lastName = $(this).val();
    if (!lastName) {
      showError("#lnameerror", "Last Name should not be blank");
    } else {
      hideError("#lnameerror");
    }
  });

  $("#emailAddress").on("input", function () {
    const emailAddress = $(this).val();
    if (!emailAddress) {
      showError("#emailerror", "Email Address should not be blank");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      showError("#emailerror", "Invalid Email Address");
    } else {
      hideError("#emailerror");
    }
  });

  $("#signUpPassword").on("input", function () {
    const signUpPassword = $(this).val();
    const signUpConfirmPassword = $("#signUpConfirmPassword").val();
    if (!signUpPassword) {
      showError("#password", "Password should not be blank");
    } else {
      if (signUpPassword !== signUpConfirmPassword) {
        showError("#confirmpass", "Password and Confirm Password do not match");
      } else {
        hideError("#confirmpass");
      }
      hideError("#password");
    }
  });

  $("#signUpConfirmPassword").on("input", function () {
    const signUpConfirmPassword = $(this).val();
    const signUpPassword = $("#signUpPassword").val();
    if (!signUpConfirmPassword) {
      showError("#confirmpass", "Confirm Password should not be blank");
    } else if (signUpPassword !== signUpConfirmPassword) {
      showError("#confirmpass", "Password and Confirm Password do not match");
    } else {
      hideError("#confirmpass");
    }
  });

  $("#checkbox").on("change", function () {
    const isChecked = $(this).prop("checked");
    if (!isChecked) {
      showError("#termsError", "Please accept the terms and condition");
    } else {
      hideError("#termsError");
    }
  });

  $("#SignUpButton").click(function () {
    //document.getElementById("signUpPassword").type = "password";
    const signUpPasswordInput = document.getElementById("signUpPassword");
    if (signUpPasswordInput) {
      signUpPasswordInput.type = "text";
    }

    // document.getElementById("signUpConfirmPassword").type = "password";
    const signUpConfirmPasswordInput = document.getElementById("signUpConfirmPassword");
    if (signUpConfirmPasswordInput) {
      signUpConfirmPasswordInput.type = "text";
    }

    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const emailAddress = $("#emailAddress").val();
    const signUpPassword = $("#signUpPassword").val();
    const signUpConfirmPassword = $("#signUpConfirmPassword").val();
    const isChecked = $("#checkbox").is(":checked"); // Check if checkbox is checked

    // Validate first name
    if (!firstName) {
      showError("#fnameerror", "First Name should not be blank");
    } else {
      hideError("#fnameerror");
    }

    // Validate last name
    if (!lastName) {
      showError("#lnameerror", "Last Name should not be blank");
    } else {
      hideError("#lnameerror");
    }

    // Validate email address
    if (!emailAddress) {
      showError("#emailerror", "Email Address should not be blank");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      showError("#emailerror", "Invalid Email Address");
    } else {
      hideError("#emailerror");
    }

    // Validate password
    if (!signUpPassword) {
      showError("#password", "Password should not be blank");
    } else {
      hideError("#password");
    }

    // Validate confirm password
    if (!signUpConfirmPassword) {
      showError("#confirmpass", "Confirm Password should not be blank");
    } else if (signUpPassword !== signUpConfirmPassword) {
      showError("#confirmpass", "Password and Confirm Password do not match");
    } else {
      hideError("#confirmpass");
    }

    if (!isChecked) {
      showError("#termsError", "Please accept the terms and condition");
      return;
    } else {
      hideError("#termsError");
    }

    // If any of the fields have errors, prevent form submission
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !signUpPassword ||
      !signUpConfirmPassword
    ) {
      return false;
    }

    // If all fields are valid, proceed with form submission
    // Add your form submission code here...
    let userData = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: signUpPassword,
    };
    $.ajax({
      url: "https://cleanstation.backendless.app/api/data/Users", // Replace with your API endpoint
      type: "POST",
      data: JSON.stringify(userData),
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      success: function (data) {
        console.log("user saved:", data);
        console.log("Registration Success");
        $("#SignUpForm").show();
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("emailAddress").value = "";
        document.getElementById("signUpPassword").value = "";
        document.getElementById("signUpConfirmPassword").value = "";

        $("#signUpHeaderBlock")
        .text("Registration Successful")
        .css({ display: "block", color: "green" });
        // Swal.fire("Success", "Registration Successfully Done", "success");

     

        $("#loginSection").show();
        $("#registrationSectionId").hide();
        $("#GetStartedSection").hide();

        const redirectUrl = "https://izba-exchange.webflow.io/log-in";
        window.location.href = redirectUrl;
      },
      error: function (error) {
      const signUpPasswordInput = document.getElementById("signUpPassword");
      if (signUpPasswordInput) {
        signUpPasswordInput.type = "password";
      }
      const signUpConfirmPasswordInput = document.getElementById("signUpConfirmPassword");
      if (signUpConfirmPasswordInput) {
        signUpConfirmPasswordInput.type = "password";
      }
        var responsee = error;
        var errorMessage = responsee.responseJSON.message;
        console.log(errorMessage);
        var signupError = $("#signupError");
        signupError.text(errorMessage);
        signupError.css({ color: "red", display: "block" });
        $("#SignUpForm").show();
      },
    });
  });
});