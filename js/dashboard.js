const urlParams = new URLSearchParams(window.location.search);
const oauthToken = urlParams.get("token");

// Save OAuth token if present in URL
if (oauthToken) {
    localStorage.setItem("token", oauthToken);

    // Remove token from URL after saving
    window.history.replaceState({}, document.title, "/dashboard.html");
}

// Get token from localStorage
const token = localStorage.getItem("token");

// Redirect to login if no token
if (!token) {
    window.location.href = "index.html";
}

// Load dashboard stats
async function loadDashboardStats() {
    try {
        const response = await fetch(`${BASE_URL}/dashboard/stats`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // If token invalid/expired → logout
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
            return;
        }

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

    } catch (error) {
        console.error("Error loading dashboard stats:", error);
    }
}

// Logout function
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// Load stats on page load
window.onload = loadDashboardStats;



// const urlParams = new URLSearchParams(window.location.search);
// const oauthToken = urlParams.get("token");

// if (oauthToken) {
//     localStorage.setItem("token", oauthToken);
//     window.history.replaceState({}, document.title, "dashboard.html");
// }

// if (!localStorage.getItem("token")) {
//     const params = new URLSearchParams(window.location.search);
//     const tokenFromUrl = params.get("token");

//     if (tokenFromUrl) {
//         localStorage.setItem("token", tokenFromUrl);

//         // remove token from URL
//         window.history.replaceState({}, document.title, "/dashboard.html");
//     } else {
//         window.location.href = "index.html";
//     }
// }

// const token = localStorage.getItem("token");

// const token = localStorage.getItem("token");

// async function loadDashboardStats() {
//     const response = await fetch(`${BASE_URL}/dashboard/stats`, {
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     });

//     const stats = await response.json();

//     document.getElementById("totalClients").innerText =
//         stats.totalClients;

//     document.getElementById("totalInvoices").innerText =
//         stats.totalInvoices;

//     document.getElementById("totalRevenue").innerText =
//         `₹${stats.totalRevenue}`;

//     document.getElementById("paidInvoices").innerText =
//         stats.paidInvoices;

//     document.getElementById("pendingInvoices").innerText =
//         stats.pendingInvoices;
// }

// function logout() {
//     localStorage.removeItem("token");
//     window.location.href = "index.html";
// }

// window.onload = loadDashboardStats;