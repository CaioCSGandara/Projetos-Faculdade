
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
