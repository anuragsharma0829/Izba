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

        // if (signUpPassword.val().length < 6) {
        //     showError("#password", "Password length should not be less than 6 characters");
        // } else {
        //     hideError("#password");
        // }


        // if (!hasStrongPassword(signUpPassword.val())) {
        //     showError("#password", "Password should be strong with at least one uppercase letter, one lowercase letter, and one digit");
        //     return false;
        // } else {
        //     hideError("#password");
        // }


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
        $.ajax({
            type: "POST",
            url: "https://cleanstation.backendless.app/api/data/Users",
            data: {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: signUpPassword,
                // Include other form data fields if needed
            },
            success: function (response) {
                // Handle the server response here
                console.log("Form submitted successfully!");
                console.log(response);
            },
            error: function (error) {
                // Handle any error that occurs during form submission
                console.error("Error occurred during form submission:", error);
            },
        });
    });
});














// let userData = {
//     first_name: firstName,
//     last_name: lastName,
//     email: email,
//     password: password,
//   };
//   fetch("", {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Something went wrong"); // Throw an error if the response is not successful
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("user saved:", data);
//       console.log("Registration Success");
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "User Registration Success",
//         showConfirmButton: false,
//         timer: 2500,
//       });

//       $("#loginSection").show();
//       $("#registrationSectionId").hide();
//       $("#GetStartedSection").hide();
//     })
//     .catch((error) => {
//       Swal.fire({
//         position: "top-end",
//         icon: "error",
//         title: "Something went wrong",
//         showConfirmButton: false,
//         timer: 2500,
//       });
//     });