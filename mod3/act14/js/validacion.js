var $registro, $inputs, $alerta, $errors;

$(document).ready(inicializar);

function inicializar() {

    $registro = document.querySelector('.needs-validation');
    //console.log($registro);
    $alerta = document.querySelector(".alert");
    $errors = $(".invalid-feedback");
    $inputs = $(".validar");
    $inputs.filter(".requerido").on("keyup validar", function (ev) { validarRequerido(this) });
    $inputs.filter(".rut").on("keyup validar", function (ev) { validarRut(this) });
    $inputs.filter(".texto").on("keyup validar", function (ev) { validarTexto(this) });
    $inputs.filter(".telefono").on("keyup validar", function (ev) { validarTelefono(this) });
    $inputs.filter(".email").on("keyup validar", function (ev) { validarEmail(this) });

    $registro.addEventListener('submit', function (event) {
        validarCampos();
    }, false);

    $("#btnLimpiar").click(function (ev) {
        $registro.classList.remove("was-validated");
        $alerta.classList.remove("alert-success");
        $alerta.classList.remove("alert-danger");
        $alerta.textContent = "";
    });

}

function mostrarMensaje(boolean) {
    event.preventDefault();
    event.stopPropagation();
    if (boolean) {
        $($registro).hide();
        $alerta.classList.remove("alert-danger");
        $alerta.classList.add("alert-success");
        $alerta.textContent = "Sus datos fueron validados correctamente.";
        setTimeout(function () {$registro.submit();}, 1000);
    } else {
        $alerta.classList.remove("alert-success");
        $alerta.classList.add("alert-danger");
        $alerta.textContent = "Error al validar sus datos, complete el formulario correctamente.";
    }
}

// Validación de campos

function validarCampos() {
    for (let input of $inputs)
        $(input).trigger("validar");
    mostrarMensaje($registro.checkValidity());
    $registro.classList.add('was-validated');
}

function validarRequerido(input) {
    var resultado;
    if (input.value === "") {
        input.setCustomValidity("Este campo es obligatorio.");
        resultado = false;
    } else {
        input.setCustomValidity("");
        resultado = true;
    }
    $(input).next().text(input.validationMessage);
    return resultado;
}

function validarRut(input) {
    if (validarRequerido(input)) {
        if (rutEsValido(input.value))
            input.setCustomValidity("");
        else
            input.setCustomValidity("Rut inválido.");
        $(input).next().text(input.validationMessage);
    }
}

function validarTexto(input) {
    if (validarRequerido(input)) {
        if (esTexto(input.value))
            input.setCustomValidity("");
        else
            input.setCustomValidity("No se permiten números en este campo.");
        $(input).next().text(input.validationMessage);
    }
}

function validarTelefono(input) {
    if (validarRequerido(input)) {
        if (telefonoEsValido(input.value))
            input.setCustomValidity("");
        else
            input.setCustomValidity("Número de teléfono inválido.");
        $(input).next().text(input.validationMessage);
    }
}

function validarEmail(input) {
    if (validarRequerido(input)) {
        if (emailEsValido(input.value))
            input.setCustomValidity("");
        else
            input.setCustomValidity("Email inválido.");
        $(input).next().text(input.validationMessage);
    }
}

// Funciones de validación

function esTexto(txt) {
    for (let i = 0; i < txt.length; i++) {
        if (!isNaN(txt.charAt(i)))
            return false;
    }
    return true;
}

function emailEsValido(email) {
    return email.includes("@");
}

function telefonoEsValido(telefono) {
    telefono = telefono.replace(/\s/g, "");
    var prefijo = telefono.substring(0, 4);
    var numero = telefono.substring(4, telefono.length);
    if (prefijo !== "+569")
        return false;
    if (isNaN(numero))
        return false;
    if (numero.length !== 8)
        return false;
    return true;
}

function rutEsValido(rut) {
    var rut = rut.replace(/[.-]/g, "").toLowerCase();
    var dv = rut.charAt(rut.length - 1);
    var digitos = rut.substring(0, rut.length - 1);
    return calcularDV(digitos) == dv;
}

function calcularDV(rutSinDV) {

    var rutSinDV = Array.from(rutSinDV).reverse();
    var r = rutSinDV.length;
    var factores = [2, 3, 4, 5, 6, 7];
    var f = factores.length;
    var suma = 0;

    /*  for (let i = 0; i < r; i++)
         suma += rut[i] * factores[i % f]; */

    //arr.reduce(callback(acumulador, valorActual[, índice[, array]])[, valorInicial])
    suma = rutSinDV.reduce((acc, d, i) => acc + d * factores[i%f], 0);

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