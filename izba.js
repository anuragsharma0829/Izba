// script.js
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(script);
let postId;
let fcobjId;
let EstimatPostid;

$(document).ready(function () {
  var tabIds = [
    "TabReceiving",
    "TabStorage",
    "TabPicking",
    "TabMisc",
    "TabEstimate",
  ];
  disableTabs(tabIds);
  $("#goToReciving").click(function () {
    let brandNameInput = $("#brandNameInput").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    let fcConatainer = $("#centers").val();

    if (brandNameInput !== "" && startDate !== "" && endDate !== "" && fcConatainer !== "") {

      let brandName = {
        Brand_name: brandNameInput,
      };
      fetch("https://cleanstation.backendless.app/api/data/Brand", {
        method: "POST",
        body: JSON.stringify(brandName),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          postId = data.objectId;
          handlePostId(postId); // Call
          // document.getElementById
        })
        .catch((error) => console.error("Error:", error));
      enableTabAndTriggerClick("TabReceiving");
    } else {
      const errorElement = document.getElementById('errBrand');
      errorElement.innerHTML = "Please fill all the requred fields";
      errorElement.style.color = "red";
      errorElement.style.display = "block";
    }
    return false;

  });

  function handlePostId(id) {
    console.log("Retrieved postId:", id);
    fetch(`https://cleanstation.backendless.app/api/data/Brand/${id}`).then(
      (res) => {
        res.json().then((data) => {
          console.log(data);
          console.log(data.brand_name);
          document.getElementById("brandNameText").innerHTML = data.brand_name;
        });
      }
    );
  }
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
  $("#receiptPerCaseInput, #receiptPerPalletInput").on('input', function () {
    const errorReciving = document.getElementById('errorReciving');
    errorReciving.style.display = "none"; // Hide the error message
  });

  $("#goToStorage").click(function () {
    let receiptPerCase = $("#receiptPerCaseInput").val();
    let receiptPerPallet = $("#receiptPerPalletInput").val();
    if (receiptPerCase !== "" || receiptPerPallet !== "") {
      enableTabAndTriggerClick("TabStorage");
    } else {
      const errorReciving = document.getElementById('errorReciving');
      errorReciving.innerHTML = "Please fill atleast one fields";
      errorReciving.style.color = "red";
      errorReciving.style.display = "block";
    }
    return false;
  });
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
  $("#storagePerPalletInput, #storagePerShelfInput , #storagePerBin").on('input', function () {
    const errorStorage = document.getElementById('errorStorage');
    errorStorage.style.display = "none"; // Hide the error message
  });

  $("#goToPicking").click(function () {
    let storagePerPallet = $("#storagePerPalletInput").val();
    let storagePerShelf = $("#storagePerShelfInput").val();
    let storagePerBin = $("#storagePerBin").val();
    if (
      storagePerPallet !== "" ||
      storagePerShelf !== "" ||
      storagePerBin !== ""
    ) {
      enableTabAndTriggerClick("TabPicking");
    } else {
      const errorStorage = document.getElementById('errorStorage');
      errorStorage.innerHTML = "Please fill atleast one fields";
      errorStorage.style.color = "red";
      errorStorage.style.display = "block";
    }
    return false;
  });
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
  $("#backToStorage").click(function () {
    $("#TabStorage").trigger("click");
  });
});
$(document).ready(function () {
  var tabIds = ["TabMisc", "TabEstimate"];
  disableTabs(tabIds);

  // Add an event listener for input changes in the fields
  $("#BaseFeePerOrderInput, #AdditionalPickFeeInput , #BaseReturnFeeInput,#BaseReturnFeeInput").on('input', function () {
    const errorPicking = document.getElementById('errorStorage');
    errorPicking.style.display = "none"; // Hide the error message
  });


  $("#goToMisc").click(function () {
    let BaseFeePerOrderInput = $("#BaseFeePerOrderInput").val();
    let AdditionalPickFeeInput = $("#AdditionalPickFeeInput").val();
    let BaseReturnFeeInput = $("#BaseReturnFeeInput").val();
    let AssemblyPerKitInput = $("#BaseReturnFeeInput").val();
    if (
      BaseFeePerOrderInput !== "" ||
      AdditionalPickFeeInput !== "" ||
      BaseReturnFeeInput !== "" ||
      AssemblyPerKitInput !== ""
    ) {
      enableTabAndTriggerClick("TabMisc");
    } else {
      const errorPicking = document.getElementById('errorPicking');
      errorPicking.innerHTML = "Please fill atleast one fields";
      errorPicking.style.color = "red";
      errorPicking.style.display = "block";
    }
    return false;
  });
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
//Back to Picking
$(document).ready(function () {
  $("#backToPicking").click(function () {
    $("#TabPicking").trigger("click");
  });
});

//Go to Estimate
$(document).ready(function () {
  var tabIds = ["TabEstimate"];
  disableTabs(tabIds);

  // Add an event listener for input changes in the fields
  $("#MonthlyManagementFeeInput, #MonthlyMinimumFeeInput , #StandardHourlyLaborInput,#OTHourlyLaborInput, #ITHourlyLaborInput").on('input', function () {
    const errorMisc = document.getElementById('errorStorage');
    errorMisc.style.display = "none"; // Hide the error message
  });

  $("#goToEstimates").click(function () {
    let MonthlyManagementFeeInput = $("#MonthlyManagementFeeInput").val();
    let MonthlyMinimumFeeInput = $("#MonthlyMinimumFeeInput").val();
    let StandardHourlyLaborInput = $("#StandardHourlyLaborInput").val();
    let OTHourlyLaborInput = $("#OTHourlyLaborInput").val();
    let ITHourlyLaborInput = $("#ITHourlyLaborInput").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
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
    if (
      (MonthlyManagementFeeInput !== "" && MonthlyMinimumFeeInput !== "") ||
      StandardHourlyLaborInput !== "" ||
      OTHourlyLaborInput !== "" ||
      ITHourlyLaborInput !== ""
    ) {
      //Api Logic for post data
      let postEstimate = {
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
        "https://cleanstation.backendless.app/api/data/Fulfillment_Contract",
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
          fcobjId = data.objectId;
          console.log("Data saved:", data);
          console.log("fcobjId retrived", fcobjId);
          handleFcobjId(fcobjId);
        })
        .catch((error) => console.error("Error:", error));

      enableTabAndTriggerClick("TabEstimate");
    } else {
      const errorMisc = document.getElementById('errorMisc');
      errorMisc.innerHTML = "Please fill atleast one fields";
      errorMisc.style.color = "red";
      errorMisc.style.display = "block";
    }

    // Function to set data

    function handleFcobjId(id) {
      console.log("Retrieved postId:", id);
      fetch(
        `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${id}`
      ).then((res) => {
        res.json().then((data) => {
          console.log(data);
          console.log(data.brand_name);
          // document.getElementById("endDateText").innerHTML = data.Start_Date;
          // document.getElementById("startDateText").innerHTML = data.End_Date;

          const startDatee = new Date(data.Start_Date);
          const endDatee = new Date(data.End_Date);

          document.getElementById("startDateText").innerHTML = `${startDatee.getDate()}/${startDatee.getMonth() + 1}/${startDatee.getFullYear()}`;
          document.getElementById("endDateText").innerHTML = `${endDatee.getDate()}/${endDatee.getMonth() + 1}/${endDatee.getFullYear()}`;

          const timeDifference = endDatee.getTime() - startDatee.getTime();
         // Convert the time difference to days
          const daysDifference = timeDifference / (1000 * 3600 * 24);
          document.getElementById('daysDifference').innerHTML=daysDifference;

          document.getElementById("managementFeeText").innerHTML =
            "$" + data.Management_Fee;
          document.getElementById("minimunFeeText").innerHTML =
            "$" + data.Minimum_Fee;
          document.getElementById("standardHourlyLaborText").innerHTML =
            "$" + data.Labor_Warehouse_Rate;
          document.getElementById("OTHourlytext").innerHTML =
            "$" + data.Labor_OT_Rate;
          document.getElementById("ITHourlyText").innerHTML =
            "$" + data.Labor_IT_Rate;
          document.getElementById("baseOrderFeeText").innerHTML =
            "$" + data.Base_Per_Order_Fee;
          document.getElementById("additionalPickFeeText").innerHTML =
            "$" + data.Additional_Pick_Fee;
          document.getElementById("baseReturnFeeText").innerHTML =
            "$" + data.Base_Per_Return_Fee;
          document.getElementById("perKitFeeText").innerHTML =
            "$" + data.Additional_Pick_Kit;
          document.getElementById("storagePerBinText").innerHTML =
            "$" + data.Storage_Per_Bin;
          document.getElementById("storagePerShelftext").innerHTML =
            "$" + data.Storage_Per_Shelf;
          document.getElementById("storagePerPalletText").innerHTML =
            "$" + data.Storage_Per_Pallet;
          document.getElementById("receiptPerPalletText").innerHTML =
            "$" + data.Receipt_Per_Pallet_Fee;
          document.getElementById("receiptPerCaseText").innerHTML =
            "$" + data.Receipt_Per_Case_Fee;

          //show in update form
        });
      });

      // Handle relation for brands

      // set Relation
      let BrandRelation = {
        Fulfillment_Contract: id,
      };

      // api to update BrandTable
      fetch(
        `https://cleanstation.backendless.app/api/data/Brand/${postId}/Fulfillment_Contract`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(BrandRelation),
        }
      )
        .then((response) => response.json())
        .then((setrelationBrand) => {
          console.log("Data updated ho gaya:", setrelationBrand);
          // Update the displayed data without refreshing the page
        });
      // end here


      // set relation for add FC center name 
      // set Relation
      const selectedCenterId = localStorage.getItem('selectedCenterId');
      const selectedCenterName = localStorage.getItem('selectedCenterName');
      let FCcenter = {
        Fulfillment_Center: selectedCenterId,
      };

      // api to update BrandTable
      fetch(
        `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${id}/Fulfillment_Center`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FCcenter),
        }
      )
        .then((response) => response.json())
        .then((setrelationFCcenter) => {
        });
      // end here

    }



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
  //Back to Misc
  $(document).ready(function () {
    $("#backToMisc").click(function () {
      $("#TabMisc").trigger("click");
    });
  });

  // Show Hide using Estimate Button and set Quntity in Estimate Table

  $(document).ready(function () {
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
        ReceiptPallet: PalletsReceivedInput.trim() !== "" ? parseFloat(PalletsReceivedInput) : 0,
        ReceiptCase: casesReceived.trim() !== "" ? parseFloat(casesReceived) : 0,
        Pallets: palletStorage.trim() !== "" ? parseFloat(palletStorage) : 0,
        Shelfs: shelfStorage.trim() !== "" ? parseFloat(shelfStorage) : 0,
        Bins: binStorage.trim() !== "" ? parseFloat(binStorage) : 0,
        TotalOrders: baseOrders.trim() !== "" ? parseFloat(baseOrders) : 0,
        ExtraPicks: basketSize.trim() !== "" ? parseFloat(basketSize) : 0,
        Returns: baseReturns.trim() !== "" ? parseFloat(baseReturns) : 0,
        KitsBuilt: kitsCreated.trim() !== "" ? parseFloat(kitsCreated) : 0,
        WHHours: warehouseHours.trim() !== "" ? parseFloat(warehouseHours) : 0,
        OTHours: otHours.trim() !== "" ? parseFloat(otHours) : 0,
        ITHours: itHours.trim() !== "" ? parseFloat(itHours) : 0,
      };

      // Call API to save the Estimate data
      fetch("https://cleanstation.backendless.app/api/data/Estimate", {
        method: "POST",
        body: JSON.stringify(estimatorDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          EstimateId = data.objectId;
          EstimatPostid = data.objectId
          localStorage.setItem('EstimatPostid', EstimatPostid);
          console.log("Data saved:", data);
          console.log("EstimateId retrieved:", EstimatPostid, ",,,,,,,,,,,,,", EstimateId);
          // handleEstimateId(EstimateId); // Call the function to handle the retrieved EstimateId
          handleEstimateId(EstimatPostid);

          // Perform the additional calculations and update the data
          // pic fee 
          let Base_Per_Order_Fee, Additional_Pick_Fee, Base_Per_Return_Fee, Additional_Pick_Kit;
          let TotalOrders, ExtraPicks, Returns, KitsBuilt;
          // reciving fee
          let Receipt_Per_Pallet_Fee, Receipt_Per_Case_Fee, ReceiptPallet, ReceiptCase;
          // Storage
          let Storage_Per_Pallet, Storage_Per_Shelf, Storage_Per_Bin, Pallets, Shelfs, Bins;
          // lbour charge 
          let Management_Fee, Minimum_Fee, Labor_Warehouse_Rate, Labor_OT_Rate, Labor_IT_Rate, WHHours, OTHours, ITHours;

          // Fetch fulfillment contract data
          fetch(`https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`)
            .then((res) => res.json())
            .then((data) => {
              Base_Per_Order_Fee = data.Base_Per_Order_Fee;
              Additional_Pick_Fee = data.Additional_Pick_Fee;
              Base_Per_Return_Fee = data.Base_Per_Return_Fee;
              Additional_Pick_Kit = data.Additional_Pick_Kit;
              // reciving fee
              Receipt_Per_Pallet_Fee = data.Receipt_Per_Pallet_Fee;
              Receipt_Per_Case_Fee = data.Receipt_Per_Case_Fee
              // Storage
              Storage_Per_Pallet = data.Storage_Per_Pallet;
              Storage_Per_Shelf = data.Storage_Per_Shelf;
              Storage_Per_Bin = data.Storage_Per_Bin;
              // labour
              Management_Fee = data.Management_Fee;
              Minimum_Fee = data.Minimum_Fee;
              Labor_Warehouse_Rate = data.Labor_Warehouse_Rate;
              Labor_OT_Rate = data.Labor_OT_Rate;
              Labor_IT_Rate = data.Labor_IT_Rate;

              // Fetch estimator contact data
              fetch(`https://cleanstation.backendless.app/api/data/Estimate/${EstimateId}`)
                .then((res) => res.json())
                .then((data) => {
                  // pic fee 
                  TotalOrders = data.TotalOrders;
                  ExtraPicks = data.ExtraPicks;
                  Returns = data.Returns;
                  KitsBuilt = data.KitsBuilt;
                  // reciving fee
                  ReceiptPallet = data.ReceiptPallet;
                  ReceiptCase = data.ReceiptCase;
                  // storage
                  Pallets = data.Pallets;
                  Shelfs = data.Shelfs;
                  Bins = data.Bins;
                  // labur 
                  WHHours = data.WHHours;
                  OTHours = data.OTHours;
                  ITHours = data.ITHours

                  // set calculation for base order and quntity
                  let baseCostTotal = Base_Per_Order_Fee * TotalOrders;
                  let totalExtPic = Additional_Pick_Fee * ExtraPicks;
                  let TotalReturns = Base_Per_Return_Fee * Returns;
                  let totalKitCosts = Additional_Pick_Kit * KitsBuilt;

                  // Perform calculations using these variables
                  let TotalPickCharges = baseCostTotal + totalExtPic + TotalReturns + totalKitCosts
                  // Total reciving
                  let TotalReciving = Receipt_Per_Pallet_Fee * ReceiptPallet + Receipt_Per_Case_Fee * ReceiptCase;
                  // Total storage
                  let Storagecalcu = Storage_Per_Pallet * Pallets + Storage_Per_Shelf * Shelfs + Storage_Per_Bin * Bins
                  // TotalStorage = ((Storage_Per_Pallet * Pallets) + (Storage_Per_Shelf * Shelfs) + (Storage_Per_Bin * Bins)) * 12
                  TotalStorage = Storagecalcu * 12
                  //  labour
                  let TotalLaburCharge = Labor_Warehouse_Rate * WHHours + Labor_OT_Rate * OTHours + Labor_IT_Rate * ITHours + Management_Fee;
                  // totaal +spent avergae
                  let TotalSpents = TotalPickCharges + TotalReciving + TotalStorage + TotalLaburCharge;
                  let average = TotalSpents / TotalOrders;
                  document.getElementById('TotalSpent').textContent = "$" + TotalSpents;
                  document.getElementById('TotalAveragePerOrder').textContent = "$" + average;

                  let totalsEstimate = {
                    TotalPickCharge: TotalPickCharges,
                    TotalReceiptCharge: TotalReciving,
                    TotalBaseCost: baseCostTotal,
                    ExtraPicksCost: totalExtPic,
                    ReturnsCost: TotalReturns,
                    KitCost: totalKitCosts,
                    TotalStorageCharge: TotalStorage,
                    TotalMiscCharge: TotalLaburCharge
                  };

                  // Call API to UPDATE the Estimate data
                  fetch(`https://cleanstation.backendless.app/api/data/Estimate/${EstimateId}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(totalsEstimate),
                  })
                    .then((response) => response.json())
                    .then((getTotals) => {
                      console.log("All totals????????", getTotals);
                      document.getElementById('TotalPickFeesCalc').textContent = "$" + getTotals.TotalPickCharge;
                      document.getElementById('TotalStorage').textContent = "$" + getTotals.TotalStorageCharge;
                      document.getElementById('TotalkReceipt').textContent = "$" + getTotals.TotalReceiptCharge;
                      document.getElementById('TotalMisclabor').textContent = "$" + getTotals.TotalMiscCharge;
                      // You can perform any additional actions here after the data has been updated
                    });
                });
            });
        })
        .catch((error) => console.error("Error:", error));
    });
  });


  // handle EstimatorID
  function handleEstimateId(id) {
    console.log("Retrieved Estimator:", id);

    // Handle relation
    // set Relation
    let EstimatorRelation = {
      Fulfillment_Contract: fcobjId,
    };

    console.log("object BrandRelation Ka", EstimatorRelation);
    console.log("postId aa gayi", EstimatPostid);
    fetch(
      `https://cleanstation.backendless.app/api/data/Estimate/${EstimatPostid}/Fulfillment_Contract`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(EstimatorRelation),
      }
    )
      .then((response) => response.json())
      .then((SetestimatorRelation) => {
        console.log("Data updated ho gaya:", SetestimatorRelation);
      });
    // end here 

    // load estimator by id
    fetch(
      `https://cleanstation.backendless.app/api/data/Estimate/${id}?loadRelations=Fulfillment_Contract`
    ).then((res) => {
      res.json().then((data) => {
        console.log("get estimater Data for calculation", data);
        // Pick Fee
        document.getElementById("totalBaseOrderText").innerHTML =
          data.TotalOrders;
        document.getElementById("totalAdditionalPickText").innerHTML =
          data.ExtraPicks;
        document.getElementById("totalBaseReturnText").innerHTML =
          data.Returns;
        document.getElementById("totalKitText").innerHTML =
          data.KitsBuilt;

        // Storage
        document.getElementById("totalPalletStorageText").innerHTML =
          data.Pallets;
        document.getElementById("totalShelfStorageText").innerHTML =
          data.Shelfs;
        document.getElementById("totalBinStorageText").innerHTML =
          data.Bins;

        // Receiving
        document.getElementById("totalPalletReceivedText").innerHTML =
          data.ReceiptPallet;
        document.getElementById("totalcasesReceivedText").innerHTML =
          data.ReceiptCase;

        // Labour
        document.getElementById("totalStandardHourtext").innerHTML =
          data.WHHours;
        document.getElementById("totalOTHourlyText").innerHTML =
          data.OTHours;
        document.getElementById("totalITHourlyText").innerHTML =
          data.ITHours;
      });
    });
debugger
      // Chart donute 
      let totalStorage;
      let totalpicCharges;
      let totalRecipet;
      let totalMisc;

      fetch(`https://cleanstation.backendless.app/api/data/Estimate/${id}`).then(
        (res) => {
          res.json().then((data) => {
            console.log(data);
            totalStorage = data.TotalStorageCharge;
            totalpicCharges = data.TotalPickCharge;
            totalRecipet = data.TotalReceiptCharge
            totalMisc = data.TotalMiscCharge;
          });
        }
      );
      new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
          labels: ["Total Pick Fee", "Total Storage", "Total Receipts", "Misc Labor"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#00AFF0", "#FFC107", "#FF8423", "#7F63F4"],
              data: [totalStorage, totalpicCharges, totalRecipet, totalMisc]
            }
          ]
        },
        options: {
          title: {
            display: true,

          }
        }
      });
   
  }
//----------------------------------------------------------------------
  $(document).ready(function () {
    $("#AddFulfillmentButton").click(function () {
      $("#GetStartedSection").hide();
      $("#NewFulfillmentCenterSection").show();
    });
  });
  $(document).ready(function () {
    $("#closeFulfillmentCenterPopup").click(function () {
      $("#NewFulfillmentCenterSection").hide();
      $("#GetStartedSection").show();
    });
  });

  // Add Fullfillment Center
  $(document).ready(function () {
    $("#addFccenter").click(function () {
      let fcName = $("#fcName").val();
      let fcUrl = $("#fcUrl").val();
      let fcaddress = $("#fcaddress").val();
      let fcCity = $("#fcCity").val();
      let fcState = $("#fcState").val();
      let fcZipCode = $("#fcZipCode").val();
      let fcCounter = $("#fcCounter").val();


      // Check if any required field is empty
      if (!fcName || !fcUrl || !fcaddress || !fcCity || !fcState || !fcZipCode || !fcCounter) {
        // Set the error message and apply red color
        $("#errorAddfccenter").text("Please fill all required fields.");
        $("#errorAddfccenter").css("color", "red");
        $("#errorAddfccenter").show();
        return; // Stop the function from proceeding further
      }

      // If all required fields are filled, remove the error message and reset color
      $("#errorAddfccenter").hide();
      $("#errorAddfccenter").text("");
      $("#errorAddfccenter").css("color", "initial");


      let createFCData = {
        Street_Address: fcaddress,
        ZIP_Code: fcZipCode,
        Storage_Type: "Ambient",
        City: fcCity,
        URL: fcUrl,
        Center_Name: fcName,
        State: fcState,
        Country: fcCounter,
      };
      fetch(
        "https://cleanstation.backendless.app/api/data/Fulfillment_Center",
        {
          method: "POST",
          body: JSON.stringify(createFCData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Data saved:", data);
          console.log("Success");
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'fullfillment Center Added Success',
            showConfirmButton: false,
            timer: 2500,
          })
          $("#NewFulfillmentCenterSection").hide();
          $("#GetStartedSection").show();
        })
        .catch((error) => console.error("Error:", error));
    });
  });
  // hide the no result section
  let data2 = document.getElementById('centers').length;
  if (data2 <= 0) {
    document.getElementById("fcConatainer").style.display = "block";
  }


  //update Estimator by id
  $("#updateButton").click(function () {
    $("#updateSummrydata").show();
    $("#EstimateDetailSection").hide();

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
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }


    fetch(
      `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Current data:", data);

        // Set the current values in the input fields
        document.getElementById("updatestart").value = formatDate(data.Start_Date);
        document.getElementById("updateEnddate").value = formatDate(data.End_Date);
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
            document.getElementById("UpdateBaseOrder").value =
              data.TotalOrders;
            document.getElementById("updateAdditionPic").value =
              data.ExtraPicks;
            document.getElementById("updateBasereturn").value =
              data.Returns;
            document.getElementById("updatePerKit").value =
              data.KitsBuilt;

            // Storage
            document.getElementById("updatePalletStorage").value =
              data.Pallets;
            document.getElementById("UpdateShelfOccupied").value =
              data.Shelfs;
            document.getElementById("updateBinOccupied").value =
              data.Bins;

            // Receiving
            document.getElementById("updatePalletRecived").value =
              data.ReceiptPallet;
            document.getElementById("UpdateCasesReciive").value =
              data.ReceiptCase;

            // Labour
            document.getElementById("updateStandardHours").value =
              data.WHHours;
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
            Management_Fee: document.getElementById("updateManagementFee").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateManagementFee").value),
            Minimum_Fee: document.getElementById("updateMInimumFee").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateMInimumFee").value),
            Labor_Warehouse_Rate: document.getElementById("updateWarehouseFee").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateWarehouseFee").value),
            Labor_OT_Rate: document.getElementById("updateOTLabor").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateOTLabor").value),
            Labor_IT_Rate: document.getElementById("updateITLabor").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateITLabor").value),
            Base_Per_Order_Fee: document.getElementById("updateBaseorderfee").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateBaseorderfee").value),
            Additional_Pick_Fee: document.getElementById("updateAdditinpickfee").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateAdditinpickfee").value),
            Base_Per_Return_Fee: document.getElementById("updateBasereturnFee").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateBasereturnFee").value),
            Additional_Pick_Kit: document.getElementById("updatePerkitfee").value.trim() === '' ? 0 : parseFloat(document.getElementById("updatePerkitfee").value),
            Storage_Per_Bin: document.getElementById("updateperBin").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateperBin").value),
            Storage_Per_Shelf: document.getElementById("updatePerSelf").value.trim() === '' ? 0 : parseFloat(document.getElementById("updatePerSelf").value),
            Storage_Per_Pallet: document.getElementById("updateStoragePerPallet").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateStoragePerPallet").value),
            Receipt_Per_Pallet_Fee: document.getElementById("updaterecivingPerPallet").value.trim() === '' ? 0 : parseFloat(document.getElementById("updaterecivingPerPallet").value),
            Receipt_Per_Case_Fee: document.getElementById("updateReceiptPerCase").value.trim() === '' ? 0 : parseFloat(document.getElementById("updateReceiptPerCase").value),
          };

          // object for Estimator for update
          const UpdateEstimatorqunt = {
            ReceiptPallet: +document.getElementById("updatePalletRecived").value || 0,
            ReceiptCase: +document.getElementById("UpdateCasesReciive").value || 0,
            Pallets: +document.getElementById("updatePalletStorage").value || 0,
            Shelfs: +document.getElementById("UpdateShelfOccupied").value || 0,
            Bins: +document.getElementById("updateBinOccupied").value || 0,
            TotalOrders: +document.getElementById("UpdateBaseOrder").value || 0,
            ExtraPicks: +document.getElementById("updateAdditionPic").value || 0,
            Returns: +document.getElementById("updateBasereturn").value || 0,
            KitsBuilt: +document.getElementById("updatePerKit").value || 0,
            WHHours: +document.getElementById("updateStandardHours").value || 0,
            OTHours: +document.getElementById("updateOTHourConsumed").value || 0,
            ITHours: +document.getElementById("updateITHourConsumed").value || 0,
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
              console.log("Data updated:", updatedData);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Contarct Data Updated Successfully',
                showConfirmButton: false,
                timer: 2500,
              })

              // Update the displayed data without refreshing the page
              const startDate = new Date(updatedData.Start_Date);
              const endDate = new Date(updatedData.End_Date);
              document.getElementById("startDateText").innerHTML = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
              document.getElementById("endDateText").innerHTML = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;


              const timeDifference = endDate.getTime() - startDate.getTime();
              // Convert the time difference to days
               const daysDifference = timeDifference / (1000 * 3600 * 24);
               document.getElementById('daysDifference').innerHTML=daysDifference;


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
              console.log("Estimator Data updated:", updatedEdata);
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
                updatedEdata.RceiptPallet;
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

       
 // Chart donute 
 debugger
  let totalStorage;
  let totalpicCharges;
  let totalRecipet;
  let totalMisc;

  fetch(`https://cleanstation.backendless.app/api/data/Estimate/${EstimatPostid}`).then(
    (res) => {
      res.json().then((data) => {
        console.log("hnnnnnnumannnn",data);
        totalStorage = data.TotalStorageCharge;
        totalpicCharges = data.TotalPickCharge;
        totalRecipet = data.TotalReceiptCharge
        totalMisc = data.TotalMiscCharge;
      });
    }
  );
  new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Total Pick Fee", "Total Storage", "Total Receipts", "Misc Labor"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#00AFF0", "#FFC107", "#FF8423", "#7F63F4"],
          data: [totalStorage, totalpicCharges, totalRecipet, totalMisc]
        }
      ]
    },
    options: {
      title: {
        display: true,

      }
    }
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
})

