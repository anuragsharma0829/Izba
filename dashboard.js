// cheak brand
$(document).ready(function () {
    // Fetch user data from localStorage for session management
    const userData = localStorage.getItem("userData");
    if (userData) {
        const data = JSON.parse(userData);
        // Check the custom API for validation
        $.ajax({
            url: "https://cleanstation.backendless.app/api/services/Brand/CheakBrand",
            type: "POST",
            data: JSON.stringify({ objectId: data.objectId }), // Get the objectId from localStorage
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function (response) {
                console.log("API response:", response);

                if (response === true) {
                    // Show #BrandHeroSection and hide #CreateBrandSection
                    $("#BrandHeroSection").show();
                    $("#CreateBrandSection").hide();
                } else {
                    // Show #CreateBrandSection and hide #BrandHeroSection
                    $("#BrandHeroSection").hide();
                    $("#CreateBrandSection").show();
                }
            },
            error: function (error) {
                console.log(error);
                // Handle API error for user validation if necessary
                // Optionally, show an error message to the user
                console.log("Error: User validation failed. Please try again later.");
                // You can add an error message on the page if needed
            },
        });
    }
});

// create Brand
function showError(elementId, message) {
    const errorElement = $(elementId);
    errorElement.text(message).css({ color: "red", display: "block" });
}

function hideError(elementId) {
    const errorElement = $(elementId);
    errorElement.text("").css({ display: "none" });
}

function showGenericError() {
    showError("#errorContainer", "Please fill out all the required fields.");
}

$(document).ready(function () {

    $("#Brand-Name").on("input", function () {
        let BrandName = $("#Brand-Name").val();
        if (!BrandName) {
            showError("#brandNameError", "Brand name should not be blank");
        } else {
            hideError("#brandNameError");
        }
    });

    $("#Brand-URl").on("input", function () {
        let BrandURl = $("#Brand-URl").val();
        if (!BrandURl) {
            showError("#Brand-URlerror", "Last Name should not be blank");
        } else {
            hideError("#Brand-URlerror");
        }
    });


    $("#Brand-URl").on("input", function () {
        let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
        if (!ShoppingCartDropDown) {
            showError("#ShoppingCartDropDown", "Last Name should not be blank");
        } else {
            hideError("#ShoppingCartDropDown");
        }
    });

    $("#CreateBrandButton").click(function () {
   
        let BrandName = $("#Brand-Name").val();
        let BrandURl = $("#Brand-URl").val();
        let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
        const userData = localStorage.getItem("userData");
        const data = JSON.parse(userData);
        let userobjId=data.objectId
        console.log("<<<<<<",userobjId);
        // let fcConatainer = $("#centers").val();
        // const errorElement = document.getElementById("errBrand");
    
        if (
            BrandName !== "" &&
            BrandURl !== "" &&
            ShoppingCartDropDown !== ""
          
        ) {
          let brandDetail = {
            brand_name: BrandName,
            URL : BrandURl,
            Cart: ShoppingCartDropDown,
            User_ID: {
                "objectId": userobjId
            }
        }


          fetch("https://cleanstation.backendless.app/api/services/Brand/CreateBrand", {
            method: "POST",
            body: JSON.stringify(brandDetail),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              brandId = data.objectId;
              handleBrandID(brandId); // Call
            })
            .catch((error) => console.error("Error:", error));
        } else {
            showGenericError();
        }
        return false;
    
    });
  });