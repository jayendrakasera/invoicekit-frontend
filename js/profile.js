if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
}

const token = localStorage.getItem("token");

async function updateProfile() {
    const data = {
        bankName: document.getElementById("bankName").value,
        accountNumber: document.getElementById("accountNumber").value,
        ifscCode: document.getElementById("ifscCode").value,
        accountHolderName: document.getElementById("accountHolderName").value,
        upiId: document.getElementById("upiId").value
    };

    const response = await fetch(`${BASE_URL}/users/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        alert("Failed to update profile");
        return;
    }

    alert("Profile updated successfully");
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}