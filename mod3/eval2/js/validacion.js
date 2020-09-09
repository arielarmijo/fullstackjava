// MENSAJES DE ERROR
const errorRequerido = "Este campo es obligatorio.";
const errorRut = "Rut inválido.";
const errorDV = "Dígito verificador inválido."
const errorTexto = "Este campo no puede tener dígitos.";
const errorNumero = "Este campo solo puede tener dígitos."
const errorLongitud = "El número de caracteres debe ser menor o igual a ";
const errorIgualdad = "El número de caracteres debe ser igual a ";
const errorTelefono = "Número de teléfono inválido.";
const errorEmail = "Email inválido.";
const errorSeleccion = "Seleccione una opción."
const error = "Error al validar sus datos, complete el formulario correctamente.";
const confirmacion = "Sus datos fueron validados correctamente.";

// REFERENCIAS A ELEMENTOS DEL FORMULARIO
var $formularioCliente, $formularioVehiculo, $formularioServicios;


$(document).ready(function () {

    $formularioCliente = document.querySelector('#formularioCliente');
    $formularioVehiculo = document.querySelector('#formularioVehiculo');
    $formularioServicios = document.querySelector('#formularioServicios');

    // Asigna funciones de validación a cada control del formulario según sus clases de validación
    //$(".validar-requerido").on("keyup validar", function (ev) { validarCampo(this, tieneDatos) });
    //$(".validar-rut").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, rutEsValido) });
    $(".validar-texto").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esTexto) });
    $(".validar-texto-20").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esTexto, tieneMenosDe20Caracteres) });
    $(".validar-texto-50").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esTexto, tieneMenosDe50Caracteres) });
    $(".validar-texto-100").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, tieneMenosDe100Caracteres) });
    $(".validar-numero").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esNumero) });
    $(".validar-numero-4").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esNumero, tiene4Carateres ) });
    $(".validar-numero-8").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esNumero, tiene8Carateres ) });
    $(".validar-dv").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esDigitoVerificador ) });
    $(".validar-telefono").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, telefonoEsValido) });
    $(".validar-email").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, emailEsValido) });
    $(".validar-seleccion").on("change validar", function (ev) { validarCampo(this, seleccionValida) });

    //console.log($("#rut").nextAll(".invalid-feedback"));

});


// Validación de campos
// TODO: Abstraer funciones validación de formularios
function validarDatosCliente() {
    var resultado;
    for (let input of $(".validar-cliente"))
        $(input).trigger("validar");
    event.preventDefault();
    event.stopPropagation();
    if ($formularioCliente.checkValidity()) {
        resultado = true;
        $formularioCliente.classList.remove("was-validated");
    } else {
        resultado = false;
        $formularioCliente.classList.add('was-validated');
    }
    return resultado;
}

function validarDatosVehiculo() {
    var resultado;
    for (let input of $(".validar-vehiculo"))
        $(input).trigger("validar");
    event.preventDefault();
    event.stopPropagation();
    if ($formularioVehiculo.checkValidity()) {
        resultado = true;
        $formularioVehiculo.classList.remove("was-validated");
    } else {
        resultado = false;
        $formularioVehiculo.classList.add('was-validated');
    }
    return resultado;
}

function validarDatosServicio() {
    var resultado;
    for (let input of $(".validar-servicios"))
        $(input).trigger("validar");
    event.preventDefault();
    event.stopPropagation();
    if ($formularioServicios.checkValidity()) {
        resultado = true;
        $formularioServicios.classList.remove("was-validated");
    } else {
        resultado = false;
        $formularioServicios.classList.add('was-validated');
    }
    return resultado;
}


// Funciones de validación de campos

function validarCampo(input, ...condiciones) {
    var n = condiciones.length;
    for (let i = 0; i < n; i++)
        if (!validarCondicion(input, condiciones[i])) break;
}

function validarCondicion(input, condicion) {
    var resultado;
    if (condicion(input.value)) {
        input.setCustomValidity("");
        resultado = true;
    } else {
        input.setCustomValidity(condicion.error);
        resultado = false;
    }
    $(input).nextAll(".invalid-feedback").text(input.validationMessage);
    return resultado;
}


// Funciones de validación de valores
// TODO: Validar que el año ingresado no sea del futuro
function tieneDatos(txt) {
    return !(txt.trim() === "");
}
tieneDatos.error = errorRequerido;

function esTexto(txt) {
    return !/\d/.test(txt);
}
esTexto.error = errorTexto;

function esNumero(txt) {
    return !isNaN(txt);
}
esNumero.error = errorNumero;

function textoMenorA(number) {
    var output = function (text) {
        return text.length <= number;
    };
    output.error = errorLongitud + number;
    return output;
}

function seleccionValida(value) {
    return value != 0;
}
seleccionValida.error = errorSeleccion;

function textoIgualA(number) {
    var output = function (text) {
        return text.length === number;
    }
    output.error = errorIgualdad + number;
    return output;
}

var tiene1Carater = textoIgualA(1);
var tiene4Carateres = textoIgualA(4);
var tiene8Carateres = textoIgualA(8);
var tieneMenosDe20Caracteres = textoMenorA(20);
var tieneMenosDe50Caracteres = textoMenorA(50);
var tieneMenosDe100Caracteres = textoMenorA(100);

function emailEsValido(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
emailEsValido.error = errorEmail;

function telefonoEsValido(telefono) {
    telefono = telefono.replace(/\s/g, "");
    return /^\+569\d{8}$/.test(telefono);
}
telefonoEsValido.error = errorTelefono;

function esDigitoVerificador(dv) {
    return /^[\dkK]$/.test(dv);
}
esDigitoVerificador.error = errorDV;

function rutEsValido(rut) {
    var rut = rut.replace(/[.-]/g, "").toLowerCase();
    var dv = rut.charAt(rut.length - 1);
    var digitos = rut.substring(0, rut.length - 1);
    return calcularDV(digitos) == dv;
}
rutEsValido.error = errorRut;

function calcularDV(rutSinDV) {

    var rutSinDV = Array.from(rutSinDV).reverse();
    var r = rutSinDV.length;
    var factores = [2, 3, 4, 5, 6, 7];
    var f = factores.length;
    var suma = 0;

    suma = rutSinDV.reduce((acc, d, i) => acc + d * factores[i % f], 0);

    var resto = 11 - suma % 11;
    var dv;

    if (resto == 11)
        dv = "0";
    else if (resto == 10)
        dv = "k"
    else
        dv = resto;

    return dv;

}