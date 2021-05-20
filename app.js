const express = require('express'),
    TopicosCRUD = require('./classes/TopicosCRUD'),
    RevisaoHelper = require("./classes/RevisaoHelper")
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors());

app.set('view engine', 'pug')
app.use(require('body-parser').json())
app.use('/src', express.static(__dirname + '/src'))

app.post('/inserir-topicos-pendentes', (req, res) => {
    const linksColetados = req.body.linksColetados
    let jsonFinal = TopicosCRUD.lerJson()

    linksColetados.forEach(link => {
        const linkNovo = !jsonFinal.find(topico => topico.link == link);

        if (linkNovo) {
            jsonFinal.push({ link })
        }
    });

    TopicosCRUD.salvarJson(jsonFinal)

    res.send()
})

app.post('/inserir-topicos-aprovados', (req, res) => {
    const links = req.body.links
    let jsonFinal = TopicosCRUD.lerJson()

    links.forEach(link => {
        const linkNovo = jsonFinal.filter(x => x['link'] == link).length == 0;

        if (linkNovo) {
            jsonFinal.push({
                link,
                aprovado: true
            })
        }
    });

    TopicosCRUD.salvarJson(jsonFinal)

    res.send()
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/topico-por-link', (req, res) => {
    const link = encodeURI(req.query.link)
    const topico = TopicosCRUD.lerJson().filter(x => x['link'] == link)[0]
    res.send(topico)
})

app.get('/topicos-pendentes', (req, res) => {
    const quantia = req.query.quantia
    const json = TopicosCRUD.lerJson().filter(x => !x['removido'] && !x['aprovado'])
    if (quantia) {
        let retorno = []
        for (let i = 0; i < quantia; i++) {
            if (i <= json.length)
                retorno.push(json[i])
            else
                break
        }
        res.send(retorno)
    }
    else
        res.send(TopicosCRUD.lerJson().filter(x => !x['removido'] && !x['aprovado']))
})

app.get('/topicos-comentados', (req, res) => {
    res.send(TopicosCRUD.lerJson().filter(x =>
        x['comentario'] &&
        !RevisaoHelper.precisaDeRevisao(new Date(x['data_comentario']), x['dias_para_revisao'])
    ))
})

app.get('/topicos-revisao', (req, res) => {
    res.send(TopicosCRUD.lerJson().filter(x =>
        x['comentario'] &&
        RevisaoHelper.precisaDeRevisao(new Date(x['data_comentario']), x['dias_para_revisao'])
    ))
})

app.get('/topicos-aprovados', (req, res) => {
    res.send(TopicosCRUD.lerJson().filter(x => !x['removido'] && x['aprovado'] == true && !x['comentario']))
})

app.delete('/remover-topico', (req, res) => {
    const link = req.body.link;

    let json = TopicosCRUD.lerJson();

    for (let i = 0; i < json.length; i++) {
        if (json[i]['link'] == link) {
            json[i]['removido'] = true
            break
        }
    }

    TopicosCRUD.salvarJson(json)

    res.send()
})

app.post('/aprovar-topico', (req, res) => {
    const link = req.body.link;

    let json = TopicosCRUD.lerJson();

    for (let i = 0; i < json.length; i++) {
        if (json[i]['link'] == link) {
            json[i]['aprovado'] = true
            break
        }
    }

    TopicosCRUD.salvarJson(json)

    res.send()
})

app.post('/comentar-topico', (req, res) => {
    const comentario = req.body.comentario;
    const link = req.body.link;

    let json = TopicosCRUD.lerJson();

    for (let i = 0; i < json.length; i++) {
        if (json[i]['link'] == link) {
            json[i]['comentario'] = comentario
            json[i]['data_comentario'] = new Date().toDateString()
            json[i]['dias_para_revisao'] = 1
        }
    }

    TopicosCRUD.salvarJson(json)

    res.send()
})

app.post('/revisado-topico', (req, res) => {
    const link = req.body.link;

    let json = TopicosCRUD.lerJson();

    for (let i = 0; i < json.length; i++) {
        if (json[i]['link'] == link) {
            json[i]['dias_para_revisao'] = RevisaoHelper.proximoDiasDeRevisao(json[i]['dias_para_revisao'])
            json[i]['data_comentario'] = new Date().toDateString()
            break
        }
    }

    TopicosCRUD.salvarJson(json)

    res.send()
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
