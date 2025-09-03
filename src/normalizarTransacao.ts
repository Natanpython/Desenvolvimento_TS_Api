import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";

declare global {
  type TransacaoPagamento = 'Boleto' | 'Cartão de Crédito';
  type TransacaoStarus =
    | 'Paga'
    | 'Recusada pela operadora do cartão'
    | ' Aguardando pagamento'
    | 'Estornada';

  interface TransacaoAPI {
    Nome: string;
    ID: number;
    Status: TransacaoStarus;
    Data: string;
    Email: string;
    ['Valor (R$)']: string;
    ['Forma de Pagamento']: TransacaoPagamento;
    ['Cliente Novo']: number;
  }
  interface Transacao{
    nome: string;
    id: number;
    data: Date;
    status: TransacaoStarus;
    email:string;
    moeda:string;
    valor: number | null;
    pagamento: TransacaoPagamento;
    novo:boolean;
  }
}
export default function normalizerTransation(transacao: TransacaoAPI):Transacao {
  return {
    nome: transacao.Nome,
    id: transacao.ID,
    data: stringToDate(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda:transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"], 
    novo:Boolean(transacao["Cliente Novo"]),
  };
}
