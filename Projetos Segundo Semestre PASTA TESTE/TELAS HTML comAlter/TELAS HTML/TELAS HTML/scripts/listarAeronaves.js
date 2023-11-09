function RequisiçãoGETlistarAeronaves() {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    return fetch('http://localhost:3000/listarAeronvaes', requestOptions)
      .then(T => T.json());
  }
  function preencherTabela(dados) {
    const tblBody = document.querySelector("tbody");
    dados.forEach((aeronaves) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="leftText" id="codigo">${aeronaves.codigo}</td>
            <td class="leftText">${aeronaves.fabricante}</td>
            <td class="centerText">${aeronaves.modelo}</td>
            <td class="rightText">${aeronvaes.ano_fabricacao}</td>
            <td class="rightText">${aeronaves.totalassentos}</td>
            <td class="rightText">${aeronvaes.referencia}</td>
            <td><a href="/SELECT/TabelaInicial.html" onclick="alternarDivs('${aeronaves.codigo}')"><button type='alter'>Alterar</button></a></td>
            <td><a href="/SELECT/TabelaInicial.html" onclick="deletarVoo('${aeronaves.codigo}')"><button type='delete'>Delete</button></a></td>
            
        `;
        tblBody.appendChild(row);
    });
}

function exibirAeronvaes() {
    console.log('Entrou no exibir...');
    RequisiçãoGETlistarAeronvaes()
      .then(customResponse => {
        if (customResponse.status === "SUCCESS") {
          console.log("Deu certo a busca de dados");
          console.log('Payload:' + JSON.stringify(customResponse.payload));
          preencherTabela(customResponse.payload); // Removido o parse redundante
        } else {
          console.log(customResponse.message);
        }
      })
      .catch((e) => {
        console.log("Não foi possível exibir." + e);
      });
  }