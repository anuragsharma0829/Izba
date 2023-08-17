const Udataa = localStorage.getItem("userData");
const dataEstimate = JSON.parse(Udataa);
const objctID = dataEstimate.objectId;
const usertoken = dataEstimate.token;

// Set  dropdown values 

var countyList = document.getElementById("countyList"),
rateCardList = document.getElementById("rateCardList"),
serviceList = document.getElementById("serviceList");
var contractData; // Store fetched contract data

// Fetch contract data and populate contract dropdown
fetch("https://cleanstation.backendless.app/api/services/Brand/BrandContract", {
method: "POST",
body: JSON.stringify({ objectId: "AF00B19D-5B3B-4840-8304-8EF0005DB39B" }),
headers: {
    "Content-type": "application/json; charset=UTF-8",
},
})
.then(response => response.json())
.then(responseData => {
    contractData = responseData; // Store the contract data
    populateContractDropdown(contractData);
})
.catch(error => {
    console.error("Error fetching contract data:", error);
    populateRateCardDropdown([]); // Display "No rate card found" message
});

function populateContractDropdown(data) {
for (var entry of data) {
    countyList.options[countyList.options.length] = new Option(entry.Contract_name, entry.objectId);
}

// Check if there's a selected contract and pre-select it
var selectedContractId = localStorage.getItem("selectedContractId");
if (selectedContractId) {
    countyList.value = selectedContractId;
    populateRateCardDropdown(selectedContractId);
}
}

countyList.onchange = function () {
var selectedContractId = this.value;
var selectedContractName = this.options[this.selectedIndex].text;
localStorage.setItem("selectedContractId", selectedContractId);
localStorage.setItem("selectedContractName", selectedContractName);
populateRateCardDropdown(selectedContractId);
};

function populateRateCardDropdown(selectedContractId) {
rateCardList.innerHTML = ""; // Clear previous options

// Fetch rate card data using the selected contract objectId
var rateCardUrl = `https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=${selectedContractId}`;
fetch(rateCardUrl)
    .then(response => response.json())
    .then(rateCardData => {
        if (rateCardData.length === 0) {
            rateCardList.innerHTML = "<option value='noRateCard'>No rate card found for this contract</option>";
            serviceList.innerHTML = ""; // Clear services dropdown
            return;
        }

        for (var entry of rateCardData) {
            rateCardList.options[rateCardList.options.length] = new Option(entry.Rate_Card_Name, entry.objectId);
        }

        // Check if there's a selected rate card and pre-select it
        var selectedRateCardId = localStorage.getItem("selectedRateCardId");
        if (selectedRateCardId) {
            rateCardList.value = selectedRateCardId;
        } else {
            rateCardList.selectedIndex = 0; // Select the "Select Rate Card" option
        }

        populateServiceDropdown(selectedRateCardId);
    })
    .catch(error => {
        console.error("Error fetching rate card data:", error);
        rateCardList.innerHTML = "<option value='noRateCard'>No rate card found for this contract</option>";
    });
}

rateCardList.onchange = function () {
var selectedRateCardId = this.value;
var selectedRateCardName = this.options[this.selectedIndex].text;
localStorage.setItem("selectedRateCardId", selectedRateCardId);
localStorage.setItem("selectedRateCardName", selectedRateCardName);

populateServiceDropdown();
};

serviceList.onchange = function () {
var selectedServiceId = this.value;
var selectedServiceName = this.options[this.selectedIndex].text;
var selectedServiceWeightUnit = this.options[this.selectedIndex].getAttribute("data-weight-unit");
var selectedServiceWeightRange = this.options[this.selectedIndex].getAttribute("data-weight-range");
localStorage.setItem("selectedServiceId", selectedServiceId);
localStorage.setItem("selectedServiceName", selectedServiceName);
localStorage.setItem("selectedServiceWeightUnit", selectedServiceWeightUnit);
localStorage.setItem("selectedServiceWeightRange", selectedServiceWeightRange);
};

