// FUNÇÃO PARA EXIBIR AERONAVES NO FORMULÁRIO E ALTERAÇÃO
function RequisiçãoGETaeronave() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarAeronaves', requestOptions)
    .then(T => T.json());
}

function preencherSelectAeronaves(options) {
  const aeroSelect = document.getElementById('selectAeronaveCad');
  options.forEach(optionValue => {
    console.log("Código Aeronave: " + JSON.stringify(optionValue));
    const option = document.createElement('option');
    option.value = optionValue.codigo;  // Definindo o valor corretamente
    option.innerHTML = optionValue.referencia;  // Definindo o texto do option
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

// function RequisiçãoGETaeronave() {
//   const requestOptions = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   };
//   return fetch('http://localhost:3000/listarAeronaves', requestOptions)
//     .then(T => T.json());
// }

// function preencherSelectAeronaves(options, vetor) {
//   for(i=0;i<2;i++) {
//     const selectDrop = document.getElementById(vetor[i]);

//     const defaultOption = document.createElement('option');
//     defaultOption.value = ''; 
//     defaultOption.text = 'Selecione uma opção';
//     selectDrop.appendChild(defaultOption);
  
    
//     options.forEach(optionValue => {
//       console.log("Código Aeronave: " + JSON.stringify(optionValue));
//       const option = document.createElement('option');
//       option.value = optionValue.codigo; 
//       option.innerHTML = optionValue.modelo;  
//       selectDrop.appendChild(option);
//     });
//   }
// }

// function exibirAeronave() {
//   console.log('Entrou no exibir AERONAVE...');
//   RequisiçãoGETaeronave()
//     .then(customResponse => {
//       if (customResponse.status === "SUCCESS") {
//         console.log("Deu certo a busca de dados");
//         console.log('Payload:' + JSON.stringify(customResponse.payload));
//         preencherSelectAeronaves(customResponse.payload, vetor); 
//       } else {
//         console.log(customResponse.message);
//       }
//     })
//     .catch((e) => {
//       console.log("Não foi possível exibir." + e);
//     });
// }

///////////////////////////////////////////////////////////////////////////

function RequisiçãoGETaeroporto() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarAeroportos', requestOptions)
      .then(T => T.json());
  }

  function preencherSelectAeroportosOrigem(options) {
    const aeroportoSelect = document.getElementById('selectOrigemAeroportoCad');

    options.forEach(optionValue => {
      console.log("Código Aeroporto: " + JSON.stringify(optionValue));
      const option = document.createElement('option');
      option.value = optionValue.codigo;  // Definindo o valor corretamente
      option.innerHTML = optionValue.nome;  // Definindo o texto do option
      aeroportoSelect.appendChild(option);
    });
  }

  function preencherSelectAeroportosDestino(options) {
    const aeroportoSelect = document.getElementById('selectDestinoAeroportoCad');

    options.forEach(optionValue => {
      console.log("Código Aeroporto: " + JSON.stringify(optionValue));
      const option = document.createElement('option');
      option.value = optionValue.codigo;  // Definindo o valor corretamente
      option.innerHTML = optionValue.nome;  // Definindo o texto do option
      aeroportoSelect.appendChild(option);
    });
  }

  function exibirOrigemAeroporto() {
    console.log('Entrou no exibir...');
    RequisiçãoGETaeroporto()
      .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
          console.log("Deu certo a busca de dados");
          console.log('Payload:' + JSON.stringify(customResponse.payload));
          preencherSelectAeroportosOrigem(customResponse.payload); 
        } else {
          console.log(customResponse.message);
        }
      })
      .catch((e) => {
        console.log("Não foi possível exibir." + e);
      });
  }

  function exibirDestinoAeroporto() {
    console.log('Entrou no exibir...');
    RequisiçãoGETaeroporto()
      .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
          console.log("Deu certo a busca de dados");
          console.log('Payload:' + JSON.stringify(customResponse.payload));
          preencherSelectAeroportosDestino(customResponse.payload); 
        } else {
          console.log(customResponse.message);
        }
      })
      .catch((e) => {
        console.log("Não foi possível exibir." + e);
      });
  }



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

    if(!nomePreenchidoCad()){
      showStatusMessage("Preencha o nome do trecho.", true, "statusCadastrar");
      return;
    }
    
    if(!origemPreenchidaCad()){
      showStatusMessage("Preencha o nome da origem.", true, "statusCadastrar");
      return;
    }

    if(!destinoPreenchidoCad()){
      showStatusMessage("Preencha o nome do destino.", true, "statusCadastrar");
      return;
    }

    if(!aeronavePreenchidaCad()){
      showStatusMessage("Preencha o nome da aeronave.", true, "statusCadastrar");
      return;
    }

    const nome = document.getElementById("nomeCad").value;
    const origem = document.getElementById("selectOrigemAeroportoCad").options[document.getElementById("selectOrigemAeroportoCad").selectedIndex].value;
    console.log(origem)
    const destino = document.getElementById("selectDestinoAeroportoCad").options[document.getElementById("selectDestinoAeroportoCad").selectedIndex].value;
    console.log(destino)
    const aeronave = document.getElementById("selectAeronaveCad").options[document.getElementById("selectAeronaveCad").selectedIndex].value;

    fetchInserir({
        nome: nome, 
        origem: origem,
        destino: destino,
        aeronave: aeronave
    })
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        showStatusMessage("Trecho cadastrado com sucesso.", false, "statusCadastrar");
      } else {
        showStatusMessage("Erro ao cadastrar trecho: " + customResponse.message, true, "statusCadastrar");
        console.log(customResponse.message);
      }
    })
    .catch((e)=>{
      showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true, "statusCadastrar");
      console.log("Falha grave ao cadastrar." + e)
    });

  }


