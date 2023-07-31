// Get the value of the "object_id" query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const objectId = urlParams.get("object_id");
// Now, "objectId" contains the value of the object ID passed from the previous page
console.log(objectId);



// add rate card 
function showGenericError() {
    showError("#errorContainer", "Please fill out all the required fields.");
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
      const rateCardmessage = document.getElementById("BrandMessage");
      rateCardmessage.innerHTML = "Something went wrong ! please try agian ";
      rateCardmessage.style.color = "white";
      rateCardmessage.style.backgroundColor = "red";
      rateCardmessage.style.display = "block";
    }
    return false;
  });
});