// FUNÇÕES PARA CADASTRO DE CIDADE
function nomePreenchido() {
    let resultado = false;
    const nome = document.getElementById("nome").value;
    if(nome.length>0) {
        resultado = true;
    }
    return resultado;
}

function paisPreenchido() {
    let resultado = false;
    const pais = document.getElementById("pais").value;
    if(pais.length > 0){
        resultado = true;
    }
    return resultado;
}

function ufValida(){
    let resultado = false; 
    var listaEstados = document.getElementById("uf");
    var valorSelecionado = listaEstados.value;
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

    return fetch('http://localhost:3000/inserirCidade', requestOptions)
        .then(response => response.json());
}

async function inserirCidade() {

    if (!nomePreenchido()) {
        showStatusMessage("Preencha o nome da cidade.", true, "statusCadastrar");
        return;
    }

    if (!paisPreenchido()) {
        showStatusMessage("Preencha o país.", true, "statusCadastrar");
        return;
    }

    if (!ufValida()) {
        showStatusMessage("Selecione um Estado.", true, "statusCadastrar");
        return;
    }

    const nome = document.getElementById("nome").value;
    const uf = document.getElementById("uf").options[document.getElementById("uf").selectedIndex].value;
    const pais = document.getElementById("pais").value;

    await fetchInserir({
        nome: nome,
        uf: uf,
        pais: pais,
    })
    .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
            showStatusMessage("Cidade cadastrada com sucesso.", false, "statusCadastrar");
            exibirCidades();
        } else {
            showStatusMessage("Erro ao cadastrar cidade: " + customResponse.message, true, "statusCadastrar");
            console.log(customResponse.message);
        }
    })
    .catch((e) => {
        showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true, "statusCadastrar");
        console.log("Falha grave ao cadastrar." + e);
    });
}


// FUNÇÃO PARA ALTERAÇÃO DE CIDADE

function codigoPreenchidoAlter() {
    const codigo = document.getElementById("codigoCidade").value;
    return codigo.length > 0;
}

function nomePreenchidoAlter() {
    let resultado = false;
    const nome = document.getElementById("nomeCidade").value;
    if(nome.length>0) {
        resultado = true;
    }
    return resultado;
}


function paisPreenchidoAlter() {
    let resultado = false;
    const pais = document.getElementById("paisCidade").value;
    if(pais.length > 0){
        resultado = true;
    }
    return resultado;
}

function ufValidaAlter(){
    let resultado = false; 
    var listaEstados = document.getElementById("ufCidade");
    var valorSelecionado = listaEstados.value;
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

  return fetch('http://localhost:3000/alterarCidade', requestOptions)
      .then(response => response.json());
}

async function alterarCidade() {

    
  if (!codigoPreenchidoAlter()) {
        showStatusMessage("Preencha o código da cidade.", true, "statusAlterar");
        return;
  }

   if (!nomePreenchidoAlter()) {
       showStatusMessage("Preencha o nome(alterar).", true, "statusAlterar");
       return;
   }

  if (!ufValidaAlter()) {
    showStatusMessage("Selecione um Estado.", true, "statusAlterar");
    return;

}
  if (!paisPreenchidoAlter()) {
      showStatusMessage("Preencha o país.", true, "statusAlterar");
      return;
  }


  const nome = document.getElementById("nomeCidade").value;
  const uf = document.getElementById("ufCidade").options[document.getElementById("ufCidade").selectedIndex].value;
  const pais = document.getElementById("paisCidade").value;
  const codigo = document.getElementById("codigoCidade").value;

  await fetchAlterar({
      nome: nome,
      uf: uf,
      pais: pais,
      codigo: codigo
  })
  .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
          showStatusMessage("Cidade alterada com sucesso.", false, "statusAlterar");
          exibirCidades();
      } else {
          showStatusMessage("Erro ao alterar cidade: " + customResponse.message, true, "statusAlterar");
          console.log(customResponse.message);
      }
  })
  .catch((e) => {
      showStatusMessage("Erro técnico ao alterar... Contate o suporte.", true, "statusAlterar");
      console.log("Falha grave ao cadastrar." + e);
  });

}


// SCRIPT PARA GERAR TABELA
function RequisiçãoGETcidade() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarCidades', requestOptions)
      .then(T => T.json());
  }
  
  function preencherCidade(Cidade) {
    let linha = 1;
    defineAlturaTabela('divCadastrar');
    const tblBody = document.querySelector("tbody");
    Cidade.forEach((Cidade) => {
        const row = document.createElement("tr");
        row.classList.add('tableHover');
        if(linha%2!=0) {
            row.classList.add('zebraOne');
        }
        else {
            row.classList.add('zebraTwo');
        }
        row.innerHTML = `
            <td class=" padRow text-center align-middle padLeft" id="codigo">${Cidade.codigo}</td>
            <td class="text-center align-middle">${Cidade.nome}</td>
            <td class="text-center align-middle">${Cidade.uf}</td>
            <td class="text-center align-middle">${Cidade.pais}</td>
            <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" preencherAlterar(this, vetorIdsLabelCidade); exibeCodigo('${Cidade.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar'); defineAlturaTabela('divCadastrar')" ></td>
            <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick="limparStatus('statusCadastrar'); limparStatus('statusAlterar'); exibeCodigo('${Cidade.codigo}', 'pcodDelete'); popUpDeletar('${Cidade.codigo}')"></td>
        `;
        linha = linha +1;
        tblBody.appendChild(row);
    });
  }
  

function exibirCidades() {
    limparTabela();
    console.log('Entrou no exibir...');
    RequisiçãoGETcidade()
      .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
          console.log("Deu certo a busca de dados");
          console.log('Payload:' + JSON.stringify(customResponse.payload));
          preencherCidade(customResponse.payload); 
        } else {
          console.log(customResponse.message);
        }
      })
      .catch((e) => {
        console.log("Não foi possível exibir." + e);
      });
  }

  
// FUNÇÃO PARA DELETAR CIDADE
  async function deletarCidade(codigo) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: codigo })
    };
  
    await fetch('http://localhost:3000/excluirCidade', requestOptions)
        .then(response => response.json())
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                showStatusMessage("Cidade deletada com sucesso.", false, "statusDelete");
                exibirCidades();
            } 
            else {
                if (customResponse.message.includes('ORA-02292')) {
                  showStatusMessage("Você não pode excluir esta cidade, pois atualmente ela está vinculada à outro(s) registro(s). Verifique e tente novamente.", true, "statusDelete");
                } else {
                  showStatusMessage("Erro ao deletar cidade: " + customResponse.message, true, "statusDelete");
                  console.log(customResponse.message);
                }
              }
        })
        .catch((e) => {
            showStatusMessage("Erro técnico ao deletar... Contate o suporte.", true, "statusDelete");
            console.log("Falha grave ao deletar." + e);
        });
  }

  
