function filterValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
    }
    setTotal() {
        return this.transacoes.filter(filterValor).reduce((acc, item) => {
            return acc + item.valor;
        }, 0);
    }
}
//# sourceMappingURL=Estatisticas.js.map