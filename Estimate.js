const Udataa = localStorage.getItem("userData");
const dataEstimate = JSON.parse(Udataa);
const objctID = dataEstimate.objectId;
const usertoken = dataEstimate.token;

// set fulfillments contracts in dropdown 

    // Function to save the selected Fulfillment Center in Local Storage
    function saveSelectedContract() {
        const contractSelect = document.getElementById('contract');
        const selectedIndex = contractSelect.selectedIndex;
        const selectedContract = contractSelect.options[selectedIndex].text;
        const selectedContractId = contractSelect.value;

        // Save the selected Fulfillment Center's object ID and name in Local Storage
        localStorage.setItem('dropContractID', selectedContractId);
        localStorage.setItem('dropContractName', selectedContract);
    }

    // Call second API to fetch centers
    let userobjId = {
        objectId: objctID,
    };

    fetch("https://cleanstation.backendless.app/api/services/Brand/BrandContract", {
        method: "POST",
        body: JSON.stringify(userobjId),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        var temp = "";
        // Loop through each object in the data array
        data.forEach(center => {
            temp += "<option value='" + center.objectId + "'>" + center.Contract_name + "</option>";
        });

        document.getElementById('contract').innerHTML = temp;

        // Check if a previously selected center is stored in Local Storage
        const selectedContractId = localStorage.getItem('selectedContractId');
        if (selectedContractId) {
            const centerSelect = document.getElementById('contract');
            // Set the previously selected center as the default selected option
            centerSelect.value = selectedContractId;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong");
    });

    // Add event listener to the select element to save the selected center
    document.getElementById('contract').addEventListener('change', saveSelectedContract);

// set Carrier Type in dropdown 
function saveSelectedrate() {
    const ratecardselect = document.getElementById('ratecard');
    const selectedIndexx = ratecardselect.selectedIndex;
    const selectedratecard = ratecardselect.options[selectedIndexx].text;
    const selectedRatecardId = ratecardselect.value;

    // Save the selected Fulfillment Center's object ID and name in Local Storage
    localStorage.setItem('dropratecardID', selectedRatecardId);
    localStorage.setItem('dropRatecardName', selectedratecard);
}

// Call second API to fetch centers
let contractID=localStorage.getItem("dropContractID");
fetch(`https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=${contractID}`, {
method: "GET",
headers: {
    "Content-type": "application/json; charset=UTF-8",
},
})
.then(response => response.json())
.then(data => {
    console.log(data);

    var temp = "";
    // Loop through each object in the data array
    data.forEach(ratecard => {
        temp += "<option value='" + ratecard.objectId + "'>" + ratecard.Rate_Card_Name
+ "</option>";
    });

    document.getElementById('ratecard').innerHTML = temp;

    // Check if a previously selected center is stored in Local Storage
    const selectedContractId = localStorage.getItem('dropratecardID');
    if (selectedContractId) {
        const centerSelect = document.getElementById('ratecard');
        // Set the previously selected center as the default selected option
        centerSelect.value = selectedContractId;
    }
})
.catch(error => {
    console.error("Error:", error);
    alert("Something went wrong");
});

// Add event listener to the select element to save the selected center
document.getElementById('ratecard').addEventListener('change', saveSelectedrate);



// Select Service
// Select Service 

function saveSelectservice() {
    const serviceselect = document.getElementById('service');
    const selectedIndexxx = serviceselect.selectedIndex;
    const selectedservices = serviceselect.options[selectedIndexxx].text;
    const selectedServiceId = serviceselect.value;

    // Save the selected Fulfillment Center's object ID and name in Local Storage
    localStorage.setItem('dropserviceID', selectedServiceId);
    localStorage.setItem('dropServiceName', selectedservices);
}

// Call second API to fetch centers
let contractIDD=localStorage.getItem("dropContractID");
fetch(`https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=8BEB4116-15C4-4C5E-A203-A86AD3904E6F`, {
method: "GET",
headers: {
    "Content-type": "application/json; charset=UTF-8",
},
})
.then(response => response.json())
.then(data => {
    console.log(data.Carrier_Services[1]);

    var temp = "";
    // Loop through each object in the data array
    data.forEach(Carrier_Services => {
        temp += "<option value='" + Carrier_Services.objectId + "'>" + Carrier_Services.Name
       
+ "</option>";
    });

    document.getElementById('service').innerHTML = temp;

    // Check if a previously selected center is stored in Local Storage
    const selectedContractId = localStorage.getItem('dropserviceID');
    if (selectedContractId) {
        const centerSelect = document.getElementById('service');
        // Set the previously selected center as the default selected option
        centerSelect.value = selectedContractId;
    }
})
.catch(error => {
    console.error("Error:", error);
    alert("Something went wrong");
});

// Add event listener to the select element to save the selected center
document.getElementById('service').addEventListener('change', saveSelectservice);