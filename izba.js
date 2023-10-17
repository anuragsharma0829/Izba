let postId;
let fcobjId;
let EstimatPostid;

$(document).ready(function () {
  var tabIds = [ "TabReceiving", "TabStorage", "TabPicking", "TabMisc", "TabEstimate", ];
  disableTabs(tabIds);
});

var Brandname;
var StartDate;
var EndDate;

// click next button on get started tab 
$("#goToReciving").click(function () {
  let brandNameInput = $("#brandNameInput").val();
  let startDate = $("#startDate").val();
  let endDate = $("#endDate").val();
  let centers = $("#centers").val();
  Brandname = brandNameInput;
  StartDate = startDate;
  EndDate = endDate;

  const brandNameError = document.getElementById("brandNameError");
  const StartDateError = document.getElementById("StartDateError");
  const EndDateError = document.getElementById("EndDateError");
  
  $("#brandNameInput").on("input", function () {   
    $("#brandNameError").css("display", "none"); 
  });
  
  $("#startDateInput").on("input", function () {   
    $("#startDateError").css("display", "none"); 
  });
  
  $("#endDateInput").on("input", function () {   
    $("#endDateError").css("display", "none"); 
  });
  

  if (brandNameInput !== "" && startDate !== "" && endDate !== "" && centers !== "") {
    // Create an object with brandName and Guest_Brand
    let dataToSend = {
      Brand_name: brandNameInput,
      Guest_Brand: true
    };

    fetch("https://cleanstation.backendless.app/api/data/Brand", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        postId = data.objectId;
        console.log("Retrieved postId:", postId);

         // Clear the input fields
        $("#brandNameInput").val("");
        $("#startDate").val("");
        $("#endDate").val("");
      })
      .catch((error) => console.error("Error:", error));
      enableTabAndTriggerClick("TabReceiving");
  } else {
    brandNameError.style.display = "block";
    StartDateError.style.display = "block";
    EndDateError.style.display = "block";
  }
  return false;

});

function disableTabs(tabIds) {
  tabIds.forEach(function (tabId) {
    var tab = document.getElementById(tabId);
    tab.setAttribute("disabled", "disabled");
    tab.style.pointerEvents = "none";
    tab.style.opacity = "0.5";
  });
}

function enableTabAndTriggerClick(tabId) {
  var tab = document.getElementById(tabId);
  tab.removeAttribute("disabled");
  tab.style.pointerEvents = "auto";
  tab.style.opacity = "1";
  tab.click();
}

$(document).ready(function () {
  $("#backToGetStarted").click(function () {
    $("#GetStarted").trigger("click");
  });
});

$(document).ready(function () {
  var tabIds = ["TabStorage", "TabPicking", "TabMisc", "TabEstimate"];
  disableTabs(tabIds);

  // Add an event listener for input changes in the fields
  $("#receiptPerCaseInput, #receiptPerPalletInput").on("input", function () {
    const errorReciving = document.getElementById("errorReciving");
    errorReciving.style.display = "none"; // Hide the error message
  });

  $("#goToStorage").click(function () {
    let receiptPerCase = $("#receiptPerCaseInput").val();
    let receiptPerPallet = $("#receiptPerPalletInput").val();
    if (receiptPerCase !== "" || receiptPerPallet !== "") {
      enableTabAndTriggerClick("TabStorage");
    } else {
      const errorReciving = document.getElementById("errorReciving");
      errorReciving.style.display = "block";
    }
    return false;
  });
});


//Back to reciving
$(document).ready(function () {
  $("#backToReceiving").click(function () {
    $("#TabReceiving").trigger("click");
  });
});

// Go to Picking and Validation
$(document).ready(function () {
  var tabIds = ["TabPicking", "TabMisc", "TabEstimate"];
  disableTabs(tabIds);

  // Add an event listener for input changes in the fields
  $("#storagePerPalletInput, #storagePerShelfInput , #storagePerBin").on("input", function () {
      const errorStorage = document.getElementById("errorStorage");
      errorStorage.style.display = "none"; // Hide the error message
    }
  );

  $("#goToPicking").click(function () {
    let storagePerPallet = $("#storagePerPalletInput").val();
    let storagePerShelf = $("#storagePerShelfInput").val();
    let storagePerBin = $("#storagePerBin").val();
    if ( storagePerPallet !== "" || storagePerShelf !== "" || storagePerBin !== "" ) {
      enableTabAndTriggerClick("TabPicking");
    } else {
      const errorStorage = document.getElementById("errorStorage");
      errorStorage.style.display = "block";
    }
    return false;
  });
});


$(document).ready(function () {
  $("#backToStorage").click(function () {
    $("#TabStorage").trigger("click");
  });
});

