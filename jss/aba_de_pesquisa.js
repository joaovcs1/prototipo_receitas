document.addEventListener("DOMContentLoaded", () => {
    const inputPesquisa = document.getElementById("campo_pesquisa");
    const lupaPesquisa = document.getElementById("lupa_pesquisa");
    const mainContainer = document.querySelector(".pagina_resultado_busca");

    if (!inputPesquisa || !mainContainer) return;

    const bancoReceitas = [
        {
            titulo: "Macarronada",
            desc: "Massa cozida ao molho de tomate com queijo ralado.",
            link: "receita_a.html",
            img: "https://picsum.photos/id/292/800/600"
        },
        {
            titulo: "Fricassê",
            desc: "Creme, frango desfiado e cobertura gratinada.",
            link: "receita_b.html",
            img: "https://picsum.photos/id/326/800/600"
        },
        {
            titulo: "Feijoada",
            desc: "Prato tradicional brasileiro de feijão preto com carnes salgadas.",
            link: "receita_exemplo.html",
            img: "../img/feijoada.jpg"
        }
    ];

    let historico = JSON.parse(localStorage.getItem("historicoPesquisa")) || [];

    renderizarHistorico();

    inputPesquisa.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            executarPesquisa(inputPesquisa.value.trim());
        }
    });

    if (lupaPesquisa) {
        lupaPesquisa.addEventListener("click", () => {
            executarPesquisa(inputPesquisa.value.trim());
        });
    }

    function executarPesquisa(query) {
        if (!query) {
            renderizarHistorico();
            return;
        }

        historico = historico.filter(item => item.toLowerCase() !== query.toLowerCase());
        historico.unshift(query);
        if (historico.length > 5) historico.pop();
        
        localStorage.setItem("historicoPesquisa", JSON.stringify(historico));
        inputPesquisa.value = query;

        const resultados = bancoReceitas.filter(receita => 
            receita.titulo.toLowerCase().includes(query.toLowerCase()) || 
            receita.desc.toLowerCase().includes(query.toLowerCase())
        );

        exibirResultados(resultados, query);
    }

    function renderizarHistorico() {
        mainContainer.innerHTML = "";

        if (historico.length === 0) {
            return;
        }

        const container = document.createElement("div");
        container.className = "historico-pesquisa-container";
        
        const header = document.createElement("div");
        header.className = "historico-pesquisa-titulo";
        header.innerHTML = `
            <span>Buscas Recentes</span>
            <button class="btn-limpar-historico">Limpar tudo</button>
        `;
        container.appendChild(header);

        const tagsContainer = document.createElement("div");
        tagsContainer.className = "historico-tags";

        historico.forEach((item) => {
            const tag = document.createElement("span");
            tag.className = "tag-busca";
            tag.innerHTML = `
                ${item}
                <button class="btn-excluir-busca" data-term="${item}" aria-label="Remover busca">&times;</button>
            `;
            
            tag.addEventListener("click", (e) => {
                if (!e.target.classList.contains("btn-excluir-busca")) {
                    executarPesquisa(item);
                }
            });

            const deleteBtn = tag.querySelector(".btn-excluir-busca");
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                removerItemHistorico(item);
            });

            tagsContainer.appendChild(tag);
        });

        container.appendChild(tagsContainer);
        mainContainer.appendChild(container);

        const clearBtn = header.querySelector(".btn-limpar-historico");
        clearBtn.addEventListener("click", () => {
            historico = [];
            localStorage.removeItem("historicoPesquisa");
            renderizarHistorico();
        });

        const tip = document.createElement("p");
        tip.style.textAlign = "center";
        tip.style.marginTop = "2rem";
        tip.style.fontSize = "0.9rem";
        tip.style.color = "var(--cor-texto-claro)";
        tip.textContent = "Dica: Você pode pesquisar por 'Macarronada' ou 'Fricassê'.";
        mainContainer.appendChild(tip);
    }

    function removerItemHistorico(term) {
        historico = historico.filter(item => item !== term);
        localStorage.setItem("historicoPesquisa", JSON.stringify(historico));
        renderizarHistorico();
    }

    function exibirResultados(resultados, query) {
        mainContainer.innerHTML = "";

        const container = document.createElement("div");
        container.className = "resultados-pesquisa-container";
        
        if (resultados.length > 0) {
            container.innerHTML = `
                <h2 class="resultados-pesquisa-titulo">Resultados para "${query}"</h2>
                <ul class="feed" style="padding: 0;"></ul>
            `;
            
            const feedUl = container.querySelector(".feed");
            
            resultados.forEach(receita => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <a href="${receita.link}" class="receitas">
                        <h2>${receita.titulo}</h2>
                        <img src="${receita.img}" alt="Ilustração de ${receita.titulo}" style="width:100%; border:0.1rem solid #222; border-radius:0.25rem; margin:0.35rem 0 0.5rem; object-fit:cover; height: 12rem;">
                        <p class="texto_receita">${receita.desc}</p>
                    </a>
                `;
                feedUl.appendChild(li);
            });
            
            mainContainer.appendChild(container);
        } else {
            container.innerHTML = `
                <div class="busca-vazia">
                    <p class="busca-vazia-titulo">Nenhuma receita encontrada para "${query}"</p>
                    <p>Verifique a grafia ou experimente uma de nossas sugestões:</p>
                    <div class="busca-vazia-sugestoes">
                        <span data-suggest="Macarronada">Macarronada</span>
                        <span data-suggest="Fricassê">Fricassê</span>
                        <span data-suggest="Feijoada">Feijoada</span>
                    </div>
                </div>
            `;
            
            mainContainer.appendChild(container);

            const suggestions = container.querySelectorAll(".busca-vazia-sugestoes span");
            suggestions.forEach(span => {
                span.addEventListener("click", () => {
                    const suggestion = span.getAttribute("data-suggest");
                    executarPesquisa(suggestion);
                });
            });
        }

        const backBtn = document.createElement("button");
        backBtn.textContent = "Voltar ao histórico";
        backBtn.className = "btn-limpar-historico";
        backBtn.style.display = "block";
        backBtn.style.margin = "1.5rem auto 3rem";
        backBtn.addEventListener("click", () => {
            inputPesquisa.value = "";
            renderizarHistorico();
        });
        mainContainer.appendChild(backBtn);
    }
});
