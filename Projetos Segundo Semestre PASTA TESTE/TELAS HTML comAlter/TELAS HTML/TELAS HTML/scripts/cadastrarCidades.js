
function nomePreenchido() {
    const nome = document.getElementById("nome").value.trim();
    return nome.length > 0;
}

function paisPreenchido() {
    const pais = document.getElementById("pais").value.trim();
    return pais.length > 0;
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

function inserirCidade() {

    if (!nomePreenchido()) {
        showStatusMessage("Preencha o nome da cidade.", true);
        return;
    }

    if (!paisPreenchido()) {
        showStatusMessage("Preencha o país.", true);
        return;
    }

    if (!ufValida()) {
        showStatusMessage("Selecione um Estado.", true);
        return;
    }

    const nome = document.getElementById("nome").value;
    const uf = document.getElementById("uf").options[document.getElementById("uf").selectedIndex].value;
    const pais = document.getElementById("pais").value;

    fetchInserir({
        nome: nome,
        uf: uf,
        pais: pais,
    })
    .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
            showStatusMessage("Cidade cadastrada com sucesso.", false);
        } else {
            showStatusMessage("Erro ao cadastrar cidade: " + customResponse.message, true);
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

// THIAGO MEXENDO NO DIA 15/11/2023 AS 17:16 DURANTE NOSSA CALL DE LOUCO, FAVOR NAO GRITAR, EMOJI DE JOIA

function RequisiçãoGETcidade() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarCidades', requestOptions)
      .then(T => T.json());
  }
  
  
  function preencherCidade(Cidade) {
    const tblBody = document.querySelector("tbody");
    Cidade.forEach((Cidade) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center align-middle padLeft" id="codigo">${Cidade.codigo}</td>
            <td class="text-center align-middle">${Cidade.fabricante}</td>
            <td class="text-center align-middle">${Cidade.modelo}</td>
            <td class="text-center align-middle">${Cidade.anoFabricacao}</td>
            <td class="align-middle"><img class="iconList" src="../images//lapisicon.png" onclick=" exibeCodigo('${Cidade.codigo}', 'pcodAlter'); alternarDivs('divCadastrar', 'divAlterar')" ></td>
            <td class="align-middle"><img class="iconList" src="../images//lixeiraicon.png" onclick=" exibeCodigo('${Cidade.codigo}', 'pcodDelete'); popUpDeletar('${Cidade.codigo}')"></td>
        `;
        tblBody.appendChild(row);
    });
  }
  
  function exibirCidades() {
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


  