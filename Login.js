// User Login------------------------------------------------------------------------------
$(document).ready(function () {
    // document.getElementById("Lpassword").type = "text";
    const signiNPasswordInput = document.getElementById("Lpassword");
    if (signiNPasswordInput) {
      signiNPasswordInput.type = "password";
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
      signiNPasswordInput.type = "text";
      // If all fields are valid, proceed with the login submission
      $.ajax({
        url: "https://api.backendless.com/4921FD25-45AC-9E96-FF7F-865537F72100/6B4F94DC-59DA-42A3-AC9D-C7974DD0B601/users/login",
        type: "POST",
        data: JSON.stringify({ login: LemailAddress, password: Lpassword }),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (data) {
          $("#sign-in-form").show();
          // Store user data in localStorage for session management
          localStorage.setItem("userData", JSON.stringify(data));
          document.getElementById("LemailAddress").value = "";
          document.getElementById("Lpassword").value = "";
          // Set the success message for the login
          $("#loginSuccessmessage").show();
            // .text("Login Successful")
            // .css({ display: "block", color: "green" });
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
          signiNPasswordInput.type = "password";
          console.log(error);
          $("#loginSuccessmessage").hide();
          $("#headerBlock")
            .text(
              "Error: Login failed. Please check your credentials and try again."
            ).css({ display: "block", color: "red" });      
             $("#sign-in-form").show();
        },
      });
    });
  });