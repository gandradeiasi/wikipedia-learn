module.exports = class DateHelper {
    static diferencaDias(dia1String, dia2String) {
        const dia1 = new Date(dia1String)
        const dia2 = new Date(dia2String)

        const diffTime = Math.abs(dia1.getDate() - dia2.getDate());

        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    static converteEmString(date) {
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();

        return mm + "/" + dd + "/" + yyyy
    }
}