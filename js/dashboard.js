const token = localStorage.getItem("token");

async function loadDashboardStats() {
    const response = await fetch(`${BASE_URL}/dashboard/stats`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const stats = await response.json();

    document.getElementById("totalClients").innerText =
        stats.totalClients;

    document.getElementById("totalInvoices").innerText =
        stats.totalInvoices;

    document.getElementById("totalRevenue").innerText =
        `₹${stats.totalRevenue}`;

    document.getElementById("paidInvoices").innerText =
        stats.paidInvoices;

    document.getElementById("pendingInvoices").innerText =
        stats.pendingInvoices;
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

window.onload = loadDashboardStats;