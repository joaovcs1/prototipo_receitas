document.addEventListener("DOMContentLoaded", function () {
    var bolinhas = document.querySelectorAll(".semana_bolinhas > li");
    if (bolinhas.length === 0) {
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

    var diasSemana = ["2", "3", "4", "5", "6", "7", "8"];
    var isPagesFolder = window.location.pathname.indexOf("/pages/") !== -1;
    var baseLink = isPagesFolder ? "calendario_footer.html" : "pages/calendario_footer.html";

    var i;
    for (i = 0; i < bolinhas.length; i = i + 1) {
        (function (index) {
            var dia = diasSemana[index];
            var li = bolinhas[index];
            var link = li.querySelector("a");

            if (link) {
                link.href = baseLink + "?dia=" + dia;
            }

            var receitas = agenda[dia] || [];
            if (receitas.length > 0) {
                li.classList.remove("desativado");
                li.style.borderBottom = "0.25rem solid var(--cor-primaria)";
            } else {
                li.classList.add("desativado");
                li.style.borderBottom = "none";
            }
        })(i);
    }
});
