let postId;
let fcobjId;
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
    if (brandNameInput !== "") {
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
          console.log("Data saved:", data);
          console.log("Success");
          alert("hello", postId);
          handlePostId(postId); // Call
        })
        .catch((error) => console.error("Error:", error));
      enableTabAndTriggerClick("TabReceiving");
    } else {
      alert("Brand Name Should not be empty");
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
          document.getElementById("bname").innerHTML = data.brand_name;
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
  $("#goToStorage").click(function () {
    let receiptPerCase = $("#receiptPerCaseInput").val();
    let receiptPerPallet = $("#receiptPerPalletInput").val();
    if (receiptPerCase !== "" || receiptPerPallet !== "") {
      enableTabAndTriggerClick("TabStorage");
    } else {
      alert("Please fillt");
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
      alert("Please 1 filed ");
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

  $("#goToMisc").click(function () {
    let BaseFeePerOrderInput = $("#BaseFeePerOrderInput").val();
    let AdditionalPickFeeInput = $("#AdditionalPickFeeInput").val();
    let BaseReturnFeeInput = $("#BaseReturnFeeInput").val();
    let AssemblyPerKitInput = $("#AssemblyPerKitInput").val();
    if (
      BaseFeePerOrderInput !== "" ||
      AdditionalPickFeeInput !== "" ||
      BaseReturnFeeInput !== "" ||
      AssemblyPerKitInput !== ""
    ) {
      enableTabAndTriggerClick("TabMisc");
    } else {
      alert("Please fill ands ");
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
          fcobjId = data.objectId; // changes
          console.log("Data saved:", data);
          console.log("fcobjId retrived",fcobjId);
          handleFcobjId(fcobjId); // Call
        })
        .catch((error) => console.error("Error:", error));

      enableTabAndTriggerClick("TabEstimate");
    } else {
      alert("Please fill any one of in this fields ");
    }
    return false;
  });

  // Function to set data

  function handleFcobjId(id) {
    console.log("Retrieved postId:", id);
    fetch(`https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${id}`).then(
      (res) => {
        res.json().then((data) => {
          console.log(data);
          console.log(data.brand_name);
          document.getElementById('endDateText').innerHTML=data.Start_Date;
          document.getElementById('startDateText').innerHTML=data.End_Date;
          document.getElementById('managementFeeText').innerHTML=data.Management_Fee
          document.getElementById('minimunFeeText').innerHTML=data.Minimum_Fee
          document.getElementById('standardHourlyLaborText').innerHTML=data.Labor_Warehouse_Rate
          document.getElementById('OTHourlytext').innerHTML=data.Labor_OT_Rate
          document.getElementById('ITHourlyText').innerHTML=data.Labor_IT_Rate
          document.getElementById('baseOrderFeeText').innerHTML=data.Base_Per_Order_Fee
          document.getElementById('additionalPickFeeText').innerHTML=data.Additional_Pick_Fee
          document.getElementById('baseReturnFeeText').innerHTML=data.Base_Per_Return_Fee
          document.getElementById('perKitFeeText').innerHTML=data.Additional_Pick_Kit
          document.getElementById('storagePerBinText').innerHTML=data.Storage_Per_Bin
          document.getElementById('storagePerShelftext').innerHTML=data.Storage_Per_Shelf
          document.getElementById('storagePerPalletText').innerHTML=data.Storage_Per_Pallet
          document.getElementById('receiptPerPalletText').innerHTML=data.Receipt_Per_Pallet_Fee
          document.getElementById('receiptPerCaseText').innerHTML=data.Receipt_Per_Case_Fee
          //show in update form
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
//Back to Misc
$(document).ready(function () {
  $("#backToMisc").click(function () {
    $("#TabMisc").trigger("click");
  });
});
$(document).ready(function () {
  $("#gotoEstimateDetail").click(function () {
    $("#GetStartedSection").hide();
    $("#EstimateDetailSection").show();
    $("#EstimateEnvoice").show();
  });
});
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
  $("#SaveFC").click(function () {
 let fcName = $("#fcName").val();
 let fcUrl = $("#fcUrl").val();
 let fcAddress = $("#fcAddress").val();
 let fcType = $("#fcType").val();
 let fcCity = $("#fcCity").val();
 let fcState = $("#fcState").val();
 let fcZipcode = $("#fcZipcode").val();
 let fcCountry = $("#fcCountry").val();

 let createFCDeta = {
		Street_Address: fcAddress,
		ZIP_Code: fcZipcode,
		Storage_Type: fcType,
		City: fcCity,
		URL: fcUrl,
		Center_Name: fcName,
		State: fcState,
		Country: fcCountry,
};
fetch("https://cleanstation.backendless.app/api/data/Fulfillment_Center", {
  method: "POST",
  body: JSON.stringify(createFCDeta),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((data) => {
    postId = data.objectId;
    console.log("Data saved:", data);
    console.log("Success");
    alert("hello", postId);
    handlePostId(postId); // Call
  })
  .catch((error) => console.error("Error:", error));


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
          password: password	
        
      };
      fetch("https://cleanstation.backendless.app/api/data/Users", {
method: "POST",
body: JSON.stringify(userData),
headers: {
  "Content-type": "application/json; charset=UTF-8",
},
})
.then((response) => response.json())
.then((data) => {
  console.log("user saved:", data);
  console.log("Registration Success");
})
.catch((error) => console.error("Error:", error));
  });
});

//update Estimator by id 

// $("#updateButton").click(function () {
//   $("#updateSummrydata").show();
//   $("#EstimateDetailSection").hide();
//   // Use the postId variable here
//   console.log("fcobjId in updateButton click:", fcobjId);
//   console.log("updateDataiddddd",fcobjId);
//     fetch(`https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`).then(
//       (res) => {
//         res.json().then((data) => {
//           console.log("updateDataqqqqq",data);
//           console.log("updateDataiddddd",fcobjId);
//     document.getElementById('updatestart').value =data.Start_Date;
//     document.getElementById('updateEnddate').value =data.End_Date;
//     document.getElementById('updateManagementFee').value=data.Management_Fee
//     document.getElementById('updateMInimumFee').value=data.Minimum_Fee
//     document.getElementById('updateWarehouseFee').value=data.Labor_Warehouse_Rate
//     document.getElementById('updateOTLabor').value=data.Labor_OT_Rate
//     document.getElementById('updateITLabor').value=data.Labor_IT_Rate
//     document.getElementById('updateBaseorderfee').value=data.Base_Per_Order_Fee
//     document.getElementById('updateAdditinpickfee').value=data.Additional_Pick_Fee
//     document.getElementById('updateBasereturnFee').value=data.Base_Per_Return_Fee
//     document.getElementById('updatePerkitfee').value=data.Additional_Pick_Kit
//     document.getElementById('updateperBin').value=data.Storage_Per_Bin
//     document.getElementById('updatePerSelf').value=data.Storage_Per_Shelf
//     document.getElementById('updateStoragePerPallet').value=data.Storage_Per_Pallet
//     document.getElementById('updaterecivingPerPallet').value=data.Receipt_Per_Pallet_Fee
//     document.getElementById('updateReceiptPerCase').value=data.Receipt_Per_Case_Fee
//           //show in update form
//         });
//       }
//     );
      
//     // then Update 

//     $("#updateButton").click(function () {
//       $("#updateSummrydata").show();
//       $("#EstimateDetailSection").hide();
//       // Use the postId variable here
//      console.log("Update in progress");
//         fetch(`https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`).then(
          
//           (res) => {
//             res.json().then((data) => {
//               console.log("updateDataqqqqq",data);
//               console.log("updateDataiddddd",fcobjId);
//         document.getElementById('updatestart').value =data.Start_Date;
//         document.getElementById('updateEnddate').value =data.End_Date;
//         document.getElementById('updateManagementFee').value=data.Management_Fee
//         document.getElementById('updateMInimumFee').value=data.Minimum_Fee
//         document.getElementById('updateWarehouseFee').value=data.Labor_Warehouse_Rate
//         document.getElementById('updateOTLabor').value=data.Labor_OT_Rate
//         document.getElementById('updateITLabor').value=data.Labor_IT_Rate
//         document.getElementById('updateBaseorderfee').value=data.Base_Per_Order_Fee
//         document.getElementById('updateAdditinpickfee').value=data.Additional_Pick_Fee
//         document.getElementById('updateBasereturnFee').value=data.Base_Per_Return_Fee
//         document.getElementById('updatePerkitfee').value=data.Additional_Pick_Kit
//         document.getElementById('updateperBin').value=data.Storage_Per_Bin
//         document.getElementById('updatePerSelf').value=data.Storage_Per_Shelf
//         document.getElementById('updateStoragePerPallet').value=data.Storage_Per_Pallet
//         document.getElementById('updaterecivingPerPallet').value=data.Receipt_Per_Pallet_Fee
//         document.getElementById('updateReceiptPerCase').value=data.Receipt_Per_Case_Fee
//               //show in update form
//             });
//           }
//         );

// });
// });

$("#updateButton").click(function () {
  $("#updateSummrydata").show();
  $("#EstimateDetailSection").hide();

  // Use the postId variable here
  console.log("Update in progress");

  fetch(`https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Start_Date: document.getElementById('updatestart').value,
      End_Date: document.getElementById('updateEnddate').value,
      Management_Fee: document.getElementById('updateManagementFee').value,
      Minimum_Fee: document.getElementById('updateMInimumFee').value,
      Labor_Warehouse_Rate: document.getElementById('updateWarehouseFee').value,
      Labor_OT_Rate: document.getElementById('updateOTLabor').value,
      Labor_IT_Rate: document.getElementById('updateITLabor').value,
      Base_Per_Order_Fee: document.getElementById('updateBaseorderfee').value,
      Additional_Pick_Fee: document.getElementById('updateAdditinpickfee').value,
      Base_Per_Return_Fee: document.getElementById('updateBasereturnFee').value,
      Additional_Pick_Kit: document.getElementById('updatePerkitfee').value,
      Storage_Per_Bin: document.getElementById('updateperBin').value,
      Storage_Per_Shelf: document.getElementById('updatePerSelf').value,
      Storage_Per_Pallet: document.getElementById('updateStoragePerPallet').value,
      Receipt_Per_Pallet_Fee: document.getElementById('updaterecivingPerPallet').value,
      Receipt_Per_Case_Fee: document.getElementById('updateReceiptPerCase').value
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data updated:", data);
      // Perform any further actions after the update
    })
    .catch((error) => console.error("Error:", error));
});
