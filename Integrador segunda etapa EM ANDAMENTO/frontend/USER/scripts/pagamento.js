function processPayment() {
    const paymentType = document.querySelector('input[name="payment"]:checked').value;
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const paymentMessage = document.getElementById('payment-message');

    if (fullName === '' || email === '') {
        paymentMessage.textContent = 'Por favor, preencha seu nome completo e e-mail.';
        paymentMessage.classList.add('error-message');  // Adiciona a classe de estilo de erro
        return;
    }

    if (paymentType === 'pix') {
        paymentMessage.textContent = 'Pagamento não aprovado. Tente novamente.';
        paymentMessage.classList.add('error-message');  // Adiciona a classe de estilo de erro
    } else if (paymentType === 'credit') {
        paymentMessage.textContent = 'Pagamento aprovado. Voucher enviado por email.';
        paymentMessage.classList.remove('error-message');  // Remove a classe de estilo de erro, se presente
        paymentMessage.classList.add('payment-message');  // Adiciona a classe de estilo de pagamento
        sendVoucherByEmail(email);
    }
}

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