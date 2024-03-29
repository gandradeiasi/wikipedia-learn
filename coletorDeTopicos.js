var nao_eh_home = !window.location.pathname.match(/\/wiki\/Wikip%C3%A9dia:P%C3%A1gina_principal/);
if (nao_eh_home) {
	window.location.hash = "#firstHeading";
	
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
                    && !link.href.includes('icheiro:')
                    && !link.href.includes('/wiki/S%C3%A9culo_')
                    && !link.href.match(/\w:\w/)
                    && !link.href.match(/wiki\/[0-9]+$/)
            ).map(x => x.href);


        fetch('http://localhost:3000/inserir-topicos-pendentes',
            {
                method: "post",
                body: JSON.stringify({ linksColetados }),
                headers: { "Content-Type": "application/json" }
            }
        )
    }, 1000)
}