async function register() {
    console.log("Register clicked");
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        companyName: document.getElementById("companyName").value,
        gstNumber: document.getElementById("gstNumber").value,
        bankName: document.getElementById("bankName").value,
        accountNumber: document.getElementById("accountNumber").value,
        ifscCode: document.getElementById("ifscCode").value,
        accountHolderName: document.getElementById("accountHolderName").value,
        upiId: document.getElementById("upiId").value
    };

    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
    alert("Registration failed");
    return;
}

const token = await response.text();

localStorage.setItem("token", token);

    alert("Registration successful");
    window.location.href = "dashboard.html";
}

async function login() {
    const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        alert("Invalid email or password");
        return;
    }

    const token = await response.text();

    localStorage.setItem("token", token);

    alert("Login successful");
    window.location.href = "dashboard.html";
}