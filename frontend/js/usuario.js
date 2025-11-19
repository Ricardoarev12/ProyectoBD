// ---------------------
// MOCK DE MUSEOS
// ---------------------
const museosDemo = [
    {
        id: 1,
        nombre: "Museo Nacional de Arte",
        tipo: "Arte",
        estado: "Ciudad de México",
        municipio: "Cuauhtémoc",
        direccion: "Calle Tacuba 8",
        telefono: "5551234567",
        horario: "10:00 - 18:00"
    },
    {
        id: 2,
        nombre: "Museo de Historia Natural",
        tipo: "Ciencia",
        estado: "Jalisco",
        municipio: "Guadalajara",
        direccion: "Av. Vallarta 1234",
        telefono: "3334567890",
        horario: "09:00 - 17:00"
    }
];

// ---------------------
// BUSCAR MUSEOS POR NOMBRE
// ---------------------
function buscarMuseos() {

    const nombre = document.getElementById("buscarNombre").value.toLowerCase();

    let resultados = museosDemo;

    // Solo filtrar por nombre
    if (nombre !== "") {
        resultados = resultados.filter(m =>
            m.nombre.toLowerCase().includes(nombre)
        );
    }

    mostrarResultados(resultados);
}

// ---------------------
// MOSTRAR RESULTADOS
// ---------------------
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
                <p><b>Tipo:</b> ${m.tipo}</p>
                <p><b>Estado:</b> ${m.estado}</p>
                <p><b>Municipio:</b> ${m.municipio}</p>
                <p><b>Dirección:</b> ${m.direccion}</p>
                <p><b>Teléfono:</b> ${m.telefono}</p>
                <p><b>Horario:</b> ${m.horario}</p>
            </div>
        `;
    });
}

// ---------------------
// CARRUSEL
// ---------------------
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

    slides[slideIndex - 1].style.display = "block";

    setTimeout(mostrarSlides, 3500);
}
