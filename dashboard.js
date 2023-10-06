// Check if the user is logged in
const userData = localStorage.getItem("userData");
const data = JSON.parse(userData);
const objID = data.objectId;
// const token = data.user-token;
let UserBrandID;

$("#loginBtn").hide();
$("#UserNameBlock").show();
$("#GetStartedButton").hide();
$("#tabBlockAfterlogin").show();
$("#tabBlockBeforelogin").hide();
$("#LogOutButton").show();

document.getElementById("UserNameText").innerHTML = data.first_name;

// Check Brand for User have or not
$(document).ready(function () {
  // Fetch user data from localStorage for session management
  const userData = localStorage.getItem("userData");
  if (userData) {
    const data = JSON.parse(userData);
    $.ajax({
      url: "https://cleanstation.backendless.app/api/services/Brand/CheakBrand",
      type: "POST",
      data: JSON.stringify({ objectId: data.objectId }),
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      success: function (response) {
        if (response === true) {
          $("#MainSection").show();
          $("#CreateBrandSection").hide();
        } else {
          $("#MainSection").hide();
          $("#tabBlock").hide();
          $("#CreateBrandSection").show();
        }
      },
      error: function (error) {},
    });
  }
});

// Show Create Fulfillment Contract Section
$(document).ready(function () {
  $("#AddFulfillmentContractButton").click(function () {
    $("#Create")
      .css("display", "block")
      .css("textDecoration", "underline")
      .css("textDecorationColor", "#78C045");
    $("#mainSection").css("textDecoration", "none");
    $("#mainSection").css("textDecorationColor", "none");
    $("#MainSection").hide();
    $("#CreateFulfillmentContractSection").show();
  });
});

// Cancel (hide) Create Fulfillment Contract Section
$(document).ready(function () {
  $("#CancelCreateFulfillmentContract").click(function () {
    $("#CreateFulfillmentContractSection").hide();
    $("#Create").hide();
    $("#MainSection").show();

     // reset the input fields 
     $("#cName").val("");
     $("#centers").val("");
     $("#startDate").val("");
     $("#endDate").val("");
     $("#total-Days-aftrlog").text("");
    
  });
});

// Show Edit Fulfillment Contract Section 
$(document).ready(function () {
  $("#FulfillmentContractEditButton").click(function () {
    $("#MainSection").hide();
    $("#UpdateFulfillmentContractSection").show();
  });
});

// Show Fulfillemnt Contract List Section 
$(document).ready(function () {
  $("#FCDetail").click(function () {
    $("#MainSection").hide();
    $("#FulfillmentContractDetailSection").show();
  });
});

//  Cancel Create Contract Rate Section  
$(document).ready(function () {
  $("#CancelCreateContractButton").click(function () {
    $("#fulfillmentContractSection").hide();
    $("#MainSection").show();

    // reset input fields
    $("#Baseorderfee").val("");
    $("#additionalPickfee").val("");
    $("#BaseReturnFee").val("");
    $("#PerKitFee").val("");
    $("#PalletFee").val("");
    $("#SelfFee").val("");
    $("#BinFee").val("");
    $("#palletReciiptRate").val("");
    $("#CaseRecipRate").val("");
    $("#WHlabor").val("");
    $("#laborOtrate").val("");
    $("#laborItrate").val("");
    $("#ManagmentFee").val("");
    $("#MinimumFee").val("");
    $("#ParcelManifesFee").val("");
    $("#internationalFee").val("");

  });
});

// Create Brand and Check Validation
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
      showError("#Brand-URlerror", "Brand URL should not be blank");
    } else {
      hideError("#Brand-URlerror");
    }
  });

  $("#Brand-URl").on("input", function () {
    let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
    if (!ShoppingCartDropDown) {
      showError("#ShoppingCartDropDown", "Please select shopping cart");
    } else {
      hideError("#ShoppingCartDropDown");
    }
  });

  $("#CreateBrandButton").click(function () {
    let BrandName = $("#Brand-Name").val();
    let BrandURl = $("#Brand-URl").val();
    let ShoppingCartDropDown = $("#ShoppingCartDropDown").val();
    let userobjId = objID;

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
          const BrandMessage = document.getElementById("BrandMessage");
          BrandMessage.innerHTML = "Brand created successfully";
          BrandMessage.style.color = "white";
          BrandMessage.style.backgroundColor = "green";
          BrandMessage.style.display = "block";
          $("#MainSection").show();
          $("#CreateBrandSection").hide();
          document.getElementById("Brand-URl-Text").innerHTML = data.URL;
          document.getElementById("BrandNameText").innerHTML = data.brand_name;
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

//Logout the User and data data from the local Storage
$(document).ready(function () {
  $("#LogOutButton").click(function () {
    localStorage.removeItem("userData");
    const redirectUrl = "https://izba-exchange.webflow.io/log-in";
    window.location.href = redirectUrl;
  });
});


//Set brand name and brand url data
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
      const brandData = data;
      UserBrandID = brandData.objectId;
      document.getElementById("Brand-URl-Text").innerHTML = brandData.URL;
      document.getElementById("BrandNameText").innerHTML = brandData.brand_name;
    })
    .catch((error) => console.error("Error fetching data:", error));

// Global variables for pagination

