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


  