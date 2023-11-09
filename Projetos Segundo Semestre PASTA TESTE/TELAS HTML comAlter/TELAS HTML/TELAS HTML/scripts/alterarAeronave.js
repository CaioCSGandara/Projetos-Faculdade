function preencheuCodigo(){
    let resultado = false;
    var strCodigo = document.getElementById("codigo").value;
    const codigo = parseInt(strCodigo);
    console.log("Código aeronave: " + codigo.toString());
    if (codigo > 0){
      resultado = true;
    }
    return resultado;
}

function anoValido(){
    let resultado = false;
    var strAno = document.getElementById("anoFab").value;
    const ano = parseInt(strAno);
    console.log("Ano aeronave: " + ano.toString());
    if (ano >= 1990 && ano <= 2026){
      resultado = true;
    }
    return resultado; 
  }

  function totalAssentosValido(){
    let resultado = false;
    const strAssentos = document.getElementById("totalAssentos").value;
    const assentos = parseInt(strAssentos);
    if (assentos > 0){
      resultado = true;
    }
    return resultado; 
  }

  function selecionouFabricante(){
    let resultado = false; 
    var listaFabricantes = document.getElementById("comboFabricantes");
    var valorSelecionado = listaFabricantes.value;
    if (valorSelecionado !== "0"){
      resultado = true;
    }
    return resultado;
  }

  function preencheuModelo(){
    let resultado = false;
    const modeloInformado = document.getElementById("modelo").value;
    if(modeloInformado.length > 0){
      resultado = true;
    }
    return resultado;
  }

  function preencheuRegistro(){
    let resultado = false;
    const registroReferencia = document.getElementById("referencia").value;
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

    if(!preencheuCodigo()){
      showStatusMessage("Preencha o código da aeronave...", true);
      return;
    }

    if(!selecionouFabricante()){
      showStatusMessage("Selecione o fabricante...", true);  
      return;
    }

    if(!preencheuModelo()){
      showStatusMessage("Preencha o modelo...", true);
      return;
    }

    if(!preencheuRegistro()){
      showStatusMessage("Preencha o registro da aeronave...", true);
      return;
    }

    if(!anoValido()){
      showStatusMessage("Ano deve ser de 1990 até 2026...", true);
      return;
    }

    if(!totalAssentosValido()){
      showStatusMessage("Preencha corretamente o total de assentos.", true);
      return;
    }

    // Corrigido para obter o valor selecionado do combobox
    const fabricante = document.getElementById("comboFabricantes").options[document.getElementById("comboFabricantes").selectedIndex].value;
    const modelo = document.getElementById("modelo").value;
    const anoFab = document.getElementById("anoFab").value;
    const referencia = document.getElementById("referencia").value;
    const totalAssentos = document.getElementById("totalAssentos").value;
    const codigo = document.getElementById("codigo").value; 

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
        showStatusMessage("Aeronave alterada... ", false);
      } else {
        showStatusMessage("Erro ao alterar aeronave...: " + customResponse.message, true);
        console.log(customResponse.message);
      }
    })
    .catch((e)=>{
      showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
      console.log("Falha grave ao cadastrar." + e)
    });
  }

  function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    if (error === true){
      pStatus.className = "statusError";
    } else {
      pStatus.className = "statusSuccess";
    }
    pStatus.textContent = msg;
  }


  function alternarDivs(codigo) {
    var divEditar = document.getElementById('divEditar');
    var divSalvar = document.getElementById('divSalvar');
  
    if (divEditar.style.display === 'block') {
      // Se a primeira div estiver visível, oculte-a e mostre a segunda div
      divEditar.style.display = 'none';
      divSalvar.style.display = 'block';
    } else {
      // Caso contrário, mostre a primeira div e oculte a segunda div
      divEditar.style.display = 'block';
      divSalvar.style.display = 'none';

      RequisiçãoGETlistar()
      .then(dados => {
        const voo = dados.find(v => v.codigo === codigo);
        preencherFormulario(voo);
      })
      .catch((e) => {
        console.log("Erro ao obter dados." + e);
      });
  }
}
