// VETORES DE ID DOS LABELS

const vetorIdsLabelAeronave = ["codigoAlterar", "comboFabricantesAlterar", "modeloAlterar", "anoFabAlterar", "totalAssentosAlterar", "referenciaAlterar"];
const vetorIdsLabelCidade = ["codigoCidade", "nomeCidade", "ufCidade", "paisCidade"];
const vetorIdsLabelAeroporto = ["codigoAlterar", "nomeAlterar", "siglaAlterar", "cidadeAlterar"];
const vetorDropdownAeroporto = ["cidadeCadastrar", "cidadeAlterar"];
// FUNÇÕES GLOBAIS

function limparTabela() {
  const tblBody = document.querySelector("tbody");
  tblBody.innerHTML = ''; // Remove todo o conteúdo da tabela
}


function alternarDivs(divVisivel, divOculta) {
    var divOne = document.getElementById(divVisivel);
    var divTwo = document.getElementById(divOculta);
  
    if (divOne.style.display != 'none') {
      divOne.style.display = 'none';
      divTwo.style.display = 'block';
    }
  
  }
  
  function limparStatus(statusToClean) {
    var statusClean = document.getElementById(statusToClean);
    statusClean.textContent = '';
  }
    
  let codigoToUse = null;
  
  function popUpDeletar(codigoCapturado) {
    codigoToUse = codigoCapturado;
    const popup = document.getElementById('popUpDelete');
    popup.showModal();
  }
  
  function fechaPopUpDeletar() {
    const popup = document.getElementById('popUpDelete');
    popup.close();
  }
  
  function exibeCodigo(codigoCapturado, idP) {
    codigoToUse=codigoCapturado;
      var pCodigo = document.getElementById(idP);
      pCodigo.textContent = `${codigoToUse}`;
  }
  
  function preencherAlterar(elemento, vetor) {
    const tdImagem = elemento.parentNode;
    const linha = tdImagem.parentNode;
    const tamanhoLinha = linha.cells.length -2 ;
    console.log(tamanhoLinha);
    const elementosLinha = linha.querySelectorAll('td')
    let elementoPreencher = null;
    for(i=0;i<tamanhoLinha;i++) {
        elementoPreencher = document.getElementById(vetor[i]);
        elementoPreencher.value = elementosLinha[i].textContent;
    }
  }

  function showStatusMessage(msg, error, idStatus){
    var pStatus = document.getElementById(idStatus);
    if (error === true){
      pStatus.className = "statusError";
    } else {
      pStatus.className = "statusSuccess";
    }
    pStatus.textContent = msg;
  }