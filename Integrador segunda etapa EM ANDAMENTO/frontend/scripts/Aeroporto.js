//FUNÇÃO PARA CADASTRO DO AEROPORTO
function RequisiçãoGETcidade() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarCidades', requestOptions)
    .then(T => T.json());
}


function exibirCidades() {
  console.log('Entrou no exibir...');
  RequisiçãoGETcidade()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectCidades(customResponse.payload, vetorDropdownAeroporto); // Removido o parse redundante
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}


function nomePreenchido(){
  const nome = document.getElementById("nome").value.trim();
  return nome.length > 0;
}

function siglaPreenchida(){
  const sigla = document.getElementById("sigla").value.trim();
  return sigla.length > 0;
}

function fetchInserir(body) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };

  return fetch('http://localhost:3000/inserirAeroporto', requestOptions)
      .then(response => response.json());
  }

function inserirAeroporto(){

  if(!nomePreenchido()){
    showStatusMessage("Preencha o nome do aeroporto.", true,"statusCadastrar");
    return;
  }

  if(!siglaPreenchida()){
    showStatusMessage("Preencha a sigla do aeroporto.", true, "statusCadastrar");
    return;
  }

  const nome = document.getElementById("nome").value;
  const sigla = document.getElementById("sigla").value;
  const cidade = document.getElementById("cidade").options[document.getElementById("cidade").selectedIndex].value;

  fetchInserir({ 
      nome: nome, 
      sigla: sigla,
      cidade: cidade
  })
  .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
      showStatusMessage("Aeroporto cadastrado com sucesso.", false, "statusCadastrar");
    } else {
      showStatusMessage("Erro ao cadastrar aeroporto: " + customResponse.message, true, "statusCadastrar");
      console.log(customResponse.message);
    }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true, "statusCadastrar");
    console.log("Falha grave ao cadastrar." + e)
  });

}


// FUNÇÃO PARA ALTERAÇÃO DE AEROPOROTOS

function RequisiçãoGETcidade() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarCidades', requestOptions)
    .then(T => T.json());
}

function preencherSelectCidades(options, vetor) {
  console.log(vetor[0], vetor[1]);
  for(i=0;i<2;i++) {
    const selectDrop = document.getElementById(vetor[i]);

    if(i==0) {
    const defaultOption = document.createElement('option');
    defaultOption.value = ''; 
    defaultOption.text = 'Selecione uma opção';
    selectDrop.appendChild(defaultOption);
    } 
    
    options.forEach(optionValue => {
      console.log("Código Cidade: " + JSON.stringify(optionValue));
      const option = document.createElement('option');
      option.value = optionValue.codigo; 
      option.innerHTML = optionValue.nome;  
      selectDrop.appendChild(option);
    });
  }

}


function exibirCidades() {
  console.log('Entrou no exibir...');
  RequisiçãoGETcidade()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectCidades(customResponse.payload, vetorDropdownAeroporto);
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}


function nomePreenchidoAlter(){
  const nome = document.getElementById("nomeAlter").value.trim();
  return nome.length > 0;
}

function siglaPreenchidaAlter(){
  const sigla = document.getElementById("siglaAlter").value.trim();
  return sigla.length > 0;
}

function fetchAlterar(body) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };

  return fetch('http://localhost:3000/alterarAeroporto', requestOptions)
      .then(response => response.json());
  }

function alterarAeroporto(){

  if(!nomePreenchido()){
    showStatusMessage("Preencha o nome do aeroporto.", true, "statusAlterar");
    return;
  }

  if(!siglaPreenchida()){
    showStatusMessage("Preencha a sigla do aeroporto.", true, "statusAlterar");
    return;
  }

  const nome = document.getElementById("nomeAlter").value;
  const sigla = document.getElementById("siglaAlter").value;
  const cidade = document.getElementById("cidadeAlter").options[document.getElementById("cidadeAlter").selectedIndex].value;
  const codigo = document.getElementById("codigoAlter").value;
  
  fetchAlterar({ 
      nome: nome, 
      sigla: sigla,
      cidade: cidade,
      codigo: codigo
  })
  .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
      showStatusMessage("Aeroporto alterado com sucesso.", false, "statusAlterar");
    } else {
      showStatusMessage("Erro ao alterar aeroporto: " + customResponse.message, true, "statusAlterar");
      console.log(customResponse.message);
    }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao alterar... Contate o suporte.", true, "statusAlterar");
    console.log("Falha grave ao alterar." + e)
  });

}

  // PREENCHER TABELA DE AEROPORTOS
function RequisiçãoGETaeroportoTable() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarAeroportos', requestOptions)
    .then(T => T.json());
}

function preencherAeroportos(aeroporto) {
  const tblBody = document.querySelector("tbody");
  aeroporto.forEach((aeroporto) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td class="text-center align-middle padLeft" id="codigo">${aeroporto.codigo}</td>
          <td class="text-center align-middle">${aeroporto.nome}</td>
          <td class="text-center align-middle">${aeroporto.sigla}</td>
          <td class="text-center align-middle">${aeroporto.cidade}</td>
          <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this, vetorIdsLabelAeroporto); exibeCodigo('${aeroporto.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
          <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" exibeCodigo('${aeroporto.codigo}', 'pcodDelete'); popUpDeletar('${aeroporto.codigo}')"></td>
          
      `;
    
      tblBody.appendChild(row);
  });
}

function exibirAeroporto() {
  console.log('Entrou no exibir...');
  RequisiçãoGETaeroportoTable()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherAeroportos(customResponse.payload); 
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}


//FUNÇÃO PARA DELETAR AEROPORTO
function deletarAeroporto(codigo) {
  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
  };

  fetch('http://localhost:3000/excluirAeroporto', requestOptions)
      .then(response => response.json())
      .then(customResponse => {
          if (customResponse.status === "SUCCESS") {
              showStatusMessageDelete("Aeroporto deletada com sucesso.", false);
          } else {
              showStatusMessageDelete("Erro ao deletar Aeroporto: " + customResponse.message, true);
              console.log(customResponse.message);
          }
      })
      .catch((e) => {
          showStatusMessageDelete("Erro técnico ao deletar... Contate o suporte.", true);
          console.log("Falha grave ao deletar." + e);
      });
}
