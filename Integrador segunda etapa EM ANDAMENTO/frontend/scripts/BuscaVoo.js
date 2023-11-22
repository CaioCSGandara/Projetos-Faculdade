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

function RequisiçãoGETDados() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch('http://localhost:3000/listarBuscaVoos', requestOptions)
    .then(T => T.json());
}

async function selecionarVoos() {
  const data = document.getElementById('dataIda').value;
  const origem = document.getElementById('selectOrigemAeroportoCad').options[document.getElementById('selectOrigemAeroportoCad').selectedIndex].value;
  const destino = document.getElementById('selectDestinoAeroportoCad').options[document.getElementById('selectDestinoAeroportoCad').selectedIndex].value;

  await RequisiçãoGETDados({
    data: data,
    origem: origem,
    destino: destino
  })
  .then(customResponse => {
    if (customResponse.status === "SUCCESS") {
      showStatusMessage("Busca realizada com sucesso.", false, "statusBusca");
      exibirVoos();
    } else{
      showStatusMessage("Erro ao buscar voos: " + customResponse.message, true, "statusBusca");
      console.log(customResponse.message);
    }
  })
  .catch((e) => {
    showStatusMessage("Erro técnico ao Buscar... Contate o suporte.", true, "statusBusca");
    console.log("Não foi possível buscar." + e);
  });
}

function exibirVoos() {
  console.log('Entrou no exibir...');
  RequisiçãoGETDados()
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        console.log("Deu certo a busca de dados");
        console.log('Payload:' + JSON.stringify(customResponse.payload));
        preencherTabela(customResponse.payload, vetorTabela, 'nome');
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}
  
function preencherTabela(options, vetor, casca) {
  const tblBody = document.getElementById('tBody');
  Voo.forEach((Voo)=> {
    const row = document.createElement('tr');
    row.classList.add('tableHover');
    row.innerHTML = `
    <td id="codigo">${Voo.codigo}</td>
    <td>${Voo.data}</td>
    <td>${Voo.trecho}</td>
    <td>${Voo.hr_saida}</td>
    <td>${Voo.hr_chegada}</td>
    <td>${Voo.origem}</td>
    <td>${Voo.destino}</td>
    <td>${Voo.valor}</td>`;
    tblBody.appendChild(row);
  })
}