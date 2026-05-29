var CHAVE_DISPENSA = "codes_dispensa";

var CATALOGO_INGREDIENTES = [
    {
        id: "mandioca-amarela",
        nome: "Mandioca amarela",
        imagem: "../img/mandioca_amarela.jpg",
        termos: ["mandioca", "amarela"]
    },
    {
        id: "mandioca-roxa",
        nome: "Mandioca roxa",
        imagem: "../img/mandioca_roxa.jfif",
        termos: ["mandioca", "roxa"]
    },
    {
        id: "tomate-italiano",
        nome: "Tomate italiano",
        imagem: "../img/tomate_italiano.jfif",
        termos: ["tomate", "italiano"]
    },
    {
        id: "tomate-cereja",
        nome: "Tomate cereja",
        imagem: "../img/tomate_cereja.jfif",
        termos: ["tomate", "cereja"]
    }
];

function prepararDispensaVazia() {
    if (localStorage.getItem("dispensa_inicio_vazio") !== "sim") {
        localStorage.setItem(CHAVE_DISPENSA, "[]");
        localStorage.setItem("dispensa_inicio_vazio", "sim");
    }
}

function obterDispensa() {
    var texto = localStorage.getItem(CHAVE_DISPENSA);
    if (!texto) {
        return [];
    }
    try {
        var lista = JSON.parse(texto);
        if (!lista || lista.length === undefined) {
            return [];
        }
        return lista;
    } catch (erro) {
        return [];
    }
}

function salvarDispensa(lista) {
    localStorage.setItem(CHAVE_DISPENSA, JSON.stringify(lista));
}

function jaEstaNaDispensa(id) {
    var lista = obterDispensa();
    var i;
    for (i = 0; i < lista.length; i = i + 1) {
        if (lista[i].id === id) {
            return true;
        }
    }
    return false;
}

function removerDaDispensa(id) {
    var lista = obterDispensa();
    var novaLista = [];
    var i;

    for (i = 0; i < lista.length; i = i + 1) {
        if (lista[i].id !== id) {
            novaLista.push(lista[i]);
        }
    }

    salvarDispensa(novaLista);
}

function adicionarNaDispensa(id) {
    var ingrediente = null;
    var i;

    for (i = 0; i < CATALOGO_INGREDIENTES.length; i = i + 1) {
        if (CATALOGO_INGREDIENTES[i].id === id) {
            ingrediente = CATALOGO_INGREDIENTES[i];
            break;
        }
    }

    if (!ingrediente || jaEstaNaDispensa(id)) {
        return false;
    }

    var lista = obterDispensa();
    lista.push({
        id: ingrediente.id,
        nome: ingrediente.nome,
        imagem: ingrediente.imagem
    });
    salvarDispensa(lista);
    return true;
}

function buscarIngredientes(termo) {
    var consulta = termo.toLowerCase();
    var resultados = [];
    var i;
    var j;
    var nome;
    var achou;

    if (consulta === "") {
        return resultados;
    }

    for (i = 0; i < CATALOGO_INGREDIENTES.length; i = i + 1) {
        nome = CATALOGO_INGREDIENTES[i].nome.toLowerCase();
        achou = false;

        if (nome.indexOf(consulta) !== -1) {
            achou = true;
        } else {
            for (j = 0; j < CATALOGO_INGREDIENTES[i].termos.length; j = j + 1) {
                if (CATALOGO_INGREDIENTES[i].termos[j].indexOf(consulta) !== -1) {
                    achou = true;
                    break;
                }
            }
        }

        if (achou) {
            resultados.push(CATALOGO_INGREDIENTES[i]);
        }
    }

    return resultados;
}

function mostrarDispensa() {
    var main = document.getElementById("area-dispensa");
    if (!main) {
        return;
    }

    var lista = obterDispensa();
    var html = "";
    var i;

    if (lista.length === 0) {
        main.className = "despensa";
        main.innerHTML = "<img src=\"../img/caixas.png\" alt=\"\"><p>Sua despensa está vazia.</p>";
        return;
    }

    main.className = "";
    html = "<ul class=\"lista_dispensa\">";

    for (i = 0; i < lista.length; i = i + 1) {
        html = html + "<li class=\"item_dispensa\">";
        html = html + "<img src=\"" + lista[i].imagem + "\" alt=\"\">";
        html = html + "<span class=\"nome_item_dispensa\">" + lista[i].nome + "</span>";
        html = html + "<button type=\"button\" class=\"btn_remover_dispensa\" data-id=\"" + lista[i].id + "\" aria-label=\"Remover " + lista[i].nome + "\">×</button>";
        html = html + "</li>";
    }

    html = html + "</ul>";
    main.innerHTML = html;
}

function mostrarResultadosPesquisa(termo) {
    var listaEl = document.getElementById("resultados-ingredientes");
    var avisoEl = document.getElementById("aviso-pesquisa");
    var resultados = buscarIngredientes(termo.trim());
    var html = "";
    var i;

    if (!listaEl) {
        return;
    }

    if (avisoEl) {
        if (termo.trim() !== "" && resultados.length === 0) {
            avisoEl.textContent = "Nenhum ingrediente encontrado.";
            avisoEl.hidden = false;
        } else {
            avisoEl.hidden = true;
        }
    }

    for (i = 0; i < resultados.length; i = i + 1) {
        var desabilitado = "";
        if (jaEstaNaDispensa(resultados[i].id)) {
            desabilitado = " disabled";
        }

        html = html + "<li class=\"cartao_ingrediente\">";
        html = html + "<button type=\"button\" class=\"botao_ingrediente\" data-id=\"" + resultados[i].id + "\"" + desabilitado + ">";
        html = html + "<img src=\"" + resultados[i].imagem + "\" alt=\"\">";
        html = html + resultados[i].nome;
        html = html + "<img class=\"icone_mais\" src=\"../img/adcionar.png\" alt=\"Adicionar\">";
        html = html + "</button></li>";
    }

    listaEl.innerHTML = html;
}

function iniciarPaginaDispensa() {
    var main = document.getElementById("area-dispensa");

    if (!main) {
        return;
    }

    mostrarDispensa();

    main.addEventListener("click", function (evento) {
        var botaoRemover = evento.target.closest(".btn_remover_dispensa");

        if (!botaoRemover) {
            return;
        }

        var id = botaoRemover.getAttribute("data-id");
        removerDaDispensa(id);
        mostrarDispensa();
    });
}

function iniciarPaginaAdicionar() {
    var campo = document.getElementById("campo-pesquisa-ingrediente");
    var listaEl = document.getElementById("resultados-ingredientes");

    if (!campo || !listaEl) {
        return;
    }

    var termoInicial = "";
    var parametros = window.location.search;
    if (parametros.indexOf("q=") !== -1) {
        termoInicial = decodeURIComponent(parametros.split("q=")[1].split("&")[0]);
    }

    campo.value = termoInicial;
    mostrarResultadosPesquisa(termoInicial);

    campo.addEventListener("input", function () {
        mostrarResultadosPesquisa(campo.value);
    });

    listaEl.addEventListener("click", function (evento) {
        var botao = evento.target.closest(".botao_ingrediente");
        if (!botao || botao.disabled) {
            return;
        }

        var id = botao.getAttribute("data-id");
        adicionarNaDispensa(id);
        window.location.href = "dispensa_vazia.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    prepararDispensaVazia();
    iniciarPaginaDispensa();
    iniciarPaginaAdicionar();
});
