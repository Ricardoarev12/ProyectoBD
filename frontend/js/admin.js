const API_BASE_URL = "https://apidb-l0p7.onrender.com";

let editando = false;
let museoEditandoId = null;

let tiposMuseo = [];
let estados = [];
let municipios = [];
let museos = [];

async function cargarTiposMuseo() {
    try {
        const response = await fetch(`${API_BASE_URL}/tipos-museo`);
        tiposMuseo = await response.json();
        
        const select = document.getElementById("mTipo");
        select.innerHTML = "";

        tiposMuseo.forEach(t => {
            const option = document.createElement("option");
            option.value = t.idTipoMuseo;
            option.textContent = t.nombreTipo;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar tipos de museo:", error);
        alert("Error al cargar tipos de museo");
    }
}

async function cargarEstados() {
    try {
        const response = await fetch(`${API_BASE_URL}/estados`);
        estados = await response.json();
        
        const select = document.getElementById("mEstado");
        select.innerHTML = "";

        estados.forEach(e => {
            const option = document.createElement("option");
            option.value = e.idEstado;
            option.textContent = e.nombreEstado;
            select.appendChild(option);
        });

        if (estados.length > 0) {
            await cargarMunicipios();
        }
    } catch (error) {
        console.error("Error al cargar estados:", error);
        alert("Error al cargar estados");
    }
}

async function cargarMunicipios() {
    const idEstado = parseInt(document.getElementById("mEstado").value);
    
    try {
        const response = await fetch(`${API_BASE_URL}/municipios/estado/${idEstado}`);
        municipios = await response.json();
        
        const select = document.getElementById("mMunicipio");
        select.innerHTML = "";

        municipios.forEach(m => {
            const option = document.createElement("option");
            option.value = m.idMunicipio;
            option.textContent = m.nombreMunicipio;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar municipios:", error);
        alert("Error al cargar municipios");
    }
}

async function agregarMuseo() {
    editando = false;
    museoEditandoId = null;

    document.getElementById("tituloFormulario").textContent = "Agregar Museo";
    document.getElementById("formMuseo").reset();

    await cargarTiposMuseo();
    await cargarEstados();

    document.getElementById("formAgregar").style.display = "block";
}

function cerrarFormulario() {
    document.getElementById("formAgregar").style.display = "none";
    document.getElementById("formMuseo").reset();
    editando = false;
    museoEditandoId = null;
}

async function guardarMuseo() {
    const nombre = document.getElementById("mNombre").value;
    const idTipoMuseo = parseInt(document.getElementById("mTipo").value);
    const idMunicipio = parseInt(document.getElementById("mMunicipio").value);
    const direccion = document.getElementById("mDireccion").value;
    const telefono = document.getElementById("mTelefono").value;
    const horario = document.getElementById("mHorario").value;

    const museo = {
        nombre,
        direccion,
        telefono,
        horario,
        municipio: { idMunicipio },
        tipoMuseo: { idTipoMuseo }
    };

    try {
        let response;
        
        if (editando) {
            museo.idMuseo = museoEditandoId;
            response = await fetch(`${API_BASE_URL}/museos/${museoEditandoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(museo)
            });
            
            if (response.ok) {
                alert("Museo actualizado correctamente");
            }
        } else {
            response = await fetch(`${API_BASE_URL}/museos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(museo)
            });
            
            if (response.ok) {
                alert("Museo agregado correctamente");
            }
        }

        cerrarFormulario();
        await cargarMuseos();
    } catch (error) {
        console.error("Error al guardar museo:", error);
        alert("Error al guardar museo");
    }
}

async function editarMuseo(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/museos/${id}`);
        const museo = await response.json();

        editando = true;
        museoEditandoId = id;

        document.getElementById("tituloFormulario").textContent = "Editar Museo";

        await cargarTiposMuseo();
        await cargarEstados();

        document.getElementById("mNombre").value = museo.nombre;
        document.getElementById("mTipo").value = museo.tipoMuseo.idTipoMuseo;
        document.getElementById("mEstado").value = museo.municipio.estado.idEstado;

        await cargarMunicipios();

        document.getElementById("mMunicipio").value = museo.municipio.idMunicipio;
        document.getElementById("mDireccion").value = museo.direccion || "";
        document.getElementById("mTelefono").value = museo.telefono || "";
        document.getElementById("mHorario").value = museo.horario || "";

        document.getElementById("formAgregar").style.display = "block";
    } catch (error) {
        console.error("Error al cargar museo:", error);
        alert("Error al cargar museo");
    }
}

async function eliminarMuseo(id) {
    if (!confirm("¿Deseas eliminar este museo?")) return;

    try {
        const response = await fetch(`${API_BASE_URL}/museos/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Museo eliminado correctamente");
            await cargarMuseos();
        }
    } catch (error) {
        console.error("Error al eliminar museo:", error);
        alert("Error al eliminar museo");
    }
}

async function cargarMuseos() {
    try {
        const response = await fetch(`${API_BASE_URL}/museos`);
        museos = await response.json();

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

        museos.forEach(m => {
            html += `
            <tr>
                <td>${m.idMuseo}</td>
                <td>${m.nombre}</td>
                <td>${m.tipoMuseo.nombreTipo}</td>
                <td>${m.municipio.estado.nombreEstado}</td>
                <td>${m.municipio.nombreMunicipio}</td>
                <td>${m.direccion || ""}</td>
                <td>${m.telefono || ""}</td>
                <td>${m.horario || ""}</td>
                <td>
                    <button class="btn-accion btn-editar" onclick="editarMuseo(${m.idMuseo})">Editar</button>
                    <button class="btn-accion btn-eliminar" onclick="eliminarMuseo(${m.idMuseo})">Eliminar</button>
                </td>
            </tr>
            `;
        });

        html += `</tbody></table>`;

        document.getElementById("listaMuseos").innerHTML = html;
    } catch (error) {
        console.error("Error al cargar museos:", error);
        alert("Error al cargar museos");
    }
}

window.onload = async function () {
    await cargarMuseos();
};
