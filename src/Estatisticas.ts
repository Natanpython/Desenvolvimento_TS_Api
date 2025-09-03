type TransacaoValor = Transacao & { valor: number };
function filterValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  total;
  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
  }
  private setTotal() {
    return this.transacoes.filter(filterValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }
}
