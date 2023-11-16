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