libros();

function libros() {
  fetch("/api/libros")
    .then((res) => res.json())
    .then((datos) => {
      let libros = "";

      for (let i = 0; i < datos.length; i++) {
        libros += `
            <div>
            <h1>${datos[i].titulo}</h1>
            <p>Estado: ${datos[i].estado}</p>
            </div>
        `;
      }
      document.getElementById("libros").innerHTML = libros;
    });
}

function buscarLibro() {
  const titulo = document.getElementById("busquedaLibro").value;

  fetch(`/api/libros/${titulo}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      let libro = `
        <div>
            <h1>${datos[0].titulo}</h1>
            <p>Estado: ${datos[0].estado}</p>
        </div>
      `;

      document.getElementById("libros").innerHTML = libro;
    });
}

function anyadirLibro() {
  const titulo = document.getElementById("busquedaLibro").value;

  fetch("/api/nuevoLibro/" + titulo, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      libros();
    });
}
function borrar() {
  const titulo = document.getElementById("busquedaLibro").value;
  fetch(`/api/borrarLibro/${titulo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      libros();
    });
}
