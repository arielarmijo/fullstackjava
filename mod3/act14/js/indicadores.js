$(document).ready(function () {

    (function () {
        $.ajax({
            url: "https://mindicador.cl/api",
            success: function (result) {
                //console.log(result);
                $("#uf").text(result.uf.valor);
                $("#utm").text(result.utm.valor);
                $("#dolar").text(result.dolar.valor);
                var lastUpdate = new Date(result.fecha);
                $("#fecha").text(lastUpdate.toLocaleDateString());
            }
        });
    })();

    $('#indicadores').marquee('pointer').mouseover(function () {
        $(this).trigger('stop');
    }).mouseout(function () {
        $(this).trigger('start');
    }).mousemove(function (event) {
        if ($(this).data('drag') == true) {
            this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
        }
    }).mousedown(function (event) {
        $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
    }).mouseup(function () {
        $(this).data('drag', false);
    });

});