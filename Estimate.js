// Check if the user is logged in
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
fetch(
    `https://cleanstation.backendless.app/api/services/Brand/BrandContract?User_id=${objctID}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
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
            rateCardList.innerHTML = "<option value='' selected='selected'>Select Rate Card</option>";

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



// manage slider and inputs for both 
const weightRangeInput = document.getElementById("ESTweightrangeinput");
const zoneRangeInput = document.getElementById("ESTzonerangeinput");
const zoneValueElement = document.getElementById("dataResult");
const weightRangeLabel = document.getElementById("weightRangeLabel");
const weightRangeSlider = document.getElementById("ESTweightrangeslider");
const ESTzonerangeslider = document.getElementById("ESTzonerangeslider");
weightRangeInput.addEventListener("input", fetchZoneValue);
zoneRangeInput.addEventListener("input", fetchZoneValue);




weightRangeInput.addEventListener("input", updateWeightRange);
weightRangeSlider.addEventListener("input", updateWeightRange);

function updateWeightRange(event) {
    const maxWeightRange = parseInt(localStorage.getItem("selectedServiceWeightRange")) || 100; // Default to 100 if value not available
    weightRangeSlider.max = maxWeightRange;
    weightRangeLabel.textContent = `${weightRangeSlider.value}`;
    let newWeightRange = parseInt(event.target.value);
    if (isNaN(newWeightRange)) {
        newWeightRange = 0;
    }

    if (newWeightRange > maxWeightRange) {
        newWeightRange = maxWeightRange;
    }

    weightRangeInput.value = newWeightRange;
    weightRangeSlider.value = newWeightRange;

    fetchZoneValue(); // Update the zone value based on the new weight range
}


zoneRangeInput.addEventListener("input", updateZoneRange);
ESTzonerangeslider.addEventListener("input", updateZoneRange);

function updateZoneRange(event) {
    const maxZoneRange = 8; // Maximum zone range value

    let newZoneRange = parseInt(event.target.value);
    if (isNaN(newZoneRange)) {
        newZoneRange = 0;
    }

    if (newZoneRange > maxZoneRange) {
        newZoneRange = maxZoneRange;
    }

    zoneRangeInput.value = newZoneRange;
    ESTzonerangeslider.value = newZoneRange;

    fetchZoneValue(); // Update the zone value based on the new zone range 
}


// end here 


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
                    zoneValueElement.textContent = `Zone Value: $ ${matchingZone[`Zone_${zoneRange}`]}`;
                } else {
                    zoneValueElement.textContent = "0";
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

async function deleteEstimate(objectID) {
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

// show particular invoive by Id 

async function getEstimateData(objctId) {
    let EstimateRCName = localStorage.getItem("selectedRateCardName")
    let EstimateServiceName = localStorage.getItem("selectedServiceName")


    fetch(`https://cleanstation.backendless.app/api/services/Estimate/EstimateIDToData?ID=${objctId}`).then(
        (res) => {
            res.json().then((data) => {

                const startDat = new Date(data.Start_Date);
                const endDat = new Date(data.End_Date);

                document.getElementById("EstimateContractName").innerHTML = data.Estimate_Name;
                document.getElementById("EstimateFCName").innerHTML = data.Contract_name || "Izba1";
                document.getElementById("EstimateRCName").innerHTML = EstimateRCName;
                document.getElementById("EstimateServiceName").innerHTML = EstimateServiceName;

                // document.getElementById("EstimateStartDateText").innerHTML = data.Start_Date;
                // document.getElementById("EstimateEndDateText").innerHTML = data.End_Date;

                const startDateText = `${startDat.getDate()}/${startDat.getMonth() + 1}/${startDat.getFullYear()}`;
                const endDateText = `${endDat.getDate()}/${endDat.getMonth() + 1}/${endDat.getFullYear()}`;

                document.getElementById("EstimateStartDateText").textContent = startDateText;
                document.getElementById("EstimateEndDateText").textContent = endDateText;

                const timeDifference = startDat.getTime() - endDat.getTime() ;
                const daysDifference = timeDifference / (1000 * 3600 * 24);
                document.getElementById("EstimateFCtotalDaysText").textContent = daysDifference + " days";


                // pick  
                document.getElementById("ESTtotalBaseOrderText").innerHTML = data.TotalOrders || 0;
                document.getElementById("ESTtotalAdditionalPickText").innerHTML = data.ExtraPicks || 0;
                document.getElementById("ESTtotalBaseReturnText").innerHTML = data.Returns || 0;
                document.getElementById("ESTtotalKitText").innerHTML = data.KitsBuilt || 0;
                // price 
                document.getElementById("ESTbaseOrderFeeText").innerHTML = "$" + data.Fulfillment_contract.Base_Per_Order_Fee || 0;
                document.getElementById("ESTadditionalPickFeeText").innerHTML = "$" + data.Fulfillment_contract.Additional_Pick_Fee || 0;
                document.getElementById("ESTbaseReturnFeeText").innerHTML = "$" + data.Fulfillment_contract.Base_Per_Return_Fee || 0;
                document.getElementById("ESTperKitFeeText").innerHTML = "$" + data.Fulfillment_contract.Additional_Pick_Kit || 0;

                // receipet
                document.getElementById("ESTtotalPalletReceivedText").innerHTML = data.ReceiptPallet || 0;
                document.getElementById("ESTtotalcasesReceivedText").innerHTML = data.ReceiptCase || 0;
                // Price 
                document.getElementById("ESTreceiptPerPalletText").innerHTML = "$" + data.Fulfillment_contract.Receipt_Per_Pallet_Fee || 0;
                document.getElementById("ESTreceiptPerCaseText").innerHTML = "$" + data.Fulfillment_contract.Receipt_Per_Case_Fee || 0;

                // Storage
                document.getElementById("ESTtotalPalletStorageText").innerHTML = data.Pallets || 0;
                document.getElementById("ESTtotalShelfStorageText").innerHTML = data.Shelfs || 0;
                document.getElementById("ESTtotalBinStorageText").innerHTML = data.Bins || 0;
                // Price 
                document.getElementById("ESTstoragePerPalletText").innerHTML = "$" + data.Fulfillment_contract.Storage_Per_Pallet || 0;
                document.getElementById("ESTstoragePerShelftext").innerHTML = "$" + data.Fulfillment_contract.Storage_Per_Shelf || 0;
                document.getElementById("ESTstoragePerBinText").innerHTML = "$" + data.Fulfillment_contract.Storage_Per_Bin || 0;


                //  labour
                document.getElementById("ESTtotalStandardHourtext").innerHTML = data.WHHours || 0 + "Hrs";
                document.getElementById("ESTtotalOTHourlyText").innerHTML = data.OTHours || 0 + "Hrs";
                document.getElementById("ESTtotalITHourlyText").innerHTML = data.ITHours || 0 + "Hrs";
                 // Price 
                 document.getElementById("ESTmanagementFeeText").innerHTML = "$" + data.Fulfillment_contract.Management_Fee || 0;
                 document.getElementById("ESTminimunFeeText").innerHTML = "$" + data.Fulfillment_contract.Minimum_Fee || 0;
                 document.getElementById("ESTstandardHourlyLaborText").innerHTML = "$" + data.Fulfillment_contract.Labor_Warehouse_Rate || 0;
                 document.getElementById("ESTOTHourlytext").innerHTML = "$" + data.Fulfillment_contract.Labor_OT_Rate || 0;
                 document.getElementById("ESTITHourlyText").innerHTML = "$" + data.Fulfillment_contract.Labor_IT_Rate || 0;


                //   Total 
                document.getElementById("ESTTotalPickFeesCalc").innerHTML = "$" + data.TotalPickCharge || 0;
                document.getElementById("ESTTotalStorage").innerHTML = "$" + data.TotalStorageCharge || 0;
                document.getElementById("ESTTotalkReceipt").innerHTML = "$" + data.TotalReceiptCharge || 0;
                document.getElementById("ESTTotalMisclabor").innerHTML = "$" + data.TotalMiscCharge || 0;
                document.getElementById("ESTtotal3plshipping").innerHTML = "$" + data.Total3PLShipping || 0;
                document.getElementById("ESTtotalbrnadshipping").innerHTML = "$" + data.TotalBrandShipping || 0;

                let TotalSpents =data.TotalCost / data.TotalOrders;
                let RoundSpentCost =  TotalSpents.toFixed(3);      
                document.getElementById("ESTTotalSpent").textContent ="$" + data.TotalCost
                document.getElementById("ESTTotalAveragePerOrder").textContent ="$" + RoundSpentCost;

                // show donat
                const chartData = {
                    totalStorage: data.TotalStorageCharge,
                    totalPicCharges: data.TotalPickCharge,
                    totalReceipts: data.TotalReceiptCharge,
                    totalMisc: data.TotalMiscCharge,
                    TotalBrandShipping:data.TotalBrandShipping,
                    Total3PLShipping:data.Total3PLShipping
                  };

                  // Create the doughnut chart using the provided function
                  createDoughnutChart(chartData);

            });
        }
    );

}

