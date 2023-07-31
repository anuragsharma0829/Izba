// Get the value of the "object_id" query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const objectId = urlParams.get("object_id");
// Now, "objectId" contains the value of the object ID passed from the previous page
console.log(objectId);
const script = document.createElement("script");
script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js";
document.head.appendChild(script);


// add rate card 
function showGenericError() {
    showError("#rateCardmessage", "Please fill out all the required fields.");
}
$(document).ready(function () {
    $("#rcNAme-Name").on("input", function () {
        let rcNAme = $("#rcNAme").val();
        if (!rcNAme) {
            showError("#rcnameError", "Ratecard name should not be blank");
        } else {
            hideError("#rcnameError");
        }
    });
    $("#addRCcardbtn").click(function () {
        let rcNAme = $("#rcNAme").val();
        if (rcNAme !== "") {
            let ratecardDetail = {
                Fulfillment_Contract_ID: {

                    objectId: objectId
                },
                Rate_Card_Name: rcNAme,
                Carrier_Type: localStorage.getItem("RCtype"),
                Brand_Contract: true
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/ZoneRateCard/CreateRateCardDetail",
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
                    console.log("doneee", data);
                    let rID = data.objectId
                    handleRatecardID(rID)
                    const rateCardmessage = document.getElementById("rateCardmessage");
                    rateCardmessage.innerHTML = "Rate Card created successfully";
                    rateCardmessage.style.color = "white";
                    rateCardmessage.style.backgroundColor = "green";
                    rateCardmessage.style.display = "block";
                    $("#ratecardDetailSection").show();
                    $("#ratecardSectioncreate").hide();
                    $("#createrateCardsection").hide();
                    document.getElementById("RateCardNameText").innerHTML = data.Rate_Card_Name;
                    document.getElementById("CarrierTypeText").innerHTML = data.Carrier_Type;
                    document.getElementById("BrandContractText").innerHTML = data.Brand_Contract;
                })
                .catch((error) => console.error("Error:", error));
        } else {
            showGenericError();
            const rateCardmessage = document.getElementById("rateCardmessage");
            rateCardmessage.innerHTML = "Something went wrong ! please try agian ";
            rateCardmessage.style.color = "white";
            rateCardmessage.style.backgroundColor = "red";
            rateCardmessage.style.display = "block";
        }
        return false;
    });
});

// handle id for update and delete rateCard 
function handleRatecardID(rID) {
    console.log("Retrived RatecardID", rID);


    $("#UpdateRCDetailButton").click(function () {
        $("#UpdateRateCardsection").show();
        $("#RateCardDetailBlock").hide();
        $("#createServiceSection").hide();
        let ratecardID = {
            objectId: rID,
        };
        fetch("https://cleanstation.backendless.app/api/services/ZoneRateCard/IDToRateCard", {
            method: "POST",
            body: JSON.stringify(ratecardID),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("hellloooooooooo",data);
                document.getElementById("updateRateCard").innerHTML = data.Rate_Card_Name;
            })
            .catch((error) => console.error("Error fetching data:", error));
        // update rate card 
    });

    $("#updaterateCard").click(function () {
        $("#UpdateRateCardsection").show();
        $("#RateCardDetailBlock").hide();
        $("#createServiceSection").hide();
        let ratecardname = $("#updateRateCard").val();
        let Carrier_Type = localStorage.getItem("RCtype")

        let updatedObj = {
            Rate_Card_ID: {
                objectId: rID
            },
            Rate_Card_Name: ratecardname,
            Carrier_Type: Carrier_Type,
            Brand_Contract: false
        }
        // Make the PUT request to update the RateCard
        fetch("https://cleanstation.backendless.app/api/services/ZoneRateCard/Update", {
            method: "PUT",
            body: JSON.stringify(updatedObj),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Contract updated successfully, show the success message
                Swal.fire("Success", "RateCard updated successfully", "success");
                // Optionally, you can also hide the update form section after the update
                $("#UpdateRateCardsection").hide();
                $("#RateCardDetailBlock").show();
                $("#createServiceSection").show();

            })
            .catch((error) => {
                console.error("Error updating contract:", error);
                Swal.fire("Error", "An error occurred while updating the contract", "error");
            });
    });
}