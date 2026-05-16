/* ---------------- ANIMACIÓN PANELES ---------------- */
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.onclick = () => {
    container.classList.add("active");
};

loginButton.onclick = () => {
    container.classList.remove("active");
};

/* ---------------- REGISTRO ---------------- */
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Registrar usuario
document.getElementById("registerBtn").addEventListener("click", function () {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem(email, JSON.stringify(user));

    document.getElementById("registerMessage").textContent =
        "Cuenta creada correctamente ✨ Redirigiendo...";

    setTimeout(() => {
        container.classList.remove("active");
    }, 1500);
});

// Iniciar sesión
document.getElementById("loginBtn").addEventListener("click", function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {

        localStorage.setItem("usuarioActivo", JSON.stringify(user));

        alert("Bienvenida " + user.name + " 💖");
        window.location.href = "../index.html";

    }
});