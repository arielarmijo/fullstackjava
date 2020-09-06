$(document).ready(function () {

    // CONSTANTES
    const IVA = 0.19;

    // VARIABLES
    var nombre, apellido, email, total, productos, compra;

    total = 0;
    // El array de compra no se utiliza por el momento
    //compra = [];
    // Productos disponibles en el minimarket (precios sin IVA)
    productos = [
        {
            id: 1,
            name: "Chocolate Milka Oreo 120&nbspg",
            precio: 1750,
            stock: 100,
            img: "img/productos/chocolate.jpg"
        },
        {
            id: 2,
            name: "Coca-Cola Lata 350&nbspml",
            precio: 800,
            stock: 100,
            img: "img/productos/cocacolalata.jpg"
        },
        {
            id: 3,
            name: "Jugo Naranja Light Watt's 1,5&nbspL",
            precio: 1290,
            stock: 100,
            img: "img/productos/jugonaranja.jpg"
        },
        {
            id: 4,
            name: "Leche Chocolate Semi Descremada 1&nbspL",
            precio: 1200,
            stock: 100,
            img: "img/productos/lechedeschoc.jpg"
        },
        {
            id: 5,
            name: "Leche Descremada 1&nbspL",
            precio: 850,
            stock: 100,
            img: "img/productos/lechedescremada.jpg"
        },
        {
            id: 6,
            name: "Mantequilla 250&nbspg",
            precio: 1350,
            stock: 100,
            img: "img/productos/mantequilla.jpg"
        },
        {
            id: 7,
            name: "Pack Cervezas Escudo",
            precio: 5780,
            stock: 100,
            img: "img/productos/packcervezas.jpg"
        },
        {
            id: 8,
            name: "Pan de Molde Multigrano 400&nbspg",
            precio: 2350,
            stock: 100,
            img: "img/productos/panmoldemulti.png"
        },
        {
            id: 9,
            name: "Papas Fritas Lays 420&nbspg",
            precio: 2700,
            stock: 100,
            img: "img/productos/papasfritas.jpg"
        }

    ];


    // INICIALIZACIÓN
    // Recupera los datos del cliente
    var params = new URLSearchParams(window.location.search);
    nombre = params.get("nombre");
    apellido = params.get("apellido");
    email = params.get("email");

    // Agrega las tarjetas de productos al div #productos
    Array.from(productos).forEach(p => {
        var card = `<div class="card col-sm-3">`;
        card += `<img src=${p.img} class="card-img-top">`;
        card += `<div class="card-body p-0">`;
        card += `<p class="card-title text-center">${p.name}</p>`;
        card += `<p class="card-text text-right font-weight-bold">$${aplicarIVA(p.precio)}</p>`;
        card += `</div><div class="card-footer d-flex justify-content-end p-1">`;
        card += `<input type="number" min="1" value="1">`;
        card += `<button id="${p.id}" class="btn btn-primary p-1 ml-1 producto">Comprar</button></div></div>`;
        $("#productos").append(card);
    });

    // EVENTOS
    $("button.producto").click(function () {


        // Busca producto seleccionado entre todos los productos
        var item = productos.find(e => e.id == this.id);

        // Agrega el producto seleccionado al array de compra
        //compra.push(item);

        // Inserta una fila con los datos del producto seleccionado a la tabla detalle-boleta
        var nombre = item.name;
        var precio = aplicarIVA(item.precio);
        var cantidad = $(this).prev("input")[0].value;
        var subtotal = cantidad * precio;
        $('#detalle-boleta > tbody')
            .prepend(`<tr><td>${nombre}</td><td>${precio}</td><td>${cantidad}</td><td>${subtotal}</td></tr>`);

        // Agrega el evento borrar a la fila recién creada
        $('#detalle-boleta > tbody tr:first-child').dblclick(function (event) {
            console.log(event);
            if (event.shiftKey) {
                $(this).remove();
                total -= subtotal;
                $(".totalVenta").text(total);
            }
        });

        // Muestra total de la venta
        total += subtotal;
        $(".totalVenta").text(total);

        // Reinicia el valor del input
        $(this).prev("input")[0].value = 1;

    });

    // Borra todos los productos seleccionados
    $("#btnCancelar").click(function () {
        $("#detalle-boleta > tbody > *").remove();
        total = 0;
        $(".totalVenta").text(total);
    });

    // Muestra ventana modal con el total de la compra
    $("#btnTotalizar").click(function () {
        if (total > 0) {
            $("#nombreCliente").text(nombre);
            $("#apellidoCliente").text(apellido);
            $("#emailCliente").text(email);
            $('#boletaModal').modal();
        }
    });

    // Finaliza la transacción y regresa al formulario
    $("#btnPagar").click(function () {
        $("#detalle-boleta > tbody > *").remove();
        total = 0;
        //$(".totalVenta").text(total);
        $("#imprimir-boleta").html('<div class="spinner-border text-success text-center" role="status"></div><p>Imprimiendo boleta...</p>');
        setTimeout(function () { window.location.href = "index.html"; }, 2000);
    });


    // FUNCIONES

    function aplicarIVA(precio) {
        return Math.round(precio * (1 + IVA));
    }


});