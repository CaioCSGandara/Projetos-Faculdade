// FUNÇÕES PARA CADASTRO DE AERONAVE

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

  // Função que puxa o método HTTP PUT do backend 
  function fetchInserir(body) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/inserirAeronave', requestOptions)
    .then(response => response.json())
  }

  function inserirAeronave(){

    if(!selecionouFabricante()){
      showStatusMessageCadastrar("Selecione o fabricante...", true);  
      return;
    }

    if(!preencheuModelo()){
      showStatusMessageCadastrar("Preencha o modelo...", true);
      return;
    }

    if(!preencheuRegistro()){
      showStatusMessageCadastrar("Preencha o registro da aeronave...", true);
      return;
    }

    if(!anoValido()){
      showStatusMessageCadastrar("Ano deve ser de 1990 até 2026...", true);
      return;
    }

    if(!totalAssentosValido()){
      showStatusMessageCadastrar("Preencha corretamente o total de assentos.", true);
      return;
    }

    // Corrigido para obter o valor selecionado do combobox
    const fabricante = document.getElementById("comboFabricantesCadastrar").options[document.getElementById("comboFabricantesCadastrar").selectedIndex].value;
    const modelo = document.getElementById("modeloCadastrar").value;
    const anoFab = document.getElementById("anoFabCadastrar").value;
    const referencia = document.getElementById("referenciaCadastrar").value;
    const totalAssentos = document.getElementById("totalAssentosCadastrar").value;

    fetchInserir({
        fabricante: fabricante, 
        modelo: modelo, 
        totalAssentos: totalAssentos,
        anoFabricacao: anoFab,
        referencia: referencia 
    })
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        showStatusMessageCadastrar("Aeronave cadastrada... ", false);
      } else {
        showStatusMessageCadastrar("Erro ao cadastrar aeronave...: " + customResponse.message, true);
        console.log(customResponse.message);
      }
    })
    .catch((e)=>{
      showStatusMessageCadastrar("Erro técnico ao cadastrar... Contate o suporte.", true);
      console.log("Falha grave ao cadastrar." + e)
    });
  }

  

  function showStatusMessageCadastrar(msg, error){
    var pStatus = document.getElementById("status");
    if (error === true){
      pStatus.className = "statusError";
    } else {
      pStatus.className = "statusSuccess";
    }
    pStatus.textContent = msg;
  }




// FUNÇÕES PARA ALTERAÇÃO DE AERONAVE

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

  function fetchAlterar(body) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/alterarAeronave', requestOptions)
    .then(response => response.json())
  }

  function alterarAeronave(){

    if(!preencheuCodigoAlterar()){
      showStatusMessageAlterar("Preencha o código da aeronave...", true);
      return;
    }

    if(!selecionouFabricanteAlterar()){
      showStatusMessageAlterar("Selecione o fabricante...", true);  
      return;
    }

    if(!preencheuModeloAlterar()){
      showStatusMessageAlterar("Preencha o modelo...", true);
      return;
    }

    if(!preencheuRegistroAlterar()){
      showStatusMessageAlterar("Preencha o registro da aeronave...", true);
      return;
    }

    if(!anoValidoAlterar()){
      showStatusMessageAlterar("Ano deve ser de 1990 até 2026...", true);
      return;
    }

    if(!totalAssentosValidoAlterar()){
      showStatusMessageAlterar("Preencha corretamente o total de assentos.", true);
      return;
    }

    // Corrigido para obter o valor selecionado do combobox
    const fabricante = document.getElementById("comboFabricantesAlterar").options[document.getElementById("comboFabricantesAlterar").selectedIndex].value;
    const modelo = document.getElementById("modeloAlterar").value;
    const anoFab = document.getElementById("anoFabAlterar").value;
    const referencia = document.getElementById("referenciaAlterar").value;
    const totalAssentos = document.getElementById("totalAssentosAlterar").value;
    const codigo = document.getElementById("codigoAlterar").value; 

    fetchAlterar({
        fabricante: fabricante, 
        modelo: modelo, 
        totalAssentos: totalAssentos,
        anoFabricacao: anoFab,
        referencia: referencia,
        codigo: codigo
    })
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        showStatusMessageAlterar("Aeronave alterada... ", false);
      } else {
        showStatusMessageAlterar("Erro ao alterar aeronave...: " + customResponse.message, true);
        console.log(customResponse.message);
      }
    })
    .catch((e)=>{
      showStatusMessageAlterar("Erro técnico ao cadastrar... Contate o suporte.", true);
      console.log("Falha grave ao cadastrar." + e)
    });
  }

  function showStatusMessageAlterar(msg, error){
    var pStatus = document.getElementById("statusAlterar");
    if (error === true){
      pStatus.className = "statusError";
    } else {
      pStatus.className = "statusSuccess";
    }
    pStatus.textContent = msg;
  }


  function botaoAlterar() {
    var divCadastrar = document.getElementById('divCadastrar');
    var divAlterar = document.getElementById('divAlterar');
  
    if (divCadastrar.style.display != 'none') {
      // Se a primeira div estiver visível, oculte-a e mostre a segunda div
      divCadastrar.style.display = 'none';
      divAlterar.style.display = 'block';
    } 
}

function botaoCancelar() {
    var divCadastrar = document.getElementById('divCadastrar');
    var divAlterar = document.getElementById('divAlterar');

    if(divAlterar.style.display != 'none') {
        divCadastrar.style.display = 'block';
        divAlterar.style.display = 'none';
    }
}

function limparStatus() {
  const stsCadastrar = document.getElementById('status');
  const stsAlterar = document.getElementById('statusAlterar');

  stsCadastrar.textContent = '';
  stsAlterar.textContent = '';
}
  
function preencherSelectAeronaves(options) {
  const aeroSelect = document.getElementById('selectAeronave');
  options.forEach(optionValue => {
    console.log("Código Aeronave: " + JSON.stringify(optionValue));
    const option = document.createElement('option');
    option.value = optionValue.codigo;  // Definindo o valor corretamente
    option.innerHTML = optionValue.codigo;  // Definindo o texto do option
    aeroSelect.appendChild(option);
  });
}

function exibirAeronave() {
  console.log('Entrou no exibir...');
  RequisiçãoGETaeronave()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectAeronaves(customResponse.payload); 
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}