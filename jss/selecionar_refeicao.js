document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll(".lista_refeicoes a");
    var i;
    for (i = 0; i < links.length; i = i + 1) {
        (function (index) {
            var link = links[index];
            link.addEventListener("click", function (e) {
                var text = link.textContent || "";
                var refeicao = "Outra refeição";
                
                if (text.indexOf("Café") !== -1) {
                    refeicao = "Café da manhã";
                } else if (text.indexOf("Almoço") !== -1) {
                    refeicao = "Almoço";
                } else if (text.indexOf("Jantar") !== -1) {
                    refeicao = "Jantar";
                }
                
                localStorage.setItem("agendandoRefeicao", refeicao);
            });
        })(i);
    }
});
