const userData = localStorage.getItem("userData");
const data = JSON.parse(userData);
const objID = data.objectId;
const token = data.token;
let UserBrandID;
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js";
document.head.appendChild(script);

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
            // Access the first object in the array
            const brandData = data;
            UserBrandID=brandData.objectId;
            console.log((UserBrandID,"<<<<<<<"));
            document.getElementById('Brand-URl-Text').innerHTML = brandData.URL;
            document.getElementById('BrandNameText').innerHTML = brandData.brand_name;
    })
    .catch((error) => console.error("Error fetching data:", error));



$(document).ready(function () {
    $("#LogOutButton").click(function () {
        localStorage.removeItem("userData");
        const redirectUrl = "https://izba-exchange.webflow.io/log-in";
        window.location.href = redirectUrl;
    });
});


    // Global variables for pagination
    let currentPage = 1;
    const rowsPerPage = 5;
    let totalRows = 0;
    let totalPages = 1;

    // Function to fetch and show contracts
    function fetchAndShowContracts() {
      let objID2 = "AF00B19D-5B3B-4840-8304-8EF0005DB39B";

      let userobjId = {
        objectId: objID2,
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
        if (data.length > 0) {
          // Filter out contracts with null Contract_name
          const contracts = data.filter(contract => contract.Contract_name !== null && contract.Contract_name.trim() !== '');
          totalRows = contracts.length;
          totalPages = Math.ceil(totalRows / rowsPerPage);

          const startIndex = (currentPage - 1) * rowsPerPage;
          const endIndex = startIndex + rowsPerPage;
          const contractsToShow = contracts.slice(startIndex, endIndex);

          const cardTableBody = document.getElementById('cardTableBody');
          cardTableBody.innerHTML = ''; // Clear existing rows

          if (contractsToShow.length > 0) {
            contractsToShow.forEach((contract, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                <td style="padding: 8px; border-bottom: 1px solid #ccc;">${startIndex + index + 1}</td>
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

          // Update the pagination information
          const currentPageSpan = document.getElementById('currentPage');
          const totalPagesSpan = document.getElementById('totalPages');
          currentPageSpan.textContent = currentPage;
          totalPagesSpan.textContent = totalPages;
        } else {
          // If no data is returned from the API
          const alertRow = document.getElementById('alertRow');
          alertRow.style.display = 'table-row';
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
    }

    function editContract(contractId) {
        console.log(contractId);
    }

    function deleteContract(contractId) {
      
        Swal.fire({
            icon: 'info',
            'title': 'Are You sure',
            confirmButtonText: 'Delete',
            showCancelButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              // Delete
              // If user confirms the deletion, proceed with the actual deletion
           const deleteObj = {
                      objectId: contractId,
                    };
          
                    fetch("https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToDelete", {
                      method: "DELETE",
                      body: JSON.stringify(deleteObj),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("API Response for delete:", data);
                      Swal.fire('Success', 'Contract SuccessFully', 'success')
                      fetchAndShowContracts();
                    })
                    .catch((error) => console.error("Error deleting contract:", error));
                    fetchAndShowContracts();
            }
          })
    }

    // Call fetchAndShowContracts initially to populate the table
    fetchAndShowContracts();

    // Call fetchAndShowContracts every 10 seconds (adjust the interval as needed)
    setInterval(fetchAndShowContracts, 10000); // 10000 milliseconds = 10 seconds

      // Pagination functions
      function prevPage() {
      if (currentPage > 1) {
        currentPage--;
        fetchAndShowContracts();
      }
    }

    function nextPage() {
      if (currentPage < totalPages) {
        currentPage++;
        fetchAndShowContracts();
      }
    }

    function goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        fetchAndShowContracts();
      }
    }

    function updatePagination() {
      const paginationSection = document.getElementById('paginationSection');
      paginationSection.innerHTML = '';

      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous';
      prevButton.onclick = prevPage;

      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.onclick = nextPage;

      paginationSection.appendChild(prevButton);

      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => goToPage(i);
        paginationSection.appendChild(pageButton);
      }

      paginationSection.appendChild(nextButton);
    }



// add fullfillment contract 
// $(document).ready(function () {
//     $("#CreateContractRatesBtn").click(function () {
//         let cName = $("#cName").val().trim();
//         let centers = $("#centers").val().trim();
//         let startDate = $("#startDate").val().trim();
//         let endDate = $("#endDate").val().trim();
//         const selectedCenterId = localStorage.getItem("selectedCenterId");
//         console.log("parascebterID", selectedCenterId);

//         if (cName === "" || centers === "" || startDate === "" || endDate === "") {
//             // Show the common error message for all required fields
//             const startDateEndDate = document.getElementById("startDate-EndDate");
//             startDateEndDate.textContent = "Please fill all required fields"; // Set the error message text
//             startDateEndDate.style.color = "red"; // Set the color to red
//             startDateEndDate.style.display = "block";
//             $("#CreateContractRatesBtn").prop("disabled", true); // Disable the button
//         } else {
//             // Hide the common error message if all fields are filled
//             const startDateEndDate = document.getElementById("startDate-EndDate");
//             startDateEndDate.style.display = "none";

//             // Api Logic for post data
//             let postContract = {
//                 Fulfillment_Center: {
//                     "objectId": selectedCenterId
//                 },
//                 User_ID: {
//                     "objectId": objID
//                 },
//                 Contract_name: cName,
//                 Start_Date: startDate,
//                 End_Date: endDate,
//             };

//             fetch(
//                 "https://cleanstation.backendless.app/api/services/FulfilmentContract/CreateContract",
//                 {
//                     method: "POST",
//                     body: JSON.stringify(postContract),
//                     headers: {
//                         "Content-type": "application/json; charset=UTF-8",
//                     },
//                 }
//             )
//                 .then((response) => response.json())
//                 .then((data) => {
//                     console.log("Paras API", data);
//                     // Continue with the logic or update the UI as needed

//                     // Hide #CreateFulfillmentContractBlock and show #fulfillmentContractSection
//                     $("#CreateFulfillmentContractBlock").hide();
//                     $("#fulfillmentContractSection").show();
//                     $("#contractsReatessection").show();
                    

//                     // Enable the button again
//                     $("#CreateContractRatesBtn").prop("disabled", false);
//                 })
//                 .catch((error) => {
//                     console.error("Error:", error);
//                     // Enable the button in case of API error to allow the user to try again
//                     $("#CreateContractRatesBtn").prop("disabled", false);
//                 });
//         }
//     });
// });

$(document).ready(function () {
    $("#CreateContractRatesBtn").click(function () {
      let cName = $("#cName").val().trim();
      let centers = $("#centers").val().trim();
      let startDate = $("#startDate").val().trim();
      let endDate = $("#endDate").val().trim();

      console.log("cName:", cName);
      console.log("centers:", centers);
      console.log("startDate:", startDate);
      console.log("endDate:", endDate);

      if (cName === "" || centers === "" || startDate === "" || endDate === "") {
        // Show the common error message for all required fields
        const startDateEndDate = document.getElementById("startDate-EndDate");
        startDateEndDate.textContent = "Please fill all required fields"; // Set the error message text
        startDateEndDate.style.color = "red"; // Set the color to red
        startDateEndDate.style.display = "block";
      } else {
        // Hide the common error message if all fields are filled
        const startDateEndDate = document.getElementById("startDate-EndDate");
        startDateEndDate.style.display = "none";

        // Set values in the fulfillmentContractSection
        $("#ContractNameText").val(cName);
        $("#startDateText").val(startDate);
        $("#endDateText").val(endDate);
        $("#fcNameText").val(centers);

        // Hide #CreateFulfillmentContractBlock and show #fulfillmentContractSection and #contractsReatessection
        $("#CreateFulfillmentContractBlock").hide();
        $("#fulfillmentContractSection").show();
        $("#contractsReatessection").show();
      }
    });
  });

