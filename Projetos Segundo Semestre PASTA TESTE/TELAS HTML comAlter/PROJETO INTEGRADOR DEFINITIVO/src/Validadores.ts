import { Aeronave, Aeroporto, Assento, Cidade, Trecho, Voo } from "./Campos";

// neste arquivo colocaremos TODAS as funções de validação para todo tipo de objeto. 

// diferentemente de outras linguagens, podemos fazer uma função
// que possa retornar ou um booleano, ou uma string ou um tipo não definido.
// para que isso? se retornar TRUE no final significa que deu tudo certo. 
// se retornar uma string será o código de erro. 

//Validação de aeronaves
export function aeronaveValida(aero: Aeronave) {

  let valida = false;
  let mensagem = "";

  if(aero.fabricante === undefined){
    mensagem = "Fabricante não informado";
  }

  if(aero.fabricante !== 'Embraer' && aero.fabricante !== 'Airbus' && aero.fabricante !== 'Boeing'){
    mensagem = "Fabricante deve ser: Embraer, Airbus ou Boeing.";
  }

  if(aero.modelo === undefined){
    mensagem = "Modelo não informado.";
  }

  if(aero.totalAssentos === undefined){
    mensagem = "Total de assentos não informado";
  }

  if((aero.totalAssentos !== undefined) && (aero.totalAssentos < 100 || aero.totalAssentos > 1000)){
    mensagem = "Total de assentos é inválido";
  }

  if(aero.anoFabricacao === undefined){
    mensagem = "Ano de fabricação não informado";
  }

  if((aero.anoFabricacao!== undefined) && (aero.anoFabricacao < 1990 || aero.anoFabricacao > 2026)){
    mensagem = "Ano de fabricação deve ser entre 1990 e 2026";
  }

  if(aero.referencia === undefined){
    mensagem = "Referência da aeronave não fornecida.";
  }

  // se passou em toda a validação.
  if(mensagem === ""){
    valida = true;
  }

  return [valida, mensagem] as const;
}

//validação de aeroportos
export function aeroportoValida(aeroporto: Aeroporto) {

  let valida = false;
  let mensagem = "";

  if (aeroporto.codigo === undefined){
    mensagem = "Código não informado";
  }

  if(aeroporto.nome === undefined){
    mensagem = "Nome não informado";
  }

  if(aeroporto.sigla === undefined){
    mensagem = "Sigla não informada.";
  }

  if(aeroporto.cidade === undefined){
    mensagem = "Cidade não informada.";
  }
  // se passou em toda a validação.
  if(mensagem === ""){
    valida = true;
  }

  return [valida, mensagem] as const;
}

//Validação de trechos
export function trechoValida(trecho: Trecho) {

  let valida = false;
  let mensagem = "";

  if (trecho.codigo === undefined){
    mensagem = "Código do trecho não informado";
  }

  if(trecho.nome === undefined){
    mensagem = "Nome do trecho não informado";
  }


  if(trecho.origem === undefined){
    mensagem = "Origem do trecho não informada.";
  }

  if(trecho.destino === undefined){
    mensagem = "Destino do trecho não informada.";
  }

  if(trecho.aeronave === undefined){
    mensagem = "Aeronave do trecho não informada.";
  }

  // se passou em toda a validação.
  if(mensagem === ""){
    valida = true;
  }

  return [valida, mensagem] as const;
}

//Validação de voos
export function vooValida(voo: Voo) {

  let valida = false;
  let mensagem = "";

  if (voo.codigo === undefined){
    mensagem = "Código do voo não informado";
  }

  if(voo.dataVoo === undefined){
    mensagem = "Data do voo não informada";
  }

  if(voo.hrChegada === undefined){
    mensagem = "Hora da chegada do voo não informada.";
  }

  if(voo.hrSaida === undefined){
    mensagem = "Hora da saida do voo não informada.";
  }

  if(voo.valor === undefined){
    mensagem = "Valor do voo não informado.";
  }

  if (voo.trecho === undefined){
    mensagem = "Trecho do voo não informado";
  }

  // se passou em toda a validação.
  if(mensagem === ""){
    valida = true;
  }

  return [valida, mensagem] as const;
}

//Validação de assentos
export function assentoValida(assento: Assento) {
  let valida = false;
  let mensagem = "";

  if (assento.codigo !== undefined) {
    mensagem = "O codigo do assento não foi informado."
  }
  
  if (assento.aeronave === undefined) {
    mensagem = "Aeronave não informada para o assento";
  }

  if (assento.voo === undefined) {
    mensagem = "Voo não informado para o assento";
  }

  if(mensagem === ""){
    valida = true;
  }

  return [valida, mensagem] as const;
}

//Validação de cidades
export function cidadeValida(cidade: Cidade) {
  let valida = false;
  let mensagem = "";

  if (cidade.nome === undefined) {
    mensagem = "Nome da cidade não informado";
  }

  if (cidade.uf === undefined) {
    mensagem = "UF da cidade não informada";
  } else if (cidade.uf.length !== 2) {
    mensagem = "UF deve conter exatamente 2 letras";
  }

  if (cidade.pais === undefined) {
    mensagem = "País da cidade não informado";
  }

  if(mensagem === ""){
    valida = true;
  }

  return [valida, mensagem] as const;
}