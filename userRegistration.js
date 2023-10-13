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
      if (!signUpPassword) {
        showError("#password", "Password should not be blank");
      } else {
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

          Swal.fire("Success", "Registration Successfully Done", "success");

          document.getElementById("firstName").value = "";
          document.getElementById("lastName").value = "";
          document.getElementById("emailAddress").value = "";
          document.getElementById("signUpPassword").value = "";
          document.getElementById("signUpConfirmPassword").value = "";

          $("#loginSection").show();
          $("#registrationSectionId").hide();
          $("#GetStartedSection").hide();

          const redirectUrl = "https://izba-exchange.webflow.io/log-in";
          window.location.href = redirectUrl;
        },
        error: function (error) {
          var responsee = error;
          var errorMessage = responsee.responseJSON.message;
          // errorMessage me ab aapke message ka value hoga
          console.log(errorMessage);
          var signupError = $("#signupError");

          signupError.text(errorMessage);
          // Setting the error message to the element
          signupError.css({ color: "red", display: "block" });
        },
      });
    });
  });

  // User Login------------------------------------------------------------------------------
  $(document).ready(function () {
    // document.getElementById("Lpassword").type = "text";
    const signiNPasswordInput = document.getElementById("Lpassword");
    if (signiNPasswordInput) {
      signiNPasswordInput.type = "text";
    } 
    function showError(selector, message) {
      $(selector).text(message).show();
    }

    function hideError(selector) {
      $(selector).hide();
    }

    function showAllErrors() {
      const LemailAddress = $("#LemailAddress").val();
      const Lpassword = $("#Lpassword").val();

      if (!LemailAddress) {
        showError("#lemailError", "Email Address should not be blank");
      } else {
        hideError("#lemailError");
      }

      if (!Lpassword) {
        showError("#lPassError", "Password should not be blank");
      } else {
        hideError("#lPassError");
      }
    }

    // Hide errors when the user starts typing in the specific field
    $("#LemailAddress").on("input", function () {
      if ($(this).val()) {
        hideError("#lemailError");
      } else {
        showError("#lemailError", "Email Address should not be blank");
      }
    });

    $("#Lpassword").on("input", function () {
      if ($(this).val()) {
        hideError("#lPassError");
      } else {
        showError("#lPassError", "Password should not be blank");
      }
    });

    $("#SignIpButton").click(function () {
      showAllErrors();

      const LemailAddress = $("#LemailAddress").val();
      const Lpassword = $("#Lpassword").val();

      // If any of the fields have errors, prevent form submission
      if (!LemailAddress || !Lpassword) {
        return false;
      }

      // If all fields are valid, proceed with the login submission
      $.ajax({
        url: "https://api.backendless.com/4921FD25-45AC-9E96-FF7F-865537F72100/6B4F94DC-59DA-42A3-AC9D-C7974DD0B601/users/login",
        type: "POST",
        data: JSON.stringify({ login: LemailAddress, password: Lpassword }),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (data) {
          console.log("Login success:", data);
          console.log("Login Success");
          $("#sign-in-form").show();
          // Store user data in localStorage for session management
          localStorage.setItem("userData", JSON.stringify(data));
          document.getElementById("LemailAddress").value = "";
          document.getElementById("Lpassword").value = "";
          // Set the success message for the login
          $("#headerBlock")
            .text("Login Successful")
            .css({ display: "block", color: "green" });
          $("#loginSection").hide();
          $("#loginBtn").hide();
          $("#UserNameBlock").show();
          document.getElementById("UserNameText").innerHTML = data.first_name;

          // Redirect to another page after successful login
          const redirectUrl =
            "https://izba-exchange.webflow.io/fulfillment-contract";
          window.location.href = redirectUrl;
        },
        error: function (error) {
          console.log(error);
          $("#headerBlock")
            .text(
              "Error: Login failed. Please check your credentials and try again."
            )
            .css({ display: "block", color: "red" });
          $("#sign-in-form").show();
        },
      });
    });
  });