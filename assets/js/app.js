const urlApiGeneral = "https://thesimpsonsapi.com/api/characters";
const urlApiIndividual = "https://thesimpsonsapi.com/api/characters/1";
const urlApiIndividual = "https://thesimpsonsapi.com/api/characters";

let personajes = [];

async function cargarPersonajes() {
  try {
    const response = await fetch(urlApiGeneral);
    const datos = await response.json();

    personajes = datos.results;

    mostrarPersonajes(personajes);
  } catch (error) {
    console.error("Error al cargar personajes:", error);
  }
}

function mostrarPersonajes(lista) {
  const contenedor = document.getElementById("contenedor");

  contenedor.innerHTML = "";

  lista.forEach((personaje) => {
    const imagen =
      "https://cdn.thesimpsonsapi.com/500" + personaje.portrait_path;

    contenedor.innerHTML += `
      <div class="card" style="width: 15rem">
        <img
          src="${imagen}"
          class="card-img-top"
          alt="${personaje.name}"
        >

        <div class="card-body">
          <h5 class="card-title">${personaje.name}</h5>

          <p class="card-text">
            Ocupación: ${personaje.occupation || "Sin datos"}
          </p>

          <p class="card-text">
            Estado: ${personaje.status}
          </p>

          <button
            data-id="${personaje.id}"
            class="btn btn-primary btn-detalle"
          >
            Ver detalles
          </button>
        </div>
      </div>
    `;
  });
}

async function obtenerPersonaje(id) {
  try {
    const response = await fetch(`${urlApiIndividual}/${id}`);

    const personaje = await response.json();

    document.getElementById("nombreModal").textContent = personaje.name;

    document.getElementById("edadModal").textContent = personaje.age;

    document.getElementById("fechaModal").textContent = personaje.birthdate;

    document.getElementById("generoModal").textContent = personaje.gender;

    document.getElementById("ocupacionModal").textContent =
      personaje.occupation;

    document.getElementById("estadoModal").textContent = personaje.status;

    document.getElementById("imagenModal").src =
      "https://cdn.thesimpsonsapi.com/500" + personaje.portrait_path;

    if (personaje.phrases && personaje.phrases.length > 0) {
      document.getElementById("fraseModal").textContent = personaje.phrases[0];
    } else {
      document.getElementById("fraseModal").textContent =
        "Sin frase disponible";
    }

    const modal = new bootstrap.Modal(document.getElementById("detalleModal"));

    modal.show();
  } catch (error) {
    console.error("Error al obtener personaje:", error);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-detalle")) {
    const id = e.target.dataset.id;

    obtenerPersonaje(id);
  }
});

cargarPersonajes();
