document.addEventListener("DOMContentLoaded", function () {
    var barra = document.getElementById("barra-pessoas");
    var bola = document.getElementById("bola-pessoas");
    var preenchida = document.getElementById("barra-preenchida");
    var texto = document.getElementById("texto-pessoas");

    if (!barra || !bola || !preenchida || !texto) {
        return;
    }

    var aguardarConfirmar = document.body.getAttribute("data-aguardar-confirmar") === "sim";
    var minimo = 1;
    var maximo = 12;
    var quantidade = 6;
    var arrastando = false;
    var salvo = localStorage.getItem("quantidadePessoas");

    if (salvo) {
        quantidade = parseInt(salvo, 10);
    }

    if (quantidade < minimo) {
        quantidade = minimo;
    }
    if (quantidade > maximo) {
        quantidade = maximo;
    }

    atualizarTela(quantidade);

    function atualizarTela(numero) {
        var porcentagem = ((numero - minimo) / (maximo - minimo)) * 100;

        bola.style.left = porcentagem + "%";
        preenchida.style.width = porcentagem + "%";

        if (numero === 1) {
            texto.textContent = "1 pessoa";
        } else {
            texto.textContent = numero + " pessoas";
        }

        barra.setAttribute("data-quantidade", numero);

        var textoGrupo = document.getElementById("texto-quantidade-grupo");
        if (textoGrupo && !aguardarConfirmar) {
            textoGrupo.textContent = "Quantidade de pessoas: " + numero;
        }
    }

    function calcularPessoas(posicaoX) {
        var limites = barra.getBoundingClientRect();
        var porcentagem = (posicaoX - limites.left) / limites.width;

        if (porcentagem < 0) {
            porcentagem = 0;
        }
        if (porcentagem > 1) {
            porcentagem = 1;
        }

        return Math.round(minimo + porcentagem * (maximo - minimo));
    }

    function moverBola(posicaoX) {
        var numero = calcularPessoas(posicaoX);

        if (numero !== quantidade) {
            quantidade = numero;
            if (!aguardarConfirmar) {
                localStorage.setItem("quantidadePessoas", quantidade);
            }
            atualizarTela(quantidade);
        }
    }

    barra.addEventListener("mousedown", function (evento) {
        arrastando = true;
        moverBola(evento.clientX);
    });

    document.addEventListener("mousemove", function (evento) {
        if (arrastando) {
            moverBola(evento.clientX);
        }
    });

    document.addEventListener("mouseup", function () {
        arrastando = false;
    });

    barra.addEventListener("touchstart", function (evento) {
        arrastando = true;
        moverBola(evento.touches[0].clientX);
    });

    document.addEventListener("touchmove", function (evento) {
        if (arrastando) {
            evento.preventDefault();
            moverBola(evento.touches[0].clientX);
        }
    });

    document.addEventListener("touchend", function () {
        arrastando = false;
    });

    var botaoConfirmar = document.querySelector(".btn_confirmar");
    if (botaoConfirmar) {
        botaoConfirmar.addEventListener("click", function () {
            if (aguardarConfirmar) {
                localStorage.setItem("quantidadePessoas", quantidade);
            }

            var receita = localStorage.getItem("agendandoReceita") || "Fricassê";
            var link = localStorage.getItem("agendandoLink") || "receita_b.html";
            var dia = localStorage.getItem("agendandoDia") || "4";

            var agenda = JSON.parse(localStorage.getItem("agendaSemana")) || {
                "2": [],
                "3": [],
                "4": [{titulo: "Feijoada", link: "receita_exemplo.html"}],
                "5": [],
                "6": [],
                "7": [],
                "8": []
            };

            if (!agenda[dia]) {
                agenda[dia] = [];
            }

            var i;
            var existe = false;
            for (i = 0; i < agenda[dia].length; i = i + 1) {
                if (agenda[dia][i].titulo === receita) {
                    existe = true;
                    break;
                }
            }

            if (!existe) {
                agenda[dia].push({
                    titulo: receita,
                    link: link
                });
            }

            localStorage.setItem("agendaSemana", JSON.stringify(agenda));
        });
    }
});