// FUNÇÃO PARA A EXIBIÇÃO DA TABELA

function RequisiçãoGETtrecho() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarTrechos', requestOptions)
    .then(T => T.json());
}

function preencherTrechos(trecho) {
  let linha = 1;
  defineAlturaTabela();
  const tblBody = document.querySelector("tbody");
  trecho.forEach((trecho) => {
    const row = document.createElement("tr");
    row.classList.add('tableHover');
    if(linha%2!=0) {
        row.classList.add('zebraOne');
    }
    else {
        row.classList.add('zebraTwo');
    }
      row.innerHTML = `
          <td class="padRow text-center align-middle padLeft" id="codigo">${trecho.codigo}</td>
          <td class="text-center align-middle">${trecho.nome}</td>
          <td class="text-center align-middle">${trecho.origem}</td>
          <td class="text-center align-middle">${trecho.destino}</td>
          <td class="text-center align-middle">${trecho.aeronave}</td>
          <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this, vetorIdsLabelTrecho); exibeCodigo('${trecho.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
          <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" limparStatus('statusCadastrar'); limparStatus('statusAlterar');  exibeCodigo('${trecho.codigo}', 'pcodDelete'); popUpDeletar('${trecho.codigo}')"></td>
          
      `;
      linha++;
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
        preencherTrechos(customResponse.payload); 
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}

// FUNÇÃO DE DELEÇÃO DOS TRECHOS
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
              showStatusMessage("Trecho deletado com sucesso.", false, "statusDelete");
          } else {
            if (customResponse.message.includes('ORA-02292')) {
              showStatusMessage("Você não pode excluir este trecho, pois atualmente ele está vinculado à outro(s) registro(s). Verifique e tente novamente.", true, "statusDelete");
            } else {
              showStatusMessage("Erro ao deletar trecho: " + customResponse.message, true, "statusDelete");
              console.log(customResponse.message);
            }
          }
      })
      .catch((e) => {
          showStatusMessage("Erro técnico ao deletar... Contate o suporte.", true, "statusDelete");
          console.log("Falha grave ao deletar." + e);
      });
}

// FUNÇÕES DE ALTERAÇÃO DO TRECHO
function codigoPreenchidoAlt(){
  const codigo = document.getElementById("codAlt").value.trim();
  return codigo.lengt > 0;
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

function alterarTrecho(){
  if(!codigoPreenchidoAlt()){
    showStatusMessage("Preencha o codigo do trecho.", true, "statusAlterar");
    return;
  }  
  
  if(!nomePreenchidoAlt()){
    showStatusMessage("Preencha o nome do trecho.", true, "statusAlterar");
    return;
  }
  
  if(!origemPreenchidaAlt()){
    showStatusMessage("Preencha a origem do trecho.", true, "statusAlterar");
    return;
  }

  if(!destinoPreenchidoAlt()){
    showStatusMessage("Preencha o destino do trecho.", true, "statusAlterar");
    return;
  }

  if(!aeronavePreenchidaAlt()){
    showStatusMessage("Preencha a aeronave do trecho.", true, "statusAlterar");
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
      showStatusMessage("Trecho alterado com sucesso.", false, "statusAlterar");
    } else {
      showStatusMessage("Erro ao alterar trecho: " + customResponse.message, true, "statusAlterar");
      console.log(customResponse.message);
    }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao alterar... Contate o suporte.", true, "statusAlterar");
    console.log("Falha grave ao alterar." + e)
  });

}

function preencherSelectAeroportosOrigemAlt(options, dados) {
  const aeroportoSelect = document.getElementById('selectOrigemAeroportoAlt');

  options.forEach(optionValue => {
    console.log("Código Aeroporto: " + JSON.stringify(optionValue));
    const option = document.createElement('option');
    option.value = optionValue.codigo;  // Definindo o valor corretamente
    option.innerHTML = optionValue.nome;  // Definindo o texto do option
    aeroportoSelect.appendChild(option);
  });
}

function preencherSelectAeroportosDestinoAlt(options) {
  const aeroportoSelect = document.getElementById('selectDestinoAeroportoAlt');

  options.forEach(optionValue => {
    console.log("Código Aeroporto: " + JSON.stringify(optionValue));
    const option = document.createElement('option');
    option.value = optionValue.codigo;  // Definindo o valor corretamente
    option.innerHTML = optionValue.nome;  // Definindo o texto do option
    aeroportoSelect.appendChild(option);
  });
}

function exibirOrigemAeroportoAlt() {
  console.log('Entrou no exibir...');
  RequisiçãoGETaeroporto()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectAeroportosOrigemAlt(customResponse.payload); 
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}

function exibirDestinoAeroportoAlt() {
  console.log('Entrou no exibir...');
  RequisiçãoGETaeroporto()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectAeroportosDestinoAlt(customResponse.payload); 
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}

function preencherSelectAeronavesAlt(options) {
  const aeroSelect = document.getElementById('selectAeronaveAlt');
  options.forEach(optionValue => {
    console.log("Código Aeronave: " + JSON.stringify(optionValue));
    const option = document.createElement('option');
    option.value = optionValue.codigo;  // Definindo o valor corretamente
    option.innerHTML = optionValue.referencia;  // Definindo o texto do option
    aeroSelect.appendChild(option);
  });
}

function exibirAeronaveAlt() {
  console.log('Entrou no exibir...');
  RequisiçãoGETaeronave()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectAeronavesAlt(customResponse.payload); 
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}


// function nomePreenchido(){
//   const nome = document.getElementById("nomeAlt").value.trim();
//   return nome.length > 0;
// }

function fetchAlterar(body) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };

  return fetch('http://localhost:3000/alterarTrecho', requestOptions)
      .then(response => response.json());
  }


