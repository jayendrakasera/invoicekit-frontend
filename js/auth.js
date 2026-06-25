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

const result = await response.json();
localStorage.setItem("token", result.token);

    alert("Registration successful");
    window.location.href = "dashboard.html";
}

async function login() {

     const loginBtn = document.getElementById("loginBtn");

    loginBtn.innerText = "Logging in...";
    loginBtn.disabled = true;

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

    // if (!response.ok) {
    //     alert("Invalid email or password");
    //     return;
    // }
    if (!response.ok) {
    alert("Invalid email or password");

    loginBtn.innerText = "Login";
    loginBtn.disabled = false;

    return;
}

const result = await response.json();
localStorage.setItem("token", result.token);

    alert("Login successful");

    loginBtn.innerText = "Success...";

    window.location.href = "dashboard.html";
}