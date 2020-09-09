window.onload = function () {

    // Variables
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Lavado Exterior',
            precio: 5000 * (1.19),
            imagen: "img/lavext.jpeg"
        },
        {
            id: 2,
            nombre: 'Lavado de Motor',
            precio: 8000 * (1.19),
            imagen: 'img/lavmot.jpeg'
        },
        {
            id: 3,
            nombre: 'Lavado Automatizado',
            precio: "próximamente",
            imagen: 'img/lavauto.jpeg'
        }
    ];

    let $items = document.querySelector('#items');

    // Funciones
    function renderItems() {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body', 'text-center');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title', 'mt-2');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('card-img-top');
            miNodoImagen.setAttribute('src', info['imagen']);
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = '$' + info['precio'];
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);

            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            // miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    // Inicio
    renderItems();
} 