function RequisiçãoGETlistar() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarDados', requestOptions)
      .then(T => T.json());
  }


  function preencherVoos(dados) {
    let linha = 1;
    defineAlturaTabela();
    const tblBody = document.querySelector("tbody");

    dados.forEach((voo) => {
        const row = document.createElement("tr");
        row.classList.add('tableHover');
        if(linha%2!=0) {
            row.classList.add('zebraOne');
        }
        else {
            row.classList.add('zebraTwo');
        }
        row.innerHTML = `
            <td class=" padRow text-center align-middle padLeft" id="codigo">${voo.codigo}</td>
            <td class="text-center align-middle">${voo.data}</td>
            <td class="text-center align-middle">${voo.hrSaida}</td>
            <td class="text-center align-middle">${voo.hrChegada}</td>
            <td class="text-center align-middle">${voo.valor}</td>
            <td class="text-center align-middle" valorRaiz="${voo.trechoNome}">${voo.trecho}</td>           
            <td class="align-middle">${voo.origem}</td>
            <td class="align-middle">${voo.destino}</td>
            <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this, vetorIdsLabelVoo); exibeCodigo('${voo.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
            <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" exibeCodigo('${voo.codigo}', 'pcodDelete'); popUpDeletar('${voo.codigo}')"></td>
            
        `;
      
        tblBody.appendChild(row);
        linha = linha +1;
    });
}

  function exibirVoos() {
    console.log('Entrou no exibir...');
    RequisiçãoGETlistar()
      .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
          console.log("Deu certo a busca de dados");
          console.log('Payload:' + JSON.stringify(customResponse.payload));
          preencherVoos(customResponse.payload);
        } else {
          console.log(customResponse.message);
        }
      })
      .catch((e) => {
        console.log("Não foi possível exibir." + e);
      });
  }

  
  function fetchDeletar(body) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/excluirVoo', requestOptions)
        .then(response => response.json());
}


function RequisiçãoGETtrecho() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarTrechos', requestOptions)
      .then(T => T.json());
  }


function exibirTrechos() {
  console.log('Entrou no exibir...');
  RequisiçãoGETtrecho()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelect(customResponse.payload, vetorDropdownTrecho, 'nome');
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}

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
  var hrSaida = document.getElementById("hrSaidaCadastrar");
  var valorSelecionado = hrSaida.value;
  if (valorSelecionado !== "0"){
    resultado = true;
  }
  return resultado;
}

function chegadaValidaCad(){
  let resultado = false; 
  var hrChegada = document.getElementById("hrChegadaCadastrar");
  var valorSelecionado = hrChegada.value;
  if (valorSelecionado !== "0"){
    resultado = true;
  }
  return resultado;
}

function dataValidaCad(){
  let resultado = false; 
  var data = document.getElementById("dataCadastrar");
  var valorSelecionado = data.value;
  if (valorSelecionado !== "0"){
    resultado = true;
  }
  return resultado;
}

function fetchInserir(body) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };

  return fetch('http://localhost:3000/inserirVoo', requestOptions)
      .then(response => response.json());
}

function inserirVoo() {

  if (!codigoValidoCad()) {
      showStatusMessage("O código do voo deve ser um número válido.", true, "statusCadastrar");
      return;
  }

  if(!dataValidaCad()) {
    showStatusMessage("Escolha uma data válida.", true, "statusCadastrar")
    return;
  }

  if(!saidaValidaCad()) {
    showStatusMessage("Digite uma hora de saída válida.", true, "statusCadastrar")
    return;
  }

  if(!chegadaValidaCad()) {
    showStatusMessage("Digite uma hora de chegada válida.", true, "statusCadastrar")
    return;
  }

  if(!valorValidoCad()) {
    showStatusMessage("O valor deve ser um número válido e maior que zero.", true, "statusCadastrar")
    return;
  }

  if(!trechoValidoCad()) {
    showStatusMessage("Digite um trecho válido.", true, "statusCadastrar")
    return;
  }


  const codigo = document.getElementById("codigoCadastrar").value;
  const hrSaida = document.getElementById("hrSaidaCadastrar").value;
  const hrChegada = document.getElementById("hrChegadaCadastrar").value;
  const dataVoo = document.getElementById("dataVooCadastrar").value;
  const valor = document.getElementById("valorCadastrar").value;
  const trecho = document.getElementById("trechoCadastrar").options[document.getElementById("trechoCadastrar").selectedIndex].value;

  fetchInserir({
      codigo: codigo,
      dataVoo: dataVoo,
      hrChegada: hrChegada,
      hrSaida: hrSaida,
      valor: valor,
      trecho: trecho,
  })
      .then(customResponse => {
          if (customResponse.status === "SUCCESS") {
              showStatusMessage("Voo cadastrado com sucesso.", false, "statusCadastrar");
          } else {
              showStatusMessage("Erro ao cadastrar voo: " + customResponse.message, true, "statusCadastrar");
              console.log(customResponse.message);
          }
      })
      .catch((e) => {
          showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true, "statusCadastrar");
          console.log("Falha grave ao cadastrar." + e);
      });

}


//// ALTERAR 