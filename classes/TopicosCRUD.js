const fs = require('fs'),
    os = require('os')

const pathJson = `${os.homedir()}/Desktop/topicos.json`

module.exports = class TopicosCRUD {
    static salvarJson(json) {
        fs.writeFile(pathJson, JSON.stringify(json), 'utf8', () => { })
    }
    
    static lerJson() {
        if (fs.existsSync(pathJson)) {
            return JSON.parse(fs.readFileSync(pathJson));
        }
        else return [];
    }
}