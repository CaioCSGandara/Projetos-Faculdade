"use strict";
// Neste arquivo conversores, vamos sempre converter uma 
// resposta de consulta do Oracle para um tipo que desejarmos
// portanto o intuito desse arquivo typescript é reunir funções
// que convertam de "linha do oracle" para um array javascript onde
// cada elemento represente um elemento de um tipo. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowsToDados = exports.rowsToAeronaves = exports.rowsToAeroportos = exports.rowsToCidades = exports.rowsToTrechos = void 0;
function rowsToTrechos(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Aeronave
    let trechos = [];
    let trecho;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            trecho = {
                codigo: registro.CODIGO,
                nome: registro.NOME,
                origem: registro.ORIGEM,
                destino: registro.DESTINO,
                aeronave: registro.AERONAVE,
                origemNome: registro.ORIGEM_NOME,
                destinoNome: registro.DESTINO_NOME,
                aeronaveNome: registro.AERO_NOME,
            };
            // inserindo o novo Array convertido.
            trechos.push(trecho);
        });
    }
    return trechos;
}
exports.rowsToTrechos = rowsToTrechos;
function rowsToCidades(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Aeronave
    let cidades = [];
    let cidade;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            cidade = {
                codigo: registro.CODIGO,
                nome: registro.NOME,
                uf: registro.UF,
                pais: registro.PAIS,
            };
            // inserindo o novo Array convertido.
            cidades.push(cidade);
        });
    }
    return cidades;
}
exports.rowsToCidades = rowsToCidades;
function rowsToAeroportos(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Aeroportos
    let aeroportos = [];
    let aeroporto;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            aeroporto = {
                codigo: registro.CODIGO,
                nome: registro.NOME,
                sigla: registro.SIGLA,
                cidade: registro.CIDADE,
                cidadeNome: registro.CIDADE_NOME, // 099 - o novo campo que é o nome da cidade 
            };
            // inserindo o novo Array convertido.
            aeroportos.push(aeroporto);
        });
    }
    return aeroportos;
}
exports.rowsToAeroportos = rowsToAeroportos;
function rowsToAeronaves(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Aeronave
    let aeronaves = [];
    let aeronave;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            aeronave = {
                codigo: registro.CODIGO,
                fabricante: registro.FABRICANTE,
                modelo: registro.MODELO,
                anoFabricacao: registro.ANO_FABRICACAO,
                totalAssentos: registro.TOTAL_ASSENTOS,
                referencia: registro.REFERENCIA,
            };
            // inserindo o novo Array convertido.
            aeronaves.push(aeronave);
        });
    }
    return aeronaves;
}
exports.rowsToAeronaves = rowsToAeronaves;
function rowsToDados(oracleRows) {
    // vamos converter um array any (resultados do oracle)
    // em um array de Aeronave
    let dados = [];
    let dado;
    if (oracleRows !== undefined) {
        oracleRows.forEach((registro) => {
            dado = {
                codigo: registro.CODIGO,
                data: registro.DATA_VOO,
                trecho: registro.NOME,
                hrSaida: registro.HR_SAIDA,
                hrChegada: registro.HR_CHEGADA,
                origem: registro.ORIGEM,
                destino: registro.DESTINO,
                valor: registro.VALOR,
            };
            // inserindo o novo Array convertido.
            dados.push(dado);
        });
    }
    return dados;
}
exports.rowsToDados = rowsToDados;
