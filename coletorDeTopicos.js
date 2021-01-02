setTimeout(() => {
    document.querySelectorAll('table')
        .forEach(x => x.remove());

    var corpoDoArtigo = document.querySelector("#mw-content-text");
    var linksColetados = [...corpoDoArtigo.querySelectorAll('a')]
        .filter(link => link.children.length == 0)
        .filter(
            link => link.href.includes('/wiki/')
                && !link.href.includes('commons.')
                && !link.href.includes('(desamb')
                && !link.href.includes('#')
                && !link.href.match(/\w:\w/)
        ).map(x => x.href);

    fetch('http://localhost:3000/inserir-topicos-pendentes',
        {
            method: "post",
            body: JSON.stringify({ linksColetados }),
            headers: { "Content-Type": "application/json" }
        }
    )
}, 1000)

