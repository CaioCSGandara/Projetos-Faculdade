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

  async function inserirAeronave(){

    if(!selecionouFabricante()){
      showStatusMessage("Selecione o fabricante...", true, "statusCadastrar");  
      return;
    }

    if(!preencheuModelo()){
      showStatusMessage("Preencha o modelo...", true, "statusCadastrar");
      return;
    }

    if(!preencheuRegistro()){
      showStatusMessage("Preencha o registro da aeronave...", true, "statusCadastrar");
      return;
    }

    if(!anoValido()){
      showStatusMessage("Ano deve ser de 1990 até 2026...", true, "statusCadastrar");
      return;
    }

    if(!totalAssentosValido()){
      showStatusMessage("Preencha corretamente o total de assentos.", true, "statusCadastrar");
      return;
    }

    // Corrigido para obter o valor selecionado do combobox
    const fabricante = document.getElementById("comboFabricantesCadastrar").options[document.getElementById("comboFabricantesCadastrar").selectedIndex].value;
    const modelo = document.getElementById("modeloCadastrar").value;
    const anoFab = document.getElementById("anoFabCadastrar").value;
    const referencia = document.getElementById("referenciaCadastrar").value;
    const totalAssentos = document.getElementById("totalAssentosCadastrar").value;

    await fetchInserir({
        fabricante: fabricante, 
        modelo: modelo, 
        totalAssentos: totalAssentos,
        anoFabricacao: anoFab,
        referencia: referencia 
    })
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        showStatusMessage("Aeronave cadastrada... ", false, "statusCadastrar");
        exibirAeronave();
      } else {
        showStatusMessage("Erro ao cadastrar aeronave...: " + customResponse.message, true, "statusCadastrar");
        console.log(customResponse.message);
      }
    })
    .catch((e)=>{
      showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true, "statusCadastrar");
      console.log("Falha grave ao cadastrar." + e)
    });
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

  async function alterarAeronave(){

    if(!preencheuCodigoAlterar()){
      showStatusMessage("Preencha o código da aeronave...", true, "statusAlterar");
      return;
    }

    if(!selecionouFabricanteAlterar()){
      showStatusMessage("Selecione o fabricante...", true, "statusAlterar");  
      return;
    }

    if(!preencheuModeloAlterar()){
      showStatusMessage("Preencha o modelo...", true, "statusAlterar");
      return;
    }

    if(!preencheuRegistroAlterar()){
      showStatusMessage("Preencha o registro da aeronave...", true, "statusAlterar");
      return;
    }

    if(!anoValidoAlterar()){
      showStatusMessage("Ano deve ser de 1990 até 2026...", true, "statusAlterar");
      return;
    }

    if(!totalAssentosValidoAlterar()){
      showStatusMessage("Preencha corretamente o total de assentos.", true, "statusAlterar");
      return;
    }

    // Corrigido para obter o valor selecionado do combobox
    const fabricante = document.getElementById("comboFabricantesAlterar").options[document.getElementById("comboFabricantesAlterar").selectedIndex].value;
    const modelo = document.getElementById("modeloAlterar").value;
    const anoFab = document.getElementById("anoFabAlterar").value;
    const referencia = document.getElementById("referenciaAlterar").value;
    const totalAssentos = document.getElementById("totalAssentosAlterar").value;
    const codigo = document.getElementById("codigoAlterar").value; 

    await fetchAlterar({
        fabricante: fabricante, 
        modelo: modelo, 
        totalAssentos: totalAssentos,
        anoFabricacao: anoFab,
        referencia: referencia,
        codigo: codigo
    })
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        showStatusMessage("Aeronave alterada... ", false, "statusAlterar");
        exibirAeronave();
      } else {
        showStatusMessage("Erro ao alterar aeronave...: " + customResponse.message, true, "statusAlterar");
        console.log(customResponse.message);
      }
    })
    .catch((e)=>{
      showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true, "statusAlterar");
      console.log("Falha grave ao cadastrar." + e)
    });
  }

  // PREENCHER TABELA DE AERONAVES

  function RequisiçãoGETaeronave() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarAeronaves', requestOptions)
      .then(T => T.json());
  }
  
  function preencherAeronaves(aeronave) {
    const tblBody = document.querySelector("tbody");
    aeronave.forEach((aeronave) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center align-middle padLeft" id="codigo">${aeronave.codigo}</td>
            <td class="text-center align-middle">${aeronave.fabricante}</td>
            <td class="text-center align-middle">${aeronave.modelo}</td>
            <td class="text-center align-middle">${aeronave.anoFabricacao}</td>
            <td class="text-center align-middle">${aeronave.totalAssentos}</td>
            <td class="align-middle">${aeronave.referencia}</td>
            <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this, vetorIdsLabelAeronave); exibeCodigo('${aeronave.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
            <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" limparStatus('statusCadastrar'); limparStatus('statusAlterar'); exibeCodigo('${aeronave.codigo}', 'pcodDelete'); popUpDeletar('${aeronave.codigo}')"></td>
            
        `;
      
        tblBody.appendChild(row);
    });
  }
  
  function exibirAeronave() {
    limparTabela();
    console.log('Entrou no exibir...');
    RequisiçãoGETaeronave()
      .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
          console.log("Deu certo a busca de dados");
          console.log('Payload:' + JSON.stringify(customResponse.payload));
          preencherAeronaves(customResponse.payload); 
        } else {
          console.log(customResponse.message);
        }
      })
      .catch((e) => {
        console.log("Não foi possível exibir." + e);
      });
  }

// FUNÇÕES DE DELETAR

// async function deletarVoo(codigo) {
//   const requestOptions = {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ codigo: codigo })
//   };

//   await fetch('http://localhost:3000/excluirVoo', requestOptions)
//       .then(response => response.json())
//       .then(customResponse => {
//           if (customResponse.status === "SUCCESS") {
//               showStatusMessage("Voo deletado com sucesso.", false, "statusDelete");
//               exibirAeronave();
//           } else {
//               showStatusMessage("Erro ao deletar Voo: " + customResponse.message, true, "statusDelete");
//               console.log(customResponse.message);
//           }
//       })
//       .catch((e) => {
//           showStatusMessage("Erro técnico ao deletar... Contate o suporte.", true, "statusDelete");
//           console.log("Falha grave ao deletar." + e);
//       });
// }

async function deletarAeronave(codigo) {
  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
  };

  await fetch('http://localhost:3000/excluirAeronave', requestOptions)
      .then(response => response.json())
      .then(customResponse => {
          if (customResponse.status === "SUCCESS") {
              showStatusMessage("Aeronave deletada com sucesso.", false, "statusDelete");
              exibirAeronave();
          } 
          else {
            if (customResponse.message.includes('ORA-02292')) {
              showStatusMessage("Você não pode excluir esta aeronave, pois atualmente ela está vinculada à outro(s) registro(s). Verifique e tente novamente.", true, "statusDelete");
            } else {
              showStatusMessage("Erro ao deletar aeronave: " + customResponse.message, true, "statusDelete");
              console.log(customResponse.message);
            }
          }
      })
      .catch((e) => {
          showStatusMessage("Erro técnico ao deletar... Contate o suporte.", true, "statusDelete");
          console.log("Falha grave ao deletar." + e);
      });
}
