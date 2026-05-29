document.addEventListener("DOMContentLoaded", function () {
    var fundo = document.getElementById("menu-fundo");

    function fecharMenuNaPagina() {
        document.body.classList.remove("pagina_menu_aberto");
    }

    if (fundo) {
        fundo.addEventListener("click", fecharMenuNaPagina);
    }

    var botaoFechar = document.getElementById("fechar-menu");
    if (botaoFechar) {
        botaoFechar.addEventListener("click", function (evento) {
            evento.preventDefault();
            fecharMenuNaPagina();
        });
    }
});
