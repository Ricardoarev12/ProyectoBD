const API_BASE_URL = "https://apidb-l0p7.onrender.com";

document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();

    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;

    console.log("Intentando login con:", correo);
    console.log("URL:", `${API_BASE_URL}/usuarios/login`);

    try {
        console.log("Enviando petición...");
        
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, contrasena })
        });

        console.log("Respuesta recibida:", response.status);
        
        const data = await response.json();
        console.log("Datos:", data);

        if (response.ok && data.success) {
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            
            if (correo === "admin@correo.com") {
                console.log("Redirigiendo a admin.html");
                window.location.href = "admin.html";
            } else {
                console.log("Redirigiendo a usuario.html");
                window.location.href = "usuario.html";
            }
        } else {
            console.error("Login falló:", data);
            alert("Correo o contraseña incorrectos");
        }
    } catch (error) {
        console.error("Error completo:", error);
        alert("Error de conexión: " + error.message + "\n\nAbre la consola (F12) para más detalles.");
    }
});