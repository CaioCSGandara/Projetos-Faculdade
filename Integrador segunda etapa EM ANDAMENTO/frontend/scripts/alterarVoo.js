



function codigoValido() {
  let resultado = false;
  var strCodigo = document.getElementById("codigo").value;
  const codigo = parseInt(strCodigo);

  if (!isNaN(codigo) && codigo > 0) {
      resultado = true;
  }
  return resultado;
}


function valorValido() {
  let resultado = false;
  var strValor = document.getElementById("valor").value;
  const valor = parseInt(strValor);

  if (!isNaN(valor) && valor > 0) {
      resultado = true;
  }
  return resultado;
}

function trechoValido(){
  let resultado = false; 
  var listaTrechos = document.getElementById("trecho");
  var valorSelecionado = listaTrechos.value;
  if (valorSelecionado !== "0"){
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

  return fetch('http://localhost:3000/alterarVoo', requestOptions)
      .then(response => response.json());
}

function alterarVoo() {

  if (!codigoValido()) {
      showStatusMessage("O código do voo deve ser um número válido.", true);
      return;
  }

  if(!valorValido()) {
    showStatusMessage("Digite um Valor maior que zero.")
    return;
  }

  if(!trechoValido()) {
    showStatusMessage("Digite um Valor maior que zero.")
    return;
  }


  const hrSaida = document.getElementById("hrSaida").value;
  const hrChegada = document.getElementById("hrChegada").value;
  const dataVoo = document.getElementById("dataVoo").value;
  const valor = document.getElementById("valor").value;
  const trecho = document.getElementById("trecho").options[document.getElementById("trecho").selectedIndex].value;
  const codigo = document.getElementById("codigo").value;        
  
  fetchAlterar({
      dataVoo: dataVoo,
      hrChegada: hrChegada,
      hrSaida: hrSaida,
      valor: valor,
      trecho: trecho,
      codigo: codigo
  })
      .then(customResponse => {
          if (customResponse.status === "SUCCESS") {
              showStatusMessage("Voo cadastrado com sucesso.", false);
          } else {
              showStatusMessage("Erro ao cadastrar voo: " + customResponse.message, true);
              console.log(customResponse.message);
          }
      })
      .catch((e) => {
          showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
          console.log("Falha grave ao cadastrar." + e);
      });

    }
