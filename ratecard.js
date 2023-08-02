const uData = localStorage.getItem("userData");
const datarate = JSON.parse(uData);
const objctID = datarate.objectId;
const usertoken = datarate.token;
// const scriptRate = document.createElement("script");
// scriptRate.src =
//     "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js";
// document.head.appendChild(scriptRate);


// Show Invoices

async function fetchInvoiceData() {
    try {
        const response = await fetch(`https://cleanstation.backendless.app/api/services/Invoice/UserTOInvoice?ID=AF00B19D-5B3B-4840-8304-8EF0005DB39B`);
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
function getStatusColor(status) {
return status === 'Completed' ? 'green' : 'red';
}

async function populateInvoiceTable() {
    const invoiceData = await fetchInvoiceData();
    if (!invoiceData || invoiceData.length === 0) {
        $('#invoice-no-data-message').show();
        return;
    }

    const tableBody = $('#invoice-table-body');
    tableBody.empty();

    invoiceData.forEach(invoice => {
    const statusColor = getStatusColor(invoice.Status);
    const row = `<tr>
        <td class="invoice-name" data-id="${invoice.objectId}">${invoice.Invoice_name}</td>
        <td style="color: ${statusColor}; font-weight: bold;">${invoice.Status}</td>
        <td>${new Date(invoice.created).toLocaleString()}</td>
        <td>
          
            <i class="fas fa-trash-alt delete-btn" data-id="${invoice.objectId}" style="color: red;" title="Delete"></i>
        </td>
    </tr>`;
    tableBody.append(row);
});

// Add event listeners for click on name and delete icons
$('.invoice-name').on('click', function() {
    const invoiceId = $(this).data('id');
    console.log(invoiceId);
  
});

$('.delete-btn').on('click', function() {
    const invoiceId = $(this).data('id');
   
    Swal.fire({
        icon: "info",
        title: "Are You sure",
        confirmButtonText: "Delete",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // Delete
            // If user confirms the deletion, proceed with the actual deletion
            const invoiceID = {
                objectId: invoiceId,
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/Invoice/InvoiceDelete",
                {
                    method: "DELETE",
                    body: JSON.stringify(invoiceID),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log("API Response for delete:", data);
                    Swal.fire("Success", "Contract Delete SuccessFully", "success");
                    
                })
                .catch((error) => console.error("Error deleting contract:", error));
        }
    });


});
}

$(document).ready(function() {
populateInvoiceTable();
});