// end here

// Update estimate 
// load data 
async function loadEstimatedata(objectId){
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    fetch(`https://cleanstation.backendless.app/api/services/Estimate/EstimateIDToData?ID=${objectId}`).then(
        (res) => {
            res.json().then((data) => {



                document.getElementById("updateESTNameInput").value = data.Estimate_Name;
                document.getElementById("updateCountyList").value = data.Contract_name ;
                document.getElementById("updateRateCardList").value = EstimateRCName ;
                document.getElementById("updateServiceList").value = EstimateServiceName ;

                $("#updateEstimateStartDate").val(formatDate(data.Start_Date));
                $("#updateEstimateEndDate").val(formatDate(data.End_Date));

                // pick  
                document.getElementById("updateESTbaseorders").value = data.TotalOrders || 0;
                document.getElementById("updateESTbasketsize").value = data.ExtraPicks || 0;
                document.getElementById("updateESTbasereturns").value = data.Returns || 0;
                document.getElementById("updateESTkitscreated").value = data.KitsBuilt || 0;

                // receipet
                document.getElementById("updateESTpalletsreceived").value = data.ReceiptPallet || 0;
                document.getElementById("updateESTcasesreceived").value = data.ReceiptCase || 0;

                // Storage
                document.getElementById("updateESTpalletstorage").value = data.Pallets || 0;
                document.getElementById("updateESTshelfstorage").value = data.Shelfs || 0;
                document.getElementById("updateESTbinstorage").value = data.Bins || 0;

                //  labour
                document.getElementById("updateESTwarehousehours").value = data.WHHours || 0;
                document.getElementById("UESTOThoursinput").value = data.OTHours || 0;
                document.getElementById("UESTIThours").value = data.ITHours || 0;

            });
        }
    );
}
// End here
// End here