let currentPage = 1;
const rowsPerPage = 50;
let totalRows = 0;
let totalPages = 1;
let currentContractId = null;
// Function to fetch and show contracts
function fetchAndShowContracts() {
  let userobjId = {
    objectId: objID,
  };

  fetch(
    "https://cleanstation.backendless.app/api/services/Brand/BrandContract",
    {
      method: "POST",
      body: JSON.stringify(userobjId),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // Filter out contracts with null Contract_name
        const contracts = data.filter(
          (contract) => contract.Contract_name !== null &&  contract.Contract_name.trim() !== "" );
        totalRows = contracts.length;
        totalPages = Math.ceil(totalRows / rowsPerPage);

        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const contractsToShow = contracts.slice(startIndex, endIndex);

        const cardTableBody = document.getElementById("cardTableBody");
        cardTableBody.innerHTML = "";

        if (contractsToShow.length > 0) {
          contractsToShow.forEach((contract, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="padding: 8px; border-bottom: 1px solid #ccc;">${startIndex + index + 1 }</td>
                <td style="padding: 8px; border-bottom: 1px solid #ccc;">
                  <a class="contract-name" href="#" data-contract-id="${contract.objectId }">${contract.Contract_name}</a> </td>
                <td style="padding: 8px; border-bottom: 1px solid #ccc;">
                  <div class="button-container">
                  
                  <span class="edit-btn glyphicon glyphicon-pencil" onclick="editContract('${
                    contract.objectId
                  }')"></span>
                  <span class="delete-btn glyphicon glyphicon-trash" onclick="deleteContract('${
                    contract.objectId
                  }')"></span>
                  </div>
                </td>
              `;
            cardTableBody.appendChild(row);
          });
        } else {
          // Show "No contract data found" message in the custom alert row
          const alertRow = document.getElementById("alertRow");
          alertRow.style.display = "table-row";
        }

        // Update the pagination information
        const currentPageSpan = document.getElementById("currentPage");
        const totalPagesSpan = document.getElementById("totalPages");
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = totalPages;

        // Add event listener to Contract Name cells
        const contractNameCells = document.querySelectorAll(".contract-name");
        contractNameCells.forEach((cell) => {
          cell.addEventListener("click", () => {
            const contractId = cell.dataset.contractId;
            currentContractId = contractId;
            localStorage.setItem("contactID", contractId);

            fetchAndShowContractDetails(contractId);

          });
        });
      } else {
        // If no data is returned from the API
        const alertRow = document.getElementById("alertRow");
        alertRow.style.display = "table-row";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to fetch and show contract details
function fetchAndShowContractDetails(contractId) {
  let contractDetails = {
    objectId: contractId,
  };

  fetch(
    "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToContractDetail",
    {
      method: "POST",
      body: JSON.stringify(contractDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const startDatee = new Date(data.Start_Date);
      const endDatee = new Date(data.End_Date);

      // Set the data in the contract details section
      $("#fcNameContract").text(data.Contract_name);
      $("#fcNameTextt").text(data.Center_name);

      $("#startDateTextt").text(
        `${startDatee.getDate()}/${
          startDatee.getMonth() + 1
        }/${startDatee.getFullYear()}`
      );
      $("#endDateTextt").text(
        `${endDatee.getDate()}/${
          endDatee.getMonth() + 1
        }/${endDatee.getFullYear()}`
      );

      const timeDifference = endDatee.getTime() - startDatee.getTime();
      // Convert the time difference to days
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      document.getElementById("daysDifferenceafterlog").innerHTML = daysDifference + " Days";

      $("#brandNameText").text(data.Brand_Name);
      $("#baseorderfeeTextt").text(data.Base_Per_Order_Fee);
      $("#addPickFeetext").text(data.Additional_Pick_Fee);
      $("#perKitFeetxt").text(data.Additional_Pick_Kit);
      $("#baseReturnTextt").text(data.Base_Per_Return_Fee);
      $("#palletFeeText").text(data.Storage_Per_Pallet);
      $("#shelfFeetext").text(data.Storage_Per_Shelf);
      $("#binfeeTextt").text(data.Storage_Per_Bin);
      $("#palletReceiptfeetext").text(data.Receipt_Per_Pallet_Fee);
      $("#caseReceiptfeetxt").text(data.Receipt_Per_Case_Fee);
      $("#whousetxt").text(data.Labor_Warehouse_Rate);
      $("#otText").text(data.Labor_OT_Rate);
      $("#itText").text(data.Labor_IT_Rate);
      $("#managmentText").text(data.Management_Fee);
      $("#minimumfeeTextt").text(data.Minimum_Fee);
      $("#Menifesttext").text(data.Manifest_Fee);
      $("#internationltext").text(data.International_Surcharge_Fee);

      // Show the contract details section
      $("#FulfillmentContractDetailSection").show();
      $("#FCDetailBlock").show();
      fetchRateData();

      $("#Detail").css("display", "block");
      $("#MainSection").hide();
    })
    .catch((error) => console.error("Error fetching contract details:", error));

}

// ************************************

// Trigger the fetchAndShowContracts function when needed, e.g., on button click
$("#fetchContractsButton").click(function () {
  fetchAndShowContracts();
});

//   manage breadcrumb
$("#mainSection").click(function () {
  $(
    "#Detail, #Create, #Update, #RCDetail, #RCCreate, #RCUpdate, #CreateService"
  ).hide();
  $("#mainSection").css("textDecoration", "underline");
  $("#mainSection").css("textDecorationColor", "#78C045");
  $("#MainSection").show();
  $("#createServiceSection").hide();
  $("#ratecardDetailSection").hide();
  $("#UpdateRateCard").hide();
  $("#CreateRateCardSection").hide();
  $("#NewFulfillmentCenterSection").hide();
  $("#UpdateFulfillmentContractSection").hide();
  $("#FulfillmentContractDetailSection").hide();
  $("#fulfillmentContractSection").hide();
  $("#CreateFulfillmentContractSection").hide();
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
});

$("#Detail").click(function () {
  $("#Detail").css("textDecoration", "underline");
  $("#Detail").css("textDecorationColor", "#78C045");
  $("#estimate").css("textDecoration", "none");
  $("#estimate").css("textDecorationColor", "none");
  $("#Update").hide();
  $("#Create").hide();
  $("#RCDetail").hide();
  $("#RCCreate").hide();
  $("#RCUpdate").hide();
  $("#CreateService").hide();
  $("#FulfillmentContractDetailSection").show();
  $("#MainSection").hide();
  $("#createServiceSection").hide();
  $("#ratecardDetailSection").hide();
  $("#UpdateRateCard").hide();
  $("#CreateRateCardSection").hide();
  $("#NewFulfillmentCenterSection").hide();
  $("#UpdateFulfillmentContractSection").hide();
  $("#fulfillmentContractSection").hide();
  $("#CreateFulfillmentContractSection").hide();
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
});

$("#Create").click(function () {
  $("#Update").hide();
  $("#Create").css("textDecoration", "underline");
  $("#Create").css("textDecorationColor", "#78C045");
  $("#estimate").css("textDecoration", "none");
  $("#estimate").css("textDecorationColor", "none");
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
});

$("#Update").click(function () {
  $("#Update").css("textDecoration", "underline");
  $("#Update").css("textDecorationColor", "#78C045");
  $("#estimate").css("textDecoration", "none");
  $("#estimate").css("textDecorationColor", "none");
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
});

$("#RCUpdate").click(function () {
  $("#RCUpdate").css("textDecoration", "underline");
  $("#RCUpdate").css("textDecorationColor", "#78C045");
  $("#estimate").css("textDecoration", "none");
  $("#estimate").css("textDecorationColor", "none");
  $("#Detail").css("textDecoration", "none");
  $("#Detail").css("textDecorationColor", "none");
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
});

$("#RCCreate").click(function () {
  $("#RCCreate").css("textDecoration", "underline");
  $("#RCCreate").css("textDecorationColor", "#78C045");
  $("#estimate").css("textDecoration", "none");
  $("#estimate").css("textDecorationColor", "none");
  $("#Detail").css("textDecoration", "none");
  $("#Detail").css("textDecorationColor", "none");
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
});

$("#RCDetail").click(function () {
  $("#RCDetail").css("textDecoration", "underline");
  $("#RCDetail").css("textDecorationColor", "#78C045");
  $("#estimate").css("textDecoration", "none");
  $("#estimate").css("textDecorationColor", "none");
  $("#Detail").css("textDecoration", "none");
  $("#Detail").css("textDecorationColor", "none");
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
  $("#ratecardDetailSection").show();
  $("#createServiceSection").hide();
  $("#CreateService").hide();
});

$("#CreateService").click(function () {
  $("#CreateService").css("textDecoration", "underline");
  $("#CreateService").css("textDecorationColor", "#78C045");
  $("#estimate").css("textDecoration", "none");
  $("#estimate").css("textDecorationColor", "none");
  $("#Detail").css("textDecoration", "none");
  $("#Detail").css("textDecorationColor", "none");
  $(this).css({
    textDecoration: "underline",
    textDecorationColor: "#78C045",
  });
});

// Edit fullfillment contract
function editContract(contractId) {
  // formate Date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const apiUrl =
    "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToContractDetail";

  // Create the request body with the contractId
  const requestBody = {
    objectId: contractId,
  };

  // Fetch data from the API
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Data is retrieved successfully, now set the values in the form
      $("#fcnameforupdate").val(data.Contract_name);
      $("#editcemters").val(localStorage.getItem("selectedCenterName"));
      $("#upstartDate").val(formatDate(data.Start_Date));
      $("#upendDate").val(formatDate(data.End_Date));
      $("#updateBaseorderfee").val(data.Base_Per_Order_Fee);
      $("#updateAddfee").val(data.Additional_Pick_Fee);
      $("#updateBaseReturnrfee").val(data.Base_Per_Return_Fee);
      $("#updatePerKitfee").val(data.Additional_Pick_Kit);
      $("#updatepalletfee").val(data.Storage_Per_Pallet);
      $("#updateShelfrfee").val(data.Storage_Per_Shelf);
      $("#updateBinrfee").val(data.Storage_Per_Bin);
      $("#updateReceiptRate").val(data.Receipt_Per_Case_Fee);
      $("#updateCasereceiptrate").val(data.Receipt_Per_Pallet_Fee);
      $("#updateWHlabor").val(data.Labor_Warehouse_Rate);
      $("#updateOtrate").val(data.Labor_OT_Rate);
      $("#updateItRate").val(data.Labor_IT_Rate);
      $("#updateManagmentfee").val(data.Management_Fee);
      $("#updateMinimumfee").val(data.Minimum_Fee);
      $("#updateManifestfee").val(data.Manifest_Fee);
      $("#updateINTfee").val(data.International_Surcharge_Fee);

      // Show the update form section
      $("#UpdateFulfillmentContractSection").show();
      $("#Update").css("display", "block");
      $("#MainSection").hide();

      // Attach the event listener to the #UpdateContractRateButton inside the editContract function
      $("#UpdateContractRateButton").click(function () {
        // Get the updated data from the form fields
        const Contract_name = $("#fcnameforupdate").val();
        const Center_name = $("#editcemters").val(localStorage.getItem("selectedEditCenterName"));
        const Labor_Warehouse_Rate = $("#updateWHlabor").val();
        const Storage_Per_Pallet = $("#updatepalletfee").val();
        const Base_Per_Return_Fee = $("#updateBaseReturnrfee").val();
        const End_Date = $("#upendDate").val();
        const Start_Date = $("#upstartDate").val();
        const storagePerBin = $("#updateBinrfee").val();
        const International_Surcharge_Fee = $("#updateINTfee").val();
        const Minimum_Fee = $("#updateMinimumfee").val();
        const Management_Fee = $("#updateManagmentfee").val();
        const Base_Per_Order_Fee = $("#updateBaseorderfee").val();
        const Manifest_Fee = $("#updateManifestfee").val();
        const Labor_IT_Rate = $("#updateItRate").val();
        const Labor_OT_Rate = $("#updateOtrate").val();
        const additionalPickfee = $("#updateAddfee").val();
        const Receipt_Per_Case_Fee = $("#updateReceiptRate").val();
        const Storage_Per_Shelf = $("#updateShelfrfee").val();
        const Additional_Pick_Kit = $("#updatePerKitfee").val();
        const Receipt_Per_Pallet_Fee = $("#updateCasereceiptrate").val();

        // Create the request body for the update API
        const requestBody = {
          Fulfillment_Contract_ID: {
            objectId: contractId,
          },
          Fulfillment_Center_ID: {
            objectId:
              localStorage.getItem("selectedEDITCenterId") ||
              localStorage.getItem("selectedCenterId"),
          },
          Contract_name: Contract_name,
          Center_name: Center_name,
          Labor_Warehouse_Rate: Labor_Warehouse_Rate,
          Storage_Per_Pallet: Storage_Per_Pallet,
          Storage_Type: true,
          Base_Per_Return_Fee: Base_Per_Return_Fee,
          End_Date: End_Date,
          Labor_OT_Rate: Labor_OT_Rate,
          Storage_Per_Bin: storagePerBin,
          International_Surcharge_Fee: International_Surcharge_Fee,
          Minimum_Fee: Minimum_Fee,
          Management_Fee: Management_Fee,
          Base_Per_Order_Fee: Base_Per_Order_Fee,
          Start_Date: Start_Date,
          Manifest_Fee: Manifest_Fee,
          Labor_IT_Rate: Labor_IT_Rate,
          Additional_Pick_Fee: additionalPickfee,
          Receipt_Per_Case_Fee: Receipt_Per_Case_Fee,
          Storage_Per_Shelf: Storage_Per_Shelf,
          Additional_Pick_Kit: Additional_Pick_Kit,
          Receipt_Per_Pallet_Fee: Receipt_Per_Pallet_Fee,
        };

        // Make the PUT request to update the contract
        fetch(
          "https://cleanstation.backendless.app/api/services/FulfilmentContract/Update",
          {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Contract updated successfully, show the success message
            Swal.fire("Success", "Contract updated successfully", "success");
            fetchAndShowContracts();
            $("#UpdateFulfillmentContractSection").hide();
            $("#MainSection").show();
            $("#fcBlock").show();
          })
          .catch((error) => {
            console.error("Error updating contract:", error);
            Swal.fire(
              "Error",
              "An error occurred while updating the contract",
              "error"
            );
          });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Delete Fullfillment Contract
function deleteContract(contractId) {
  Swal.fire({
    icon: "info",
    title: "Are You sure",
    confirmButtonText: "Delete",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete
      // If user confirms the deletion, proceed with the actual deletion
      const deleteObj = {
        objectId: contractId,
      };

      fetch(
        "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToDelete",
        {
          method: "DELETE",
          body: JSON.stringify(deleteObj),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Success", "Contract Delete SuccessFully", "success");
          fetchAndShowContracts();
        })
        .catch((error) => console.error("Error deleting contract:", error));
      fetchAndShowContracts();
    }
  });
}

// canselEdit for Contract Update
$("#CancelUpdateContractButton").click(function () {
  $("#UpdateFulfillmentContractSection").hide();
  $("#Update").hide();
  $("#MainSection").show();
  $("#fcBlock").show();
});

// cansel ratecard button
$("#rateCancelButton").click(function () {
  $("#ratecardDetailSection").hide();
  $("#FulfillmentContractDetailSection").show();
  $("#CreateRateCardSection").hide();
  $("#UpdateRateCard").hide();
});



//-----------------------------------Start - Rate Card Functions-----------------------------------

// Function to Show Rate Card data fetch data from API
async function fetchRateData() { 
  
  const response = await fetch(
    "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToRateCard",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      objectId: localStorage.getItem("contactID"),
      }),
    }
  );

  const data = await response.json();
    // Test 
    if (data.length === 0) {
    // Show the "No rate card for this contact" message if no data is available
    document.getElementById("rate-table-body").innerHTML = "";
    document.getElementById("rate-no-data-message").style.display = "block";
    return;
    } else{

    document.getElementById("rate-no-data-message").style.display = "none";

    const tableBody = document.getElementById("rate-table-body");

    tableBody.innerHTML = data
      .map((item) => {
        const brandContract = item.Brand_Contract ? '<span class="yes">Yes</span>' : '<span class="no">No</span>';

        // Add onclick event to the rate card name <td> element
        return `
                <tr>
                    <td class="rate-card-name">
                    <a class="rate-card-link" href="#" onclick="handleRateCardClick('${item.objectId}')">${item.Rate_Card_Name}</a> </td>
                    <td>${item.Carrier_Type}</td>
                    <td>${brandContract}</td>
                    <td>${new Date(item.created).toLocaleString()}</td>
                    <td>
                        <span class="edit-btn glyphicon glyphicon-pencil" onclick="handleRateEdit('${item.objectId}')"></span>
                        <span class="delete-btn glyphicon glyphicon-trash" onclick="RateCardDelete('${item.objectId}')"></span>
                    </td>
                </tr>
            `;
      })
      .join("");

  }
    return data;
}


// Show Create rate Card section 
$(document).ready(function () {
  $("#addRetecard").click(function () {
    $("#CreateRateCardSection").show();
    $("#RCCreate").css("display", "block");
    $("#MainSection").hide();
    $("#FulfillmentContractDetailSection").hide();
  });
});

// Cancel Create Rate Card Section 
$(document).ready(function () {
  $("#CancelRateCardButton").click(function () {
    $("#FulfillmentContractDetailSection").show();
    $("#CreateRateCardSection").hide();
    $("#RCCreate").hide();

      // reset the values
      $("#rcName").val("");
      $("#Carrier_Type").val("USPS");
      document.getElementById("toggleSwitch").checked = false;
  });
});



// Create Rate Card 
$(document).ready(function () {
  $("#addRCcardbtn").click(function () {

    let ratecarName = $("#rcName").val();
    let Carrier_Type = $("#Carrier_Type").val();
    let toggleSwitch = $("#toggleSwitch").val(); 
    let Brand_Contract = (toggleSwitch === "true");    

    const rateCardmessage = document.getElementById("rateCardmessage");

    if (ratecarName !== "" && Carrier_Type !== "" && Brand_Contract !== "" ) {
      rateCardmessage.style.display = "none" ;
      let ratecardDetail = {
        Fulfillment_Contract_ID: {
          objectId: currentContractId,
        },
        Rate_Card_Name: ratecarName,
        Carrier_Type: Carrier_Type,
        Brand_Contract: Brand_Contract,
      };
      fetch(
        `https://cleanstation.backendless.app/api/services/ZoneRateCard/CreateRateCardDetail`,
        {
          method: "POST",
          body: JSON.stringify(ratecardDetail),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Success", "Rate Card created successfully", "success");

          $("#FulfillmentContractDetailSection").show();
          $("#RCCreate").hide();
          $("#CreateRateCardSection").hide();
          fetchRateData();


          // reset the values
          $("#rcName").val("");
          $("#Carrier_Type").val("USPS");
          document.getElementById("toggleSwitch").checked = false;
          
        })
        .catch((error) => console.error("Error:", error));
    } else {
      rateCardmessage.innerHTML = "Please fill all the required fields.";
      rateCardmessage.style.color = "red";
      rateCardmessage.style.display = "block";
    }
  });
});

