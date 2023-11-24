 // Função para criar o mapa de assentos
 function createSeatMap(assentos) {
     // Número de linhas e colunas
     const rows = 20;
     const cols = 6;
     // Seleciona a Div onde virá o mapa
     const seatMap = document.getElementById('seatMap');
     // Cria o numero de assentos dependendo da quantidade de linhas inseridas a cima
     for (let row = 1; row <= rows; row++) {
         const seatRow = document.createElement('div');
         seatRow.classList.add('my-row');
         seatMap.appendChild(seatRow);
         for (let col = 1; col <= cols; col++) {
             // Cria o espaço entre os assentos 
             if (col === 4) {
                 const space = document.createElement('div');
                 space.classList.add('space');
                 seatRow.appendChild(space);
             }

             const seat = document.createElement('div');
             seat.classList.add('my-seat');
             const assentoIndex = (row - 1) * cols + col - 1;

             if(assentos && assentos[assentoIndex]) {
             seat.innerHTML = `<img id="${assentos[assentoIndex].codigo}" class="my-img" src="/frontend/assets/images/assento-cinza.png">`;
             console.log(`Assento gerado com ID: ${assentos[assentoIndex].codigo}`);
             
             // Adicionar informações do assento como atributos de dados
             seat.setAttribute('data-codigo', assentos[assentoIndex].codigo);
             seat.setAttribute('data-numero', assentos[assentoIndex].numero);
             seat.setAttribute('data-ocupado', assentos[assentoIndex].ocupado);
             // Verifica se o assento está ocupado
             if (assentos[assentoIndex].ocupado === '1') {
                seat.classList.add('occupied');
                const seatImage = seat.querySelector('img');
                seatImage.src = "/frontend/assets/images/assento-vermelho.png"; // Altere o caminho para a imagem ocupada
             }
             seat.addEventListener('click', () => toggleSeatSelection(seat));
             seatRow.appendChild(seat);
            } else {
                seat.innerHTML = `<img class="my-img" src="/frontend/assets/images/assento-cinza.png">`;
            }
         }
     }
}
 // Função para alternar a seleção de assento
 function toggleSeatSelection(seat) {
     if (!seat.classList.contains('space')) {
         seat.classList.toggle('selected');
         const seatImage = seat.querySelector('img');
         if (seat.classList.contains('selected')) {
             seatImage.src = "/frontend/assets/images/assento-amarelo.png"; // Altere o caminho para a imagem selecionada
         } else {
             seatImage.src = "/frontend/assets/images/assento-cinza.png"; // Altere o caminho para a imagem desselecionada
         }
         updateSelectedSeats();
     }
}
// Função para atualizar o assento selecionado na página
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.my-seat.selected');
    const selectedSeat = document.getElementById('selectedSeat');
    
    // Mapeia os assentos selecionados para seus números
    const selectedSeatNumbers = Array.from(selectedSeats).map(seat => {
        const numeroAssento = seat.getAttribute('data-numero');
        return numeroAssento;
    });

    // Atualiza o conteúdo da página com os números dos assentos selecionados
    selectedSeat.textContent = selectedSeatNumbers.join(', ');
    return selectedSeatNumbers;
}
 
 function obterParametroDaURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Obter o valor do parâmetro 'nome' da URL
const codigo = obterParametroDaURL('codigo');
const valor = decodeURIComponent(obterParametroDaURL('valor'));

// Fazer algo com o valor (exibindo no console neste exemplo)
console.log('Codigo:', codigo);
console.log('Valor do voo:', valor);

function RequisiçãoPOSTAssentos(body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/listarAssentos', requestOptions)
      .then(response => response.json());
  }

  async function selecionarAssentos() {
    const codigo = obterParametroDaURL('codigo');
    
    await RequisiçãoPOSTAssentos({
      voo: codigo,
    })
    .then(customResponse => {
      if (customResponse.status === "SUCCESS") {
        //showStatusMessage("Busca realizada com sucesso.", false, "statusBusca");
        exibirAssentos(customResponse.payload);
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

  function exibirAssentos(assentos) {
    console.log('Entrou no exibir...');
    createSeatMap(assentos);
  }

document.getElementById('voltar').addEventListener('click', function() {
    // Redirecionar para a página BuscaVoo.html
    window.location.href = '/frontend/USER/screens/BuscaVoo.html';
});

document.getElementById('buy').addEventListener('click', function() {
    // Obter os valores necessários
    const codigoVoo = obterParametroDaURL('codigo'); 
    const valorVoo = obterParametroDaURL('valor'); 
    const assentosSelecionados = updateSelectedSeats();
    console.log('Assentos selecionados:', assentosSelecionados); 

    // Construir a URL da página de pagamentos com os parâmetros desejados
    const urlPagamento = `/frontend/USER/screens/pagamento.html?codigoVoo=${codigoVoo}&valorVoo=${valorVoo}&assentos=${assentosSelecionados.join(',')}`;

    // Redirecionar para a página de pagamentos
    window.location.href = urlPagamento;
});

