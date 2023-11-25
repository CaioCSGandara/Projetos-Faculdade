
// Função para obter o valor de um parâmetro da URL
function obterParametroDaURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Função para verificar os parâmetros da URL e realizar a lógica necessária
function verificarParametrosDaURL() {
    // Obter os parâmetros da URL
    const codigoVoo = obterParametroDaURL('codigoVoo');
    const valorVoo = obterParametroDaURL('valorVoo');
    const assentosSelecionados = obterParametroDaURL('assentos');

    // Exibir os parâmetros no console para verificação
    console.log('Código do Voo:', codigoVoo);
    console.log('Valor do Voo:', valorVoo);
    console.log('Assentos Selecionados:', assentosSelecionados);

    // Adicionar lógica adicional conforme necessário, por exemplo, exibir os parâmetros na página
    // ...

    // Realizar o restante da lógica da página de pagamento, se necessário
    // ...
}

function alternarDivsPagamento() {
    let divOne1 = document.getElementById('divFormularioPagamento');
    let divOne2 = document.getElementById('divFormularioPix');
    let opcModalPix = document.getElementById('pix');
    let opcModalCard = document.getElementById('credit');

    if (opcModalPix.checked) {
        divOne2.style.display = 'block';
        divOne1.style.display = 'none';
    } else {
        divOne2.style.display = 'none';
        divOne1.style.display = 'block';
    }
}

document.getElementById('pix').addEventListener('change', alternarDivsPagamento);
document.getElementById('credit').addEventListener('change', alternarDivsPagamento);


function limparFormulario() { // type = reset nao funcionou
    const vetIdForm = ["cardholder-name", "cardholder-email", "card-number", "cardholder-expiryDate", "card-cvv-number"];

    for (let i = 0; i < vetIdForm.length; i++) {
        document.getElementById(vetIdForm[i]).value = '';
    }
}

let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
console.log(numeroAleatorio);

let n = 0;

function processPayment() {

    let email = document.getElementById('cardholder-email');
    let mensagem = document.getElementById('mensagemPagamento');

    let mensagemValidacao = ValidaFormCred();

    if (mensagemValidacao === "") {
        n++;

        if (n < numeroAleatorio) {
            mensagem.innerText = "Ocorreu um erro com o pagamento, tente novamente com outro cartão";
        } else if (n === numeroAleatorio) {
            mensagem.innerText = `Pagamento concluído com sucesso! Um voucher está sendo enviado para o seu email: ${email.value}`;
            return;
        } 
    } else {
        mensagem.innerText = mensagemValidacao;
    }
}

function ValidaFormCred() {
    let mensagem = "";
    const vetIdForm = ["cardholder-name", "cardholder-email", "card-number", "cardholder-expiryDate", "card-cvv-number"];

    var nome = document.getElementById(vetIdForm[0]).value;
    if (nome === "") {
        mensagem = "Preencha o nome do cartão.";
        return mensagem;
    }

    var email = document.getElementById(vetIdForm[1]).value;
    if (email === "") {
        mensagem = "Preencha o e-mail.";
        return mensagem;
    }

    var numeroCartao = document.getElementById(vetIdForm[2]).value;
    if (numeroCartao === "") {
        mensagem = "Preencha o número do cartão.";
        return mensagem;
    }

    var dataExpiracao = document.getElementById(vetIdForm[3]).value;
    if (dataExpiracao === "") {
        mensagem = "Preencha a data de expiração do cartão.";
        return mensagem;
    }

    var cvv = document.getElementById(vetIdForm[4]).value;
    if (cvv === "") {
        mensagem = "Preencha o CVV do cartão.";
        return mensagem;
    }

    return mensagem;
}