// Set data in update rateCards section
function handleRateEdit(objectId) {
 let ratecardID = {
    objectId: objectId,
  };
  fetch(
    "https://cleanstation.backendless.app/api/services/ZoneRateCard/IDToRateCard",
    {
      method: "POST",
      body: JSON.stringify(ratecardID),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("updaterateCard").value = data.objectId;
      document.getElementById("updateRateCard").value = data.Rate_Card_Name;
      document.getElementById("updateCarrierType").value = data.Carrier_Type;
      if (data.Brand_Contract) {  
        document.getElementById("updatetoggleSwitch").checked = true;
      }else{
        document.getElementById("updatetoggleSwitch").checked = false;
      }
    });

$("#ratecardDetailSection").hide();
  $("#FulfillmentContractDetailSection").hide();
  $("#UpdateRateCard").show();
  $("#RCUpdate").show();
}



// Click Funtion to update rate card
$("#updaterateCard").click(function () {
  let updateRateCardOdjectId = $("#updaterateCard").val();
 let rateCradNameforupdate1 = $("#updateRateCard").val();
 let updateCarrierType1 = $("#updateCarrierType").val();
 let updatetoggleSwitch1 = $("#updatetoggleSwitch").val(); 
 let updatetoggleSwitchValue1 = (updatetoggleSwitch1 === "true");  

console.log("check rat card object id", updateRateCardOdjectId);
  const updatedData = {
    objectId: updateRateCardOdjectId,
    Rate_Card_Name: rateCradNameforupdate1,
    Carrier_Type: updateCarrierType1,
    Brand_Contract: updatetoggleSwitchValue1,
  };
  fetch(
    "https://cleanstation.backendless.app/api/services/ZoneRateCard/Update",
    {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      Swal.fire("Success", "Rate Card Updated successfully", "success");
      $("#ratecardDetailSection").hide();
      $("#UpdateRateCard").hide();
      $("#RCUpdate").hide();
      $("#FulfillmentContractDetailSection").show();
      fetchRateData();
    })
    .catch((error) => console.error("Error updating rate card:", error));
});


