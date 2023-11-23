//arquivo auxiliar para organizaçao dos validadores

//Aeronave.js: 

//CADASTRAR

function anoValido(){
    let resultado = false;
    var strAno = document.getElementById("anoFabCadastrar").value;
    const ano = parseInt(strAno);
    console.log("Ano aeronave: " + ano.toString());
    if (ano >= 1990 && ano <= 2026){
      resultado = true;
    }
    return resultado; 
  }

  function totalAssentosValido(){
    let resultado = false;
    const strAssentos = document.getElementById("totalAssentosCadastrar").value;
    const assentos = parseInt(strAssentos);
    if (assentos > 0){
      resultado = true;
    }
    return resultado; 
  }

  function selecionouFabricante(){
    let resultado = false; 
    var listaFabricantes = document.getElementById("comboFabricantesCadastrar");
    var valorSelecionado = listaFabricantes.value;
    if (valorSelecionado !== "0"){
      resultado = true;
    }
    return resultado;
  }

  function preencheuModelo(){
    let resultado = false;
    const modeloInformado = document.getElementById("modeloCadastrar").value;
    if(modeloInformado.length > 0){
      resultado = true;
    }
    return resultado;
  }

  function preencheuRegistro(){
    let resultado = false;
    const registroReferencia = document.getElementById("referenciaCadastrar").value;
    if(registroReferencia.length > 0){
      resultado = true;
    }
    return resultado;
  }

//ALTERAR

function preencheuCodigoAlterar(){
    let resultado = false;
    var strCodigo = document.getElementById("codigoAlterar").value;
    const codigo = parseInt(strCodigo);
    console.log("Código aeronave: " + codigo.toString());
    if (codigo > 0){
      resultado = true;
    }
    return resultado;
}

function anoValidoAlterar(){
    let resultado = false;
    var strAno = document.getElementById("anoFabAlterar").value;
    const ano = parseInt(strAno);
    console.log("Ano aeronave: " + ano.toString());
    if (ano >= 1990 && ano <= 2026){
      resultado = true;
    }
    return resultado; 
  }

  function totalAssentosValidoAlterar(){
    let resultado = false;
    const strAssentos = document.getElementById("totalAssentosAlterar").value;
    const assentos = parseInt(strAssentos);
    if (assentos > 0){
      resultado = true;
    }
    return resultado; 
  }

  function selecionouFabricanteAlterar(){
    let resultado = false; 
    var listaFabricantes = document.getElementById("comboFabricantesAlterar");
    var valorSelecionado = listaFabricantes.value;
    if (valorSelecionado !== "0"){
      resultado = true;
    }
    return resultado;
  }

  function preencheuModeloAlterar(){
    let resultado = false;
    const modeloInformado = document.getElementById("modeloAlterar").value;
    if(modeloInformado.length > 0){
      resultado = true;
    }
    return resultado;
  }

  function preencheuRegistroAlterar(){
    let resultado = false;
    const registroReferencia = document.getElementById("referenciaAlterar").value;
    if(registroReferencia.length > 0){
      resultado = true;
    }
    return resultado;
  }








//Aeroporto.js

// CADASTRAR

function nomePreenchido(){
  const nome = document.getElementById("nomeCadastrar").value.trim();
  return nome.length > 0;
}

function siglaPreenchida(){
  const sigla = document.getElementById("siglaCadastrar").value.trim();
  return sigla.length > 0;
}

function cidadePreenchida() {
  const cidade = document.getElementById("cidadeCadastrar").value.trim();
  return cidade.length > 0;
}

//ALTERAR

function preencheuCodigoAlterar(){
  let resultado = false;
  var strCodigo = document.getElementById("codigoAlterar").value;
  const codigo = parseInt(strCodigo);
  console.log("Código aeronave: " + codigo.toString());
  if (codigo > 0){
    resultado = true;
  }
  return resultado;
}

function nomePreenchidoAlter(){
  const nome = document.getElementById("nomeAlterar").value.trim();
  return nome.length > 0;
}

function siglaPreenchidaAlter(){
  const sigla = document.getElementById("siglaAlterar").value.trim();
  return sigla.length > 0;
}









//Cidade.js

//CADASTRAR

function nomePreenchido() {
  let resultado = false;
  const nome = document.getElementById("nome").value;
  if(nome.length>0) {
      resultado = true;
  }
  return resultado;
}

function paisPreenchido() {
  let resultado = false;
  const pais = document.getElementById("pais").value;
  if(pais.length > 0){
      resultado = true;
  }
  return resultado;
}

function ufValida(){
  let resultado = false; 
  var listaEstados = document.getElementById("uf");
  var valorSelecionado = listaEstados.value;
  if (valorSelecionado !== "0"){
    resultado = true;
  }
  return resultado;
}


//ALTERAR

function codigoPreenchidoAlter() {
  const codigo = document.getElementById("codigoCidade").value;
  return codigo.length > 0;
}

