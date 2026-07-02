if (!localStorage.getItem("token")) {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);

        // remove token from URL
        window.history.replaceState({}, document.title, "/dashboard.html");
    } else {
        window.location.href = "index.html";
    }
}

const token = localStorage.getItem("token");

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