const BASE_URL = "http://localhost:8080/api";

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}