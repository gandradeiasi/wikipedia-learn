document.addEventListener('keydown', e => {
    if (!modalComentario.classList.contains('active')) {
        keydown("-", () => botoesRemover[0].click());
        keydown("+", () => botoesAprovar[0].click());
        keydown("=", () => botoesComentar[0].click());
        keydown("Escape", () => cancelarComentario[0].click());
        keydown("*", () => document.querySelector('a').click());
        keydown("/", () => {
            botoesRemover[0].click();
            setTimeout(() => document.querySelector('a').click(), 300);
        });
        keydown('1', () => abaAprovados.click());
        keydown('2', () => abaPendentes.click());
    }
})