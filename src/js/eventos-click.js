abaAprovados.addEventListener('click', carregaAprovados)
abaPendentes.addEventListener('click', carregaPendentes)
abaComentados.addEventListener('click', carregaComentados)
cancelarComentario.addEventListener('click', () => {
    comentario.value = "";
    modalComentario.classList.remove('active');
})
salvarComentario.addEventListener('click', () => {
    fetch(ambiente + "/comentar-topico", {
        method: 'post',
        headers,
        body: JSON.stringify({ comentario: comentario.value, link: salvarComentario.dataset.link })
    }).then(atualizaCorpo);

    comentario.value = "";
    modalComentario.classList.remove('active');
})