// -----------------------------------------
$(document).ready(function () {
  $("#signupBtn").click(function () {
    $("#registrationSectionId").show();
    $("#GetStartedSection").hide();
    $("#HeroSection").hide();
  });
});
//-----------------------------------------

//login   

document.getElementById("SigninButton2").addEventListener("click", function () {
  $("#registrationSectionId").hide();
  var uemil = document.getElementById("uemail").value;
  var Password = document.getElementById("upassword").value;

  // Login section
  var loginUrl =
    "https://api.backendless.com/4921FD25-45AC-9E96-FF7F-865537F72100/6B4F94DC-59DA-42A3-AC9D-C7974DD0B601/users/login";

  var loginData = {
    login: uemil,
    password: Password,
  };

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  };

  fetch(loginUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid Credentials"); // Throw an error for invalid credentials
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data
      console.log(data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 2500,
      })

      const redirectUrl = 'https://www.izba.exchange/dashboard-after-log-in';

      // Perform the redirect using window.location.href
      window.location.href = redirectUrl;
      // $("#registrationSectionId").hide();
      // $("#GetStartedSection").hide();
      // $("#HeroSection").hide();
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
      // Show an alert for invalid credentials
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Invalid Credentials',
        showConfirmButton: false,
        timer: 2500,
      })
    });

});



