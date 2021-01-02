const express = require('express'),
    bodyParser = require('body-parser'),
    TopicosCRUD = require('./classes/TopicosCRUD'),
    WikiLinkHelper = require('./classes/WikiLinkHelper');

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/inserir-topicos-pendentes', (req, res) => {
    const linksColetados = req.body.linksColetados
    let jsonFinal = TopicosCRUD.lerJson()

    linksColetados.forEach(link => {
        const linkNovo = jsonFinal.filter(x => x['link'] == link).length == 0;
        
        if (linkNovo) {
            jsonFinal.push({
                topico: WikiLinkHelper.extrairTopico(link),
                link,
                aprovado: false
            })
        }
    });

    TopicosCRUD.salvarJson(jsonFinal)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})