function populateServiceDropdown() {
serviceList.innerHTML = ""; // Clear previous options

var selectedContractId = localStorage.getItem("selectedContractId");

// Fetch service data using the selected contract ID
var rateCardUrl = `https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=${selectedContractId}`;
fetch(rateCardUrl)
.then(response => response.json())
.then(rateCardData => {
var selectedRateCardName = localStorage.getItem("selectedRateCardName");

var selectedRateCard = rateCardData.find(rateCard => rateCard.Rate_Card_Name === selectedRateCardName);
var services = selectedRateCard?.Carrier_Services || [];
console.log("Services:", services); // Log the fetched services to the console

if (services.length === 0) {
    serviceList.innerHTML = "<option value='noService'>No services found for this rate card</option>";
    return;
}

serviceList.options[serviceList.options.length] = new Option("Select Service", ""); // Add the "Select Service" option
for (var entry of services) {
    var serviceName = entry.Name || "Unnamed Service"; // Use a default name if Name property is missing
    var serviceWeightUnit = entry.Weight_Unit || "N/A"; // Use a default weight unit if Weight_Unit property is missing
    var serviceWeightRange = entry.Weight_Range || "N/A";
    console.log("Adding service:", serviceName); // Log the service being added to the console
    serviceList.options[serviceList.options.length] = new Option(serviceName, entry.objectId);
    serviceList.options[serviceList.options.length - 1].setAttribute("data-weight-unit", serviceWeightUnit); // Set weight unit as attribute
    serviceList.options[serviceList.options.length - 1].setAttribute("data-weight-range", serviceWeightRange);
}
})
.catch(error => {
console.error("Error fetching service data:", error);
serviceList.innerHTML = "<option value='noService'>No services found for this rate card</option>";
});
}


// Check if there's a selected contract and pre-select it
var selectedContractId = localStorage.getItem("selectedContractId");
if (selectedContractId) {
countyList.value = selectedContractId;
// countyList.onchange(); // Trigger change event to populate rate cards
}


const weightRangeInput = document.getElementById("ESTweightrangeinput");
const zoneRangeInput = document.getElementById("ESTzonerangeinput");
const zoneValueElement = document.getElementById("dataResult");

weightRangeInput.addEventListener("input", fetchZoneValue);
zoneRangeInput.addEventListener("input", fetchZoneValue);

function fetchZoneValue() {
const weightRange = parseInt(weightRangeInput.value);
const zoneRange = parseInt(zoneRangeInput.value);
const selectedServiceWeightUnit = localStorage.getItem("selectedServiceWeightUnit");
var serviceId = localStorage.getItem("selectedServiceId");

if (!isNaN(weightRange) && !isNaN(zoneRange) && selectedServiceWeightUnit) {
const weightField = `Weight_${selectedServiceWeightUnit.toUpperCase()}`;

const apiUrl = `https://cleanstation.backendless.app/api/services/Estimate/ServiceIDToZone?ID=${serviceId}`;

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const matchingZone = data.find(entry => 
        entry[weightField] === weightRange && entry[`Zone_${zoneRange}`] !== undefined
    );

    if (matchingZone) {
        zoneValueElement.textContent = `Zone Value: ${matchingZone[`Zone_${zoneRange}`]}`;
    } else {
        zoneValueElement.textContent = "No matching data found.";
    }
})
.catch(error => {
    console.error("Error fetching zone data:", error);
    zoneValueElement.textContent = "Error fetching zone data.";
});
} else {
zoneValueElement.textContent = "Please enter valid weight and zone ranges.";
}
}

// End here

// function fo estimates 
// Delete Estimate

async function deleteEstimate(objectID){
    Swal.fire({
        icon: "info",
        title: "Are You sure",
        confirmButtonText: "Delete",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // Delete
            // If user confirms the deletion, proceed with the actual deletion
            const estimateID = {
                objectId: objectID,
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/Estimate/Delete_Estimate",
                {
                    method: "DELETE",
                    body: JSON.stringify(estimateID),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log("API Response for delete:", data);
                    Swal.fire("Success", "Estimate Delete SuccessFully", "success");
                    renderestimateTable(EstimateCurrentPage);
                })
                .catch((error) => console.error("Error deleting contract:", error));
        }
    });
}


// endhere


