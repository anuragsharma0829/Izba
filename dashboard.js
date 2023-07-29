const userData = localStorage.getItem("userData");
const data = JSON.parse(userData);
const objID = data.objectId;
const token = data.token;
let UserBrandID;

$("#loginBtn").hide();
$("#UserNameBlock").show();
$("#GetStartedButton").hide();
$("#LogOutButton").show();

document.getElementById('UserNameText').innerHTML = data.first_name;

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
                    $("#MainSection").show();
                    $("#CreateBrandSection").hide();
                } else {
                    // Show #CreateBrandSection and hide #BrandHeroSection
                    $("#MainSection").hide();
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

$(document).ready(function () {
    $("#AddFulfillmentContractButton").click(function () {
        $("#Wrapper").hide();
        $("#CreateFulfillmentContractBlock").show();
    });
});

$(document).ready(function () {
    $("#CancelCreateFulfillmentContract").click(function () {
        $("#CreateFulfillmentContractBlock").hide();
        $("#Wrapper").show();
    });
});

$(document).ready(function () {
    $("#CreateContractRatesBtn").click(function () {
        $("#CreateFulfillmentContractBlock").hide();
        $("#Wrapper").hide();
        $("#fulfillmentContractSection").show();
    });
});

$(document).ready(function () {
    $("#FulfillmentContractEditButton").click(function () {
        $("#Wrapper").hide();
        $("#UpdateFulfillmentContractSection").show();
    });
});

$(document).ready(function () {
    $("#FCDetail").click(function () {
        $("#Wrapper").hide();
        $("#FulfillmentContractDetailSection").show();
    });
});

$(document).ready(function () {
    $("#CancelCreateContractButton").click(function () {
        $("#fulfillmentContractSection").hide();
        $("#Wrapper").show();
    });
});

$(document).ready(function () {
    $("#CreateContractRateButton").click(function () {
        $("#fulfillmentContractSection").hide();
        $("#successfullMessage").show();
    });
});

$(document).ready(function () {
    $("#SuccessMessageClose ").click(function () {
        $("#successfullMessage").hide();
        $("#FulfillmentContractDetailSection").show();
    });
});

$(document).ready(function () {
    $("#BrandTab").click(function () {
        $("#CreateFulfillmentContractBlock").hide();
        $("#fulfillmentContractSection").hide();
        $("#UpdateFulfillmentContractSection").hide();
        $("#FulfillmentContractDetailSection").hide();
        $("#Wrapper").show();
    });
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
        let userobjId = objID;
        console.log("<<<<<<", userobjId);
        // let fcConatainer = $("#centers").val();
        // const errorElement = document.getElementById("errBrand");

        if (BrandName !== "" && BrandURl !== "" && ShoppingCartDropDown !== "") {
            let brandDetail = {
                brand_name: BrandName,
                URL: BrandURl,
                Cart: ShoppingCartDropDown,
                User_ID: {
                    objectId: userobjId,
                },
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/Brand/CreateBrand",
                {
                    method: "POST",
                    body: JSON.stringify(brandDetail),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log("hhhhhhh", data);
                    //   handleBrandID(brandId); // Call
                    const BrandMessage = document.getElementById("BrandMessage");
                    BrandMessage.innerHTML = "Brand created successfully";
                    BrandMessage.style.color = "white";
                    BrandMessage.style.backgroundColor = "green";
                    BrandMessage.style.display = "block";
                    $("#MainSection").show();
                    $("#CreateBrandSection").hide();
                    document.getElementById('Brand-URl-Text').innerHTML = data.URL;
                    document.getElementById('BrandNameText').innerHTML = data.brand_name;

                })
                .catch((error) => console.error("Error:", error));
        } else {
            showGenericError();
            const BrandMessage = document.getElementById("BrandMessage");
            BrandMessage.innerHTML = "Something went wrong ! please try agian ";
            BrandMessage.style.color = "white";
            BrandMessage.style.backgroundColor = "red";
            BrandMessage.style.display = "block";
        }
        return false;
    });
});



