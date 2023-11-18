
// function RequisiçãoGETaeroporto() {
//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     };
//     return fetch('http://localhost:3000/listarAeroportos', requestOptions)
//       .then(T => T.json());
//   }

//   function preencherSelectAeroportosOrigem(options) {
//     const aeroportoSelect = document.getElementById('selectOrigemAeroporto');

//     options.forEach(optionValue => {
//       console.log("Código Aeroporto: " + JSON.stringify(optionValue));
//       const option = document.createElement('option');
//       option.value = optionValue.codigo;  // Definindo o valor corretamente
//       option.innerHTML = optionValue.sigla;  // Definindo o texto do option
//       aeroportoSelect.appendChild(option);
//     });
//   }

//   function preencherSelectAeroportosDestino(options) {
//     const aeroportoSelect = document.getElementById('selectDestinoAeroporto');

//     options.forEach(optionValue => {
//       console.log("Código Aeroporto: " + JSON.stringify(optionValue));
//       const option = document.createElement('option');
//       option.value = optionValue.codigo;  // Definindo o valor corretamente
//       option.innerHTML = optionValue.sigla;  // Definindo o texto do option
//       aeroportoSelect.appendChild(option);
//     });
//   }

//   function exibirOrigemAeroporto() {
//     console.log('Entrou no exibir...');
//     RequisiçãoGETaeroporto()
//       .then(customResponse => {
//         if (customResponse.status === "SUCCESS") {
//           console.log("Deu certo a busca de dados");
//           console.log('Payload:' + JSON.stringify(customResponse.payload));
//           preencherSelectAeroportosOrigem(customResponse.payload); 
//         } else {
//           console.log(customResponse.message);
//         }
//       })
//       .catch((e) => {
//         console.log("Não foi possível exibir." + e);
//       });
//   }

//   function exibirDestinoAeroporto() {
//     console.log('Entrou no exibir...');
//     RequisiçãoGETaeroporto()
//       .then(customResponse => {
//         if (customResponse.status === "SUCCESS") {
//           console.log("Deu certo a busca de dados");
//           console.log('Payload:' + JSON.stringify(customResponse.payload));
//           preencherSelectAeroportosDestino(customResponse.payload); 
//         } else {
//           console.log(customResponse.message);
//         }
//       })
//       .catch((e) => {
//         console.log("Não foi possível exibir." + e);
//       });
//   }

//   function RequisiçãoGETaeronave() {
//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     };
//     return fetch('http://localhost:3000/listarAeronaves', requestOptions)
//       .then(T => T.json());
//   }

//   function preencherSelectAeronaves(options) {
//     const aeroSelect = document.getElementById('selectAeronave');
//     options.forEach(optionValue => {
//       console.log("Código Aeronave: " + JSON.stringify(optionValue));
//       const option = document.createElement('option');
//       option.value = optionValue.codigo;  // Definindo o valor corretamente
//       option.innerHTML = optionValue.modelo;  // Definindo o texto do option
//       aeroSelect.appendChild(option);
//     });
//   }

//   function exibirAeronave() {
//     console.log('Entrou no exibir...');
//     RequisiçãoGETaeronave()
//       .then(customResponse => {
//         if (customResponse.status === "SUCCESS") {
//           console.log("Deu certo a busca de dados");
//           console.log('Payload:' + JSON.stringify(customResponse.payload));
//           preencherSelectAeronaves(customResponse.payload); 
//         } else {
//           console.log(customResponse.message);
//         }
//       })
//       .catch((e) => {
//         console.log("Não foi possível exibir." + e);
//       });
//   }

  function nomePreenchido(){
    const nome = document.getElementById("nome").value.trim();
    return nome.length > 0;
  }

  function fetchInserir(body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/inserirTrecho', requestOptions)
        .then(response => response.json());
    }

  function inserirTrecho(){

    if(!nomePreenchido()){
      showStatusMessage("Preencha o nome do trecho.", true);
      return;
    }

    const nome = document.getElementById("nome").value;
    const origem = document.getElementById("selectOrigemAeroporto").options[document.getElementById("selectOrigemAeroporto").selectedIndex].value;
    console.log(origem)
    const destino = document.getElementById("selectDestinoAeroporto").options[document.getElementById("selectDestinoAeroporto").selectedIndex].value;
    console.log(destino)
    const aeronave = document.getElementById("selectAeronave").options[document.getElementById("selectAeronave").selectedIndex].value;

    fetchInserir({
        nome: nome, 
        origem: origem,
        destino: destino,
        aeronave: aeronave
    })
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        showStatusMessage("Trecho cadastrado com sucesso.", false);
      } else {
        showStatusMessage("Erro ao cadastrar trecho: " + customResponse.message, true);
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

// Script de exibição da tabela de trechos

function RequisiçãoGETtrecho() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarTrechos', requestOptions)
    .then(T => T.json());
}

function preencherTrechos(trecho) {
  const tblBody = document.querySelector("tbody");
  trecho.forEach((trecho) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td class="text-center align-middle padLeft" id="codigo">${trecho.codigo}</td>
          <td class="text-center align-middle">${trecho.nome}</td>
          <td class="text-center align-middle">${trecho.origem}</td>
          <td class="text-center align-middle">${trecho.destino}</td>
          <td class="text-center align-middle">${trecho.aeronave}</td>
          <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this); exibeCodigo('${trecho.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
          <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" exibeCodigo('${trecho.codigo}', 'pcodDelete'); popUpDeletar('${trecho.codigo}')"></td>
          
      `;
    
      tblBody.appendChild(row);
  });
}

function exibirTrecho() {
  console.log('Entrou no exibir TRECHOS...');
  RequisiçãoGETtrecho()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        // preencherSelectTrechos(customResponse.payload); // Removido o parse redundante
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}

function deletartrecho(codigo) {
  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
  };

  fetch('http://localhost:3000/excluirTrecho', requestOptions)
      .then(response => response.json())
      .then(customResponse => {
          if (customResponse.status === "SUCCESS") {
              showStatusMessageDelete("Trecho deletado com sucesso.", false);
          } else {
              showStatusMessageDelete("Erro ao deletar Trecho: " + customResponse.message, true);
              console.log(customResponse.message);
          }
      })
      .catch((e) => {
          showStatusMessageDelete("Erro técnico ao deletar... Contate o suporte.", true);
          console.log("Falha grave ao deletar." + e);
      });
}

function alterarTrecho(){

  if(!nomePreenchido()){
    showStatusMessage("Preencha o nome do trecho.", true);
    return;
  }

  const nome = document.getElementById("nome").value;
  const origem = document.getElementById("selectOrigemAeroporto").options[document.getElementById("selectOrigemAeroporto").selectedIndex].value;
  console.log(origem)
  const destino = document.getElementById("selectDestinoAeroporto").options[document.getElementById("selectDestinoAeroporto").selectedIndex].value;
  console.log(destino)
  const aeronave = document.getElementById("selectAeronave").options[document.getElementById("selectAeronave").selectedIndex].value;
  const codigo = document.getElementById("codigo").value;

  fetchAlterar({
      nome: nome, 
      origem: origem,
      destino: destino,
      aeronave: aeronave,
      codigo: codigo
  })
  .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
      showStatusMessage("Trecho alterado com sucesso.", false);
    } else {
      showStatusMessage("Erro ao alterar trecho: " + customResponse.message, true);
      console.log(customResponse.message);
    }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao alterar... Contate o suporte.", true);
    console.log("Falha grave ao alterar." + e)
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