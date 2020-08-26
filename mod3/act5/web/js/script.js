$(function () {

    
    $("#navbarToggle").blur(function (event) {
        if (window.innerWidth < 768) {
            $("#collapsableNav").collapse('hide');
        }
    });

    

});