const userData = localStorage.getItem("userData");
const data = JSON.parse(userData);
const objID = data.objectId;
const token = data.token;
const script = document.createElement("script");
script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js";
document.head.appendChild(script);


// Show Invoices

async function fetchInvoiceData(objID) {
    try {
        const response = await fetch(`https://cleanstation.backendless.app/api/services/Invoice/UserTOInvoice?ID=${objID}`);
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
    console.log(`Clicked on name invoice. Invoice ID: ${invoiceId}`);
});

$('.delete-btn').on('click', function() {
    const invoiceId = $(this).data('id');
    alert(`Clicked on delete icon. Invoice ID: ${invoiceId}`);
    console.log(`Clicked on delete icon. Invoice ID: ${invoiceId}`);
    // Add your delete logic here
});
}

$(document).ready(function() {
populateInvoiceTable();
});