$(document).ready(function () {
  var tabIds = ["TabMisc", "TabEstimate"];
  disableTabs(tabIds);

  // Add an event listener for input changes in the fields
  $("#BaseFeePerOrderInput, #AdditionalPickFeeInput , #BaseReturnFeeInput,#BaseReturnFeeInput").on("input", function () {
    const errorPicking = document.getElementById("errorPicking");
    errorPicking.style.display = "none"; // Hide the error message
  });

  $("#goToMisc").click(function () {
    let BaseFeePerOrderInput = $("#BaseFeePerOrderInput").val();
    let AdditionalPickFeeInput = $("#AdditionalPickFeeInput").val();
    let BaseReturnFeeInput = $("#BaseReturnFeeInput").val();
    let AssemblyPerKitInput = $("#AssemblyPerKitInput").val();
    if ( BaseFeePerOrderInput !== "" || AdditionalPickFeeInput !== "" || BaseReturnFeeInput !== "" || AssemblyPerKitInput !== "" ) {
      enableTabAndTriggerClick("TabMisc");
    } else {
      const errorPicking = document.getElementById("errorPicking");
      errorPicking.style.display = "block";
    }
    return false;
  });
});

//Back to Picking
$(document).ready(function () {
  $("#backToPicking").click(function () {
    $("#TabPicking").trigger("click");
  });
});

