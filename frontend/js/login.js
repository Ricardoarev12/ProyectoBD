const API_BASE_URL = "https://apidb-l0p7.onrender.com";

document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();

    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;

    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, contrasena })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            
            if (correo === "admin@museos.com") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "usuario.html";
            }
        } else {
            alert("Correo o contraseña incorrectos");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error de conexión. Intente nuevamente.");
    }
});
