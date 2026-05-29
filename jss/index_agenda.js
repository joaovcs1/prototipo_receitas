document.addEventListener("DOMContentLoaded", function () {
    var icones = document.querySelectorAll(".icones");
    var isPagesFolder = window.location.pathname.indexOf("/pages/") !== -1;
    var targetLink = isPagesFolder ? "calendario.html" : "pages/calendario.html";

    if (icones.length >= 1) {
        var linkMacarronada = icones[0].querySelector("li:last-child a");
        if (linkMacarronada) {
            linkMacarronada.addEventListener("click", function (e) {
                e.preventDefault();
                localStorage.setItem("agendandoReceita", "Macarronada");
                localStorage.setItem("agendandoLink", "receita_a.html");
                localStorage.setItem("agendandoImg", "https://picsum.photos/id/292/800/600");
                window.location.href = targetLink;
            });
        }
    }

    if (icones.length >= 2) {
        var linkFricasse = icones[1].querySelector("li:last-child a");
        if (linkFricasse) {
            linkFricasse.addEventListener("click", function (e) {
                e.preventDefault();
                localStorage.setItem("agendandoReceita", "Fricassê");
                localStorage.setItem("agendandoLink", "receita_b.html");
                localStorage.setItem("agendandoImg", "https://picsum.photos/id/326/800/600");
                window.location.href = targetLink;
            });
        }
    }
});
