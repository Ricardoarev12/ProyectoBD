const API_BASE_URL = "https://apidb-l0p7.onrender.com";

async function buscarMuseos() {
    const nombre = document.getElementById("buscarNombre").value.trim();

    try {
        let url = `${API_BASE_URL}/museos`;
        
        if (nombre !== "") {
            url += `?nombre=${encodeURIComponent(nombre)}`;
        }

        const response = await fetch(url);
        const resultados = await response.json();

        mostrarResultados(resultados);
    } catch (error) {
        console.error("Error al buscar museos:", error);
        alert("Error al buscar museos");
    }
}

function mostrarResultados(lista) {
    const div = document.getElementById("resultados");
    div.innerHTML = "";

    if (lista.length === 0) {
        div.innerHTML = "<p>No se encontraron museos.</p>";
        return;
    }

    lista.forEach(m => {
        div.innerHTML += `
            <div class="card-museo">
                <h3>${m.nombre}</h3>
                <p><b>Tipo:</b> ${m.tipoMuseo.nombreTipo}</p>
                <p><b>Estado:</b> ${m.municipio.estado.nombreEstado}</p>
                <p><b>Municipio:</b> ${m.municipio.nombreMunicipio}</p>
                <p><b>Dirección:</b> ${m.direccion || "No disponible"}</p>
                <p><b>Teléfono:</b> ${m.telefono || "No disponible"}</p>
                <p><b>Horario:</b> ${m.horario || "No disponible"}</p>
            </div>
        `;
    });
}

let slideIndex = 0;
mostrarSlides();

function mostrarSlides() {
    const slides = document.getElementsByClassName("carrusel-slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }

    setTimeout(mostrarSlides, 3500);
}

window.onload = async function() {
    await buscarMuseos();
};