// SHow estimates in table 

   // Global variables
   let EstimateCurrentPage = 1;
   const estimateItemsPerPage = 5; // You can change the number of items per page here

   // Function to fetch data from API
   async function fetchEstimateData() {
 try {
     const response = await fetch(`https://cleanstation.backendless.app/api/services/Estimate/UserIDToEstimate?ID=${objctID}`);
     if (!response.ok) {
         throw new Error('Network response was not ok.');
     }
     const data = await response.json();
     return data;
 } catch (error) {
     console.error('Error fetching invoice data:', error);
     return null;
 }
}

   // Function to render the table
   async function renderestimateTable(page) {
       const data = await fetchEstimateData();

   
       if (data.length === 0) {
           // Show the "No rate card for this contact" message if no data is available
           document.getElementById('Estimate-table-body').innerHTML = '';
           document.getElementById('estimate-pagination').innerHTML = '';
           document.getElementById('estimate-no-data-message').style.display = 'block';
           return;
       }

       const EstimatestartIndex = (page - 1) * estimateItemsPerPage;
       const EstimateendIndex = EstimatestartIndex + estimateItemsPerPage;
       const paginatedDataestimate = data.slice(EstimatestartIndex, EstimateendIndex);

       document.getElementById('estimate-no-data-message').style.display = 'none';

       const tableBody = document.getElementById('Estimate-table-body');
       tableBody.innerHTML = paginatedDataestimate.map(estimate => {
         //   const status = estimate.Status ? '<span class="completed">Completed</span>' : '<span class="processing">Procesing</span>';
           return `
               <tr>
                   <td>${estimate.Estimate_Name}</td>
                
                   <td>${new Date(estimate.created).toLocaleString()}</td>
                   <td>
                       <span class="delete-btn glyphicon glyphicon-trash" onclick="handleestimateDelete('${estimate.objectId}')"></span>
                       <span class="edit-btn glyphicon glyphicon-pencil" onclick="handleestimateEdit('${estimate.objectId}')"></span>
                   </td>
               </tr>
           `;
       }).join('');

       renderestimatePagination(data.length);
   }

   // Function to render pagination
   function renderestimatePagination(totalItems) {
       const totalPages = Math.ceil(totalItems / estimateItemsPerPage);
       const paginationElement = document.getElementById('estimate-pagination');

       let paginationHtmlestimate = `
           <li${EstimateCurrentPage === 1 ? ' class="disabled"' : ''}>
               <a href="#" aria-label="Previous" onclick="prevestmatePage()">
                   <span aria-hidden="true">&laquo; Previous</span>
               </a>
           </li>
       `;
       for (let i = 1; i <= totalPages; i++) {
         paginationHtmlestimate += `<li${EstimateCurrentPage === i ? ' class="active"' : ''}><a href="#" onclick="changeEstimatePage(${i})">${i}</a></li>`;
       }
       paginationHtmlestimate += `
           <li${EstimateCurrentPage === totalPages ? ' class="disabled"' : ''}>
               <a href="#" aria-label="Next" onclick="nextestimatePage()">
                   <span aria-hidden="true">Next &raquo;</span>
               </a>
           </li>
       `;
       paginationElement.innerHTML = paginationHtmlestimate;
   }

// Function to change to the previous page
   function prevestmatePage() {
 if (EstimateCurrentPage > 1) {
     EstimateCurrentPage--;
     renderestimateTable(EstimateCurrentPage);
     renderestimatePagination(fetchEstimateData().length); // Pass the totalItems argument here
 }
}
// Function to change to the next page
   function nextestimatePage() {
 const data = fetchEstimateData();
 data.then(result => {
     const totalPages = Math.ceil(result.length / estimateItemsPerPage);
     if (EstimateCurrentPage < totalPages) {
         EstimateCurrentPage++;
         renderestimateTable(EstimateCurrentPage);
         renderestimatePagination(result.length);
     }
 }).catch(error => {
     console.error('Error fetching rate data:', error);
 });
}
function changeEstimatePage(pageNumber) {
 EstimateCurrentPage = pageNumber; // Set the current page to the clicked page number
 renderestimateTable(EstimateCurrentPage);
}


 //   Function to handle Edit button click
   function handleestimateEdit(objectId) {
       alert(`Edit data with objectId: ${objectId}`);
   }

   // Function to handle Delete button click
   function handleestimateDelete(objectId) {
    deleteEstimate(objectId);
    renderestimateTable(EstimateCurrentPage);
   }

   // Initialize the table on page load
   renderestimateTable(EstimateCurrentPage);


// end here 


// set estimate name  startdate and end date in nextPAge

$(document).ready(function () {
    $("#createEstimateButton").click(function () {
        let estimateNameInput = $("#estimateNameInput").val().trim();
        let estimateStartDate = $("#estimateStartDate").val().trim();
        let estimateEndDate = $("#estimateEndDate").val().trim();
        let contract = $("#contract").val().trim();
        let services = $("#services").val().trim();
        let rateCard = $("#rateCard").val().trim();
        const estimateErrormsg = document.getElementById("estimateErrormsg");

        // Calculate the difference in days
        let startDate = new Date(estimateStartDate);
        let endDate = new Date(estimateEndDate);
        let timeDifference = endDate - startDate;
        let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // get Contract name
        var contractName = $("#contract option:selected").text();
        // get RatecardName name
        var ratecardName = $("#rateCard option:selected").text();
        // get service name
        var serviceName = $("#services option:selected").text();


        if (estimateNameInput !== "" && estimateStartDate !== "" && estimateEndDate !== "" && contract !== "" && services !== "" && rateCard !== "") {
            // Set values in the next page
            $("#EstimateContractNametext").text(estimateNameInput);
            $("#EstimateStartDate").text(estimateStartDate);
            $("#EstimateEndDate").text(estimateEndDate);
            $("#EstimateFCNameText").text(contractName);
            $("#EstimateRCNameText").text(ratecardName);
            $("#EstimateServiceNameText").text(serviceName);
            $("#EstimateFCtotalDays").text(daysDifference);


            $("#EstimateDetailSectionBlock").show();
            $("#EstimatemainSection").hide();
            $("#createEstimateSection").hide();

        } else {
            const estimateErrormsg = document.getElementById("estimateErrormsg");
            estimateErrormsg.textContent = "Please fill all required fields"; // Set the error message text
            estimateErrormsg.style.color = "red"; // Set the color to red
            estimateErrormsg.style.display = "block";
        }

    });
});


