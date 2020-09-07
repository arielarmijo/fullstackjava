// CONSTANTES
const IVA = 0.19;

// VARIABLES
var nombre, apellido, email, total, productos, compra;

total = 0;

// Formateador de precio
var fmt = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
});

// Crea el objeto producto
function Producto(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = Math.round(precio * (1 + IVA));
    this.img = "img/productos/" + img;
    return this;
}

Producto.prototype.crearTarjeta = function () {
    // Tarjeta bootstrap
    var card = document.createElement("div");
    card.classList.add("card", "col-sm-3");
    // Imagen
    var img = document.createElement("img");
    img.src = this.img;
    img.classList.add("card-img-top");
    // Cuerpo
    var body = document.createElement("div");
    body.classList.add("card-body", "p-0");
    // Título
    var title = document.createElement("p");
    title.classList.add("card-title", "text-center");
    title.textContent = this.nombre;
    // Precio
    var text = document.createElement("p");
    text.classList.add("card-text", "text-right", "font-weight-bold");
    text.textContent = fmt.format(this.precio);
    // Footer
    var footer = document.createElement("div");
    footer.classList.add("card-footer", "d-flex", "justify-content-end", "p-1");
    var input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.value = 1;
    var button = document.createElement("button");
    button.id = this.id;
    button.classList.add("btn", "btn-primary", "p-1", "ml-1", "producto");
    button.textContent = "+";
    // Armado final
    body.appendChild(title);
    body.appendChild(text);
    footer.appendChild(input);
    footer.appendChild(button);
    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(footer);
    return card;
};

// Productos disponibles en el minimarket (precios sin IVA)
var productos = [
    new Producto(1, "Chocolate Milka Oreo 120&nbspg", 1750, "chocolate.jpg"),
    new Producto(2, "Coca-Cola Lata 350&nbspml", 800, "cocacolalata.jpg"),
    new Producto(3, "Jugo Naranja Light Watt's 1,5&nbspL", 1290, "jugonaranja.jpg"),
    new Producto(4, "Leche Chocolate Semi Descremada 1&nbspL", 1200, "lechedeschoc.jpg"),
    new Producto(5, "Leche Descremada 1&nbspL", 850, "lechedescremada.jpg"),
    new Producto(6, "Mantequilla 250&nbspg", 1350, "mantequilla.jpg"),
    new Producto(7, "Pack Cervezas Escudo", 5780, "packcervezas.jpg"),
    new Producto(8, "Pan de Molde Multigrano 400&nbspg", 2350, "panmoldemulti.png"),
    new Producto(9, "Papas Fritas Lays 420&nbspg", 2700, "papasfritas.jpg")
];

$(document).ready(function () {

    // INICIALIZACIÓN
    // Recupera los datos del cliente
    var params = new URLSearchParams(window.location.search);
    nombre = params.get("nombre");
    apellido = params.get("apellido");
    email = params.get("email");

    // Agrega las tarjetas de productos al div #productos
    productos.forEach(p => {$("#productos").append(p.crearTarjeta());});

    // EVENTOS
    $("button.producto").click(function () {

        // Busca producto seleccionado entre todos los productos
        var item = productos.find(e => e.id == this.id);

        // Inserta una fila con los datos del producto seleccionado a la tabla detalle-boleta
        var nombre = item.nombre;
        var precio = item.precio;
        var cantidad = $(this).prev("input")[0].value;
        var subtotal = cantidad * precio;
        var button = '<button class="btn btn-sm btn-danger">X</button>';
   
        $('#detalle-boleta > tbody')
            .prepend(`<tr><td>${nombre}</td><td>${fmt.format(precio)}</td><td>${cantidad}</td><td>${fmt.format(subtotal)}</td><td>${button}</td></tr>`);

        // Agrega el evento borrar a la fila recién creada
        $('#detalle-boleta > tbody tr:first-child button').click(function (event) {
            console.log($($(this).parent()[0]).parent()[0]);
            var $tr = $($(this).parent()[0]).parent()[0];
            $tr.remove();
            total -= subtotal;
            $(".totalVenta").text(fmt.format(total));
        });

        // Muestra total de la venta
        total += subtotal;
        $(".totalVenta").text((fmt.format(total)));

        // Reinicia el valor del input
        $(this).prev("input")[0].value = 1;

    });

    // Borra todos los productos seleccionados
    $("#btnCancelar").click(function () {
        $("#detalle-boleta > tbody > *").remove();
        total = 0;
        $(".totalVenta").text(fmt.format(total));
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

});