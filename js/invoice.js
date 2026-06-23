const token = localStorage.getItem("token");

console.log("invoice.js loaded");
console.log("Token:", token);

let itemCount = 0;

async function loadClients() {
    const response = await fetch(`${BASE_URL}/clients`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const clients = await response.json();
    console.log(clients);

    const clientSelect = document.getElementById("clientSelect");
    clientSelect.innerHTML = "";

    clients.forEach(client => {
        clientSelect.innerHTML += `
            <option value="${client.id}">
                ${client.name}
            </option>
        `;
    });
}

function addItemField() {
    itemCount++;

    const container = document.getElementById("itemsContainer");

    container.innerHTML += `
        <div class="item-row" id="item-${itemCount}">
            <input type="text" id="itemName-${itemCount}" placeholder="Item Name">
            <input type="number" id="quantity-${itemCount}" placeholder="Quantity">
            <input type="number" id="price-${itemCount}" placeholder="Price">
        </div>
    `;
}

async function createInvoice() {
    console.log("Create invoice clicked");

    if (itemCount === 0) {
    alert("Please add at least one item");
    return;
}

const selectedClient = document.getElementById("clientSelect").value;

if (!selectedClient) {
    alert("Please select a client");
    return;
}

    const items = [];

    for (let i = 1; i <= itemCount; i++) {
        items.push({
            itemName: document.getElementById(`itemName-${i}`).value,
            quantity: parseInt(document.getElementById(`quantity-${i}`).value),
            price: parseFloat(document.getElementById(`price-${i}`).value)
        });
    }

    const data = {
        clientId: parseInt(selectedClient),
        issueDate: document.getElementById("issueDate").value,
        dueDate: document.getElementById("dueDate").value,
        notes: document.getElementById("notes").value,
        gstPercentage: 18,
        items: items
    };

    console.log(data);

    const response = await fetch(`${BASE_URL}/invoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Invoice created successfully");
        loadInvoices();
    }
}

// function renderInvoices(invoices) {
//     const invoiceList = document.getElementById("invoiceList");
//     invoiceList.innerHTML = "";

//     invoices.forEach(invoice => {
//         invoiceList.innerHTML += `
//             <div class="invoice-card">
//                 <p><strong>${invoice.invoiceNumber}</strong></p>
//                 <p>Status: ${invoice.status}</p>
//                 <p>Total: ₹${invoice.totalAmount}</p>
//             </div>
//             <hr>
//         `;
//     });
// }

function renderInvoices(invoices) {
    const invoiceList = document.getElementById("invoiceList");
    invoiceList.innerHTML = "";

    invoices.forEach(invoice => {
        invoiceList.innerHTML += `
            <div class="invoice-card">
                <p><strong>${invoice.invoiceNumber}</strong></p>
                <p>Status: ${invoice.status}</p>
                <p>Total: ₹${invoice.totalAmount}</p>
            </div>
            <hr>
        `;
    });
}

async function loadInvoices() {
    const response = await fetch(`${BASE_URL}/invoices`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const invoices = await response.json();

    renderInvoices(invoices);   

//     const invoices = await response.json();

//     const invoiceList = document.getElementById("invoiceList");
//     invoiceList.innerHTML = "";

//     invoices.forEach(invoice => {
//         invoiceList.innerHTML += `
//     <div class="invoice-card">
//         <p><strong>${invoice.invoiceNumber}</strong></p>
//         <p>Status: ${invoice.status}</p>
//         <p>Total: ₹${invoice.totalAmount}</p>

//         <button onclick="downloadPdf(${invoice.id})">
//             Download PDF
//         </button>

//         <button onclick="sendInvoiceEmail(${invoice.id})">
//             Send Email
//         </button>

//         <button onclick="markAsPaid(${invoice.id})">
//             Mark Paid
//         </button>
//     </div>
//     <hr>
// `;
//     });
}

async function downloadPdf(id) {
    const response = await fetch(`${BASE_URL}/invoices/${id}/pdf`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice.pdf";
    a.click();
}

async function sendInvoiceEmail(id) {
    const response = await fetch(`${BASE_URL}/email/send/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert("Invoice email sent successfully");
    }
}

async function markAsPaid(id) {
    const response = await fetch(
        `${BASE_URL}/invoices/${id}/status?status=PAID`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (response.ok) {
        alert("Invoice marked as PAID");
        loadInvoices();
    }
}

async function searchInvoices() {
    const keyword = document.getElementById("search").value;

    const response = await fetch(
        `${BASE_URL}/invoices/search?keyword=${keyword}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const filteredInvoices = await response.json();

    console.log(filteredInvoices);      

    console.log("Rendering search results...");
// renderInvoices(filteredInvoices);
    renderInvoices(filteredInvoices);
}

window.onload = function () {
    loadClients();
    loadInvoices();
};