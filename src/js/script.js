const abaAprovados = document.querySelector('#aba_aprovados');
const abaPendentes = document.querySelector('#aba_pendentes');
const corpo = document.querySelector('#corpo');
const ambiente = 'http://localhost:3000';
const headers = { "Content-Type": "application/json" }

let botoesRemover;
let botoesAprovar;

atualizaCorpo();

abaAprovados.addEventListener('click', carregaAprovados)
abaPendentes.addEventListener('click', carregaPendentes)

document.addEventListener('keydown', e => {
    if (e.key == "-") {
        botoesRemover[0].click();
    }
    else if (e.key == "+") {
        botoesAprovar[0].click();
    }
})


function atualizaCorpo() {
    if (abaAprovados.classList.contains('active'))
        carregaAprovados();
    else
        carregaPendentes();
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

function carregaPendentes() {
    abaAprovados.classList.remove('active');
    abaPendentes.classList.add('active');

    let corpoFinal = "";

    fetch(ambiente + '/topicos-pendentes')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                corpoFinal += `
                    <div class="topico-reprovado">
                        ${topico.topico}
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
    abaAprovados.classList.add('active');

    let corpoFinal = "";

    fetch(ambiente + '/topicos-aprovados')
        .then(x => x.json())
        .then(x => {
            x.forEach(topico => {
                corpoFinal += `
                    <div class="topico-aprovado">
                        <a href="${topico.link}" target="_blank">
                            ${topico.topico}
                        </a>
                        <button class="remover-topico" data-link="${topico.link}">Remover</button>
                    </div>
                `
            });

            corpo.innerHTML = corpoFinal;
            atualizaClickRemover();
        })
}