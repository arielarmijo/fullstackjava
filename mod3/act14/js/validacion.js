var errorRequerido = "Este campo es obligatorio.";
var errorRut = "Rut inválido.";
var errorTexto = "Este campo no puede tener dígitos.";
var errorTelefono = "Número de teléfono inválido.";
var errorEmail = "Email inválido.";
var error = "Error al validar sus datos, complete el formulario correctamente.";
var confirmacion = "Sus datos fueron validados correctamente.";

$(document).ready(function () {

    var $registro = document.querySelector('.needs-validation');
    var $alerta = document.querySelector(".alert");
    
    $(".validar-requerido").on("keyup validar", function (ev) { validarCampo(this, tieneDatos) });
    $(".validar-rut").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, rutEsValido) });
    $(".validar-texto").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, esTexto) });
    $(".validar-telefono").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, telefonoEsValido) });
    $(".validar-email").on("keyup validar", function (ev) { validarCampo(this, tieneDatos, emailEsValido) });

    $registro.addEventListener('submit', function (event) {
        for (let input of $(".validar"))
            $(input).trigger("validar");
        event.preventDefault();
        event.stopPropagation();
        if ($registro.checkValidity()) {
            $($registro).hide();
            $alerta.classList.remove("alert-danger");
            $alerta.classList.add("alert-success");
            $alerta.textContent = confirmacion;
            setTimeout(function () { $registro.submit(); }, 1000);
        } else {
            $alerta.classList.remove("alert-success");
            $alerta.classList.add("alert-danger");
            $alerta.textContent = error;
        }
        $registro.classList.add('was-validated');
    }, false);

    $("#btnLimpiar").click(function (ev) {
        $registro.classList.remove("was-validated");
        $alerta.classList.remove("alert-success");
        $alerta.classList.remove("alert-danger");
        $alerta.textContent = "";
    });

});


// Validación de campos

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
    $(input).next().text(input.validationMessage);
    return resultado;
}


// Funciones de validación

function tieneDatos(txt) {
    return !(txt.trim() === "");
}
tieneDatos.error = errorRequerido;

function esTexto(txt) {
    /*     for (let i = 0; i < txt.length; i++)
            if (!(isNaN(txt.charAt(i)) || txt.charAt(i) === " "))
                return false;
        return true; */
    return !/\d/.test(txt);
}
esTexto.error = errorTexto;

function emailEsValido(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
emailEsValido.error = errorEmail;

function telefonoEsValido(telefono) {
    telefono = telefono.replace(/\s/g, "");
    /*     var prefijo = telefono.substring(0, 4);
        var numero = telefono.substring(4, telefono.length);
        if (prefijo !== "+569")
            return false;
        if (isNaN(numero))
            return false;
        if (numero.length !== 8)
            return false;
        return true; */
    return /^\+569\d{8}$/.test(telefono);
}
telefonoEsValido.error = errorTelefono;

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

    /*  for (let i = 0; i < r; i++)
         suma += rut[i] * factores[i % f]; */

    //arr.reduce(callback(acumulador, valorActual[, índice[, array]])[, valorInicial])
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