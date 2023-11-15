function RequisiçãoGETlistar() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarDados', requestOptions)
      .then(T => T.json());
  }


  function preencherTabela(dados) {
    const tblBody = document.querySelector("tbody");
    dados.forEach((voo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center align-middle padLeft" id="codigo">${voo.codigo}</td>
            <td class="text-center align-middle">${voo.data}</td>
            <td class="text-center align-middle">${voo.trecho}</td>
            <td class="text-center align-middle">${voo.hrSaida}</td>
            <td class="text-center align-middle">${voo.hrChegada}</td>
            <td class="align-middle">${voo.origem}</td>
            <td class="align-middle">${voo.destino}</td>
            <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" exibeCodigo('${voo.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
            <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" exibeCodigo('${voo.codigo}', 'pcodDelete'); popUpDeletar('${voo.codigo}')"></td>
            
        `;
      
        tblBody.appendChild(row);
    });
}

  function exibirTabela() {
    console.log('Entrou no exibir...');
    RequisiçãoGETlistar()
      .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
          console.log("Deu certo a busca de dados");
          console.log('Payload:' + JSON.stringify(customResponse.payload));
          preencherTabela(customResponse.payload); // Removido o parse redundante
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

let codigoToUse = null;

function popUpDeletar(codigoCapturado) {
  codigoToUse = codigoCapturado;
  const popup = document.getElementById('popUpDelete');
  popup.showModal();
}

function fechaPopUpDeletar() {
  const popup = document.getElementById('popUpDelete');
  popup.close();
}

function deletarVoo(codigo) {
  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
  };

  fetch('http://localhost:3000/excluirVoo', requestOptions)
      .then(response => response.json())
      .then(customResponse => {
          if (customResponse.status === "SUCCESS") {
              showStatusMessageDelete("Voo deletado com sucesso.", false);
          } else {
              showStatusMessageDelete("Erro ao deletar Voo: " + customResponse.message, true);
              console.log(customResponse.message);
          }
      })
      .catch((e) => {
          showStatusMessageDelete("Erro técnico ao deletar... Contate o suporte.", true);
          console.log("Falha grave ao deletar." + e);
      });
}

function showStatusMessageDelete(msg, error) {
  var pStatus = document.getElementById("statusDelete");
  if (error === true){
    pStatus.className = "statusError";
  } else {
    pStatus.className = "statusSuccess";
  }
  pStatus.textContent = msg;
}

function exibeCodigo(codigoCapturado, idP) {
  codigoToUse=codigoCapturado;
    var pCodigo = document.getElementById(idP);
    pCodigo.textContent = `${codigoToUse}`;
}
// A FUNÇÃO ABAIXO FUNCIONA PARA PREENCHER O ALTERAR. É NECESSÁRIO APENAS QUE SEJA USADA COM O SERVIÇO CORRETO.
// CHAMADA NO ONCLICK DO BOTAO DE ALTERAR: preencherAlterar(this);

// function preencherAlterar(elemento) {
//   const tdImagem = elemento.parentNode;
//   const linha = tdImagem.parentNode;
//   const elementosLinha = linha.querySelectorAll('td');
  
//   const codigoAlt = document.getElementById("codigoAlterar");
//   codigoAlt.value = elementosLinha[0].textContent;

//   const fabricanteAlt = document.getElementById("comboFabricantesAlterar");
//   fabricanteAlt.option = elementosLinha[1].textContent;

// }