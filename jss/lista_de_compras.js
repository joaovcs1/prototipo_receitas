document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("itens-compra");
    var clearBtn = document.getElementById("limpar-compras");
    var lista = JSON.parse(localStorage.getItem("listaCompras")) || [];

    function renderizarLista() {
        if (!container) {
            return;
        }
        container.innerHTML = "";

        if (lista.length === 0) {
            container.innerHTML =
                "<p class=\"instrucao_busca\" style=\"text-align: center; margin: 3rem 1rem; color: var(--cor-texto-claro);\">" +
                "Sua lista de compras está vazia." +
                "</p>";
            if (clearBtn) {
                clearBtn.style.display = "none";
            }
            return;
        }

        if (clearBtn) {
            clearBtn.style.display = "block";
        }

        var ul = document.createElement("ul");
        ul.className = "lista_dispensa";
        ul.style.padding = "1rem";

        var i;
        for (i = 0; i < lista.length; i = i + 1) {
            (function (index) {
                var item = lista[index];
                var li = document.createElement("li");
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";
                li.style.padding = "0.75rem 0.5rem";
                li.style.borderBottom = "0.06rem solid var(--cor-desabilitado)";

                li.innerHTML =
                    "<span style=\"font-weight: 600; color: var(--cor-texto);\">" + item + "</span>" +
                    "<button class=\"btn-excluir-busca\" style=\"margin: 0; font-size: 1.1rem; border: none; background: none; cursor: pointer;\" aria-label=\"Remover item\">&times;</button>";

                var deleteBtn = li.querySelector(".btn-excluir-busca");
                if (deleteBtn) {
                    deleteBtn.addEventListener("click", function () {
                        removerItem(index);
                    });
                }

                ul.appendChild(li);
            })(i);
        }

        container.appendChild(ul);
    }

    function removerItem(index) {
        lista.splice(index, 1);
        localStorage.setItem("listaCompras", JSON.stringify(lista));
        renderizarLista();
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            lista = [];
            localStorage.removeItem("listaCompras");
            renderizarLista();
        });
    }

    renderizarLista();
});