// Function to Delete rate card
function RateCardDelete(objectId) {
  Swal.fire({
    icon: "info",
    title: "Are You sure",
    confirmButtonText: "Delete",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete
      // If user confirms the deletion, proceed with the actual deletion
      const deleteRateObj = {
        objectId: objectId,
      };
      fetch(
        "https://cleanstation.backendless.app/api/services/ZoneRateCard/Rate_Card_Delete",
        {
          method: "DELETE",
          body: JSON.stringify(deleteRateObj),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          fetchRateData();
          // renderRateTable(rateCurrentPage);
          Swal.fire("Success", "Rate Card Delete SuccessFully", "success");
        })
        .catch((error) => console.error("Error deleting Rate Card:", error));
    }
  });
}

//-----------------------------------End - Rate Card Functions-----------------------------------

// rate card detail
function handleRateCardClick(objectId) {
  $("#ratecardDetailSection").show();
  $("#RCDetail").show();
  $("#FulfillmentContractDetailSection").hide();
  let ratecardID = {
    objectId: objectId,
  };
  fetch(
    "https://cleanstation.backendless.app/api/services/ZoneRateCard/IDToRateCard",
    {
      method: "POST",
      body: JSON.stringify(ratecardID),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("RateCardNameText").innerHTML = data.Rate_Card_Name;       
      document.getElementById("CarrierTypeText").innerHTML = data.Carrier_Type;
      document.getElementById("BrandContractText").innerHTML = data.Brand_Contract;
    })
    .catch((error) => console.error("Error fetching data:", error));

  // cansel service button
  $("#CancelCreateServiceButton").click(function () {
    $("#ratecardDetailSection").show();
    $("#createServiceSection").hide();
    $("#CreateService").hide();
    $("#FulfillmentContractDetailSection").hide();
    $("#CreateRateCardSection").hide();

    // reset input fields 
    $("#serviceName").val("");
    $("#WeightRangeValueText").val("");
    return;
  });

  //   Ceate Service
  $("#CreateServiceButton").off("click").on("click", function () {
    let serviceName = $("#serviceName").val();
    let weightRange = $("#WeightRangeValueText").val();
    let Weight_Range = parseInt(weightRange, 10);
    const weightUnit = localStorage.getItem("weightUnit");
    let Weight_Unit = weightUnit.toString();
    if (serviceName !== "") {
      serviceaddError.style.display = "none";
      let Servicedetail = {
        Rate_Card_Id: {
          objectId: objectId,
        },
        Name: serviceName,
        Weight_Unit: Weight_Unit,
        Weight_Range: Weight_Range,
      };
      fetch(
        "https://cleanstation.backendless.app/api/services/ZoneServices/Create",
        {
          method: "POST",
          body: JSON.stringify(Servicedetail),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let serviceId = data.objectId;
          handleServiceId(serviceId);
          // reset input fields
          $("#serviceName").val("");
          $("#WeightRangeValueText").val("");
          Swal.fire("Success", "Service created successfully", "success");
          $("#ratecardDetailSection").show();
          $("#createServiceSection").hide();
          $("#CreateService").hide();
          $("#ratecardSectioncreate").hide();
          $("#createrateCardsection").hide();
          $("#CreateRateCardmainSection").hide();
          loadAndGenerateSections();       
        })
        .catch((error) => console.error("Error:", error));
    } else {
      $("#serviceName").val("");
      const serviceaddError = document.getElementById("serviceSuccessMessage");
      serviceaddError.innerHTML = "Please fill all the required fields.";
      serviceaddError.style.color = "red";
      serviceaddError.style.display = "block";
    }
    return false;
  });

  // Show Service For Particular ratecard

  async function toggleCollapseRow(name) {
    var content = document.getElementById("collapseContent-" + name);
    content.style.display = content.style.display === "none" ? "block" : "none";
  }

  // update values uisng put request
  async function updateData(objectId, zoneNumber, updatedValue) {
    const requestBody = {
      Zone_Card_ID: {
        objectId: objectId,
      },
      Zone: zoneNumber,
      Value: updatedValue,
    };

    fetch(
      "https://cleanstation.backendless.app/api/services/ZoneServices/ZonePriceUpdate",
      {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error updating contract:", error);
      });
  }

  function addRow(name, item) {
     // Check if a service with the same name already exists
  const existingService = document.querySelector(`[data-service-name="${name}"]`);

  if (existingService) {
    // Service with the same name already exists, do not add it again
    return;
  }
    var container = document.getElementById("mainContainer");

    var sectionContainer = document.createElement("div");
    sectionContainer.className = "container";

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex justify-content-between";
    buttonContainer.style.padding = "0px 20px";
    buttonContainer.style.display = "flex";
    sectionContainer.style.background = "#f0f0f0";
    sectionContainer.style.width = "100%";

    var collapseButton = document.createElement("div");
    collapseButton.className = "collapse-button";
    collapseButton.style.background = "#f0f0f0";
    collapseButton.style.marginTop = "10px";
    collapseButton.style.marginBottom = "10px";
    collapseButton.style.fontSize = "25px";
    collapseButton.style.fontWeight = "bold";
    collapseButton.textContent = name + " - " + item.Weight_Unit;
    collapseButton.onclick = function () {toggleCollapseRow(name); };
    buttonContainer.appendChild(collapseButton);

    var actionButtons = document.createElement("div");
    actionButtons.className = "action-buttons";
    actionButtons.style.alignItems = "center";
    actionButtons.style.cursor = "pointer";


    var deleteButton = document.createElement("i");
    deleteButton.className = "fas fa-trash-alt";
    actionButtons.appendChild(deleteButton);

    deleteButton.onclick = function () {
      var objectId = item.objectId;
      Swal.fire({
        icon: "info",
        title: "Are You sure",
        confirmButtonText: "Delete",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Delete
          const deleteObj = {
            objectId: objectId,
          };
          fetch(
            "https://cleanstation.backendless.app/api/services/ZoneServices/ServiceIDToDelete",
            {
              method: "DELETE",
              body: JSON.stringify(deleteObj),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              // Remove the sectionContainer from the DOM
          sectionContainer.remove();

              document.getElementById("serviceName").value = "";
              Swal.fire("Success", "Service Delete SuccessFully", "success");
              // location.reload();
            })
            .catch((error) => console.error("Error deleting contract:", error));
        }
      });
    };

    buttonContainer.appendChild(actionButtons);

    sectionContainer.appendChild(buttonContainer);

    var collapseContent = document.createElement("div");
    collapseContent.className = "collapse-content";
    collapseContent.id = "collapseContent-" + name;
    collapseContent.style.display = "none";

    var table = document.createElement("table");
    table.innerHTML = `
        <thead>
          <tr>
            <th style="text-align: center; width: 80px;">Weight</th>
            <th style="text-align: center;">Zone 1</th>
            <th style="text-align: center;">Zone 2</th>
            <th style="text-align: center;">Zone 3</th>
            <th style="text-align: center;">Zone 4</th>
            <th style="text-align: center;">Zone 5</th>
            <th style="text-align: center;">Zone 6</th>
            <th style="text-align: center;">Zone 7</th>
            <th style="text-align: center;">Zone 8</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
        <br>
      `;

    item.Zone_Cards.sort(function (a, b) {
      return a["Weight_" + item.Weight_Unit] - b["Weight_" + item.Weight_Unit];
    });
    if (item.Weight_Unit === "OZ" || item.Weight_Unit === "LBS" || item.Weight_Unit === "KG" ) 
    {
      item.Zone_Cards.forEach(function (zoneCard) {
        var tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td  style="background-color: green; color: white; height: 30px; text-align: center;">${
              zoneCard["Weight_" + item.Weight_Unit] } ${item.Weight_Unit}</td>
                        
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="1"   value="${zoneCard.Zone_1}"  zone-object-id="${
          zoneCard.objectId
        }" /></td>
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="2"   value="${zoneCard.Zone_2}"  zone-object-id="${
          zoneCard.objectId
        }"  /></td>
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="3"   value="${zoneCard.Zone_3}"  zone-object-id="${
          zoneCard.objectId
        }"  /></td>
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="4"   value="${zoneCard.Zone_4}"  zone-object-id="${
          zoneCard.objectId
        }"  /></td>
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="5"   value="${zoneCard.Zone_5}"  zone-object-id="${
          zoneCard.objectId
        }"  /></td>
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="6"   value="${zoneCard.Zone_6}"  zone-object-id="${
          zoneCard.objectId
        }"  /></td>
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="7"   value="${zoneCard.Zone_7}"  zone-object-id="${
          zoneCard.objectId
        }" /></td>
      <td style ="padding: 2px 5px; text-align: center;"><input type="text" class="demoService" data-object-id="${
        item.objectId
      }" data-zone-number="8"   value="${zoneCard.Zone_8}"  zone-object-id="${
          zoneCard.objectId
        }"  /></td>
          `;

        var inputs = tableRow.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("input", function () {
            // Retrieve the ObjectID and zone number from the input field's data attributes
            var objectId = this.getAttribute("zone-object-id");
            var zoneNumber = parseInt(this.getAttribute("data-zone-number"));
            // Retrieve the updated value from the input field
            var updatedValue = parseFloat(this.value);
            // Perform any update operations here, for example, update the server with the new value
            updateData(objectId, zoneNumber, updatedValue);
          });
        }
        table.appendChild(tableRow);
      });
    }

    collapseContent.appendChild(table);

    sectionContainer.appendChild(collapseContent);

    container.appendChild(sectionContainer);
  }
  async function loadAndGenerateSections() {
    const apiUrl =
      "https://cleanstation.backendless.app/api/services/ZoneServices/IDToService";

    const requestBody = {
      objectId: objectId,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from API.");
      }

      const responseData = await response.json();
       // Clear existing content before adding new services
    const container = document.getElementById("mainContainer");
    container.innerHTML = "";

      responseData.forEach(function (item) {
        var name = item.Name;
        addRow(name, item);
      });
    } catch (error) {
      console.error(error);
    }
  }

  loadAndGenerateSections();

  // End here
}


function handleServiceId(id) {
  Swal.fire({
    icon: "info",
    title: "Are You sure",
    confirmButtonText: "Delete",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete
      const deleteObj = {
        objectId: id,
      };

      fetch(
        "https://cleanstation.backendless.app/api/services/ZoneServices/ServiceIDToDelete",
        {
          method: "DELETE",
          body: JSON.stringify(deleteObj),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Success", "Service Deleted SuccessFully", "success");
        })
        .catch((error) => console.error("Error deleting contract:", error));
    }
  });
}

// Call fetchAndShowContracts initially to populate the table
fetchAndShowContracts();

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
  const paginationSection = document.getElementById("paginationSection");
  paginationSection.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.onclick = prevPage;

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = nextPage;

  paginationSection.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.onclick = () => goToPage(i);
    paginationSection.appendChild(pageButton);
  }

  paginationSection.appendChild(nextButton);
}

// Add fullfillmentCenter
$("#addFCenter").click(function () {
  $("#NewFulfillmentCenterSection").show();
  $("#fcForm").show();
  $("#CreateFulfillmentContractSection").hide();
});

// cansel BTN

$("#closeFulfillmentCenterPopup").click(function () {
  $("#NewFulfillmentCenterSection").hide();
  $("#fcForm").hide();
  $("#CreateFulfillmentContractSection").show();

  // Clear Input fields
  $("#fcName").val("");
  $("#fcURL").val("");
  // $("#storageTypeDropdown").val("");
  $("#fcaddress").val("");
  $("#fcCity").val("");
  $("#fcState").val("");
  $("#fcZipCode").val("");
  $("#fcCountry").val("");
});

// Add fullfillmentCenter
$(document).ready(function () {
  $("#addFccenterBTN").click(function () {
    let fcName = $("#fcName").val();
    let fcURL = $("#fcURL").val();
    let storageTypeDropdown = $("#storageTypeDropdown").val();
    let fcaddress = $("#fcaddress").val();
    let fcCity = $("#fcCity").val();
    let fcState = $("#fcState").val();
    let fcZipCode = $("#fcZipCode").val();
    let fcCountry = $("#fcCountry").val();

    // Check if any required field is empty
    if ( !fcName || !fcURL || !storageTypeDropdown || !fcaddress || !fcCity || !fcState || !fcZipCode || !fcCountry ) {
      // Set the error message and apply red color
      $("#errorMSG").text("Please fill all required fields.");
      $("#errorMSG").css("color", "red");
      $("#errorMSG").show();
      return; // Stop the function from proceeding further
    }

    // If all required fields are filled, remove the error message and reset color
    $("#errorMSG").hide();
    $("#errorMSG").text("");
    $("#errorMSG").css("color", "initial");

    let createFCData = {
      Street_Address: fcaddress,
      ZIP_Code: parseFloat(fcZipCode) ?? 0,
      Storage_Type: storageTypeDropdown,
      City: fcCity,
      URL: fcURL,
      Center_Name: fcName,
      State: fcState,
      Country: fcCountry,
    };

    // Show a loading indicator while the API call is being made

    fetch(
      "https://cleanstation.backendless.app/api/services/Fulfillment_center/Fulfillment_Center",
      {
        method: "POST",
        body: JSON.stringify(createFCData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        $("#NewFulfillmentCenterSection").hide();
        $("#fcForm").hide();
        $("#CreateFulfillmentContractSection").show();
        Swal.fire("Success","Fulfillment Center Created Successfully", "success");
        // Add the new fulfillment center to the dropdown list
        const centerName = createFCData.Center_Name;
        const centerId = createFCData.objectId; // Assuming you have the objectId of the newly created center

        const newOption = $("<option>")
          .attr("value", centerId)
          .text(centerName);

        $("#centers").append(newOption);

        // Set the newly created center as the selected option
        $("#centers").val(centerName);

        // Clear Input fields
        $("#fcName").val("");
        $("#fcURL").val("");
        // $("#storageTypeDropdown").val("");
        $("#fcaddress").val("");
        $("#fcCity").val("");
        $("#fcState").val("");
        $("#fcZipCode").val("");
        $("#fcCountry").val("");
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

// End here

// Add fullfillment Contract
$(document).ready(function () {
  $("#CreateContractRatesBtn").click(function () {
    let cName = $("#cName").val();
    let centers = $("#centers").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();

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
      $("#ContractNameText").text(cName);
      $("#startDateText").text(startDate);
      $("#endDateText").text(endDate);
      $("#fcNameText").text(localStorage.getItem("selectedCenterName"));
      // set time diff
      const startDatelog = new Date(startDate);
      const endDatelog = new Date(endDate);

      const timeDifference = endDatelog.getTime() - startDatelog.getTime();
      // Convert the time difference to days
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      document.getElementById("daysDifferencetoshow").innerHTML = daysDifference + "Days";

      // Hide #CreateFulfillmentContractBlock and show #fulfillmentContractSection and #contractsReatessection
      $("#CreateFulfillmentContractSection").hide();
      $("#fulfillmentContractSection").show();
      $("#contractsReatessection").show();

      // reset the input fields 
      $("#cName").val("");
      $("#centers").val("");
      $("#startDate").val("");
      $("#endDate").val("");
    }
  });
});

// show section for manually and upload file
$("#EnterRatesManuallyBTN").click(function () {
  $("#FCRatesWrapper").show();
  $("#UploadSensibleFileWrapper").hide();
  $("#EnterRatesManuallyBTN").hide();
  $("#UploadSensibleFileBTN").show();
});
$("#UploadSensibleFileBTN").click(function () {
  $("#FCRatesWrapper").hide();
  $("#UploadSensibleFileBTN").hide();
  $("#UploadSensibleFileWrapper").show();
  $("#EnterRatesManuallyBTN").show();
});

$(document).ready(function () {
  let fcobjId;
  $("#CreateContractRateButton").click(function () {
    // contract details
    let Contract_name = $("#ContractNameText").text();
    let Start_Date = $("#startDateText").text();
    let End_Date = $("#endDateText").text();

    let centeName = localStorage.getItem("selectedCenterId");
    let contractvalue = localStorage.getItem("contractvalue");
    let booleanValue = JSON.parse(contractvalue);
    // pick and pack
    let Baseorderfee = $("#Baseorderfee").val();
    let additionalPickfee = $("#additionalPickfee").val();
    let BaseReturnFee = $("#BaseReturnFee").val();
    let PerKitFee = $("#PerKitFee").val();
    // Storage

    let PalletFee = $("#PalletFee").val();
    let SelfFee = $("#SelfFee").val();
    let BinFee = $("#BinFee").val();
    // Reviving
    let palletReciiptRate = $("#palletReciiptRate").val();
    let CaseRecipRate = $("#CaseRecipRate").val();
    // labor
    let WHlabor = $("#WHlabor").val();
    let laborOtrate = $("#laborOtrate").val();
    let laborItrate = $("#laborItrate").val();
    // Managment
    let ManagmentFee = $("#ManagmentFee").val();
    let MinimumFee = $("#MinimumFee").val();
    // parcel
    let ParcelManifesFee = $("#ParcelManifesFee").val();
    let internationalFee = $("#internationalFee").val();

    let postContract = {
      Fulfillment_Center: {
        objectId: centeName,
      },
      User_ID: {
        objectId: objID,
      },
      Start_Date: Start_Date,
      End_Date: End_Date,
      Base_Per_Order_Fee: parseFloat(Baseorderfee) ?? 0,
      Additional_Pick_Fee: parseFloat(additionalPickfee) ?? 0,
      Additional_Pick_Kit: parseFloat(PerKitFee) ?? 0,
      Base_Per_Return_Fee: parseFloat(BaseReturnFee) ?? 0,
      Storage_Type: booleanValue,

      Storage_Per_Pallet: parseFloat(PalletFee) ?? 0,
      Storage_Per_Shelf: parseFloat(SelfFee) ?? 0,
      Storage_Per_Bin: parseFloat(BinFee) ?? 0,
      Receipt_Per_Case_Fee: parseFloat(CaseRecipRate) ?? 0,
      Receipt_Per_Pallet_Fee: parseFloat(palletReciiptRate) ?? 0,
      Management_Fee: parseFloat(ManagmentFee) ?? 0,
      Minimum_Fee: parseFloat(MinimumFee) ?? 0,
      Labor_Warehouse_Rate: parseFloat(WHlabor) ?? 0,
      Labor_OT_Rate: parseFloat(laborOtrate) ?? 0,
      Labor_IT_Rate: parseFloat(laborItrate) ?? 0,
      Contract_name: Contract_name,
      Manifest_Fee: parseFloat(ParcelManifesFee) ?? 0,
      International_Surcharge_Fee: parseFloat(internationalFee) ?? 0,
    };

    fetch(
      "https://cleanstation.backendless.app/api/services/FulfilmentContract/CreateContract",
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
        fcobjId = data.objectId;
        hndlFcId(fcobjId);
        Swal.fire("Success", "Contract Created Successfully", "success");
        $("#FulfillmentContractDetailSection").hide();
        $("#fulfillmentContractSection").hide();
        $("#CreateFulfillmentContractSection").hide();
        $("#MainSection").show();
        $("#Create").hide();
        fetchAndShowContracts();

        $("#Baseorderfee").val("");
        $("#additionalPickfee").val("");
        $("#BaseReturnFee").val("");
        $("#PerKitFee").val("");
        $("#PalletFee").val("");
        $("#SelfFee").val("");
        $("#BinFee").val("");
        $("#palletReciiptRate").val("");
        $("#CaseRecipRate").val("");
        $("#WHlabor").val("");
        $("#laborOtrate").val("");
        $("#laborItrate").val("");
        $("#ManagmentFee").val("");
        $("#MinimumFee").val("");
        $("#ParcelManifesFee").val("");
        $("#internationalFee").val("");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", error, "error");
      });
  });
});
function hndlFcId(id) {
  let fullfillmentId = {
    objectId: id,
  };
  fetch(
    "https://cleanstation.backendless.app/api/services/FulfilmentContract/IDToContractDetail",
    {
      method: "POST",
      body: JSON.stringify(fullfillmentId),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Access the first object in the array
      const startDatee = new Date(data.Start_Date);
      const endDatee = new Date(data.End_Date);

      document.getElementById("startDateTextt").innerHTML = `${startDatee.getDate()}/${ startDatee.getMonth() + 1 }/${startDatee.getFullYear()}`;
      document.getElementById("endDateTextt").innerHTML = `${endDatee.getDate()}/${ endDatee.getMonth() + 1 }/${endDatee.getFullYear()}`;

      const timeDifference = endDatee.getTime() - startDatee.getTime();
      // Convert the time difference to days
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      document.getElementById("daysDifference").innerHTML = daysDifference + "" + "Days";
      document.getElementById("managmentText").innerHTML = "$" + data.Management_Fee;
      document.getElementById("minimumfeeTextt").innerHTML = "$" + data.Minimum_Fee;
      document.getElementById("whousetxt").innerHTML = "$" + data.Labor_Warehouse_Rate;
      document.getElementById("otText").innerHTML = "$" + data.Labor_OT_Rate;
      document.getElementById("itText").innerHTML = "$" + data.Labor_IT_Rate;
      document.getElementById("baseorderfeeTextt").innerHTML = "$" + data.Base_Per_Order_Fee;
      document.getElementById("addPickFeetext").innerHTML = "$" + data.Additional_Pick_Fee;
      document.getElementById("baseReturnTextt").innerHTML = "$" + data.Base_Per_Return_Fee;
      document.getElementById("perKitFeetxt").innerHTML = "$" + data.Additional_Pick_Kit;
      document.getElementById("binfeeTextt").innerHTML = "$" + data.Storage_Per_Bin;
      document.getElementById("shelfFeetext").innerHTML = "$" + data.Storage_Per_Shelf;
      document.getElementById("palletFeeText").innerHTML = "$" + data.Storage_Per_Pallet;
      document.getElementById("palletReceiptfeetext").innerHTML = "$" + data.Receipt_Per_Pallet_Fee;
      document.getElementById("caseReceiptfeetxt").innerHTML = "$" + data.Receipt_Per_Case_Fee;
      document.getElementById("fcNameContract").innerHTML = data.Contract_name;
      document.getElementById("fcNameTextt").innerHTML = localStorage.getItem("selectedCenterName");
      document.getElementById("Menifesttext").innerHTML = "$" + data.Manifest_Fee;
      document.getElementById("internationltext").innerHTML = "$" + data.International_Surcharge_Fee;
    })
    .catch((error) => console.error("Error fetching data:", error));
}


//  show service form
$(document).ready(function () {
  $("#AddServiceButton").click(function () {
    $("#createServiceSection").show();
    $("#CreateService").css("display", "block");
    $("#CreateRateCardSection").hide();
    $("#ratecardDetailSection").hide();
    $("#MainSection").hide();
    $("#FulfillmentContractDetailSection").hide();
  });
});

// Products section *****************************************
// fuctions for product
// delete product

async function deleteProduct(objectIdd) {
  Swal.fire({
    icon: "info",
    title: "Are You sure",
    confirmButtonText: "Delete",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete
      const deleteObj = {
        objectId: objectIdd,
      };

      fetch(
        "https://cleanstation.backendless.app/api/services/Product/DeleteProduct",
        {
          method: "DELETE",
          body: JSON.stringify(deleteObj),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Success", "Product Delete SuccessFully", "success");
          document.getElementById("ProductFIleNameInput").value = "";
          populateDropdown();
          document.getElementById("ptable").style.display = "none";

          // Hide the selected product's name
          // document.getElementById('Product-name').style.display = 'none';
          document.getElementById("selected-product-name").style.display =
            "none";

          // Hide the delete button
          document.getElementById("delete-product-button").style.display =
            "none";
        })
        .catch((error) => console.error("Error deleting contract:", error));
    }
  });
}

// }

// function for show particular products data

async function productsAlldata(objID) {
  function initializeProductTable() {
    let currentPage = 1;
    let pageSize = 30;
    let offset = 0;
    let totalDataCount = 0;
    const maxPaginationLinks = 5;

    async function fetchProductsData(offset, size) {
      // Your API URL
      const url = `https://cleanstation.backendless.app/api/services/Product/productIdToData?ID=${objID}&Offset=${offset}&Size=${size}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        totalDataCount = data.Count;
        return data.Data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }

    async function renderProductsTable(page) {
      pageSize = parseInt(document.getElementById("pageSizeSelect").value);
      offset = (page - 1) * pageSize;
      currentPage = page;
      const data = await fetchProductsData(offset, pageSize);

      const tableBody = document.getElementById("invoiceCSV-table-body");

      if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="19">No data found</td></tr>';
      } else {
        tableBody.innerHTML = data
          .map((item) => {
            return `
                <tr>
                    <tr>
                   <td>${item.Type}</td>
                  <td>${item.ProductCategory}</td>
                  <td>${item.Weight}</td>
               <td>${item.Price}</td>
                <td>${item.Handle}</td>
                <td>${item.ImageSrc}</td>
                  <td>${item.Published}</td>
                 <td>${item.SEODescription}</td>
                   <td>${item.SKU}</td>
                   <td>${item.Tags}</td>
                   <td>${item.VariantBarcode}</td>
                  <td>${item.VariantCompareAtPrice}</td>
                 <td>${item.VariantFulfillmentService}</td>
                   <td>${item.VariantInventoryPolicy}</td>
                   <td>${item.VariantInventoryTracker}</td>
                   <td>${item.VariantRequiresShipping}</td>
                   <td>${item.VariantTaxable}</td>
                   <td>${item.Vendor}</td>
                   </tr>
                </tr>
            `;
          })
          .join("");
      }
      renderProductPagination(totalDataCount, pageSize, currentPage);
    }

    function renderProductPagination(totalItems, pageSize, currentPage) {
      const totalPages = Math.ceil(totalItems / pageSize);
      const paginationElement = document.getElementById("invoice-pagination-p");
      let paginationHtml = "";

      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxPaginationLinks / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxPaginationLinks - 1);
      if (endPage - startPage + 1 < maxPaginationLinks) {
        startPage = Math.max(1, endPage - maxPaginationLinks + 1);
      }

      if (startPage > 1) {
        paginationHtml += `<li><a href="#" onclick="changePage(1)">First</a></li>`;
      }

      if (currentPage > 1) {
        paginationHtml += `<li><a href="#" onclick="changePage(${
          currentPage - 1
        })">Previous</a></li>`;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
          paginationHtml += `<li class="active"><a href="#" onclick="changePage(${i})">${i}</a></li>`;
        } else {
          paginationHtml += `<li><a href="#" onclick="changePage(${i})">${i}</a></li>`;
        }
      }

      if (currentPage < totalPages) {
        paginationHtml += `<li><a href="#" onclick="changePage(${
          currentPage + 1
        })">Next</a></li>`;
      }

      if (endPage < totalPages) {
        paginationHtml += `<li><a href="#" onclick="changePage(${totalPages})">Last</a></li>`;
      }

      paginationElement.innerHTML = paginationHtml;
    }

    window.changePage = function (pageNumber) {
      currentPage = pageNumber;
      renderProductsTable(currentPage);
    };

    window.changePageSize = function () {
      renderProductsTable(1);
    };

    // Initialize the table on page load
    renderProductsTable(currentPage);

    // Listen for the change event of the pageSizeSelect dropdown
    document
      .getElementById("pageSizeSelect")
      .addEventListener("change", changePageSize);
  }

  // Call the initialization function
  initializeProductTable();
}
// end here

