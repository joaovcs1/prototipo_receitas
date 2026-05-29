document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("page-loader")) {
        const loader = document.createElement("div");
        loader.id = "page-loader";
        
        Object.assign(loader.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "99999",
            opacity: "1",
            transition: "opacity 0.2s ease, visibility 0.2s ease"
        });

        const spinner = document.createElement("div");
        Object.assign(spinner.style, {
            width: "2rem",
            height: "2rem",
            border: "2px solid #e0e0e0",
            borderTop: "2px solid var(--cor-primaria, #F28705)",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite"
        });

        if (!document.getElementById("spin-keyframes")) {
            const style = document.createElement("style");
            style.id = "spin-keyframes";
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        loader.appendChild(spinner);
        document.body.appendChild(loader);

        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 200);
        }, 150);
    }

    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (
            link && 
            link.href && 
            !link.href.startsWith("#") && 
            !link.href.startsWith("javascript:") && 
            link.target !== "_blank" &&
            !e.ctrlKey && 
            !e.metaKey && 
            !e.shiftKey
        ) {
            const currentUrl = new URL(window.location.href);
            const targetUrl = new URL(link.href, window.location.href);

            if (currentUrl.origin === targetUrl.origin && currentUrl.pathname !== targetUrl.pathname) {
                e.preventDefault();
                const loader = document.getElementById("page-loader");
                if (loader) {
                    loader.style.display = "flex";
                    loader.offsetHeight; // trigger reflow
                    loader.style.opacity = "1";
                }
                setTimeout(() => {
                    window.location.href = link.href;
                }, 150);
            }
        }
    });
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        const loader = document.getElementById("page-loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 200);
        }
    }
});
