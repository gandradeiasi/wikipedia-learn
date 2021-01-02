module.exports = class WikiLinkHelper {
    static extrairTopico(link) {
        const topicoNaoFormatado = link.match(/wiki\/(.*)$/)[1]
        const topicoFormatado = decodeURI(
            topicoNaoFormatado
                .replace(/_/g, " ")
        )

        return topicoFormatado
    }
}