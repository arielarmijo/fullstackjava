// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {

    // Relaciona los distintos controles entre sí
    divisaUp.onchange = divisaChanged;
    divisaUp.valor = valorUp;

    divisaDown.onchange = divisaChanged;
    divisaDown.valor = valorDown;

    valorUp.onkeyup = convertir;
    valorUp.divisa = divisaUp;
    valorUp.otraDivisa = divisaDown;
    valorUp.otroValor = valorDown;
    valorUp.error = errorUp;
    valorUp.otroError = errorDown;

    valorDown.onkeyup = convertir;
    valorDown.divisa = divisaDown;
    valorDown.otraDivisa = divisaUp;
    valorDown.otroValor = valorUp;
    valorDown.error = errorDown;
    valorDown.otroError = errorUp;

    // Objeto con las tasas de cambio. De referencia se usa el peso chileno
    var tasa = {
      dolar: { nombre: "USD", valor: 0, fecha: new Date() },
      euro: { nombre: "EUR", valor: 0, fecha: new Date() },
      uf: { nombre: "UF", valor: 0, fecha: new Date() },
      utm: { nombre: "UTM", valor: 0, fecha: new Date() },
      peso: { nombre: "CLP", valor: 1, fecha: new Date() }
    };

    // Recupera los valores de cada moneda desde mindicador.cl
    (function actualidarTasa() {
      // Call server to get the data
      $ajaxUtils.sendGetRequest("https://mindicador.cl/api",
        function (response) {
          console.log(response);
          var date = new Date(response.fecha);
          fecha.innerText = date.toLocaleDateString();
          for (let moneda in tasa) {
            if (moneda != "peso") {
              tasa[moneda].valor = response[moneda].valor;
              tasa[moneda].fecha = new Date(response[moneda].fecha);
            }
          }
          iniciarlizar();
          console.log(tasa);
        });
    })();

    function iniciarlizar() {
      llenarDivisas(divisaUp);
      llenarDivisas(divisaDown);
      divisaUp.selectedIndex = 0;
      divisaDown.selectedIndex = Object.keys(tasa).length - 1;
      convertir.call(valorUp);
    }

    function llenarDivisas(select) {
      for (let moneda in tasa) {
        var option = document.createElement("option");
        option.setAttribute("fecha", tasa[moneda].fecha);
        option.value = tasa[moneda].valor;
        option.text = tasa[moneda].nombre;
        select.add(option);
      }
    }

    function convertir() {
      if (validar(this))
        this.otroValor.value = new Intl.NumberFormat("en-US").format(this.value * this.divisa.value / this.otraDivisa.value);
    }

    function validar(input) {
      let isOk = !isNaN(input.value);
      if (isOk) {
        input.error.innerHTML = "";
        input.otroError.innerHTML = "";
      } else
        input.error.innerHTML = "Ingrese solo números";
      return isOk;
    }

    function divisaChanged() {
      var date = new Date(this.options[this.selectedIndex].getAttribute("fecha"));
      fecha.innerText = date.toLocaleDateString();
      this.valor.value = 1;
      convertir.call(this.valor);
    }

  }
);





