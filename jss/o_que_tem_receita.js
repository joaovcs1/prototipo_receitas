var PESSOAS_PADRAO_RECEITA = 6;

function textoPessoas(numero) {
    if (numero === 1) {
        return "1 pessoa";
    }
    return numero + " pessoas";
}

function aplicarIngredientesProporcionais(quantidadePessoas) {
    var itens = document.querySelectorAll(".coluna_lista ul li");
    var i;
    var texto;

    for (i = 0; i < itens.length; i = i + 1) {
        texto = itens[i].textContent;

        if (texto.indexOf("Mussarela") !== -1) {
            var gramasMussarela = Math.round(100 * quantidadePessoas);
            itens[i].textContent = "Mussarela (" + gramasMussarela + " g)";
        } else if (texto.indexOf("Milho verde") !== -1) {
            var latas = (2 / PESSOAS_PADRAO_RECEITA) * quantidadePessoas;
            var latasArredondadas = Math.round(latas * 10) / 10;
            var unidade = "latas";

            if (latasArredondadas === 1) {
                unidade = "lata";
            }

            itens[i].textContent = "Milho verde (" + latasArredondadas + " " + unidade + ")";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var salvo = localStorage.getItem("quantidadePessoas");
    var quantidadePessoas = parseInt(salvo, 10);

    if (!quantidadePessoas) {
        quantidadePessoas = PESSOAS_PADRAO_RECEITA;
    }

    var mainContainer = document.querySelector("main");
    var containerLista = document.querySelector(".lista_compras_dupla");

    if (mainContainer && containerLista) {
        var banner = document.createElement("div");
        banner.className = "banner-info-pessoas";
        banner.innerHTML =
            "<span>💡</span>" +
            "<p>Ingredientes calculados proporcionalmente para <strong>" +
            textoPessoas(quantidadePessoas) +
            "</strong>.</p>";
        mainContainer.insertBefore(banner, containerLista);
    }

    aplicarIngredientesProporcionais(quantidadePessoas);

    var botaoAdd = document.querySelector(".acao_lista_compras");
    if (botaoAdd) {
        botaoAdd.addEventListener("click", function (evento) {
            evento.preventDefault();

            var colunas = document.querySelectorAll(".coluna_lista");
            if (colunas.length >= 2) {
                var colunaFalta = colunas[1];
                var itensFalta = colunaFalta.querySelectorAll("ul li");
                var lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
                var i;

                for (i = 0; i < itensFalta.length; i = i + 1) {
                    var ingrediente = itensFalta[i].textContent.trim();
                    if (lista.indexOf(ingrediente) === -1) {
                        lista.push(ingrediente);
                    }
                }

                localStorage.setItem("listaCompras", JSON.stringify(lista));

                botaoAdd.style.color = "var(--cor-alerta)";
                botaoAdd.innerHTML = '<img src="../img/certo.png" alt=""> Adicionado à lista!';
            }
        });
    }
});