// User Regitration
$(document).ready(function () {
  $("#SignUpButton").click(function () {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let password = $("#password").val();

    let userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    fetch("https://cleanstation.backendless.app/api/data/Users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong"); // Throw an error if the response is not successful
        }
        return response.json();
      })
      .then((data) => {
        console.log("user saved:", data);
        console.log("Registration Success");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Registration Success',
          showConfirmButton: false,
          timer: 2500,
        })
        $("#loginSection").show();
        $("#registrationSectionId").hide();
        $("#GetStartedSection").hide();
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 2500,
        })
      });
  });
});

// Set calculate days
function calculateDays() {
  var startDate = new Date(document.getElementById("startDate").value);
  var endDate = new Date(document.getElementById("endDate").value);
  // One day in milliseconds
  var oneDay = 24 * 60 * 60 * 1000;
  // Calculate the difference in days
  var diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  // Display the result
  document.getElementById("total-Days").textContent = diffDays + " days";
}

// Set calculate days
function calculateUpdateDays() {
  var startDate = new Date(document.getElementById("updatestart").value);
  var endDate = new Date(document.getElementById("updateEnddate").value);
  // One day in milliseconds
  var oneDay = 24 * 60 * 60 * 1000;
  // Calculate the difference in days
  var diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  // Display the result
  document.getElementById("updatetotalDays").textContent = diffDays + " days";
}








