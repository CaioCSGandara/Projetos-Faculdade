      
function RequisiçãoGETcidade() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarCidades', requestOptions)
    .then(T => T.json());
}

function preencherSelectCidades(options) {
  const cidadeSelect = document.getElementById('cidade');

  options.forEach(optionValue => {
    console.log("Código Cidade: " + JSON.stringify(optionValue));
    const option = document.createElement('option');
    option.value = optionValue.codigo;  // Definindo o valor corretamente
    option.innerHTML = optionValue.nome;  // Definindo o texto do option
    cidadeSelect.appendChild(option);
  });
}

function exibirCidades() {
  console.log('Entrou no exibir...');
  RequisiçãoGETcidade()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelectCidades(customResponse.payload); // Removido o parse redundante
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
    showStatusMessage("Preencha o nome do aeroporto.", true);
    return;
  }

  if(!siglaPreenchida()){
    showStatusMessage("Preencha a sigla do aeroporto.", true);
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
      showStatusMessage("Aeroporto cadastrado com sucesso.", false);
    } else {
      showStatusMessage("Erro ao cadastrar aeroporto: " + customResponse.message, true);
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

// Script da tabel de exibição dos Aeroportos

function RequisiçãoGETaeroporto() {
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
          <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this); exibeCodigo('${aeroporto.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
          <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" exibeCodigo('${aeroporto.codigo}', 'pcodDelete'); popUpDeletar('${aeronave.codigo}')"></td>
          
      `;
    
      tblBody.appendChild(row);
  });
}

function exibirAeroporto() {
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