// Function to update estimate data
function updateEstimateData(objectId) {
    const Url = `https://cleanstation.backendless.app/api/services/Estimate/EstimateUpdate?ID=${objectId}`;


    // Collect updated data from the input fields
    const updatedData = {
        EstimateID: {
            objectId: objectId
        },
        Estimate_Name: document.getElementById('updateESTNameInput').value,
        Fulfillment_contract: {
            objectId: document.getElementById('updateCountyList').value
        },
        TotalOrders: parseInt(document.getElementById('updateESTbaseorders').value),
        ExtraPicks: parseInt(document.getElementById('updateESTbasketsize').value),
        Returns: parseInt(document.getElementById('updateESTbasereturns').value),
        KitsBuilt: parseInt(document.getElementById('updateESTkitscreated').value),
        ReceiptCase: parseInt(document.getElementById('updateESTcasesreceived').value),
        ReceiptPallet: parseInt(document.getElementById('updateESTpalletsreceived').value),
        Pallets: parseInt(document.getElementById('updateESTpalletstorage').value),
        Shelfs: parseInt(document.getElementById('updateESTshelfstorage').value),
        Bins: parseInt(document.getElementById('updateESTbinstorage').value),
        Start_Date: document.getElementById('updateEstimateStartDate').value,
        End_Date: document.getElementById('updateEstimateEndDate').value,
        WHHours: parseFloat(document.getElementById('updateESTwarehousehours').value),
        OTHours: parseFloat(document.getElementById('UESTOThoursinput').value),
        ITHours: parseFloat(document.getElementById('UESTIThours').value),
        Average_Cost: 0, // You can set this value as needed
        Service: {
            objectId: document.getElementById('updateServiceList').value
        }
    };

    // Perform the PUT request to update the data
    fetch( url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        // Handle the successful update response here
        console.log('Data updated successfully:', data);

        // Optionally, you can reload the estimate data or perform other actions
        // For example, you can call loadEstimatedata(objectId) to reload the updated data
        loadEstimatedata(objectId);

        // You can also show a success message to the user using a library like SweetAlert2
        Swal.fire('Success', 'Estimate data updated successfully', 'success');
    })
    .catch(error => {
        console.error('Error updating estimate data:', error);
        // Handle the error and show an error message to the user
        Swal.fire('Error', 'Failed to update estimate data', 'error');
    });
}

