function atualizaCorpo() {
    if (abaAprovados.classList.contains('active'))
        carregaAprovados();
    else if (abaPendentes.classList.contains('active'))
        carregaPendentes();
}

function extrairTopico(link) {
    const topicoNaoFormatado = link.match(/wiki\/(.*)$/)[1]
    const topicoFormatado = decodeURI(
        topicoNaoFormatado
            .replace(/_/g, " ")
    )

    return topicoFormatado
}

function abrirModalComentario(link) {
    modalComentario.classList.add('active');

    fetch(ambiente + '/topico-por-link?link=' + link)
        .then(x => x.json())
        .then(x => comentario.value = x.comentario ? x.comentario : '')

    cancelarComentario.dataset.link = link;
    salvarComentario.dataset.link = link;

    comentario.focus();
    comentario.setSelectionRange(comentario.value.length, comentario.value.length);
}

function atualizaClickRemover() {
    botoesRemover = document.querySelectorAll('.remover-topico');

    botoesRemover.forEach(x => x.addEventListener('click', () => {
        const link = x.dataset.link;

        fetch(ambiente + '/remover-topico', {
            method: 'delete',
            body: JSON.stringify({ link }),
            headers
        })
            .then(atualizaCorpo)
    }))
}

function atualizaClickComentar() {
    botoesComentar = document.querySelectorAll('.comentar-topico');

    botoesComentar.forEach(x => x.addEventListener('click', () => {
        const link = x.dataset.link;

        abrirModalComentario(link);
    }))
}

function atualizaClickAprovar() {
    botoesAprovar = document.querySelectorAll('.aprovar-topico');

    botoesAprovar.forEach(x => x.addEventListener('click', () => {
        const link = x.dataset.link;

        fetch(ambiente + '/aprovar-topico', {
            method: 'post',
            body: JSON.stringify({ link }),
            headers
        })
            .then(atualizaCorpo)
    }))
}

function carregaComentados() {
    abaAprovados.classList.remove('active');
    abaPendentes.classList.remove('active');
    abaComentados.classList.add('active');

    let corpoFinal = "";

    fetch(ambiente + '/topicos-comentados')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                corpoFinal += `
                    <div class="topico">
                        <div class="nome-topico">${extrairTopico(topico.link)}</div>
                        <button class="comentar-topico" data-link="${topico.link}">Comentar</button>
                    </div>
                `
            });

            corpo.innerHTML = corpoFinal;
            atualizaClickComentar();
        })
}

function carregaPendentes() {
    abaAprovados.classList.remove('active');
    abaComentados.classList.remove('active');
    abaPendentes.classList.add('active');

    let corpoFinal = "";

    fetch(ambiente + '/topicos-pendentes')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                corpoFinal += `
                    <div class="topico">
                        <div class="nome-topico">${extrairTopico(topico.link)}</div>
                        <button class="aprovar-topico" data-link="${topico.link}">Aprovar</button>
                        <button class="remover-topico" data-link="${topico.link}">Remover</button>
                    </div>
                `
            });

            corpo.innerHTML = corpoFinal;
            atualizaClickRemover();
            atualizaClickAprovar();
        })
}

function carregaAprovados() {
    abaPendentes.classList.remove('active');
    abaComentados.classList.remove('active');
    abaAprovados.classList.add('active');

    let corpoFinal = "";

    fetch(ambiente + '/topicos-aprovados')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                corpoFinal += `
                    <div class="topico">
                        <a class="nome-topico" href="${topico.link}" target="_blank">
                            ${extrairTopico(topico.link)}
                        </a>
                        <button class="comentar-topico" data-link="${topico.link}">Comentar</button>
                        <button class="remover-topico" data-link="${topico.link}">Remover</button>
                    </div>
                `
            });

            corpo.innerHTML = corpoFinal;
            atualizaClickComentar();
            atualizaClickRemover();
        })
}