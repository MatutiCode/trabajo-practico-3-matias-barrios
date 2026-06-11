const urlApiGeneral = "https://thesimpsonsapi.com/api/characters";
const urlApiIndividual = "https://thesimpsonsapi.com/api/characters/1";
<<<<<<< HEAD
=======

let personajes = [];

async function cargarPersonajes() {
  const response = await fetch(urlApiGeneral);
  const datos = await response.json();
  personajes = datos.results;
  mostrarPersonajes(personajes);
}

cargarPersonajes();

function mostrarPersonajes(lista) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  lista.forEach((personaje) => {
    // const tarjeta = document.createElement("div");
    const imagen =
      "https://cdn.thesimpsonsapi.com/500" + personaje.portrait_path;
    contenedor.innerHTML += `
    <div class="card" style="width: 15rem">
          <img src="${imagen}" class="card-img-top" alt="${personaje.name}">
          <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">
              Ocupación: ${personaje.occupation}
            </p>
            <p class="card-text">
              Estado: ${personaje.status}
            </p>
            <button data-id="${personaje.id}" class="btn btn-primary">Ver detalles</button>
          </div>
    </div>
    `;

    // contenedor.appendChild(tarjeta);
    console.log(imagen);
  });

  const formulario = document.getElementById("formBusqueda");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const texto = document.getElementById("buscador").value.trim();

    if (texto === "") {
      mostrarPersonajes(personajes);
      return;
    }

    const resultados = personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(texto.toLowerCase()),
    );

    mostrarPersonajes(resultados);
  });
}
>>>>>>> feature/listado-personajes