$("#ProductBlockTab").click(function () {
  $("#ProductDetailSection").show();
  $("#fcBlock").hide();

  document.getElementById("ProductBlockTab").style.borderBottom = "#78C045";
  document.getElementById("fcBlockTab").style.borderBottom = "none";
});

$("#fcBlockTab").click(function () {
  $("#ProductDetailSection").hide();
  $("#UploadProductFileSection").hide();
  $("#CreateFulfillmentContractSection").hide();
  $("#fulfillmentContractSection").hide();
  $("#createServiceSection").hide();
  $("#ratecardDetailSection").hide();
  $("#UpdateRateCard").hide();
  $("#CreateRateCardSection").hide();
  $("#NewFulfillmentCenterSection").hide();
  $("#UpdateFulfillmentContractSection").hide();
  $("#FulfillmentContractDetailSection").hide();
  $("#fcBlock").show();
  $("#MainSection").show();

  document.getElementById("fcBlockTab").style.borderBottom = "#78C045";
  document.getElementById("ProductBlockTab").style.borderBottom = "none";
});

$("#UploadProductButton").click(function () {
  $("#ProductDetailSection").hide();
  $("#UploadProductFileSection").show();
});

$("#CancelUploadPFButton").click(function () {
  $("#ProductDetailSection").show();
  $("#UploadProductFileSection").hide();
});

