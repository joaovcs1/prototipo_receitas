document.addEventListener("DOMContentLoaded", function () {
    var textoGrupo = document.getElementById("texto-quantidade-grupo");
    var botaoConfirmar = document.getElementById("confirmar-grupo");
    var barra = document.getElementById("barra-pessoas");
    var salvo = localStorage.getItem("quantidadePessoas");

    if (textoGrupo) {
        if (salvo) {
            if (salvo === "1") {
                textoGrupo.textContent = "Quantidade atual: 1 pessoa";
            } else {
                textoGrupo.textContent = "Quantidade atual: " + salvo + " pessoas";
            }
        }
    }

    if (!botaoConfirmar || !barra) {
        return;
    }

    botaoConfirmar.addEventListener("click", function (evento) {
        evento.preventDefault();

        var quantidade = barra.getAttribute("data-quantidade");
        if (!quantidade) {
            quantidade = "6";
        }

        localStorage.setItem("quantidadePessoas", quantidade);
        window.location.href = "o_que_tem_receita.html";
    });
});
