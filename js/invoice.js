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

async function loadInvoices() {
    const response = await fetch(`${BASE_URL}/invoices`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const invoices = await response.json();

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

window.onload = function () {
    loadClients();
    loadInvoices();
};