// // show list of products  in product

const selectedProductIddd = document.getElementById("product-dropdown");
const errorMSGG = document.getElementById("errorMSGG");
errorMSGG.style.display = "none";

async function deleteSelectedProduct() {
  const selectedProductId = document.getElementById("product-dropdown").value;
  if (selectedProductId) {
    deleteProduct(selectedProductId);
    populateDropdown();
  }
}

async function populateDropdown() {
  const productData = await fetchProductData();
  const dropdown = document.getElementById("product-dropdown");

  // Clear previous options
  dropdown.innerHTML = "";

  if (productData.length > 0) {
    // Add the default option back
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a product...";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);

    productData.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.objectId;
      option.textContent = product.Name;
      dropdown.appendChild(option);
    });
    // document.getElementById('delete-product-button').style.display = 'block';
  } else {
    // Add the "No product found" message option
    const option = document.createElement("option");
    option.value = "no-product";
    option.textContent = "No product found";
    option.disabled = true;
    option.style.display = "block";
    dropdown.appendChild(option);
    document.getElementById("delete-product-button").style.display = "none";
  }
}

async function handleProductSelection() {
  const selectedProductId = document.getElementById("product-dropdown").value;

  if (selectedProductId) {
    // Call the productsAlldata function with the selectedProductId
    productsAlldata(selectedProductId);

    // Show the table
    document.getElementById("ptable").style.display = "block";

    // Show the selected product's name
    const selectedProductName = document.querySelector(
      "#product-dropdown option:checked"
    ).textContent;
    const selectedProductElement = document.getElementById(
      "selected-product-name"
    );
    selectedProductElement.textContent = `Product Name: ${selectedProductName}`;
    selectedProductElement.style.display = "block";

    // Show the delete button
    document.getElementById("delete-product-button").style.display = "block";
  } else {
    // Hide the table if no product is selected
    document.getElementById("ptable").style.display = "none";

    // Hide the selected product's name
    // document.getElementById('Product-name').style.display = 'none';
    document.getElementById("selected-product-name").style.display = "none";

    // Hide the delete button
    document.getElementById("delete-product-button").style.display = "none";
  }
}

