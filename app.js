const express = require('express'),
    TopicosCRUD = require('./classes/TopicosCRUD'),
    WikiLinkHelper = require('./classes/WikiLinkHelper');

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(require('body-parser').json())
app.use('/src', express.static(__dirname + '/src'))

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

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/topicos-pendentes', (req, res) => {
    res.send(TopicosCRUD.lerJson().filter(x => x['aprovado'] == false))
})

app.get('/topicos-aprovados', (req, res) => {
    res.send(TopicosCRUD.lerJson().filter(x => x['aprovado'] == true))
})

app.delete('/remover-topico', (req, res) => {
    const link = req.body.link;

    const jsonAnterior = TopicosCRUD.lerJson();

    TopicosCRUD.salvarJson(jsonAnterior.filter(x => x['link'] != link))

    res.send()
})

app.post('/aprovar-topico', (req, res) => {
    const link = req.body.link;

    let json = TopicosCRUD.lerJson();

    for (let i = 0; i < json.length; i++) {
        if (json[i]['link'] == link) {
            json[i]['aprovado'] = true
            console.log(json[i])
            break
        }
    }

    TopicosCRUD.salvarJson(json)

    res.send()
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})