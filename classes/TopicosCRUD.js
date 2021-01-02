const fs = require('fs'),
    os = require('os')

const desktopDir = `${os.homedir()}/Desktop`;

module.exports = class TopicosCRUD {
    static salvarJson(json) {
        fs.writeFile(`${desktopDir}/topicos.json`, JSON.stringify(json), 'utf8', () => { })
    }
    
    static lerJson() {
        return JSON.parse(fs.readFileSync(`${desktopDir}/topicos.json`));
    }
}