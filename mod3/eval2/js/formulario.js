// CONSTANTES
const IVA = 0.19;
// TODO: Llenar comunas por medio de api: https://apis.digital.gob.cl/dpa/regiones/13/comunas
const comuna = ["Seleccione comuna", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"];
const tipoVehiculo = ["Seleccione tipo vehículo", "Automovil", "Camión", "Camioneta", "Furgón", "Moto"];
const encargado = ["Seleccione encargado", "Ariel Armijo", "Macarena Bolados", "Edgar Haro", "Juan Zamorano"];

// formateador de precio
const fmt = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
});

// VARIABLES
var totalAmount = 0;
var $total, $servicios;
var timeoutFunction;

// FUNCIONES
function agregarIVA(precioSinIVA) {
    return precioSinIVA * (1 + IVA);
}

function calcularTotal() {
    // TODO: Mejorar la asignación del precio
    var precio = this.value === "Lavado Exterior " ? 5000 : 8000;

    if (this.checked)
        totalAmount += agregarIVA(precio)

    else
        totalAmount -= agregarIVA(precio);
    Array.from($total).forEach(e => e.textContent = fmt.format(totalAmount));
}

function serviciosSeleccionados () {
    if (this.checked)
        $servicios.textContent += this.value;
    else {
        var regex = new RegExp(this.value, "g");
        $servicios.textContent = $servicios.textContent.replace(regex,"");
    }
}

// DOM listo!
$(document).ready(function (event) {

    // INICIALIZACIÓN
    $total = document.querySelectorAll(".total");
    $servicios = document.querySelector("#serviciosCliente");
    // Llena el select #comuna con opciones de comunas
    var $comuna = document.getElementById("comuna");
    comuna.forEach((c, i) => {
        var option = document.createElement("option");
        option.value = i;
        option.text = c;
        $comuna.add(option);
    });

    // Llena el select #tipoVehiculo con opciones de tipo de vehículo
    var $tipoVehiculo = document.getElementById("tipoVehiculo");
    tipoVehiculo.forEach((v, i) => {
        var option = document.createElement("option");
        option.value = i;
        option.text = v;
        $tipoVehiculo.add(option);
    });

    // Llena el select #encargado con la lista de encargados disponible
    var $encargado = document.getElementById("encargado");
    encargado.forEach((e, i) => {
        var option = document.createElement("option");
        option.value = i;
        option.text = e;
        $encargado.add(option);
    });

    // Coloca la fecha y hora actual en el input #fechaServicio
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('fechaServicio').value = now.toISOString().slice(0, 16);


    // EVENTOS
    // Muestra total de los servicios contratados
    $("#lavadoExterior").change(function (event) {
        calcularTotal.call(this);
        serviciosSeleccionados.call(this);
    });

    $("#lavadoMotor").change(function (event) {
        calcularTotal.call(this);
        serviciosSeleccionados.call(this);
    });

    // Eventos botones formulario
    $("#btnLimpiarFC").click(function (ev) {
        $formularioCliente.classList.remove("was-validated");
    });

    $("#btnNextFC").click(function (ev) {
        if (validarDatosCliente())
            $('#myTab a[href="#vehiculo"]').tab('show');
    });

    $("#btnLimpiarFV").click(function (ev) {
        $formularioVehiculo.classList.remove("was-validated");
    });

    $("#btnNextFV").click(function (ev) {
        if (validarDatosVehiculo())
            $('#myTab a[href="#servicio"]').tab('show');
    });

    $("#btnLimpiarFS").click(function (ev) {
        $formularioServicio.classList.remove("was-validated");
    });

    // Acciones de los botones Ingresar Orden y Pagar
    $("#btnIngresarOrden").click(function () {
        if (validarDatosCliente() && validarDatosVehiculo() && validarDatosServicio()) {
            // Muestra los datos del formulario en una ventana modal
            var fecha = new Date($("#fechaServicio").val()).toLocaleString();
            var rut = $("#rut").val();
            var nombre = $("#nombre").val() + " " + $("#apellido").val();
            var fechaNacimiento = new Date($("#fechaNacimiento").val()).toLocaleDateString();
            var telefono = $("#telefono").val();
            var email = $("#email").val();
            var direccion = $("#direccion").val() + ", " + comuna[$("#comuna").val()];
            var vehiculo = tipoVehiculo[$("#tipoVehiculo").val()] + " " + $("#marcaVehiculo").val() + " " + $("#modeloVehiculo").val() + " año " + $("#anioVehiculo").val() + " Revisión Técnica " + ($("#revTecOk")[0].checked ? "Al día" : "Pendiente");
            var responsable = encargado[$("#encargado").val()];
            $("#fechaCliente").text(fecha);
            $("#rutCliente").text(rut);
            $("#nombreCliente").text(nombre);
            $("#fechaNacimientoCliente").text(fechaNacimiento);
            $("#telefonoCliente").text(telefono);
            $("#emailCliente").text(email);
            $("#direccionCliente").text(direccion);
            $("#vehiculoCliente").text(vehiculo);
            $("#encargadoCliente").text(responsable);
            $("#modalEstado").modal("show");
        } else {
            if (!validarDatosCliente())
                $('#myTab a[href="#cliente"]').tab('show');
            else if (!validarDatosVehiculo())
                $('#myTab a[href="#vehiculo"]').tab('show');
        }
    })

    $("#btnCancelar").click(function () {
        clearTimeout(timeoutFunction);
    });

    $("#btnPagar").click(function () {
        $("#imprimir-boleta").html('<div class="spinner-border text-success text-center" role="status"></div><p>Imprimiendo boleta...</p>');
        timeoutFunction = setTimeout(function () { window.location.href = "index.html"; }, 2000);
    });

});