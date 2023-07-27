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
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const emailAddress = $("#emailAddress").val();
        const signUpPassword = $("#signUpPassword").val();
        const signUpConfirmPassword = $("#signUpConfirmPassword").val();


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

        // If any of the fields have errors, prevent form submission
        if (!firstName || !lastName || !emailAddress || !signUpPassword || !signUpConfirmPassword) {
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
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("emailAddress").value = "";
                document.getElementById("signUpPassword").value = "";
                document.getElementById("signUpConfirmPassword").value = "";
                $("#loginSection").show();
                $("#registrationSectionId").hide();
                $("#GetStartedSection").hide();
            },
            error: function (error) {
              console.log(error);
            },
        });
    });
});


// User Login
$(document).ready(function () {
    // Add input event listeners to hide and show error messages on input
    $("#LemailAddress").on("input", function () {
        const LemailAddress = $(this).val();
        if (!LemailAddress) {
            showError("#lemailError", "Email Address should not be blank");
        } else {
            hideError("#lemailError");
        }
    });

    $("#Lpassword").on("input", function () {
        const Lpassword = $(this).val();
        if (!Lpassword) {
            showError("#lPassError", "Password should not be blank");
        } else {
            hideError("#lPassError");
        }
    });

    $("#loginButton").click(function () {
        const LemailAddress = $("#LemailAddress").val();
        const Lpassword = $("#Lpassword").val();

        // Validate email address
        if (!LemailAddress) {
            showError("#lemailError", "Email Address should not be blank");
        } else {
            hideError("#lemailError");
        }

        // Validate password
        if (!Lpassword) {
            showError("#lPassError", "Password should not be blank");
        } else {
            hideError("#lPassError");
        }

        // If any of the fields have errors, prevent form submission
        if (!LemailAddress || !Lpassword) {
            return false;
        }

        // If all fields are valid, proceed with login submission
        // Add your login submission code here...
        // Assuming the API call is similar to the registration call, let's handle the success and error cases accordingly.
        $.ajax({
            url: "https://cleanstation.backendless.app/api/data/Login", // Replace with your API endpoint for login
            type: "POST",
            data: JSON.stringify({ email: LemailAddress, password: Lpassword }),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function (data) {
                console.log("Login success:", data);
                console.log("Login Success");

                // Set the success message for the login
                $("#headerBlock").css("background-color", "green");
                $("#LHeadermsg").text("Login Successful");

                // Assuming you want to hide the registration section after successful login
                $("#loginSection").hide();
                // Show other sections if needed...
            },
            error: function (error) {
                console.log(error);

                // Set the error message for the login
                $("#headerBlock").css("background-color", "red");
                $("#LHeadermsg").text("Error: Login failed. Please check your credentials and try again.");

                // Optionally, you can show an error message near the login form as well, similar to the registration form.
                showError("#loginError", "Invalid email or password");
            },
        });
    });
});












