import Estatisticas from './Estatisticas.js';
import fetchDaa from './fethData.js';
import normalizerTransation from './normalizarTransacao.js';
import { CountList } from './countBy.js';

async function handleData() {
  const data = await fetchDaa<TransacaoAPI[]>(
    'https://api.origamid.dev/json/transacoes.json?',
  );
  if (!data) return;
  const transacoes = data.map(normalizerTransation);
  preencherTabela(transacoes);
  preencherEstatistica(transacoes);
}

function preencherLista(lista: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);
  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

function preencherEstatistica(transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes);
  preencherLista(data.pagamento, 'pagamento');
  preencherLista(data.status, 'status');

  const total = document.querySelector<HTMLElement>('#total span');
  if (total) {
    total.innerText = data.total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  const diaElement = document.querySelector<HTMLElement>('#dia span');
  if (diaElement) {
    diaElement.innerText = data.melhorDia[0];
  }
}

function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.getElementById('transacoes');
  if (!tabela) return;
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
