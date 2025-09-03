import Estatisticas from './Estatisticas.js';
import fetchDaa from './fethData.js';
import normalizerTransation from './normalizarTransacao.js';
async function handleData() {
    const data = await fetchDaa('https://api.origamid.dev/json/transacoes.json?');
    if (!data)
        return;
    const transacoes = data.map(normalizerTransation);
    preencherTabela(transacoes);
    preencherEstatistica(transacoes);
}
function preencherLista(lista, containerId) {
    const containerElement = document.getElementById(containerId);
    if (containerElement) {
        Object.keys(lista).forEach((key) => {
            containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
        });
    }
}
function preencherEstatistica(transacoes) {
    const data = new Estatisticas(transacoes);
    preencherLista(data.pagamento, 'pagamento');
    preencherLista(data.status, 'status');
    const total = document.querySelector('#total span');
    if (total) {
        total.innerText = data.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
    const diaElement = document.querySelector('#dia span');
    if (diaElement) {
        diaElement.innerText = data.melhorDia[0];
    }
}
function preencherTabela(transacoes) {
    const tabela = document.getElementById('transacoes');
    if (!tabela)
        return;
    transacoes.forEach((transacao) => {
        tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>R$ ${transacao.moeda}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>
      `;
    });
}
handleData();
//# sourceMappingURL=script.js.map