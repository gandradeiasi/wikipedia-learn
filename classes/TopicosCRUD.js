const fs = require('fs'),
    os = require('os')

const pathJson = `${os.homedir()}/Desktop/topicos.json`

module.exports = class TopicosCRUD {
    static salvarJson(json) {
        fs.writeFile(pathJson, JSON.stringify(json), 'utf8', () => { })
    }

    static lerJson() {
        const arquivo_ja_existe = fs.existsSync(pathJson);
        if (arquivo_ja_existe) {
            const json_string_lido = fs.readFileSync(pathJson);
            return JSON.parse(json_string_lido);
        }
        return [];
    }
}