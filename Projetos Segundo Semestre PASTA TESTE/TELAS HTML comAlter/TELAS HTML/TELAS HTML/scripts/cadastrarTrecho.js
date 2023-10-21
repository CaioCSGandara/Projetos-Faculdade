
function RequisiçãoGETaeroporto() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarAeroportos', requestOptions)
      .then(T => T.json());
  }

  function preencherSelectAeroportosOrigem(options) {
    const aeroportoSelect = document.getElementById('selectOrigemAeroporto');

    options.forEach(optionValue => {
      console.log("Código Aeroporto: " + JSON.stringify(optionValue));
      const option = document.createElement('option');
      option.value = optionValue.codigo;  // Definindo o valor corretamente
      option.innerHTML = optionValue.sigla;  // Definindo o texto do option
      aeroportoSelect.appendChild(option);
    });
  }

  function preencherSelectAeroportosDestino(options) {
    const aeroportoSelect = document.getElementById('selectDestinoAeroporto');

    options.forEach(optionValue => {
      console.log("Código Aeroporto: " + JSON.stringify(optionValue));
      const option = document.createElement('option');
      option.value = optionValue.codigo;  // Definindo o valor corretamente
      option.innerHTML = optionValue.sigla;  // Definindo o texto do option
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

  function RequisiçãoGETaeronave() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/listarAeronaves', requestOptions)
      .then(T => T.json());
  }

  function preencherSelectAeronaves(options) {
    const aeroSelect = document.getElementById('selectAeronave');
    options.forEach(optionValue => {
      console.log("Código Aeronave: " + JSON.stringify(optionValue));
      const option = document.createElement('option');
      option.value = optionValue.codigo;  // Definindo o valor corretamente
      option.innerHTML = optionValue.modelo;  // Definindo o texto do option
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

  function nomePreenchido(){
    const nome = document.getElementById("nome").value.trim();
    return nome.length > 0;
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

    if(!nomePreenchido()){
      showStatusMessage("Preencha o nome do trecho.", true);
      return;
    }

    const nome = document.getElementById("nome").value;
    const origem = document.getElementById("selectOrigemAeroporto").options[document.getElementById("selectOrigemAeroporto").selectedIndex].value;
    console.log(origem)
    const destino = document.getElementById("selectDestinoAeroporto").options[document.getElementById("selectDestinoAeroporto").selectedIndex].value;
    console.log(destino)
    const aeronave = document.getElementById("selectAeronave").options[document.getElementById("selectAeronave").selectedIndex].value;

    fetchInserir({
        nome: nome, 
        origem: origem,
        destino: destino,
        aeronave: aeronave
    })
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        showStatusMessage("Trecho cadastrado com sucesso.", false);
      } else {
        showStatusMessage("Erro ao cadastrar trecho: " + customResponse.message, true);
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
