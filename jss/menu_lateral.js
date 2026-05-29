function estaNaPastaPages() {
    return window.location.pathname.indexOf("/pages/") !== -1;
}

function pastaImagens() {
    if (estaNaPastaPages()) {
        return "../img/";
    }
    return "img/";
}

function linkPagina(nome) {
    if (estaNaPastaPages()) {
        return nome;
    }
    return "pages/" + nome;
}

function criarMenuLateral() {
    if (document.getElementById("menu-lateral")) {
        return;
    }

    var img = pastaImagens();
    var container = document.createElement("div");
    container.id = "menu-lateral";
    container.className = "menu-lateral";

    container.innerHTML =
        "<button type=\"button\" class=\"menu_fundo\" id=\"menu-fundo\" aria-label=\"Fechar menu\"></button>" +
        "<ul class=\"menu\">" +
        "<li><a href=\"#\"><img src=\"" + img + "estrela.png\" alt=\"\">Favoritos</a></li>" +
        "<li><a href=\"" + linkPagina("calendario_footer.html") + "\"><img src=\"" + img + "agenda.png\" alt=\"\">Agenda</a></li>" +
        "<li><a href=\"#\"><img src=\"" + img + "pessoas.png\" alt=\"\">Sua família</a></li>" +
        "<li><a href=\"" + linkPagina("dispensa_vazia.html") + "\"><img src=\"" + img + "caixas.png\" alt=\"\">Sua despensa</a></li>" +
        "<li><a href=\"" + linkPagina("lista_de_compras.html") + "\"><img src=\"" + img + "plus_post.png\" alt=\"\">Lista de compras</a></li>" +
        "<li><a href=\"#\"><img src=\"" + img + "perfil.png\" alt=\"\">Seu perfil</a></li>" +
        "<li><a href=\"#\"><img src=\"" + img + "engrenagem.png\" alt=\"\">Configurações</a></li>" +
        "</ul>";

    document.body.appendChild(container);

    var fundo = document.getElementById("menu-fundo");
    if (fundo) {
        fundo.addEventListener("click", fecharMenuLateral);
    }
}

function abrirMenuLateral() {
    criarMenuLateral();
    document.body.classList.add("pagina_menu_aberto");
}

function fecharMenuLateral() {
    document.body.classList.remove("pagina_menu_aberto");
}

function iniciarMenuLateral() {
    criarMenuLateral();

    var botoesAbrir = document.querySelectorAll(".abrir-menu-lateral");
    var botoesFechar = document.querySelectorAll(".fechar-menu-lateral");
    var i;

    for (i = 0; i < botoesAbrir.length; i = i + 1) {
        botoesAbrir[i].addEventListener("click", function (evento) {
            evento.preventDefault();
            abrirMenuLateral();
        });
    }

    for (i = 0; i < botoesFechar.length; i = i + 1) {
        botoesFechar[i].addEventListener("click", function (evento) {
            evento.preventDefault();
            fecharMenuLateral();
        });
    }

    if (window.location.hash === "#menu") {
        abrirMenuLateral();
    }
}

document.addEventListener("DOMContentLoaded", iniciarMenuLateral);