// Add a click event listener to the "Update" button
document.getElementById('updateESTunitsbutton').addEventListener('click', function () {
    const objectId = obejctId; // Replace with the actual object ID
    updateEstimateData(objectId);
});


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
                   <td onclick="handleestimateData('${estimate.objectId}')">${estimate.Estimate_Name}</td>                
                   <td>${new Date(estimate.created).toLocaleString()}</td>
                   <td>
                       <span class="edit-btn glyphicon glyphicon-pencil" onclick="handleestimateEdit('${estimate.objectId}')"></span>
                       <span class="delete-btn glyphicon glyphicon-trash" onclick="handleestimateDelete('${estimate.objectId}')"></span>                       
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
        paginationHtmlestimate += `<li${EstimateCurrentPage === i ? ' class="active"' : ''}>
                                      <a href="#" onclick="changeEstimatePage(${i})">${i}</a>
                                  </li>`;
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
    $("#Update").css("display", "block");
    $("#UpdateEstimateDetailSection").show();
    $("#EstimatemainSection").hide();

    loadEstimatedata(objectId);

}

// Function to handle Delete button click
function handleestimateDelete(objectId) {
    deleteEstimate(objectId);
    renderestimateTable(EstimateCurrentPage);
}

// handle Edtimate Data 
function handleestimateData(objectId){
    $("#Detail").css("display", "block");
    getEstimateData(objectId);

    $("#EstimatemainSection").hide();
    $("#EstimateFCDetailSection").show();
    $("#EstimateTotalinvoiceSection").show();
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
        let contract = $("#countyList").val().trim();
        let services = $("#serviceList").val().trim();
        let rateCard = $("#rateCardList").val().trim();


        // Calculate the difference in days
        let startDate = new Date(estimateStartDate);
        let endDate = new Date(estimateEndDate);
        let timeDifference = endDate - startDate;
        let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // get Contract name
        var contractName = $("#countyList option:selected").text();
        // get RatecardName name
        var ratecardName = $("#rateCardList option:selected").text();
        // get service name
        var serviceName = $("#serviceList option:selected").text();


        if (estimateNameInput !== "" && estimateStartDate !== "" && estimateEndDate !== "" && contract !== "" && services !== "" && rateCard !== "") {

            estimateErrormsg.style.display = "none";
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

            // clear input fields 
            $("#estimateNameInput").val('');
            $("#estimateStartDate").val('');
            $("#estimateEndDate").val('');
            $("#countyList").val('');
            $("#serviceList").val('');
            $("#rateCardList").val('');

        } else {
            const estimateErrormsg = document.getElementById("estimateErrormsg");
            estimateErrormsg.textContent = "Please fill all required fields"; // Set the error message text
            estimateErrormsg.style.color = "red"; // Set the color to red
            estimateErrormsg.style.display = "block";
        }

    });
});


// Create Estimate ****

$("#AddEstimateButton").click(function () {
    estimateErrormsg.style.display = "none";
    $("#Create")
    .css("display", "block")
    .css("textDecoration", "underline")
    .css("textDecorationColor", "#78C045");

    $("#estimate").css("textDecoration", "none");
    $("#estimate").css("textDecorationColor", "none");
    $("#EstimatemainSection").hide();
    $("#createEstimateSection").show();
})

$("#CancelCreateEstimateButton").click(function () {
    $("#EstimatemainSection").show();
    $("#createEstimateSection").hide();

     // clear input fields 
     $("#estimateNameInput").val('');
     $("#estimateStartDate").val('');
     $("#estimateEndDate").val('');
     $("#countyList").val('');
     $("#serviceList").val('');
     $("#rateCardList").val('');
})

