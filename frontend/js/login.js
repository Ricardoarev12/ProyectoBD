document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;

    const adminEmail = "admin@museos.com";
    const adminPass = "admin123";

    if(correo === adminEmail && contrasena === adminPass){
        window.location.href = "admin.html";
        return;
    }

    if(contrasena === "usuario123"){
        window.location.href = "usuario.html";
        return;
    }

    alert("Correo o contraseña incorrectos");
});