//set brand and url


let BrandID = {
    objectId: objID,
};

fetch("https://cleanstation.backendless.app/api/services/Brand/UserIDToBrand", {
    method: "POST",
    body: JSON.stringify(BrandID),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log("API Response:", data); // Log the API response to check its structure
        if (data.length > 0) {
            // Access the first object in the array
            const brandData = data[0];
            UserBrandID=brandData.objectId;
            document.getElementById('Brand-URl-Text').innerHTML = brandData.URL;
            document.getElementById('BrandNameText').innerHTML = brandData.brand_name;
        }
    })
    .catch((error) => console.error("Error fetching data:", error));



$(document).ready(function () {
    $("#LogOutButton").click(function () {
        localStorage.removeItem("userData");
        const redirectUrl = "https://izba-exchange.webflow.io/log-in";
        window.location.href = redirectUrl;
    });
});


//   show fullfillment-contract_name
let userobjId = {
    objectId: objID,
};

fetch("https://cleanstation.backendless.app/api/services/Brand/BrandContract", {
    method: "POST",
    body: JSON.stringify(userobjId),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log("API Response:", data);
        if (data.length > 0) {
            // Filter out contracts with null Contract_name
            const contracts = data.filter(contract => contract.Contract_name !== null && contract.Contract_name.trim() !== '');
            if (contracts.length > 0) {
                const cardTableBody = document.getElementById('cardTableBody');
                cardTableBody.innerHTML = ''; // Clear existing rows
                contracts.forEach((contract, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
              <td style="padding: 8px; border-bottom: 1px solid #ccc;">${index + 1}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ccc;">${contract.Contract_name}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ccc;">
                <div class="button-container">
                  <button class="edit-button" onclick="editContract('${contract.objectId}')">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="delete-button" onclick="deleteContract('${contract.objectId}')">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            `;
                    cardTableBody.appendChild(row);
                });
            } else {
                // Show "No contract data found" message in the custom alert row
                const alertRow = document.getElementById('alertRow');
                alertRow.style.display = 'table-row';
            }
        } else {
            // If no data is returned from the API
            const alertRow = document.getElementById('alertRow');
            alertRow.style.display = 'table-row';
        }
    })
    .catch((error) => console.error("Error fetching data:", error));

// Edit Contract function
function editContract(contractId) {
    // Replace this function with your edit functionality using the contractId
    console.log("Edit contract with ID:", contractId);
}

// Delete Contract function
function deleteContract(contractId) {
    // Replace this function with your delete functionality using the contractId
    console.log("Delete contract with ID:", contractId);
}



// add fullfillment contract 
$(document).ready(function () {
    $("#CreateContractRatesBtn").click(function () {
        let cName = $("#cName").val();
        let centers = $("#centers").val();
        let startDate = $("#startDate").val();
        let endDate = $("#endDate").val();
        const selectedCenterId = localStorage.getItem("selectedCenterId");
        console.log("parascebterID",selectedCenterId);
    });

    if (cName !== "" || centers !== "" || startDate !== "" || endDate !== "") {

        //Api Logic for post data
        let postContract = {

            Fulfillment_Center: {
                "objectId": selectedCenterId
            },

            Brand_id: {
                "objectId": UserBrandID
            },
            Contract_name: cName ,
            Start_Date: startDate,
            End_Date: endDate,
        };

        fetch(
            "https://cleanstation.backendless.app/api/services/Estimate/Create_Fulfillment_Contract",
            {
                method: "POST",
                body: JSON.stringify(postContract),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Paras API", data);
                fcobjId = data.objectId;
                handleFcobjId(fcobjId);
            })
            .catch((error) => console.error("Error:", error));

        enableTabAndTriggerClick("TabEstimate");
    } else {
        const startDateEndDate = document.getElementById("startDate-EndDate");
        startDateEndDate.innerHTML = "Please fill all required fields";
        startDateEndDate.style.color = "red";
        startDateEndDate.style.display = "block";
    }
});