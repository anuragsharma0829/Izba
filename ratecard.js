const uData = localStorage.getItem("userData");
const datarate = JSON.parse(uData);
const objctID = datarate.objectId;
const usertoken = datarate.token;
// const scriptRate = document.createElement("script");
// scriptRate.src =
//     "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js";
// document.head.appendChild(scriptRate);


// Show Invoices

// Global variables
let invoiceCurrentPage = 1;
const invoiceItemsPerPage = 10; // You can change the number of items per page here

// Function to fetch data from API
async function fetchInvoiceData() {
    try {
        const response = await fetch(`https://cleanstation.backendless.app/api/services/Invoice/UserTOInvoice?ID=${objctID}`);
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
async function renderInvoiceTable(page) {
    const data = await fetchInvoiceData();


    if (data.length === 0) {
        // Show the "No rate card for this contact" message if no data is available
        document.getElementById('invoice-table-body').innerHTML = '';
        document.getElementById('invoice-pagination').innerHTML = '';
        document.getElementById('invoice-no-data-message').style.display = 'block';
        return;
    }

    const invoicestartIndex = (page - 1) * invoiceItemsPerPage;
    const invoiceendIndex = invoicestartIndex + invoiceItemsPerPage;
    const paginatedDatainvoice = data.slice(invoicestartIndex, invoiceendIndex);

    document.getElementById('invoice-no-data-message').style.display = 'none';

    const tableBody = document.getElementById('invoice-table-body');
    tableBody.innerHTML = paginatedDatainvoice.map(invoice => {
        const status = invoice.Status;
        const statusColor = status === 'Completed' ? 'green' : 'red';
        return `
             <tr>
                 <td onclick="handleInvoiceData('${invoice.objectId}')">${invoice.Invoice_name}</td>
                 <td style="color: ${statusColor}">${status}</td>
                 <td>${new Date(invoice.created).toLocaleString()}</td>
                 <td>
                     <span class="delete-btn glyphicon glyphicon-trash" onclick="handleInvoiceDelete('${invoice.objectId}')"></span>
                 </td>
             </tr>
         `;
    }).join('');

    renderinvoicePagination(data.length);
}

// Function to render pagination
function renderinvoicePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / invoiceItemsPerPage);
    const paginationElement = document.getElementById('invoice-pagination');

    let paginationHtmlInvoice = `
         <li${invoiceCurrentPage === 1 ? ' class="disabled"' : ''}>
             <a href="#" aria-label="Previous" onclick="prevInvoicePage()">
                 <span aria-hidden="true">&laquo; Previous</span>
             </a>
         </li>
     `;
    for (let i = 1; i <= totalPages; i++) {
        paginationHtmlInvoice += `<li${invoiceCurrentPage === i ? ' class="active"' : ''}><a href="#" onclick="renderInvoiceTable(${i})">${i}</a></li>`;
    }
    paginationHtmlInvoice += `
         <li${invoiceCurrentPage === totalPages ? ' class="disabled"' : ''}>
             <a href="#" aria-label="Next" onclick="nextInvoicePage()">
                 <span aria-hidden="true">Next &raquo;</span>
             </a>
         </li>
     `;
    paginationElement.innerHTML = paginationHtmlInvoice;
}

// Function to change to the previous page
function prevInvoicePage() {
    if (invoiceCurrentPage > 1) {
        invoiceCurrentPage--;
        renderInvoiceTable(invoiceCurrentPage);
        renderinvoicePagination(fetchInvoiceData().length); // Pass the totalItems argument here
    }
}
// Function to change to the next page
function nextInvoicePage() {
    const data = fetchInvoiceData();
    data.then(result => {
        const totalPages = Math.ceil(result.length / invoiceItemsPerPage);
        if (invoiceCurrentPage < totalPages) {
            invoiceCurrentPage++;
            renderInvoiceTable(invoiceCurrentPage);
            renderinvoicePagination(result.length);
        }
    }).catch(error => {
        console.error('Error fetching rate data:', error);
    });
}


// Function to handle Edit button click
// function handleRateEdit(objectId) {
//     alert(`Edit data with objectId: ${objectId}`);
// }

// Function to handle Delete button click
function handleInvoiceDelete(objectId) {
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
                objectId: objectId,
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
                    renderInvoiceTable(invoiceCurrentPage);
                })
                .catch((error) => console.error("Error deleting contract:", error));
        }
    });
}
function handleInvoiceData(objectId){
    alert(objectId)
}

// Initialize the table on page load
renderInvoiceTable(invoiceCurrentPage);



// ******************* Uplaod Invoice **********
$(document).ready(function () {
    $("#UploadInvoiceButton").click(function () {
       

        async function sendInvoiceData(requestData, retries = 5, delay = 2000) {
            try {
                const response = await fetch('https://cleanstation.backendless.app/api/services/Invoice/AddInvoice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
                const data = await response.json();
                console.log(data); // Handle the response data here
                // Hide the loader on success
                $("#loader").hide();
                Swal.fire("Success","File uploaded successflly","success")
                renderInvoiceTable(invoiceCurrentPage);
            } catch (error) {
                console.error('Error sending data:', error);
                if (retries > 0) {
                    // Retry with exponential backoff
                    setTimeout(() => {
                        sendInvoiceData(requestData, retries - 1, delay * 2);
                    }, delay);
                } else {
                    console.error('Max retries reached. Could not send data.');
                    // Hide the loader on failure
                    $("#loader").hide();
                }
            }
        }
    
        // Helper function to convert ArrayBuffer to Base64
        function arrayBufferToBase64(buffer) {
            let binary = '';
            let bytes = new Uint8Array(buffer);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        }
    
        $(document).ready(function () {
            $("#UploadInvoiceButton").click(function () {
                let invoiceName = $("#InvoiceNameInput").val();
                let fileInput = document.getElementById('fileInput').files[0];
    
                if (invoiceName && fileInput) {
                    let fileReader = new FileReader();
    
                    fileReader.onload = function (event) {
                        let fileBytes = event.target.result;
                        let invoiceData = arrayBufferToBase64(fileBytes);
    
                        let requestData = {
                            Invoice_name: invoiceName,
                            Invoice_data: invoiceData,
                            User_Id: {
                                objectId: objctID,
                            },
                        };
    
                        // Show the loader before making the API request
                        $("#loader").show();
    
                        sendInvoiceData(requestData);
                    };
    
                    fileReader.readAsArrayBuffer(fileInput);
                }
            });
        });

    });
});