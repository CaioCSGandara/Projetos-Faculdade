// function RequisiçãoGETlistar() {
//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     };
//     return fetch('http://localhost:3000/listarDados', requestOptions)
//       .then(T => T.json());
//   }


//   function preencherTabela(dados) {
//     const tblBody = document.querySelector("tbody");
//     dados.forEach((voo) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td class="text-center align-middle padLeft" id="codigo">${voo.codigo}</td>
//             <td class="text-center align-middle">${voo.data}</td>
//             <td class="text-center align-middle">${voo.trecho}</td>
//             <td class="text-center align-middle">${voo.hrSaida}</td>
//             <td class="text-center align-middle">${voo.hrChegada}</td>
//             <td class="align-middle">${voo.origem}</td>
//             <td class="align-middle">${voo.destino}</td>
//             <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" exibeCodigo('${voo.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
//             <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" exibeCodigo('${voo.codigo}', 'pcodDelete'); popUpDeletar('${voo.codigo}')"></td>
            
//         `;
      
//         tblBody.appendChild(row);
//     });
// }

  // function exibirTabela() {
  //   console.log('Entrou no exibir...');
  //   RequisiçãoGETlistar()
  //     .then(customResponse => {
  //       if (customResponse.status === "SUCCESS") {
  //         console.log("Deu certo a busca de dados");
  //         console.log('Payload:' + JSON.stringify(customResponse.payload));
  //         preencherTabela(customResponse.payload); // Removido o parse redundante
  //       } else {
  //         console.log(customResponse.message);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("Não foi possível exibir." + e);
  //     });
  // }

  
//   function fetchDeletar(body) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//     };

//     return fetch('http://localhost:3000/excluirVoo', requestOptions)
//         .then(response => response.json());
// }


function RequisiçãoGETtrecho() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarTrechos', requestOptions)
      .then(T => T.json());
  }

function preencherSelectTrechos(options) {
  const trechoSelect = document.getElementById('trecho');

  options.forEach(optionValue => {
    console.log("Código Trecho: " + JSON.stringify(optionValue));
    const option = document.createElement('option');
    option.value = optionValue.codigo;  // Definindo o valor corretamente
    option.innerHTML = optionValue.nome;  // Definindo o texto do option
    trechoSelect.appendChild(option);
  });
}

function exibirTrechos() {
  console.log('Entrou no exibir...');
  RequisiçãoGETtrecho()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectTrechos(customResponse.payload); // Removido o parse redundante
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}

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


  const codigo = document.getElementById("codigo").value;
  const hrSaida = document.getElementById("hrSaida").value;
  const hrChegada = document.getElementById("hrChegada").value;
  const dataVoo = document.getElementById("dataVoo").value;
  const valor = document.getElementById("valor").value;
  const trecho = document.getElementById("trecho").options[document.getElementById("trecho").selectedIndex].value;

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

function showStatusMessage(msg, error) {
  var pStatus = document.getElementById("status");
  if (error === true) {
      pStatus.className = "statusError";
  } else {
      pStatus.className = "statusSuccess";
  }
  pStatus.textContent = msg;
}