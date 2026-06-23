let clientPage = 0;
const pageSize = 5;

const token = localStorage.getItem("token");

console.log("client.js loaded");
console.log("Token:", token);

async function addClient() {
    console.log("Add client clicked");
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        gstNumber: document.getElementById("gstNumber").value
    };

    const response = await fetch(`${BASE_URL}/clients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Client added successfully");
        loadClients();
    }
}

function renderClients(clients) {
    const clientList = document.getElementById("clientList");

    clientList.innerHTML = "";

    clients.forEach(client => {
        clientList.innerHTML += `
            <div>
                <p>${client.name}</p>
                <p>${client.email}</p>
                <p>${client.phone}</p>
                <button onclick="deleteClient(${client.id})">Delete</button>
            </div>
            <hr>
        `;
    });
}

async function loadClients() {
    const response = await fetch(
        `${BASE_URL}/clients/paginated?page=${clientPage}&size=${pageSize}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    renderClients(data.content);

    // const clientList = document.getElementById("clientList");
    // clientList.innerHTML = "";

    // clients.forEach(client => {
    //     clientList.innerHTML += `
    //         <div class="client-card">
    //             <p><strong>${client.name}</strong></p>
    //             <p>${client.email}</p>
    //             <p>${client.phone}</p>
    //             <button onclick="deleteClient(${client.id})">Delete</button>
    //         </div>
    //         <hr>
    //     `;
    // });
}

async function deleteClient(id) {
    const response = await fetch(`${BASE_URL}/clients/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert("Client deleted");
        loadClients();
    }
}

async function searchClients() {
    const keyword = document.getElementById("searchClient").value;

    const response = await fetch(
        `${BASE_URL}/clients/search?keyword=${keyword}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const clients = await response.json();

    renderClients(clients);
}

function nextClientPage() {
    clientPage++;
    loadClients();
}

function prevClientPage() {
    if (clientPage > 0) {
        clientPage--;
        loadClients();
    }
}

window.onload = loadClients;