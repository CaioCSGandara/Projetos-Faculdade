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
  const nome = document.getElementById("nomeCadastrar").value.trim();
  return nome.length > 0;
}

function siglaPreenchida(){
  const sigla = document.getElementById("siglaCadastrar").value.trim();
  return sigla.length > 0;
}

function cidadePreenchida() {
  const cidade = document.getElementById("cidadeCadastrar").value.trim();
  return cidade.length > 0;
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

async function inserirAeroporto(){

  if(!nomePreenchido()){
    showStatusMessage("Preencha o nome do aeroporto.", true,"statusCadastrar");
    return;
  }

  if(!siglaPreenchida()){
    showStatusMessage("Preencha a sigla do aeroporto.", true, "statusCadastrar");
    return;
  }

  if(!cidadePreenchida()){
    showStatusMessage("Preencha a cidade do aeroporto.", true, "statusCadastrar");
    return;
  }

  const nome = document.getElementById("nomeCadastrar").value;
  const sigla = document.getElementById("siglaCadastrar").value;
  const cidade = document.getElementById("cidadeCadastrar").options[document.getElementById("cidadeCadastrar").selectedIndex].value;

  await fetchInserir({ 
      nome: nome, 
      sigla: sigla,
      cidade: cidade
  })
  .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
      showStatusMessage("Aeroporto cadastrado com sucesso.", false, "statusCadastrar");
      exibirAeroporto();
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
  for(i=0;i<2;i++) {
    const selectDrop = document.getElementById(vetor[i]);

    const defaultOption = document.createElement('option');
    defaultOption.value = ''; 
    defaultOption.text = 'Selecione uma opção';
    selectDrop.appendChild(defaultOption);
  
    
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

function nomePreenchidoAlter(){
  const nome = document.getElementById("nomeAlterar").value.trim();
  return nome.length > 0;
}

function siglaPreenchidaAlter(){
  const sigla = document.getElementById("siglaAlterar").value.trim();
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

async function alterarAeroporto(){

  if(!preencheuCodigoAlterar()){
    showStatusMessage("Preencha o código da aeronave...", true, "statusAlterar");
    return;
  }

  if(!nomePreenchidoAlter()){
    showStatusMessage("Preencha o nome do aeroporto.", true, "statusAlterar");
    return;
  }

  if(!siglaPreenchidaAlter()){
    showStatusMessage("Preencha a sigla do aeroporto.", true, "statusAlterar");
    return;
  }

  const nome = document.getElementById("nomeAlterar").value;
  const sigla = document.getElementById("siglaAlterar").value;
  const cidade = document.getElementById("cidadeAlterar").options[document.getElementById("cidadeAlterar").selectedIndex].value;
  const codigo = document.getElementById("codigoAlterar").value;
  
  await fetchAlterar({ 
      nome: nome, 
      sigla: sigla,
      cidade: cidade,
      codigo: codigo
  })
  .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
      showStatusMessage("Aeroporto alterado com sucesso.", false, "statusAlterar");
      exibirAeroporto();
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

// function preencherAeroportos(aeroporto) {
//   let linha = 1;
//   defineAlturaTabela();
//   const tblBody = document.querySelector("tbody");
//   aeroporto.forEach((aeroporto) => {
//       const row = document.createElement("tr");
//       row.classList.add('tableHover');
//       if(linha%2!=0) {
//           row.classList.add('zebraOne');
//       }
//       else {
//           row.classList.add('zebraTwo');
//       }
//       row.innerHTML = `
//           <td class="padRow text-center align-middle padLeft" id="codigo">${aeroporto.codigo}</td>
//           <td class="text-center align-middle">${aeroporto.nome}</td>
//           <td class="text-center align-middle">${aeroporto.sigla}</td>
//           <td class="text-center align-middle">${aeroporto.cidade}</td>
//           <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this, vetorIdsLabelAeroporto); exibeCodigo('${aeroporto.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
//           <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" limparStatus('statusCadastrar'); limparStatus('statusAlterar');  exibeCodigo('${aeroporto.codigo}', 'pcodDelete'); popUpDeletar('${aeroporto.codigo}')"></td>
          
//       `;
//       linha = linha +1;
//       tblBody.appendChild(row);
//   });
// }

function preencherAeroportos(aeroportos) {
  let linha = 1;
  defineAlturaTabela();
  const tblBody = document.querySelector("tbody");
  aeroportos.forEach((aeroporto) => {
    const row = document.createElement("tr");
    row.classList.add('tableHover');
    if (linha % 2 != 0) {
      row.classList.add('zebraOne');
    } else {
      row.classList.add('zebraTwo');
    }

    // Adiciona cada célula à linha da tabela
    row.innerHTML += `
      <td class="padRow text-center align-middle padLeft" id="codigo">${aeroporto.codigo}</td>
      <td class="text-center align-middle">${aeroporto.nome}</td>
      <td class="text-center align-middle">${aeroporto.sigla}</td>
      <td class="text-center align-middle" id="cidade">${aeroporto.cidadeNome}</td>
      <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this, vetorIdsLabelAeroporto); exibeCodigo('${aeroporto.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
      <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" limparStatus('statusCadastrar'); limparStatus('statusAlterar');  exibeCodigo('${aeroporto.codigo}', 'pcodDelete'); popUpDeletar('${aeroporto.codigo}')"></td>
    `;

    const tdCidade = row.querySelector("#cidade"); // 099 - procura o ID cidade dentro da nova linha
    tdCidade.setAttribute('valorRaiz', aeroporto.cidade); // 099 - cria um novo atributo e passa a ele um valor

    linha = linha + 1;
    tblBody.appendChild(row);
  });
}

function exibirAeroporto() {
  limparTabela();
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
async function deletarAeroporto(codigo) {
  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
  };

  await fetch('http://localhost:3000/excluirAeroporto', requestOptions)
      .then(response => response.json())
      .then(customResponse => {
          if (customResponse.status === "SUCCESS") {
              showStatusMessage("Aeroporto deletada com sucesso.", false, "statusDelete");
              exibirAeroporto();
          } else {
            if (customResponse.message.includes('ORA-02292')) {
              showStatusMessage("Você não pode excluir este aeroporto, pois atualmente ele está vinculado à outro(s) registro(s). Verifique e tente novamente.", true, "statusDelete");
            } else {
              showStatusMessage("Erro ao deletar aeroporto: " + customResponse.message, true, "statusDelete");
              console.log(customResponse.message);
            }
          }
      })
      .catch((e) => {
          showStatusMessage("Erro técnico ao deletar... Contate o suporte.", true, "statusDelete");
          console.log("Falha grave ao deletar." + e);
      });
}
