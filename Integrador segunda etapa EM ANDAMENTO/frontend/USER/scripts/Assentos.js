 // Função para criar o mapa de assentos
 function createSeatMap() {
     // Número de linhas e colunas
     const rows = 20;
     const cols = 6;
     // Assentos ocupados (exemplo: linha 2, coluna 3)
     const occupiedSeats = [{ row: 18, col: 1 }, { row: 2, col: 2 }, { row: 4, col: 3 }, { row: 20, col: 6 }];
     // Seleciona a Div onde virá o mapa
     const seatMap = document.getElementById('seatMap');
     let seatCounter = rows*cols;
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
             seat.innerHTML = `<img id="${seatCounter}" class="my-img" src="../../assets/images/assento-cinza.png">`;
             seatCounter--;
            
             // Verifica se o assento está ocupado
             if (occupiedSeats.some(seatData => seatData.row === row && seatData.col === col)) {
                 seat.classList.add('occupied');
                 const seatImage = seat.querySelector('img');
                 seatImage.src = "../../assets/images/assento-vermelho.png"; // Altere o caminho para a imagem ocupada
         }
             seat.addEventListener('click', () => toggleSeatSelection(seat));
             seatRow.appendChild(seat);
         }
     }
}
 // Função para alternar a seleção de assento
 function toggleSeatSelection(seat) {
     if (!seat.classList.contains('space')) {
         seat.classList.toggle('selected');
         const seatImage = seat.querySelector('img');
         if (seat.classList.contains('selected')) {
             seatImage.src = "../../assets/images/assento-amarelo.png"; // Altere o caminho para a imagem selecionada
         } else {
             seatImage.src = "../../assets/images/assento-cinza.png"; // Altere o caminho para a imagem desselecionada
         }
         updateSelectedSeat();
     }
}
 // Função para atualizar o assento selecionado na página
 function updateSelectedSeat() {
     const selectedSeats = document.querySelectorAll('.my-seat.selected');
     const selectedSeat = document.getElementById('selectedSeat');
     selectedSeat.textContent = Array.from(selectedSeats).map(seat => seat.querySelector('img').id).join(', ');
 }
 
 function obterParametroDaURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Obter o valor do parâmetro 'nome' da URL
const codigo = obterParametroDaURL('codigo');

// Fazer algo com o valor (exibindo no console neste exemplo)
console.log('Codigo:', codigo);