// Create Estimate ****
$("#ESTcreateunitbutton").click(function () {
    let Estmate_name = $("#EstimateContractNametext").text().trim();
    let Start_Date = $("#EstimateStartDate").text().trim();
    let End_Date = $("#EstimateEndDate").text().trim();
    let contractId = localStorage.getItem("selectedContractId");
    let serviceId = localStorage.getItem("serviceID");

    // Reciving
    let ReceiptPallet = $("#ESTpalletsreceivedinput").val().trim();
    let ReceiptCase = $("#ESTcasesreceivedinput").val().trim();

    // Storage
    let Pallets = $("#ESTpalletstorageinput").val().trim();
    let Shelfs = $("#ESTshelfstorageinput").val().trim();
    let Bins = $("#ESTbinstorageinput").val().trim();

    // Picking
    let TotalOrders = $("#ESTbaseordersinput").val().trim();
    let ExtraPicks = $("#ESTbasketsizeinput").val().trim();
    let Returns = $("#ESTbasereturnsinput").val().trim();
    let KitsBuilt = $("#ESTkitscreatedinput").val().trim();

    // Misc
    let WHHours = $("#ESTwarehousehoursinput").val().trim();
    let OTHours = $("#ESTOThoursinput").val().trim();
    let ITHours = $("#ESTIThours").val().trim();

    let Average_Cost = $("#dataResult").text().trim();

    let estimateData =
    {
        Estimate_Name: Estmate_name,
        Start_Date: Start_Date,
        End_Date: End_Date,
        ReceiptPallet: parseFloat(ReceiptPallet) ?? 0,
        ReceiptCase: parseFloat(ReceiptCase) ?? 0,
        Pallets: parseFloat(Pallets) ?? 0,
        Shelf: parseFloat(Shelfs) ?? 0,
        Bins: parseFloat(Bins) ?? 0,
        TotalOrders: parseFloat(TotalOrders) ?? 0,
        ExtraPicks: parseFloat(ExtraPicks) ?? 0,
        Returns: parseFloat(Returns) ?? 0,
        KitsBuilt: parseFloat(KitsBuilt) ?? 0,
        WHHours: parseFloat(WHHours) ?? 0,
        OTHours: parseFloat(OTHours) ?? 0,
        ITHours: parseFloat(ITHours) ?? 0,
        Average_Cost: parseFloat(Average_Cost) ?? 0,


        Fulfillment_contract: {
            objectId: contractId
        },
        Service: {

            objectId: serviceId
        },
        Users_ID: {

            objectId: objctID
    
    }
    }

    fetch(
        "https://cleanstation.backendless.app/api/services/Estimate/Crate_Estimate",
        {
            method: "POST",
            body: JSON.stringify(estimateData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("Paras API done total", data);
            EstimateId = data.objectId;
            handleEstimateID(EstimateId);
            Swal.fire("Success", "Estimate Created Successfully", "success");
            $("#FulfillmentContractDetailSection").hide();
            $("#fulfillmentContractSection").hide();
            $("#CreateFulfillmentContractSection").hide();
            $("#MainSection").show();
        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.fire("Error", error, "error");
        });
})
// End here
function handleEstimateID(objId){
console.log(objId);
}

$("#cancelESTunitbutton").click(function () {
    $("#EstimateDetailSectionBlock").hide();
    $("#EstimatemainSection").show();
    $("#createEstimateSection").show();
})



function calcEstimateDays() {
    var startDate = new Date(document.getElementById("estimateStartDate").value);
    var endDate = new Date(document.getElementById("estimateEndDate").value);
    // One day in milliseconds
    var oneDay = 24 * 60 * 60 * 1000;
    // Calculate the difference in days
    var diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    // Display the result
    document.getElementById("totalEstimate-Days").textContent =
        diffDays + " days";
}



function setEndDateEstimatelog() {
    const startDateInput = document.getElementById("estimateStartDate");
    const endDateInput = document.getElementById("estimateEndDate");
    const errorElement = document.getElementById("estimateErrormsg");

    const startDate = new Date(startDateInput.value);
    const today = new Date();

    // Check if startDate is before today
    if (estimateEndDate < startDate) {
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