window.addEventListener("load", function () {
    // Películas disponibles
    var peliculas = [
        { id: 1, nombre: "Last Shot", precio: 4500 },
        { id: 2, nombre: "Still Here", precio: 3500 },
        { id: 3, nombre: "Will Reading", precio: 2500 },
        { id: 4, nombre: "The Pale Door", precio: 5500 },
        { id: 5, nombre: "Deep Blue Sea 3D", precio: 7500 }
    ];

    // Llena el select con opciones de películas
    var $peliculas = document.getElementById("peliculas");
    peliculas.forEach(p => {
        var option = document.createElement("option");
        option.value = p.id;
        option.text = p.nombre;
        $peliculas.add(option);
    });

    // Muestra el precio de la película
    var precio = peliculas[0].precio;
    var $precio = document.getElementById("precio");
    $precio.textContent = precio;
    $peliculas.addEventListener("change", function () {
        var peliculaSeleccionada = peliculas.find(p => p.id == this.value);
        precio = peliculaSeleccionada.precio;
        $precio.textContent = precio;
    });

    var $numeroAsientos = document.getElementById("numeroAsientos");
    $numeroAsientos.textContent = 0;
    var $precioTotal = document.getElementById("precioTotal");
    $precioTotal.textContent = 0;

    var filas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    var ultimaFila = filas.length;
    var $butacas = document.querySelector("#butacas");
    var ultimaButaca = 12;

    var asientos = [];
    var $asientos = document.getElementById("asientos");

    for (let i = 0; i < ultimaFila; i++) {
        var fila = document.createElement("div");
        fila.id = filas[i];
        fila.classList.add("fila");
        $butacas.append(fila);
        for (let j = 0; j < ultimaButaca; j++) {
            var butaca = document.createElement("div");
            butaca.id = `${filas[i]}${j}`;
            butaca.classList.add("butaca");
            butaca.addEventListener("click", function () {
                console.log(this.id);
                this.classList.toggle("seleccionado");
                if (!this.classList.contains("ocupado")) {
                    if (this.classList.contains("seleccionado"))
                        asientos.push(this.id);
                    else
                        asientos.pop(this.id);
                }
                $numeroAsientos.textContent = asientos.length;
                $asientos.textContent = asientos.toString();
                $precioTotal.textContent = asientos.length * precio;
            });
            fila.append(butaca);
        }
    }

    var $btnPagar = document.getElementById("btnPagar");
    $btnPagar.addEventListener("click", function () {
        console.log(asientos);
        asientos.forEach(a => {
            document.getElementById(a).classList.add("ocupado");
        });
        asientos = [];
        $numeroAsientos.textContent = 0;
        $asientos.textContent = "";
        $precioTotal.textContent = 0;
    });

});