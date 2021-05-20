function atualizaCorpo() {
    if (abaAprovados.classList.contains('active'))
        carregaAprovados();
    else if (abaPendentes.classList.contains('active'))
        carregaPendentes();
    else if (abaRevisao.classList.contains('active'))
        carregaRevisao();
}

function keydown(tecla, acao) {
    document.addEventListener('keydown', e => {
        if (e.key == tecla && podeAgir) {
            acao();
            configuraDelayAcao();
        }
    })
}

function configuraDelayAcao() {
    podeAgir = false;

    setTimeout(() => {
        const topico = document.querySelector(seletorTopico);
        topico?.classList.add('bloqueado');
        setTimeout(() => {
            podeAgir = true
            topico?.classList.remove('bloqueado');
        }, delayEntreAcoes);
    }, delayAtualizacao)

}

function extrairTopico(link) {
    const topicoNaoFormatado = link.match(/wiki\/(.*)$/)[1]
    const topicoFormatado = decodeURI(
        topicoNaoFormatado
            .replace(/_/g, " ")
    )
        .replace(/%26/g, '&')
        .replace(/%2B/g, '+')

    return topicoFormatado
}

function abrirModalComentario(link) {
    modalComentario.classList.add('active');

    fetch(ambiente + '/topico-por-link?link=' + link)
        .then(x => x.json())
        .then(x => {
            const comentarioString = x.comentario ? x.comentario : '';
            comentario.value = comentarioString;
            comentario.dataset.comentarioOriginal = comentarioString;
        })

    cancelarComentario.dataset.link = link;

    salvarComentario.dataset.link = link;
    salvarComentario.style.display = "none";

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

        console.log(link);
    }))
}

function atualizaClickComentar() {
    botoesComentar = document.querySelectorAll('.comentar-topico');

    botoesComentar.forEach(x => x.addEventListener('click', () => {
        const link = x.dataset.link;

        abrirModalComentario(link);
    }))
}

function atualizaClickRevisado() {
    botoesRevisao = document.querySelectorAll('.revisado-topico');

    botoesRevisao.forEach(x => x.addEventListener('click', () => {
        const link = x.dataset.link;

        fetch(ambiente + '/revisado-topico', {
            method: 'post',
            body: JSON.stringify({ link }),
            headers
        })
            .then(atualizaCorpo)
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
    ativaAba(abaComentados)

    let corpoFinal = "";

    fetch(ambiente + '/topicos-comentados')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                corpoFinal += `
                    <div class="topico">
                        <a class="nome-topico" href="${topico.link}" target="_blank">
                            ${extrairTopico(topico.link)}
                        </a>
                        <button class="comentar-topico" data-link="${topico.link}">Comentar</button>
                    </div>
                `
            });

            corpo.innerHTML = corpoFinal;
            atualizaClickComentar();
        })
}

function carregaPendentes() {
    ativaAba(abaPendentes)

    let corpoFinal = "";

    fetch(ambiente + '/topicos-pendentes?quantia=1')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                if (topico) {
                    corpoFinal += `
                    <div class="topico">
                        <a class="nome-topico" href="${topico.link}" target="_blank">
                            ${extrairTopico(topico.link)}
                        </a>
                        <button class="aprovar-topico" data-link="${topico.link}">Aprovar</button>
                        <button class="remover-topico" data-link="${topico.link}">Remover</button>
                    </div>
                `
                }
            });

            corpo.innerHTML = corpoFinal;
            atualizaClickRemover();
            atualizaClickAprovar();
        })
}

function carregaRevisao() {
    ativaAba(abaRevisao)

    let corpoFinal = "";

    fetch(ambiente + '/topicos-revisao')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                corpoFinal += `
                    <div class="topico">
                        <a class="nome-topico" href="${topico.link}" target="_blank">
                            ${extrairTopico(topico.link)}
                        </a>
                        <button class="comentar-topico" data-link="${topico.link}">Comentar</button>
                        <button class="revisado-topico" data-link="${topico.link}">Revisado</button>
                    </div>
                `
            });

            corpo.innerHTML = corpoFinal;
            atualizaClickComentar();
            atualizaClickRevisado();
        })
}

function carregaAprovados() {
    ativaAba(abaAprovados)

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

function ativaAba(aba) {
    document.querySelectorAll('.aba').forEach(x => {
        if (x == aba) x.classList.add('active')
        else x.classList.remove('active')
    })
}