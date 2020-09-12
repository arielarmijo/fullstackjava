var fmt = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
});

$(document).ready(function () {

    (function () {
        $.ajax({
            url: "https://mindicador.cl/api",
            success: function (result, status, xhr) {
                console.log(result);
                $("#uf").text(fmt.format(result.uf.valor));
                $("#utm").text(fmt.format(result.utm.valor));
                $("#dolar").text(fmt.format(result.dolar.valor));
                var lastUpdate = new Date(result.fecha);
                $("#fecha").text(lastUpdate.toLocaleDateString());
            },
            error: function (xhr, status, error) {
                console.log(status, error);
                $("#uf").text("NA");
                $("#utm").text("NA");
                $("#dolar").text("NA");
                $("#fecha").text("NA");

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