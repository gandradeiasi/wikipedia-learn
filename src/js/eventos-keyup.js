comentario.addEventListener('keyup', () => {
    const comentarioOriginal = comentario.dataset.comentarioOriginal;
    const comentarioAtual = comentario.value;

    if (comentarioAtual == comentarioOriginal)
        salvarComentario.style.display = "none";
    else
        salvarComentario.style.display = "block";
})