document.addEventListener("DOMContentLoaded", function () {
    var dias = document.querySelectorAll(".calendario_semana p");
    var i;
    for (i = 0; i < dias.length; i = i + 1) {
        (function (index) {
            var el = dias[index];
            var texto = el.textContent.trim();
            var diaNum = parseInt(texto, 10);
            
            if (diaNum >= 2 && diaNum <= 8) {
                el.style.cursor = "pointer";
                
                if (diaNum === 4) {
                    el.innerHTML = "4";
                }
                
                el.addEventListener("click", function () {
                    localStorage.setItem("agendandoDia", texto);
                    window.location.href = "selecionar_refeicao.html";
                });
            }
        })(i);
    }
});