//Go to Estimate and save Fullfillment contract data with realtion
$(document).ready(function () {
  var tabIds = ["TabEstimate"];
  disableTabs(tabIds);
  // Add an event listener for input changes in the fields
  $("#MonthlyManagementFeeInput, #MonthlyMinimumFeeInput" ).on("input", function () {
    const errorMisc1 = document.getElementById("errorMisc1");
    errorMisc1.style.display = "none"; // Hide the error message
  });

  $("#StandardHourlyLaborInput, #OTHourlyLaborInput, #ITHourlyLaborInput" ).on("input", function () {   
     const errorMisc = document.getElementById("errorMisc");
    errorMisc.style.display = "none"; // Hide the error message
  });

  $("#goToEstimates").click(function () {
    let MonthlyManagementFeeInput = $("#MonthlyManagementFeeInput").val();
    let MonthlyMinimumFeeInput = $("#MonthlyMinimumFeeInput").val();
    let StandardHourlyLaborInput = $("#StandardHourlyLaborInput").val();
    let OTHourlyLaborInput = $("#OTHourlyLaborInput").val();
    let ITHourlyLaborInput = $("#ITHourlyLaborInput").val();
    let startDate = StartDate;
    let endDate = EndDate;
    // api object
    let receiptPerCase = $("#receiptPerCaseInput").val();
    let receiptPerPallet = $("#receiptPerPalletInput").val();
    let storagePerPallet = $("#storagePerPalletInput").val();
    let storagePerShelf = $("#storagePerShelfInput").val();
    let storagePerBin = $("#storagePerBin").val();
    let BaseFeePerOrderInput = $("#BaseFeePerOrderInput").val();
    let AdditionalPickFeeInput = $("#AdditionalPickFeeInput").val();
    let BaseReturnFeeInput = $("#BaseReturnFeeInput").val();
    let AssemblyPerKitInput = $("#AssemblyPerKitInput").val();
    const selectedCenterId = localStorage.getItem("selectedCenterId");
    console.log("parascebterID", selectedCenterId);
    console.log("parasPostID", postId);
    if (
      (MonthlyManagementFeeInput !== "" && MonthlyMinimumFeeInput !== "") ||
      StandardHourlyLaborInput !== "" || OTHourlyLaborInput !== "" || ITHourlyLaborInput !== "" ) {
      //Api Logic for post data
      let postEstimate = {
        Fulfillment_Center: {
          objectId: selectedCenterId,
        },

        Brand_id: {
          objectId: postId,
        },
        Base_Per_Order_Fee: parseFloat(BaseFeePerOrderInput) ?? 0,
        Additional_Pick_Fee: parseFloat(AdditionalPickFeeInput) ?? 0,
        Additional_Pick_Kit: parseFloat(AssemblyPerKitInput) ?? 0,
        Base_Per_Return_Fee: parseFloat(BaseReturnFeeInput) ?? 0,
        Start_Date: startDate,
        End_Date: endDate,
        Management_Fee: parseFloat(MonthlyManagementFeeInput) ?? 0,
        Minimum_Fee: parseFloat(MonthlyMinimumFeeInput) ?? 0,
        Labor_Warehouse_Rate: parseFloat(StandardHourlyLaborInput) ?? 0,
        Labor_OT_Rate: parseFloat(OTHourlyLaborInput) ?? 0,
        Labor_IT_Rate: parseFloat(ITHourlyLaborInput) ?? 0,
        Receipt_Per_Case_Fee: parseFloat(receiptPerCase) ?? 0,
        Receipt_Per_Pallet_Fee: parseFloat(receiptPerPallet) ?? 0,
        Storage_Per_Pallet: parseFloat(storagePerPallet) ?? 0,
        Storage_Per_Shelf: parseFloat(storagePerShelf) ?? 0,
        Storage_Per_Bin: parseFloat(storagePerBin) ?? 0,
      };

      fetch(
        "https://cleanstation.backendless.app/api/services/Estimate/Create_Fulfillment_Contract",
        {
          method: "POST",
          body: JSON.stringify(postEstimate),
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
      const errorMisc = document.getElementById("errorMisc");
      const errorMisc1 = document.getElementById("errorMisc1");
      errorMisc.style.display = "block";
      errorMisc1.style.display = "block";
    }

    // --------------------------------------------------------------------
    // Function to set data

    function handleFcobjId(id) {
      console.log("Retrieved postId:", id);
      fetch(
        `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${id}`
      ).then((res) => {
        res.json().then((data) => {
          console.log(data);
          console.log(data.brand_name);
          const startDatee = new Date(data.Start_Date);
          const endDatee = new Date(data.End_Date);

          document.getElementById("startDateText").innerHTML = `${startDatee.getDate()}/${startDatee.getMonth() + 1}/${startDatee.getFullYear()}`;
          document.getElementById("endDateText").innerHTML = `${endDatee.getDate()}/${endDatee.getMonth() + 1}/${endDatee.getFullYear()}`;

          const timeDifference = endDatee.getTime() - startDatee.getTime();
          // Convert the time difference to days
          const daysDifference = timeDifference / (1000 * 3600 * 24);
          document.getElementById("daysDifference").innerHTML = daysDifference + " " + "Days";
          document.getElementById("brandNameText").innerHTML = Brandname;
          document.getElementById("managementFeeText").innerHTML = "$" + data.Management_Fee;
          document.getElementById("minimunFeeText").innerHTML = "$" + data.Minimum_Fee;
          document.getElementById("standardHourlyLaborText").innerHTML = "$" + data.Labor_Warehouse_Rate;
          document.getElementById("OTHourlytext").innerHTML = "$" + data.Labor_OT_Rate;
          document.getElementById("ITHourlyText").innerHTML = "$" + data.Labor_IT_Rate;
          document.getElementById("baseOrderFeeText").innerHTML = "$" + data.Base_Per_Order_Fee;
          document.getElementById("additionalPickFeeText").innerHTML = "$" + data.Additional_Pick_Fee;
          document.getElementById("baseReturnFeeText").innerHTML = "$" + data.Base_Per_Return_Fee;
          document.getElementById("perKitFeeText").innerHTML = "$" + data.Additional_Pick_Kit;
          document.getElementById("storagePerBinText").innerHTML = "$" + data.Storage_Per_Bin;
          document.getElementById("storagePerShelftext").innerHTML = "$" + data.Storage_Per_Shelf;
          document.getElementById("storagePerPalletText").innerHTML = "$" + data.Storage_Per_Pallet;
          document.getElementById("receiptPerPalletText").innerHTML = "$" + data.Receipt_Per_Pallet_Fee;
          document.getElementById("receiptPerCaseText").innerHTML = "$" + data.Receipt_Per_Case_Fee;

          //show in update form
        });
      });
    }
  });


  //Back to Misc
  $(document).ready(function () {
    $("#backToMisc").click(function () {
      $("#TabMisc").trigger("click");
    });
  });

  // Show Hide using Estimate Button and set Quntity in Estimate Table

  $(document).ready(function () {
    checkInputs();
    // Attach the input event handlers
    $("#receiptPerPalletInput, #storagePerPalletInput, #storagePerShelfInput, #receiptPerCaseInput, #storagePerBin, #BaseFeePerOrderInput, #AdditionalPickFeeInput, #BaseReturnFeeInput, #AssemblyPerKitInput, #StandardHourlyLaborInput, #OTHourlyLaborInput, #ITHourlyLaborInput"
    ).on("input", function () {
      checkInputs();
    });

    function checkInputs() {
      var receiptPerPalletValue = $("#receiptPerPalletInput").val().trim();
      var storagePerPalletValue = $("#storagePerPalletInput").val().trim();
      var storagePerShelfValue = $("#storagePerShelfInput").val().trim();
      var receiptPerCaseValue = $("#receiptPerCaseInput").val().trim();
      var storagePerBinValue = $("#storagePerBin").val().trim();
      var BaseOrdersValue = $("#BaseFeePerOrderInput").val().trim();
      var BasketSizeValue = $("#AdditionalPickFeeInput").val().trim();
      var BaseReturnValue = $("#BaseReturnFeeInput").val().trim();
      var AssemblyPerKitValue = $("#AssemblyPerKitInput").val().trim();
      var StandardHourlyLaborValue = $("#StandardHourlyLaborInput").val().trim();
      var ITHourlyLaborValue = $("#ITHourlyLaborInput").val().trim();
      var OTHourlyLaborValue = $("#OTHourlyLaborInput").val().trim();

      $("#PalletsReceivedInput").prop("readonly", receiptPerPalletValue === "");
      $("#PalletStorageInput").prop("readonly", storagePerPalletValue === "");
      $("#ShelfStorageInput").prop("readonly", storagePerShelfValue === "");      
      $("#CasesReceivedInput").prop("readonly", receiptPerCaseValue === "");      
      $("#BinStorageInput").prop("readonly", storagePerBinValue === "");     
      $("#BaseOrdersInput").prop("readonly", BaseOrdersValue === "");      
      $("#BasketSizeInput").prop("readonly", BasketSizeValue === "");      
      $("#BaseReturnsInput").prop("readonly", BaseReturnValue === "");     
      $("#KitsCreatedInput").prop("readonly", AssemblyPerKitValue === "");      
      $("#WarehouseHoursInput").prop("readonly", StandardHourlyLaborValue === "" );      
      $("#ITHours").prop("readonly", ITHourlyLaborValue === "");      
      $("#OTHoursInput").prop("readonly", OTHourlyLaborValue === "");
    }

    let EstimateId; // Define EstimateId outside the click event handler
    $("#gotoEstimateDetail").click(function () {
      $("#GetStartedSection").hide();
      $("#EstimateDetailSection").show();
      $("#EstimateEnvoice").show();

      // Get values from input fields
      var PalletsReceivedInput = $("#PalletsReceivedInput").val();
      var casesReceived = $("#CasesReceivedInput").val();
      var palletStorage = $("#PalletStorageInput").val();
      var shelfStorage = $("#ShelfStorageInput").val();
      var binStorage = $("#BinStorageInput").val();
      var baseOrders = $("#BaseOrdersInput").val();
      var basketSize = $("#BasketSizeInput").val();
      var baseReturns = $("#BaseReturnsInput").val();
      var kitsCreated = $("#KitsCreatedInput").val();
      var warehouseHours = $("#WarehouseHoursInput").val();
      var otHours = $("#OTHoursInput").val();
      var itHours = $("#ITHours").val();

      // Create Object

      let estimatorDetails = {
        Fulfillment_contract: {
          objectId: fcobjId,
        },
        ReceiptPallet: PalletsReceivedInput.trim() !== "" ? parseFloat(PalletsReceivedInput)  : 0,
        ReceiptCase: casesReceived.trim() !== "" ? parseFloat(casesReceived) : 0,
        Pallets: palletStorage.trim() !== "" ? parseFloat(palletStorage) : 0,
        Shelfs: shelfStorage.trim() !== "" ? parseFloat(shelfStorage) : 0,
        Bins: binStorage.trim() !== "" ? parseFloat(binStorage) : 0,
        TotalOrders: baseOrders.trim() !== "" ? parseFloat(baseOrders) : 0,
        ExtraPicks: basketSize.trim() !== "" ? parseInt(basketSize) : 0,
        Returns: baseReturns.trim() !== "" ? parseFloat(baseReturns) : 0,
        KitsBuilt: kitsCreated.trim() !== "" ? parseFloat(kitsCreated) : 0,
        WHHours: warehouseHours.trim() !== "" ? parseFloat(warehouseHours) : 0,
        OTHours: otHours.trim() !== "" ? parseFloat(otHours) : 0,
        ITHours: itHours.trim() !== "" ? parseFloat(itHours) : 0,
      };

      // Call API to save the Estimate data
      fetch(
        "https://cleanstation.backendless.app/api/services/Estimate/LogOutEstimata",
        {
          method: "POST",
          body: JSON.stringify(estimatorDetails),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          EstimateId = data.objectId;
          EstimatPostid = data.objectId;
          localStorage.setItem("EstimatPostid", EstimatPostid);
          handleEstimateId(EstimatPostid);

          const chartData = {
            totalStorage: data.TotalStorageCharge,
            totalPicCharges: data.TotalPickCharge,
            totalReceipts: data.TotalReceiptCharge,
            totalMisc: data.TotalMiscCharge,
          };

          // Create the doughnut chart using the provided function
          createDoughnutChart(chartData);

          let TotalSpents = data.TotalCost / data.TotalOrders;

          document.getElementById("TotalSpent").textContent = "$" + data.TotalCost;
          document.getElementById("TotalAveragePerOrder").textContent = "$" + TotalSpents;
          document.getElementById("TotalPickFeesCalc").textContent = "$" + data.TotalPickCharge;
          document.getElementById("TotalStorage").textContent = "$" + data.TotalStorageCharge;
          document.getElementById("TotalkReceipt").textContent = "$" + data.TotalReceiptCharge;
          document.getElementById("TotalMisclabor").textContent = "$" + data.TotalMiscCharge;
        });
    });
  });

  // handle EstimatorID
  function handleEstimateId(id) {
    console.log("Retrieved Estimator:", id);

    // load estimator by id
    fetch(
      `https://cleanstation.backendless.app/api/data/Estimate/${id}?loadRelations=Fulfillment_Contract`
    ).then((res) => {
      res.json().then((data) => {
        // Pick Fee
        document.getElementById("totalBaseOrderText").innerHTML = data.TotalOrders;
        document.getElementById("totalAdditionalPickText").innerHTML = data.ExtraPicks;
        document.getElementById("totalBaseReturnText").innerHTML = data.Returns;
        document.getElementById("totalKitText").innerHTML = data.KitsBuilt;

        // Storage
        document.getElementById("totalPalletStorageText").innerHTML = data.Pallets;
        document.getElementById("totalShelfStorageText").innerHTML = data.Shelfs;
        document.getElementById("totalBinStorageText").innerHTML = data.Bins;

        // Receiving
        document.getElementById("totalPalletReceivedText").innerHTML = data.ReceiptPallet;
        document.getElementById("totalcasesReceivedText").innerHTML = data.ReceiptCase;

        // Labour
        document.getElementById("totalStandardHourtext").innerHTML = data.WHHours;
        document.getElementById("totalOTHourlyText").innerHTML = data.OTHours;
        document.getElementById("totalITHourlyText").innerHTML = data.ITHours;
      });
    });
  }

  $(document).ready(function () {
    $("#AddFulfillmentButton").click(function () {
      $("#GetStartedSection").hide();
      $("#errorAddfccenter").hide();
      $("#NewFulfillmentCenterSection").show();
    });
  });

  $(document).ready(function () {
    $("#closeFulfillmentCenterPopup").click(function () {
      $("#NewFulfillmentCenterSection").hide();
      $("#GetStartedSection").show();
    });
  });


function showError(selector, message) {
  $(selector).text(message).show();
}

function hideError(selector) {
  $(selector).hide();
}

function showAllErrors() {
  let fcName = $("#fcName").val();
  let fcUrl = $("#fcUrl").val();
  let fcaddress = $("#fcaddress").val();
  let fcCity = $("#fcCity").val();
  let fcState = $("#fcState").val();
  let fcZipCode = $("#fcZipCode").val();
  let fcCounter = $("#fcCounter").val();
    // Check if input fields are empty
    if (fcName === "") {
      showError("#fcNameError", "Fulfillment center name should not be blank");
    } else {
      hideError("#fcNameError");
    }

    if (fcUrl === "") {
      showError("#fcUrlError", "Fulfillment center URL should not be blank");
    } else {
      hideError("#fcUrlError");
    }

    if (fcaddress === "") {
      showError("#fcaddressError", "Fulfillment center address should not be blank");
    } else {
      hideError("#fcaddressError");
    }

    if (fcCity === "") {
      showError("#fcCityError", "Fulfillment center city should not be blank");
    } else {
      hideError("#fcCityError");
    }

    if (fcState === "") {
      showError("#fcStateError", "Fulfillment center state should not be blank");
    } else {
      hideError("#fcStateError");
    }

    if (fcZipCode === "") {
      showError("#fcZipCodeError", "Fulfillment center zip code should not be blank");
    } else {
      hideError("#fcZipCodeError");
    }

    if (fcCounter === "") {
      showError("#fcCounterError", "Fulfillment center country should not be blank");
    } else {
      hideError("#fcCounterError");
    }
}

// Reusable function to handle input events and error messages
function setupInputField(inputId, errorId, errorMessage) {
  $(inputId).on("input", function () {
    if ($(this).val()) {
      hideError(errorId);
    } else {
      showError(errorId, errorMessage);
    }
  });
}

// Add Fullfillment Center
    $("#addFccenter").click(function () {
      showAllErrors();

      let fcName = $("#fcName").val();
      let fcUrl = $("#fcUrl").val();
      let fcaddress = $("#fcaddress").val();
      let fcCity = $("#fcCity").val();
      let fcState = $("#fcState").val();
      let fcZipCode = $("#fcZipCode").val();
      let fcCounter = $("#fcCounter").val();

      // Check if any required field is empty
      if ( !fcName || !fcUrl || !fcaddress || !fcCity || !fcState || !fcZipCode || !fcCounter  ) {
        // // Set the error message and apply red color
        // $("#errorAddfccenter").text("Please fill all required fields.");
        // $("#errorAddfccenter").css("color", "red");
        // $("#errorAddfccenter").show();
        // return; // Stop the function from proceeding further
        // Set up input events for each field
        setupInputField("#fcName", "#fcNameError", "Fulfillment center name should not be blank");
        setupInputField("#fcUrl", "#fcUrlError", "Fulfillment center URL should not be blank");
        setupInputField("#fcaddress", "#fcaddressError", "Fulfillment center address should not be blank");
        setupInputField("#fcCity", "#fcCityError", "Fulfillment center city should not be blank");
        setupInputField("#fcState", "#fcStateError", "Fulfillment center state should not be blank");
        setupInputField("#fcZipCode", "#fcZipCodeError", "Fulfillment center ZIP code should not be blank");
        setupInputField("#fcCounter", "#fcCounterError", "Fulfillment center counter should not be blank");
      }

      // If all required fields are filled, remove the error message and reset color
      // $("#errorAddfccenter").hide();
      // $("#errorAddfccenter").text("");
      // $("#errorAddfccenter").css("color", "initial");

      let createFCData = {
        Street_Address: fcaddress,
        ZIP_Code: parseFloat(fcZipCode) ?? 0,
        Storage_Type: "Ambient",
        City: fcCity,
        URL: fcUrl,
        Center_Name: fcName,
        State: fcState,
        Country: fcCounter,
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
        .then((data) => {
          const redirectUrl =
            "https://izba-exchange.webflow.io/invoice-estimator";

          // Perform the redirect using window.location.href
          window.location.href = redirectUrl;
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    });
  // hide the no result section
  let data2 = document.getElementById("centers").length;
  if (data2 <= 0) {
    document.getElementById("fcConatainer").style.display = "block";
  }

  //update Estimator by id
  $("#updateButton").click(function () {
    $("#updateSummrydata").show();
    $("#EstimateDetailSection").hide();
    $("#EstimateEnvoice").hide();

    // BrandName
    fetch(`https://cleanstation.backendless.app/api/data/Brand/${postId}`).then(
      (res) => {
        res.json().then((data) => {
          document.getElementById("bname").value = data.brand_name;
        });
      }
    );

    // Fullfillment Data

    // formate Date
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    fetch(
      `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Set the current values in the input fields
        document.getElementById("updatestart").value = formatDate(
          data.Start_Date
        );
        document.getElementById("updateEnddate").value = formatDate(
          data.End_Date
        );
        document.getElementById("updateManagementFee").value =
          data.Management_Fee;
        document.getElementById("updateMInimumFee").value = data.Minimum_Fee;
        document.getElementById("updateWarehouseFee").value =
          data.Labor_Warehouse_Rate;
        document.getElementById("updateOTLabor").value = data.Labor_OT_Rate;
        document.getElementById("updateITLabor").value = data.Labor_IT_Rate;
        document.getElementById("updateBaseorderfee").value =
          data.Base_Per_Order_Fee;
        document.getElementById("updateAdditinpickfee").value =
          data.Additional_Pick_Fee;
        document.getElementById("updateBasereturnFee").value =
          data.Base_Per_Return_Fee;
        document.getElementById("updatePerkitfee").value =
          data.Additional_Pick_Kit;
        document.getElementById("updateperBin").value = data.Storage_Per_Bin;
        document.getElementById("updatePerSelf").value = data.Storage_Per_Shelf;
        document.getElementById("updateStoragePerPallet").value =
          data.Storage_Per_Pallet;
        document.getElementById("updaterecivingPerPallet").value =
          data.Receipt_Per_Pallet_Fee;
        document.getElementById("updateReceiptPerCase").value =
          data.Receipt_Per_Case_Fee;

        // get estimator data for update
        fetch(
          `https://cleanstation.backendless.app/api/data/Estimate/${EstimatPostid}?loadRelations=Fulfillment_Contract`
        ).then((res) => {
          res.json().then((data) => {
            console.log("get estimater Data", data);
            // Pick Fee
            document.getElementById("UpdateBaseOrder").value = data.TotalOrders;
            document.getElementById("updateAdditionPic").value =
              data.ExtraPicks;
            document.getElementById("updateBasereturn").value = data.Returns;
            document.getElementById("updatePerKit").value = data.KitsBuilt;

            // Storage
            document.getElementById("updatePalletStorage").value = data.Pallets;
            document.getElementById("UpdateShelfOccupied").value = data.Shelfs;
            document.getElementById("updateBinOccupied").value = data.Bins;

            // Receiving
            document.getElementById("updatePalletRecived").value =
              data.ReceiptPallet;
            document.getElementById("UpdateCasesReciive").value =
              data.ReceiptCase;

            // Labour
            document.getElementById("updateStandardHours").value = data.WHHours;
            document.getElementById("updateOTHourConsumed").value =
              data.OTHours;
            document.getElementById("updateITHourConsumed").value =
              data.ITHours;
          });
        });

        // Update button click event for saving the updated values
        $("#FinalupdateButton").click(function () {
          const updateBrandData = {
            brand_name: document.getElementById("bname").value,
          };

          // Retrieve the updated values from the input fields
          const updatedData = {
            Start_Date: document.getElementById("updatestart").value,
            End_Date: document.getElementById("updateEnddate").value,
            Management_Fee:
              document.getElementById("updateManagementFee").value.trim() === ""
                ? 0
                : parseFloat(
                    document.getElementById("updateManagementFee").value
                  ),
            Minimum_Fee:
              document.getElementById("updateMInimumFee").value.trim() === ""
                ? 0
                : parseFloat(document.getElementById("updateMInimumFee").value),
            Labor_Warehouse_Rate:
              document.getElementById("updateWarehouseFee").value.trim() === ""
                ? 0
                : parseFloat(
                    document.getElementById("updateWarehouseFee").value
                  ),
            Labor_OT_Rate:
              document.getElementById("updateOTLabor").value.trim() === ""
                ? 0
                : parseFloat(document.getElementById("updateOTLabor").value),
            Labor_IT_Rate:
              document.getElementById("updateITLabor").value.trim() === ""
                ? 0
                : parseFloat(document.getElementById("updateITLabor").value),
            Base_Per_Order_Fee:
              document.getElementById("updateBaseorderfee").value.trim() === ""
                ? 0
                : parseFloat(
                    document.getElementById("updateBaseorderfee").value
                  ),
            Additional_Pick_Fee:
              document.getElementById("updateAdditinpickfee").value.trim() ===
              ""
                ? 0
                : parseFloat(
                    document.getElementById("updateAdditinpickfee").value
                  ),
            Base_Per_Return_Fee:
              document.getElementById("updateBasereturnFee").value.trim() === ""
                ? 0
                : parseFloat(
                    document.getElementById("updateBasereturnFee").value
                  ),
            Additional_Pick_Kit:
              document.getElementById("updatePerkitfee").value.trim() === ""
                ? 0
                : parseFloat(document.getElementById("updatePerkitfee").value),
            Storage_Per_Bin:
              document.getElementById("updateperBin").value.trim() === ""
                ? 0
                : parseFloat(document.getElementById("updateperBin").value),
            Storage_Per_Shelf:
              document.getElementById("updatePerSelf").value.trim() === ""
                ? 0
                : parseFloat(document.getElementById("updatePerSelf").value),
            Storage_Per_Pallet:
              document.getElementById("updateStoragePerPallet").value.trim() ===
              ""
                ? 0
                : parseFloat(
                    document.getElementById("updateStoragePerPallet").value
                  ),
            Receipt_Per_Pallet_Fee:
              document
                .getElementById("updaterecivingPerPallet")
                .value.trim() === ""
                ? 0
                : parseFloat(
                    document.getElementById("updaterecivingPerPallet").value
                  ),
            Receipt_Per_Case_Fee:
              document.getElementById("updateReceiptPerCase").value.trim() ===
              ""
                ? 0
                : parseFloat(
                    document.getElementById("updateReceiptPerCase").value
                  ),
          };

          // object for Estimator for update
          const UpdateEstimatorqunt = {
            ReceiptPallet:
              +document.getElementById("updatePalletRecived").value || 0,
            ReceiptCase:
              +document.getElementById("UpdateCasesReciive").value || 0,
            Pallets: +document.getElementById("updatePalletStorage").value || 0,
            Shelfs: +document.getElementById("UpdateShelfOccupied").value || 0,
            Bins: +document.getElementById("updateBinOccupied").value || 0,
            TotalOrders: +document.getElementById("UpdateBaseOrder").value || 0,
            ExtraPicks:
              +document.getElementById("updateAdditionPic").value || 0,
            Returns: +document.getElementById("updateBasereturn").value || 0,
            KitsBuilt: +document.getElementById("updatePerKit").value || 0,
            WHHours: +document.getElementById("updateStandardHours").value || 0,
            OTHours:
              +document.getElementById("updateOTHourConsumed").value || 0,
            ITHours:
              +document.getElementById("updateITHourConsumed").value || 0,
          };

          // Update Brand Name
          fetch(
            `https://cleanstation.backendless.app/api/data/Brand/${postId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateBrandData),
            }
          )
            .then((response) => response.json())
            .then((updateBrandData) => {
              console.log("Data updated:", updateBrandData);
              // Update the displayed data without refreshing the page
              document.getElementById("brandNameText").innerHTML =
                updateBrandData.brand_name;
            });

          // Perform the update by sending a PUT request to the API
          fetch(
            `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          )
            .then((response) => response.json())
            .then((updatedData) => {
              Swal.fire(
                "Success",
                "Contarct Data Updated Successfully",
                "success"
              );

              // Update the displayed data without refreshing the page
              const startDate = new Date(updatedData.Start_Date);
              const endDate = new Date(updatedData.End_Date);
              document.getElementById(
                "startDateText"
              ).innerHTML = `${startDate.getDate()}/${
                startDate.getMonth() + 1
              }/${startDate.getFullYear()}`;
              document.getElementById(
                "endDateText"
              ).innerHTML = `${endDate.getDate()}/${
                endDate.getMonth() + 1
              }/${endDate.getFullYear()}`;

              const timeDifference = endDate.getTime() - startDate.getTime();
              // Convert the time difference to days
              const daysDifference = timeDifference / (1000 * 3600 * 24);
              document.getElementById("daysDifference").innerHTML =
                daysDifference + " " + "Days";
              document.getElementById("managementFeeText").innerHTML =
                "$" + updatedData.Management_Fee;
              document.getElementById("minimunFeeText").innerHTML =
                "$" + updatedData.Minimum_Fee;
              document.getElementById("standardHourlyLaborText").innerHTML =
                "$" + updatedData.Labor_Warehouse_Rate;
              document.getElementById("OTHourlytext").innerHTML =
                "$" + updatedData.Labor_OT_Rate;
              document.getElementById("ITHourlyText").innerHTML =
                "$" + updatedData.Labor_IT_Rate;
              document.getElementById("baseOrderFeeText").innerHTML =
                "$" + updatedData.Base_Per_Order_Fee;
              document.getElementById("additionalPickFeeText").innerHTML =
                "$" + updatedData.Additional_Pick_Fee;
              document.getElementById("baseReturnFeeText").innerHTML =
                "$" + updatedData.Base_Per_Return_Fee;
              document.getElementById("perKitFeeText").innerHTML =
                "$" + updatedData.Additional_Pick_Kit;
              document.getElementById("storagePerBinText").innerHTML =
                "$" + updatedData.Storage_Per_Bin;
              document.getElementById("storagePerShelftext").innerHTML =
                "$" + updatedData.Storage_Per_Shelf;
              document.getElementById("storagePerPalletText").innerHTML =
                "$" + updatedData.Storage_Per_Pallet;
              document.getElementById("receiptPerPalletText").innerHTML =
                "$" + updatedData.Receipt_Per_Pallet_Fee;
              document.getElementById("receiptPerCaseText").innerHTML =
                "$" + updatedData.Receipt_Per_Case_Fee;
            })
            .catch((error) => console.error("Error:", error));

          // Update Estimate quantity data and show without refreshing
          fetch(
            `https://cleanstation.backendless.app/api/data/Estimate/${EstimatPostid}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(UpdateEstimatorqunt),
            }
          )
            .then((response) => response.json())
            .then((updatedEdata) => {
              // Update the displayed data without refreshing the page

              // Pick Fee
              document.getElementById("totalBaseOrderText").innerHTML =
                updatedEdata.TotalOrders;
              document.getElementById("totalAdditionalPickText").innerHTML =
                updatedEdata.ExtraPicks;
              document.getElementById("totalBaseReturnText").innerHTML =
                updatedEdata.Returns;
              document.getElementById("totalKitText").innerHTML =
                updatedEdata.KitsBuilt;

              // Storage
              document.getElementById("totalPalletStorageText").innerHTML =
                updatedEdata.Pallets;
              document.getElementById("totalShelfStorageText").innerHTML =
                updatedEdata.Shelfs;
              document.getElementById("totalBinStorageText").innerHTML =
                updatedEdata.Bins;

              // Receiving
              document.getElementById("totalPalletReceivedText").innerHTML =
                updatedEdata.ReceiptPallet;
              document.getElementById("totalcasesReceivedText").innerHTML =
                updatedEdata.ReceiptCase;

              // Labour
              document.getElementById("totalStandardHourtext").innerHTML =
                updatedEdata.WHHours + "hrs";
              document.getElementById("totalOTHourlyText").innerHTML =
                updatedEdata.OTHours + "hrs";
              document.getElementById("totalITHourlyText").innerHTML =
                updatedEdata.ITHours + "hrs";
            })
            .catch((error) => console.error("Error:", error));
          // Show the original data section and hide the update section
          $("#updateSummrydata").hide();
          $("#EstimateDetailSection").show();
          $("#EstimateEnvoice").show();

          fetch(
            `https://cleanstation.backendless.app/api/data/Estimate/${EstimatPostid}`
          ).then((res) => {
            res.json().then((data) => {
              const chartData = {
                totalStorage: data.TotalStorageCharge,
                totalPicCharges: data.TotalPickCharge,
                totalReceipts: data.TotalReceiptCharge,
                totalMisc: data.TotalMiscCharge,
              };
              // Create the doughnut chart using the provided function
              createDoughnutChart(chartData);
            });
          });
        });
      })
      .catch((error) => console.error("Error:", error));
  });
  // call function for calculation
  // calculation()
});

//CanselUpdate button logic
$(document).ready(function () {
  $("#CanselUpdate").click(function () {
    $("#updateSummrydata").hide();
    $("#EstimateDetailSection").show();
  });
});

// // -----------------------------------------
// $(document).ready(function () {
//   $("#signupBtn").click(function () {
//     $("#registrationSectionId").show();
//     $("#GetStartedSection").hide();
//     $("#HeroSection").hide();
//   });
// });
//-----------------------------------------

// Set calculate days
function calculateDays() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const totalDaysElement = document.getElementById("total-Days");

  // Get the input values
  const startDateValue = startDateInput.value;
  const endDateValue = endDateInput.value;

  // Check if the input values are not empty
  if (startDateValue && endDateValue) {
    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    // One day in milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    // Display the result
    totalDaysElement.textContent = diffDays + " " + "days";

    // Set the minimum selectable date in the end date picker
    const maxStartDate = new Date(endDate);
    maxStartDate.setDate(maxStartDate.getDate() - 1); // Increment by 1 day to disable the selected start date
    startDateInput.max = maxStartDate.toISOString().slice(0, 10);
  } else {
    // Handle the case when either input is empty
    totalDaysElement.textContent = ""; // Clear the total days
  }
}


// Set calculate days
// function calculateUpdateDays() {
//   var startDate = new Date(document.getElementById("updatestart").value);
//   var endDate = new Date(document.getElementById("updateEnddate").value);
//   // One day in milliseconds
//   var oneDay = 24 * 60 * 60 * 1000;
//   // Calculate the difference in days
//   var diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
//   // Display the result
//   document.getElementById("updatetotalDays").textContent = diffDays + " " + "days";
// }

function setEndDateMin() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const errorElement = document.getElementById("errBrand");

  const startDate = new Date(startDateInput.value);
  const today = new Date();

  // Check if startDate is before today
  if (endDate < startDate) {
    errorElement.innerHTML = "Start date cannot be before today.";
    errorElement.style.color = "red";
    errorElement.style.display = "block";
    startDateInput.value = ""; // Reset the start date input value
    endDateInput.value = ""; // Reset the end date input value
    endDateInput.disabled = true; // Disable the end date input
  } else {
    errorElement.style.display = "none";
    endDateInput.disabled = false; // Enable the end date input
  }

  // Set the minimum selectable date in the end date picker
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 1); // Increment by 1 day to disable the selected start date
  endDateInput.min = minEndDate.toISOString().slice(0, 10);
// Recalculate total days
calculateDays();

}

function createDoughnutChart(dataValues) {
  new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: [
        "Total Pick Fee",
        "Total Storage",
        "Total Receipts",
        "Misc Labor",
      ],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#00AFF0", "#FFC107", "#FF8423", "#7F63F4"],
          data: [
            dataValues.totalPicCharges,
            dataValues.totalStorage,
            dataValues.totalReceipts,
            dataValues.totalMisc,
          ],
        },
      ],
    },
    options: {
      title: {
        display: true,
      },
    },
  });
}