$("#ESTcreateunitbutton").click(function () {
    let Estmate_name = $("#EstimateContractNametext").text().trim();
    let Start_Date = $("#EstimateStartDate").text().trim();
    let End_Date = $("#EstimateEndDate").text().trim();
    let contractId = localStorage.getItem("selectedContractId");
    let serviceId = localStorage.getItem("selectedServiceId");

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

    var numericValues = Average_Cost.match(/\d+/g);

    var result = numericValues.join(", ");

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
        Average_Cost: parseFloat(result) ?? 0,


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
            EstimateId = data.objectId;
            handleEstimateID(EstimateId);
            Swal.fire("Success", "Estimate Created Successfully", "success");
            $("#createEstimateSection").hide();
            $("#EstimateDetailSectionBlock").hide();
            $("#EstimatemainSection").show();
            // $("#EstimateTotalinvoiceSection").show();
            // getEstimateData(objctID);

        })
        .catch((error) => {
            console.error("Error:", error);
            Swal.fire("Error", error, "error");
        });
})
// End here
function handleEstimateID(objId) {
    let contractName = localStorage.getItem("selectedContractName");
    let serviceName = localStorage.getItem("selectedServiceName");
    let ratecardName = localStorage.getItem("selectedRateCardName");


    document.getElementById("EstimateFCName").textContent = contractName;
    document.getElementById("EstimateRCName").textContent = ratecardName;
    document.getElementById("EstimateServiceName").textContent = serviceName;


    // BrandName
    fetch(`https://cleanstation.backendless.app/api/services/Estimate/EstimateIDToData?ID=${objId}`)

    .then(
        (res) => {
            res.json().then((data) => {
                console.log("eeee", data);
                document.getElementById("EstimateContractName").textContent = data.Estimate_Name;
                document.getElementById("EstimateStartDateText").textContent = data.Start_Date;
                document.getElementById("EstimateEndDateText").textContent = data.End_Date;

                // pickFee 
                document.getElementById("ESTbaseOrderFeeText").textContent = data.Base_Per_Order_Fee;
                document.getElementById("ESTadditionalPickFeeText").textContent = data.Additional_Pick_Fee;
                document.getElementById("ESTtotalBaseReturnText").textContent = data.Base_Per_Return_Fee;
                document.getElementById("ESTperKitFeeText").textContent = data.Additional_Pick_Kit;


                document.getElementById("ESTtotalBaseOrderText").textContent = data.TotalBaseCost;
                document.getElementById("ESTtotalAdditionalPickText").textContent = data.Additional_Pick_Fee;
                document.getElementById("ESTtotalBaseReturnText").textContent = data.Base_Per_Return_Fee;
                document.getElementById("ESTtotalKitText").textContent = data.Additional_Pick_Kit;

            });
        }
    );

}

$("#cancelESTunitbutton").click(function () {
    $("#EstimateDetailSectionBlock").hide();
    $("#EstimatemainSection").show();
    $("#createEstimateSection").show();
})

$("#cancelupdateESTunitbutton").click(function () {
    $("#UpdateEstimateDetailSection").hide();
    $("#EstimatemainSection").show();
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

// Donut
function createDoughnutChart(dataValues) {
    new Chart(document.getElementById("doughnut-chart-after-log"), {
      type: "doughnut",
      data: {
        labels: [
          "Total Pick Fee",
          "Total Storage",
          "Total Receipts",
          "Misc Labor",
          "Total 3PL Shipping",
          "Total Brand Shipping",
        ],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#00AFF0", "#FFC107", "#FF8423", "#7F63F4", "#47b39c","#ff0000"],
            data: [
              dataValues.totalPicCharges,
              dataValues.totalStorage,
              dataValues.totalReceipts,
              dataValues.totalMisc,
              dataValues.Total3PLShipping,
              dataValues.TotalBrandShipping,
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
//   manage breadcrumb 
$("#estimate").click(function() {
    $("#Detail, #Create, #Update").hide();
    $("#estimate").css("textDecoration", "underline");
    $("#estimate").css("textDecorationColor", "#78C045");
    $("#EstimatemainSection").show();
    $("#EstimateFCDetailSection").hide();
    $("#EstimateTotalinvoiceSection").hide();
    $("#UpdateEstimateDetailSection").hide();
    $("#createEstimateSection").hide();
    $("#EstimateDetailSectionBlock").hide();

    $(this).css({
        textDecoration: "underline",
        textDecorationColor: "#78C045"
      });
});

$("#Detail").click(function() {
    $("#Detail").css("textDecoration", "underline");
    $("#Detail").css("textDecorationColor", "#78C045");
    $("#estimate").css("textDecoration", "none");
    $("#estimate").css("textDecorationColor", "none");
    $("#Update").hide();
    $("#EstimateFCDetailSection").show();
    $("#EstimateTotalinvoiceSection").show();
    $("#UpdateEstimateDetailSection").hide();
    $("#createEstimateSection").hide();

    $(this).css({
        textDecoration: "underline",
        textDecorationColor: "#78C045"
      });
});

$("#Create").click(function() {
    $("#Update").hide();
    $("#Create").css("textDecoration", "underline");
    $("#Create").css("textDecorationColor", "#78C045");
    $("#estimate").css("textDecoration", "none");
    $("#estimate").css("textDecorationColor", "none");
    $(this).css({
        textDecoration: "underline",
        textDecorationColor: "#78C045"
      });
})


$("#Update").click(function() {
    $("#Update").css("textDecoration", "underline");
    $("#Update").css("textDecorationColor", "#78C045");
    $("#estimate").css("textDecoration", "none");
    $("#estimate").css("textDecorationColor", "none");
    $(this).css({
        textDecoration: "underline",
        textDecorationColor: "#78C045"
      });
})