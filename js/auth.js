async function register() {
    console.log("Register clicked");
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        companyName: document.getElementById("companyName").value,
        gstNumber: document.getElementById("gstNumber").value
    };

    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    localStorage.setItem("token", result.token);

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

    const result = await response.json();

    localStorage.setItem("token", result.token);

    alert("Login successful");
    window.location.href = "dashboard.html";
}