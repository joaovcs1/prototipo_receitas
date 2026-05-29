document.addEventListener("DOMContentLoaded", function () {
    var itensDia = document.querySelectorAll(".lista_dias_mes > li");
    var tituloAgenda = document.getElementById("titulo-agenda-dia");
    var listaReceitas = document.getElementById("lista-receitas-agenda");

    if (itensDia.length === 0 || !tituloAgenda || !listaReceitas) {
        return;
    }

    var agenda = JSON.parse(localStorage.getItem("agendaSemana"));
    if (!agenda) {
        agenda = {
            "2": [],
            "3": [],
            "4": [{titulo: "Feijoada", link: "receita_exemplo.html"}],
            "5": [],
            "6": [],
            "7": [],
            "8": []
        };
        localStorage.setItem("agendaSemana", JSON.stringify(agenda));
    }

    function atualizarAgendaHeader() {
        var bolinhas = document.querySelectorAll(".semana_bolinhas > li");
        var diasSemana = ["2", "3", "4", "5", "6", "7", "8"];
        var i;
        
        for (i = 0; i < bolinhas.length; i = i + 1) {
            var d = diasSemana[i];
            var li = bolinhas[i];
            var receitas = agenda[d] || [];
            
            if (receitas.length > 0) {
                li.classList.remove("desativado");
                li.style.borderBottom = "0.25rem solid var(--cor-primaria)";
            } else {
                li.classList.add("desativado");
                li.style.borderBottom = "none";
            }
        }
    }

    function renderizarDia(dia, elementoLi) {
        var i;
        for (i = 0; i < itensDia.length; i = i + 1) {
            itensDia[i].classList.remove("dia-selecionado");
        }
        elementoLi.classList.add("dia-selecionado");

        var nomeDia = elementoLi.firstChild.textContent.trim();
        var numDia = elementoLi.querySelector(".num_dia").textContent.trim();
        tituloAgenda.textContent = "Programação de " + nomeDia + ", dia " + numDia;

        listaReceitas.innerHTML = "";
        var receitas = agenda[dia] || [];

        if (receitas.length === 0) {
            listaReceitas.innerHTML =
                "<p style=\"font-size: 0.9rem; color: var(--cor-texto-claro); margin: 0.5rem 0;\">" +
                "Não há programação de receitas para esse dia." +
                "</p>" +
                "<a href=\"index.html\" style=\"display: inline-block; font-size: 0.75rem; margin-top: 0.5rem; color: var(--cor-primaria); text-decoration: underline; font-weight: 700; text-transform: uppercase;\">" +
                "+ Agendar Receita" +
                "</a>";
            return;
        }

        var ul = document.createElement("ul");
        ul.className = "lista_dispensa";
        ul.style.padding = "0.5rem 0";

        for (i = 0; i < receitas.length; i = i + 1) {
            (function (index) {
                var receita = receitas[index];
                var li = document.createElement("li");
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";
                li.style.padding = "0.65rem 0.25rem";
                li.style.borderBottom = "0.06rem solid var(--cor-desabilitado)";

                li.innerHTML =
                    "<a href=\"" + receita.link + "\" style=\"font-weight: 700; color: var(--cor-texto); text-decoration: none;\">" +
                    receita.titulo +
                    "</a>" +
                    "<button class=\"btn-excluir-busca\" style=\"margin: 0; font-size: 1.1rem; border: none; background: none; cursor: pointer;\" aria-label=\"Remover agendamento\">&times;</button>";

                var deleteBtn = li.querySelector(".btn-excluir-busca");
                if (deleteBtn) {
                    deleteBtn.addEventListener("click", function () {
                        receitas.splice(index, 1);
                        agenda[dia] = receitas;
                        localStorage.setItem("agendaSemana", JSON.stringify(agenda));
                        renderizarDia(dia, elementoLi);
                        atualizarAgendaHeader();
                    });
                }

                ul.appendChild(li);
            })(i);
        }

        listaReceitas.appendChild(ul);
    }

    var i;
    for (i = 0; i < itensDia.length; i = i + 1) {
        (function (index) {
            var li = itensDia[index];
            var dia = li.getAttribute("data-dia");
            li.addEventListener("click", function () {
                renderizarDia(dia, li);
            });
        })(i);
    }

    var urlParams = new URLSearchParams(window.location.search);
    var diaParam = urlParams.get("dia");
    var diaAlvo = diaParam || "4";
    var diaCarregado = false;

    for (i = 0; i < itensDia.length; i = i + 1) {
        var dia = itensDia[i].getAttribute("data-dia");
        if (dia === diaAlvo) {
            renderizarDia(dia, itensDia[i]);
            diaCarregado = true;
            break;
        }
    }

    if (!diaCarregado && itensDia.length > 0) {
        renderizarDia("4", itensDia[2]);
    }
});
