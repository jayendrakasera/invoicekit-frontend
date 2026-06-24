const BASE_URL = "https://invoicekit-backend.onrender.com/api";

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}