function nomePreenchidoAlter() {
  let resultado = false;
  const nome = document.getElementById("nomeCidade").value;
  if(nome.length>0) {
      resultado = true;
  }
  return resultado;
}


function paisPreenchidoAlter() {
  let resultado = false;
  const pais = document.getElementById("paisCidade").value;
  if(pais.length > 0){
      resultado = true;
  }
  return resultado;
}

function ufValidaAlter(){
  let resultado = false; 
  var listaEstados = document.getElementById("ufCidade");
  var valorSelecionado = listaEstados.value;
  if (valorSelecionado !== "0"){
    resultado = true;
  }
  return resultado;
}


//Trecho.js

//CADASTRAR

function nomePreenchidoCad(){
  const nome = document.getElementById("nomeCad").value.trim();
  return nome.length > 0;
}

function origemPreenchidaCad() {
  const origem = document.getElementById("selectOrigemAeroportoCad").value.trim();
  return origem.length > 0;
}

function destinoPreenchidoCad() {
  const destino = document.getElementById("selectDestinoAeroportoCad").value.trim();
  return destino.length > 0;
}

function aeronavePreenchidaCad() {
  const aeronave = document.getElementById("selectAeronaveCad").value.trim();
  return aeronave.length > 0;
}

//ALTERAR

function codigoPreenchidoAlt(){
  const codigo = document.getElementById("codAlt").value;
  return codigo.length > 0;
}

function nomePreenchidoAlt(){
  const nome = document.getElementById("nomeAlt").value.trim();
  return nome.length > 0;
}

function origemPreenchidaAlt() {
  const cidade = document.getElementById("selectOrigemAeroportoAlt").value.trim();
  return cidade.length > 0;
}

function destinoPreenchidoAlt() {
  const cidade = document.getElementById("selectDestinoAeroportoAlt").value.trim();
  return cidade.length > 0;
}

function aeronavePreenchidaAlt() {
  const aeronave = document.getElementById("selectAeronaveAlt").value.trim();
  return aeronave.length > 0;
}

//Voo.js

//CADASTRAR

function codigoValidoCad() {
  let resultado = false;
  var strCodigo = document.getElementById("codigoCadastrar").value;
  const codigo = parseInt(strCodigo);

  if (!isNaN(codigo) && codigo > 0) {
      resultado = true;
  }
  return resultado;
}


function valorValidoCad() {
  let resultado = false;
  var strValor = document.getElementById("valorCadastrar").value;
  const valor = parseInt(strValor);

  if (!isNaN(valor) && valor > 0) {
      resultado = true;
  }
  return resultado;
}

function trechoValidoCad(){
  let resultado = false; 
  var listaTrechos = document.getElementById("trechoCadastrar");
  var valorSelecionado = listaTrechos.value;
  if (valorSelecionado !== "0"){
    resultado = true;
  }
  return resultado;
}

function saidaValidaCad(){
  let resultado = false; 
  const hrSaida = document.getElementById("hrSaidaCadastrar").value;
  if (hrSaida.length > 0){
    resultado = true;
  }
  return resultado;
}

function chegadaValidaCad(){
  let resultado = false; 
  const hrChegada = document.getElementById("hrChegadaCadastrar").value;
  if (hrChegada.length > 0){
    resultado = true;
  }
  return resultado;
}

function dataValidaCad(){
  let resultado = false; 
  const data = document.getElementById("dataCadastrar").value;
  if (data.length > 0){
    resultado = true;
  }
  return resultado;
}

//ALTERAR

function codigoValidoAlt() {
  let resultado = false;
  var strCodigo = document.getElementById("codigoAlterar").value;
  const codigo = parseInt(strCodigo);

  if (!isNaN(codigo) && codigo > 0) {
      resultado = true;
  }
  return resultado;
}


function valorValidoAlt() {
  let resultado = false;
  var strValor = document.getElementById("valorAlterar").value;
  const valor = parseInt(strValor);

  if (!isNaN(valor) && valor > 0) {
      resultado = true;
  }
  return resultado;
}

function trechoValidoAlt(){
  let resultado = false; 
  var listaTrechos = document.getElementById("trechoAlterar");
  var valorSelecionado = listaTrechos.value;
  if (valorSelecionado !== "0"){
    resultado = true;
  }
  return resultado;
}

function saidaValidaAlt(){
  let resultado = false; 
  const hrSaida = document.getElementById("hrSaidaAlterar").value;
  if (hrSaida.length > 0){
    resultado = true;
  }
  return resultado;
}

function chegadaValidaAlt(){
  let resultado = false; 
  const hrChegada = document.getElementById("hrChegadaAlterar").value;
  if (hrChegada.length > 0){
    resultado = true;
  }
  return resultado;
}

function dataValidaAlt(){
  let resultado = false; 
  const data = document.getElementById("dataAlterar").value;
  if (data.length > 0){
    resultado = true;
  }
  return resultado;
}