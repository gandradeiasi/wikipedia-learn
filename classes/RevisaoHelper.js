const DateHelper = require('./DateHelper')

module.exports = class RevisaoHelper {
    static precisaDeRevisao(dataComentario, diasRevisao) {
        const dataAtualString = DateHelper.converteEmString(new Date())
        const dataComentarioString = DateHelper.converteEmString(dataComentario)

        return DateHelper.diferencaDias(dataAtualString, dataComentarioString) >= diasRevisao
    }

    static proximoDiasDeRevisao(dias) {
        switch (dias) {
            case 1:
                return 7
            case 7:
                return 30
            case 30:
                return 365
            case 360:
                return 36500
        }

    }
}