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
    let divOne = document.getElementById(divVisivel);
    let divTwo = document.getElementById(divOculta);
  
    if (divOne.style.display != 'none') {
      divOne.style.display = 'none';
      divTwo.style.display = 'block';
    }
    defineAlturaTabela('divCadastrar');
  }
  
  function limparStatus(statusToClean) {
    var statusClean = document.getElementById(statusToClean);
    statusClean.textContent = '';
    defineAlturaTabela('divCadastrar');
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
    defineAlturaTabela('divCadastrar');
  }

  function defineAlturaTabela(divVisivel) {
    var divOne = document.getElementById(divVisivel);
    let alturaTitulo = 0;
    let alturaForm = 0;

    if (divOne.style.display !== 'none') {
      var titulo = document.getElementById('titleCadastrar');
      alturaTitulo = titulo.offsetHeight;
      var formulario = document.getElementById('formCadastrar');
      alturaForm = formulario.offsetHeight;
    } else {
      var titulo = document.getElementById('titleAlterar');
      alturaTitulo = titulo.offsetHeight;
      var formulario = document.getElementById('formAlterar');
      alturaForm = formulario.offsetHeight;
    }
    const tabela = document.getElementById('cadastros');
    tabela.style.maxHeight = alturaTitulo + alturaForm + 'px';
    console.log(tabela.style.maxHeight);
  }
  
 