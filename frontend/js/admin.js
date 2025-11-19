// CONTROL DE EDICIÓN
let editando = false;
let museoEditandoId = null;

// CATÁLOGOS MOCK (TEMPORALES)
const tiposMuseo = [
    { id: 1, nombre: "Arte" },
    { id: 2, nombre: "Historia" },
    { id: 3, nombre: "Ciencia" },
    { id: 4, nombre: "Tecnología" }
];

const estados = [
    { id: 1, nombre: "Ciudad de México" },
    { id: 2, nombre: "Jalisco" },
    { id: 3, nombre: "Nuevo León" }
];

const municipios = [
    { idEstado: 1, id: 1, nombre: "Cuauhtémoc" },
    { idEstado: 1, id: 2, nombre: "Benito Juárez" },
    { idEstado: 2, id: 3, nombre: "Guadalajara" },
    { idEstado: 2, id: 4, nombre: "Zapopan" },
    { idEstado: 3, id: 5, nombre: "Monterrey" },
    { idEstado: 3, id: 6, nombre: "San Nicolás" }
];

// DATOS TEMPORALES DE MUSEOS
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

// ------------------------------
//   FUNCIONES PARA SELECTS
// ------------------------------

function cargarTiposMuseo() {
    const select = document.getElementById("mTipo");
    select.innerHTML = "";

    tiposMuseo.forEach(t => {
        const option = document.createElement("option");
        option.value = t.id;
        option.textContent = t.nombre;
        select.appendChild(option);
    });
}

function cargarEstados() {
    const select = document.getElementById("mEstado");
    select.innerHTML = "";

    estados.forEach(e => {
        const option = document.createElement("option");
        option.value = e.id;
        option.textContent = e.nombre;
        select.appendChild(option);
    });

    cargarMunicipios();
}

function cargarMunicipios() {
    const idEstado = parseInt(document.getElementById("mEstado").value);
    const select = document.getElementById("mMunicipio");

    select.innerHTML = "";

    municipios
        .filter(m => m.idEstado === idEstado)
        .forEach(m => {
            const option = document.createElement("option");
            option.value = m.id;
            option.textContent = m.nombre;
            select.appendChild(option);
        });
}

// ------------------------------
//      CRUD - AGREGAR
// ------------------------------

function agregarMuseo() {
    editando = false;
    museoEditandoId = null;

    document.getElementById("tituloFormulario").textContent = "Agregar Museo";
    document.getElementById("formMuseo").reset();

    cargarTiposMuseo();
    cargarEstados();

    document.getElementById("formAgregar").style.display = "block";
}

// ------------------------------
//      CERRAR FORM
// ------------------------------

function cerrarFormulario() {
    document.getElementById("formAgregar").style.display = "none";
    document.getElementById("formMuseo").reset();
    editando = false;
    museoEditandoId = null;
}

// ------------------------------
//      GUARDAR / EDITAR
// ------------------------------

function guardarMuseo() {
    const nombre = document.getElementById("mNombre").value;
    const tipo = parseInt(document.getElementById("mTipo").value);
    const estado = parseInt(document.getElementById("mEstado").value);
    const municipio = parseInt(document.getElementById("mMunicipio").value);
    const direccion = document.getElementById("mDireccion").value;
    const telefono = document.getElementById("mTelefono").value;
    const horario = document.getElementById("mHorario").value;

    const tipoNombre = tiposMuseo.find(t => t.id === tipo).nombre;
    const estadoNombre = estados.find(e => e.id === estado).nombre;
    const municipioNombre = municipios.find(m => m.id === municipio).nombre;

    if (editando) {
        const index = museosDemo.findIndex(m => m.id === museoEditandoId);

        museosDemo[index] = {
            id: museoEditandoId,
            nombre,
            tipo: tipoNombre,
            estado: estadoNombre,
            municipio: municipioNombre,
            direccion,
            telefono,
            horario
        };

        alert("Museo actualizado.");
    } else {
        const nuevo = {
            id: museosDemo.length + 1,
            nombre,
            tipo: tipoNombre,
            estado: estadoNombre,
            municipio: municipioNombre,
            direccion,
            telefono,
            horario
        };

        museosDemo.push(nuevo);
        alert("Museo agregado.");
    }

    cerrarFormulario();
    cargarMuseos();
}

// ------------------------------
//      EDITAR
// ------------------------------

function editarMuseo(id) {
    const museo = museosDemo.find(m => m.id === id);

    editando = true;
    museoEditandoId = id;

    document.getElementById("tituloFormulario").textContent = "Editar Museo";

    cargarTiposMuseo();
    cargarEstados();

    document.getElementById("mNombre").value = museo.nombre;
    document.getElementById("mTipo").value = tiposMuseo.find(t => t.nombre === museo.tipo).id;
    document.getElementById("mEstado").value = estados.find(e => e.nombre === museo.estado).id;

    cargarMunicipios();

    document.getElementById("mMunicipio").value = municipios.find(mu => mu.nombre === museo.municipio).id;

    document.getElementById("mDireccion").value = museo.direccion;
    document.getElementById("mTelefono").value = museo.telefono;
    document.getElementById("mHorario").value = museo.horario;

    document.getElementById("formAgregar").style.display = "block";
}

// ------------------------------
//      ELIMINAR
// ------------------------------

function eliminarMuseo(id) {
    if (!confirm("¿Deseas eliminar este museo?")) return;

    const index = museosDemo.findIndex(m => m.id === id);
    museosDemo.splice(index, 1);

    alert("Museo eliminado.");
    cargarMuseos();
}

// ------------------------------
//      CARGAR TABLA
// ------------------------------

function cargarMuseos() {
    let html = `
    <table class="tabla-museos">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Municipio</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Horario</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
    `;

    museosDemo.forEach(m => {
        html += `
        <tr>
            <td>${m.id}</td>
            <td>${m.nombre}</td>
            <td>${m.tipo}</td>
            <td>${m.estado}</td>
            <td>${m.municipio}</td>
            <td>${m.direccion}</td>
            <td>${m.telefono}</td>
            <td>${m.horario}</td>
            <td>
                <button class="btn-accion btn-editar" onclick="editarMuseo(${m.id})">Editar</button>
                <button class="btn-accion btn-eliminar" onclick="eliminarMuseo(${m.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });

    html += `</tbody></table>`;

    document.getElementById("listaMuseos").innerHTML = html;
}

window.onload = function () {
    cargarMuseos();
};
