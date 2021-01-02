document.addEventListener('keydown', e => {
    if (e.key == "-") {
        botoesRemover[0].click();
    }
    else if (e.key == "+") {
        botoesAprovar[0].click();
    }
    else if (e.key == "*") {
        botoesComentar[0].click();
    }
    else if (e.key == "Escape") {
        cancelarComentario.click();
    }
    else if (e.key == "=") {
        document.querySelector('a').click();
    }
})