async function fetchProductData() {
  try {
    const response = await fetch(
      `https://cleanstation.backendless.app/api/services/Product/UserProduct?ID=${objID}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    if (data.length <= 0) {
      selectedProductIddd.style.display = "none";
      errorMSGG.style.display = "block";
      errorMSGG.style.color = "red";
      errorMSGG.style.textAlign = "center";
      errorMSGG.innerHTML = "No data Found";
    }
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}

// Call the initialization function for populating the dropdown
populateDropdown();

// Upload product

$(document).ready(function () {
  $("#UploadProductFileBtn").click(function () {
    let productName = $("#ProductFIleNameInput").val();
    let fileInput2 = document.getElementById("fileInput2").files[0];

    if (productName && fileInput2) {
      let fileReader = new FileReader();

      fileReader.onload = function (event) {
        let fileBytes = event.target.result;
        let invoiceData = arrayBufferToBase64(fileBytes);

        let requestData = {
          Name: productName,
          File: invoiceData,
          USer_ID: {
            objectId: objID,
          },
        };

        // Show the loader before making the API request
        $("#loader2").show();

        sendProductData(requestData);
      };

      fileReader.readAsArrayBuffer(fileInput2);
    }
  });
});

async function sendProductData(requestData) {
  try {
    const response = await fetch(
      "https://cleanstation.backendless.app/api/services/Product/Upload_product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      populateDropdown();
      selectedProductIddd.style.display = "block";
      errorMSGG.style.display = "none";
      Swal.fire("Success", "File uploaded successfully", "success");
      clearInputs();
      $("#ProductDetailSection").show();
      $("#UploadProductFileSection").hide();
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("Error sending data:", error);
    Swal.fire("Error", "Something went wrong!", "error");
    clearInputs();
    console.error("Max retries reached. Could not send data.");
    Swal.fire(
      "Error",
      "Could not upload file. Please try again later.",
      "error"
    );
  } finally {
    // Hide the loader regardless of success or error
    $("#loader2").hide();
  }
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper function to clear input fields
function clearInputs() {
  document.getElementById("ProductFIleNameInput").value = "";
  document.getElementById("fileInput2").value = "";
}

// test

// end here

// Upload Contract

$(document).ready(function () {
  $("#sensibleBTN").click(async function () {
    let fcsensible = document.getElementById("fcsensible").files[0];

    if (fcsensible) {
      let fileReader = new FileReader();

      fileReader.onload = async function (event) {
        let fileBytes = event.target.result;
        $("#loader").show(); // Show the loader

        try {
          const apiUrl =
            "https://api.sensible.so/v0/extract/izba?environment=published";
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization:
                "Bearer 9d6df43c6edb7fda83a62574711261e4f96c60f41105a96a46a4e9e2b82b07e4a56a1212b7c43ef7fc88a353992ce36eaa29cef83e9d0ea0a8bb3d5f00feecc1",
              "Content-Type": "application/pdf",
            },
            body: fileBytes,
          });

          if (response.ok) {
            const data = await response.json();
            const parsedValues = data.parsed_document;
            const extractedValue =
              parseFloat(
                parsedValues["Receipt_Per_Pallet_Fee"]?.value?.replace(
                  /\$|,/g,
                  ""
                )
              ) || 0;

            const numericValueRegex = /([\d,\.]+)/; // Regular expression to match numeric value

            function extractNumericValue(value) {
              if (value) {
                const matches = value.match(numericValueRegex);
                return matches ? parseFloat(matches[1].replace(",", "")) : 0;
              } else {
                return 0;
              }
            }

            // Update input fields with extracted values
            $("#Baseorderfee").val(
              extractNumericValue(
                parsedValues["Base_Per_Order_Fee"]?.value?.replace(/\$|,/g, "")
              )
            );
            $("#additionalPickfee").val(
              extractNumericValue(
                parsedValues["Additional_Pick_Fee"]?.value?.replace(/\$|,/g, "")
              )
            );
            $("#BaseReturnFee").val(
              extractNumericValue(
                parsedValues["Base_Per_Return_Fee"]?.value
                  ?.replace(/\$|,/g, "")
                  .replace("Hourly", "")
              )
            );
            $("#PerKitFee").val(
              extractNumericValue(
                parsedValues["Additional_Pick_Kit"]?.value
                  ?.replace(/\$|,/g, "")
                  .replace("Hourly", "")
              )
            );

            // storage
            $("#PalletFee").val(
              extractNumericValue(
                parsedValues["Storage_Per_Pallet"]?.value?.replace(/\$|,/g, "")
              ) || 0
            );
            $("#SelfFee").val(
              extractNumericValue(
                parsedValues["Storage_Per_Shelf"]?.value?.replace(/\$|,/g, "")
              ) || 0
            );
            $("#BinFee").val(
              extractNumericValue(
                parsedValues["Storage_Per_Bin"]?.value?.replace(/\$|,/g, "")
              ) || 0
            );

            // receving
            $("#palletReciiptRate").val(
              extractNumericValue(
                parsedValues["Receipt_Per_Pallet_Fee"]?.value?.replace(
                  /\$|,/g,
                  ""
                )
              ) || 0
            );
            $("#CaseRecipRate").val(
              extractNumericValue(
                parsedValues["Receipt_Per_Case_Fee"]?.value?.replace(
                  /\$|,/g,
                  ""
                )
              ) || 0
            );

            // labour
            $("#WHlabor").val(
              extractNumericValue(
                parsedValues["Labor_Warehouse_Rate"]?.value
                  ?.replace(/\$|,/g, "")
                  .replace("Hourly", "")
              ) || 0
            );
            $("#laborItrate").val(
              extractNumericValue(parsedValues["Labor_IT_Rate"]?.value) || 0
            );
            $("#laborOtrate").val(
              extractNumericValue(parsedValues["Labor_OT_Rate"]?.value) || 0
            );

            // Managment
            $("#ManagmentFee").val(
              extractNumericValue(
                parsedValues["Management_Fee"]?.value?.replace(/\$|,/g, "")
              ) || 0
            );
            $("#MinimumFee").val(
              extractNumericValue(
                parsedValues["Minimum_Fee"]?.value?.replace(/\$|,/g, "")
              ) || 0
            );

            // parcel
            $("#ParcelManifesFee").val(
              extractNumericValue(
                parsedValues["Manifest_Fee"]?.value?.replace(/\$|,/g, "")
              ) || 0
            );
            $("#internationalFee").val(
              extractNumericValue(
                parsedValues["International_Surcharge_Fee"]?.value?.replace(
                  /\$|,/g,
                  ""
                )
              ) || 0
            );

            Swal.fire("Success", "File uploaded successfully", "success");
            document.getElementById("fcsensible").value = "";
            $("#FCRatesWrapper").show();
            $("#UploadSensibleFileWrapper").hide();
            $("#UploadSensibleFileBTN").show();
            $("#EnterRatesManuallyBTN").hide();
          } else {
            document.getElementById("fcsensible").value = "";
            console.error("Error:", response.statusText);
            Swal.fire(
              "Error",
              "Something is going wrong please try again",
              "error"
            );
          }

          // Hide the loader after the request is complete
          $("#loader").hide();
        } catch (error) {
          document.getElementById("fcsensible").value = "";
          console.error("Error sending data:", error);
          Swal.fire("Error", "Error! please try again letter", "error");
          // Hide the loader on failure
          $("#loader").hide();
        }
      };

      fileReader.readAsArrayBuffer(fcsensible);
    }
  });
});

// End here

// cansel Product upload
$("#UploadSensibleFileCancelButton").click(function () {
  $("#FCRatesWrapper").show();
  $("#UploadSensibleFileWrapper").hide();
});

function calculateDaysforafterlog() {
  var startDate = new Date(document.getElementById("startDate").value);
  var endDate = new Date(document.getElementById("endDate").value);
  // One day in milliseconds
  var oneDay = 24 * 60 * 60 * 1000;
  // Calculate the difference in days
  var diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  // Display the result
  document.getElementById("total-Days-aftrlog").textContent =
    diffDays + " days";
}

function calculateDaysupdateafterlog() {
  var startDatee = new Date(document.getElementById("upstartDate").value);
  var endDatee = new Date(document.getElementById("upendDate").value);
  // One day in milliseconds
  var oneDay = 24 * 60 * 60 * 1000;
  // Calculate the difference in days
  var diffDays = Math.round(Math.abs((startDatee - endDatee) / oneDay));
  // Display the result
  document.getElementById("uptotal-Daysafterlog").textContent =
    diffDays + " days";
}

function setEndDateMinafterlog() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const errorElement = document.getElementById("startDate-EndDate");

  const startDate = new Date(startDateInput.value);
  const today = new Date();

  // Check if startDate is before today
  if (endDate < startDate) {
    errorElement.innerHTML = "Start date cannot be before today.";
    errorElement.style.color = "red";
    errorElement.style.display = "block";
    startDateInput.value = "";
    endDateInput.value = "";
    endDateInput.disabled = true;
  } else {
    errorElement.style.display = "none";
    endDateInput.disabled = false;
  }

  // Set the minimum selectable date in the end date picker
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 1); // Increment by 1 day to disable the selected start date
  endDateInput.min = minEndDate.toISOString().slice(0, 10);
}