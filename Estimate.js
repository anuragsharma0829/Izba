const Udataa = localStorage.getItem("userData");
const dataEstimate = JSON.parse(Udataa);
const objctID = dataEstimate.objectId;
const usertoken = dataEstimate.token;



// Set  dropdown values 


function updateDropdowns(selectedContractId) {
    fetchServices(selectedContractId);
    fetchRateCards(selectedContractId);
}

function fetchServices(selectedContractId) {
    fetch("https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=" + selectedContractId)
        .then(response => response.json())
        .then(data => {
            var temp = "";
            if (data.length === 0) {
                temp = "<option disabled>No data found</option>";
            } else {
                data.forEach(service => {
                    service.Carrier_Services.forEach(subService => {
                        temp += "<option value='" + subService.objectId + "'>" + subService.Name + " (" + subService.Weight_Unit + ")" + "</option>";
                    });
                });
            }

            document.getElementById('services').innerHTML = temp;

            // Check if a previously selected service is stored in Local Storage
            const selectedServiceId = localStorage.getItem('serviceSelectId');
            if (selectedServiceId) {
                const serviceSelect = document.getElementById('services');
                // Set the previously selected service as the default selected option
                serviceSelect.value = selectedServiceId;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('services').innerHTML = "<option disabled>No data found</option>";
        });
}

function fetchRateCards(selectedContractId) {
    fetch("https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=" + selectedContractId)
        .then(response => response.json())
        .then(data => {
            var temp = "";
            if (data.length === 0) {
                temp = "<option disabled>No data found</option>";
            } else {
                data.forEach(service => {
                    temp += "<option value='" + service.objectId + "'>" + service.Rate_Card_Name + "</option>";
                });
            }

            document.getElementById('rateCard').innerHTML = temp;

            // Check if a previously selected rate card is stored in Local Storage
            const selectedRateCard = localStorage.getItem('rateCardSelectId');
            if (selectedRateCard) {
                const rateCardSelect = document.getElementById('rateCard');
                // Set the previously selected rate card as the default selected option
                rateCardSelect.value = selectedRateCard;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('rateCard').innerHTML = "<option disabled>No data found</option>";
        });
}

fetch("https://cleanstation.backendless.app/api/services/Brand/BrandContract", {
    method: "POST",
    body: JSON.stringify({ objectId: objctID }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
.then(response => response.json())
.then(data => {
    var temp = "";
    data.forEach(contract => {
        temp += "<option value='" + contract.objectId + "'>" + contract.Contract_name + "</option>";
    });

    document.getElementById('contract').innerHTML = temp;

    const selectedContractId = localStorage.getItem('selectedContractId');
    if (selectedContractId) {
        const contractSelect = document.getElementById('contract');
        contractSelect.value = selectedContractId;
        updateDropdowns(selectedContractId);
    }
})
.catch(error => {
    console.error("Error:", error);
    alert("Something went wrong");
});

document.getElementById('contract').addEventListener('change', function() {
    const selectedContractId = this.value;
    localStorage.setItem('selectedContractId', selectedContractId); // Set in local storage
    localStorage.removeItem('serviceSelectId'); // Remove previous service selection
    localStorage.removeItem('rateCardSelectId'); // Remove previous rate card selection
    updateDropdowns(selectedContractId);
});

document.getElementById('services').addEventListener('change', function() {
    const selectedServiceId = this.value;
    localStorage.setItem('serviceSelectId', selectedServiceId); // Set in local storage
});

document.getElementById('rateCard').addEventListener('change', function() {
    const selectedRateCardId = this.value;
    localStorage.setItem('rateCardSelectId', selectedRateCardId); // Set in local storage
});

// End here