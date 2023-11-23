document.addEventListener('DOMContentLoaded', function () {
  exibirAeroporto();
});

  // Bloqueia a data de volta caso a passagem seja somente de ida
  const selecionaTipoPassagem = document.getElementById('tipoPassagem');
  const selecionaDataVolta = document.getElementById('dataVolta');

  selecionaTipoPassagem.addEventListener('change', () => {
    if (selecionaTipoPassagem.value == 'somenteIda') {
      selecionaDataVolta.disabled = true;
    } else {
      selecionaDataVolta.disabled = false;
    }
  });
function RequisiçãoGETaeroporto() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/listarAeroportos', requestOptions)
    .then(T => T.json());
}

function exibirAeroporto() {
  console.log('Entrou no exibir...');
  RequisiçãoGETaeroporto()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherSelect(customResponse.payload, vetorDropdownOrigem, 'nome');
        preencherSelect(customResponse.payload, vetorDropdownDestino, 'nome'); 
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}


//function preencherSelect(options, vetor, casca) {
//    for (let i = 0; i < vetor.length; i++) {
//        const selectDrop = document.getElementById(vetor[i]);
//        // Verifique se o elemento foi encontrado
//        if (!selectDrop) {
//            console.error(`Elemento com ID ${vetor[i]} não encontrado.`);
//            continue; // Pule para a próxima iteração do loop
//        }
//        
//      const defaultOption = document.createElement('option');
//      defaultOption.value = ''; 
//      defaultOption.text = 'Selecione uma opção';
//      selectDrop.appendChild(defaultOption);
//    
//      
//      options.forEach(optionValue => {
//        console.log("Código Aeroporto: " + JSON.stringify(optionValue));
//        const option = document.createElement('option');
//        option.value = optionValue.codigo; 
//        option.innerHTML = optionValue[casca]; 
//        selectDrop.appendChild(option);
//      });
//    }
//  }

function RequisiçãoPOSTDados(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch('http://localhost:3000/listarBuscaVoos', requestOptions)
    .then(response => response.json());
}

async function selecionarVoos() {
  const data = document.getElementById('dataIda').value;
  const origem = document.getElementById('selectOrigemAeroportoCad').options[document.getElementById('selectOrigemAeroportoCad').selectedIndex].text;
  const destino = document.getElementById('selectDestinoAeroportoCad').options[document.getElementById('selectDestinoAeroportoCad').selectedIndex].text;
  // Formatar a data antes de enviar para o backend
  const dataFormatada = new Date(data + "T00:00:00").toLocaleDateString();

  console.log(dataFormatada);
  console.log(origem);
  console.log(destino);
  await RequisiçãoPOSTDados({
    data: dataFormatada,
    origem: origem,
    destino: destino
  })
  .then(customResponse => {
    if (customResponse.status === "SUCCESS") {
      //showStatusMessage("Busca realizada com sucesso.", false, "statusBusca");
      exibirVoos(customResponse.payload);
    } else {
      //showStatusMessage("Erro ao buscar voos: " + customResponse.message, true, "statusBusca");
      console.log(customResponse.message);
    }
  })
  .catch((e) => {
    //showStatusMessage("Erro técnico ao Buscar... Contate o suporte.", true, "statusBusca");
    console.log("Não foi possível buscar." + e);
  });
}

function exibirVoos(voos) {
  console.log('Entrou no exibir...');
  preencherTabela(voos);
}

function preencherTabela(voos) {
  const tblBody = document.getElementById('listaVoos');
  tblBody.innerHTML = ""; // Limpar a tabela antes de preenchê-la novamente

  voos.forEach((voo) => {
    const row = document.createElement('tr');
    row.classList.add('tableHover');
    row.innerHTML = `
    <td id="codigo">${voo.codigo}</td>
    <td>${voo.data}</td>
    <td>${voo.trecho}</td>
    <td>${voo.hrSaida}</td>
    <td>${voo.hrChegada}</td>
    <td>${voo.origem}</td>
    <td>${voo.destino}</td>
    <td>${voo.valor}</td>`;
    tblBody.appendChild(row);
  });
}

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}