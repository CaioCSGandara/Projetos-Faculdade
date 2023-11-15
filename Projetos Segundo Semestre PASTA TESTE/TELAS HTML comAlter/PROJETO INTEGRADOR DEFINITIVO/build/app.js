"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/***
 * Versão melhorada do backend.
 *
 * 1 - externalização da constante oraConnAttribs (pois é usada em todos os serviços);
 * O processo de externalizar é tirar aquela constante de dentro de cada serviço e colocá-la na área "global"
 *
 * 2 - criação de um tipo estruturado chamado aeronave.
 *
 * 3 - criação de uma função para validar se os dados da aeronave existem.
 *
 * 4 - retorno correto do array em JSON para representar as AERONAVES cadastradas.
 *
 */
// recursos/modulos necessarios.
const express_1 = __importDefault(require("express"));
const oracledb_1 = __importDefault(require("oracledb"));
const cors_1 = __importDefault(require("cors"));
// criamos um arquivo para conter só a constante de conexão do oracle. com isso deixamos o código mais limpo por aqui
const OracleConnAtribs_1 = require("./OracleConnAtribs");
// conversores para facilitar o trabalho de conversão dos resultados Oracle para vetores de tipos nossos.
const Conversores_1 = require("./Conversores");
// validadores para facilitar o trabalho de validação.
const Validadores_1 = require("./Validadores");
// preparar o servidor web de backend na porta 3000
const app = (0, express_1.default)();
const port = 3000;
// preparar o servidor para dialogar no padrao JSON 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Acertando a saída dos registros oracle em array puro javascript.
oracledb_1.default.outFormat = oracledb_1.default.OUT_FORMAT_OBJECT;
// Listar Trechos
app.get("/listarTrechos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`
    SELECT CODIGO, NOME, ORIGEM, DESTINO, AERONAVE FROM TRECHOS`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        cr.payload = ((0, Conversores_1.rowsToTrechos)(resultadoConsulta.rows));
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
// Listar Cidades
app.get("/listarCidades", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`
    SELECT CODIGO, NOME, UF, PAIS FROM CIDADES`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        cr.payload = ((0, Conversores_1.rowsToCidades)(resultadoConsulta.rows));
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
// Listar Aeronaves
app.get("/listarAeronaves", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`
    SELECT CODIGO, FABRICANTE, MODELO, ANO_FABRICACAO, TOTAL_ASSENTOS, REFERENCIA FROM AERONAVES`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        cr.payload = ((0, Conversores_1.rowsToAeronaves)(resultadoConsulta.rows));
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
app.get("/listarAeroportos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`
    SELECT CODIGO, NOME, SIGLA, CIDADE FROM AEROPORTOS`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        cr.payload = ((0, Conversores_1.rowsToAeroportos)(resultadoConsulta.rows));
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
// servicos de backend
app.get("/listarDados", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        // atenção: mudamos a saída para que o oracle entregue um objeto puro em JS no rows.
        // não mais um array dentro de array.
        let resultadoConsulta = yield connection.execute(`
    SELECT VOOS.CODIGO, TO_CHAR(VOOS.DATA_VOO, 'dd/mm/yyyy') AS DATA_VOO, TRECHOS.NOME, TRECHOS.NOME, TO_CHAR(VOOS.HR_SAIDA, 'HH24:MI') AS HR_SAIDA, TO_CHAR(VOOS.HR_CHEGADA, 'HH24:MI') AS HR_CHEGADA, ORIGEM.NOME AS ORIGEM, DESTINO.NOME AS DESTINO
    FROM VOOS 
    INNER JOIN TRECHOS ON VOOS.TRECHO = TRECHOS.CODIGO 
    INNER JOIN AEROPORTOS ORIGEM ON TRECHOS.ORIGEM = ORIGEM.CODIGO
    INNER JOIN AEROPORTOS DESTINO ON TRECHOS.DESTINO = DESTINO.CODIGO`);
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        // agora sempre vamos converter as linhas do oracle em resultados do nosso TIPO.
        //cr.payload = (rowsToAeronaves(resultadoConsulta.rows));
        cr.payload = ((0, Conversores_1.rowsToDados)(resultadoConsulta.rows));
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
app.put("/inserirAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // UAU! Agora com um tipo definido podemos simplesmente converter tudo que 
    // chega na requisição para um tipo nosso!
    const aero = req.body;
    console.log(aero);
    // antes de prosseguir, vamos validar a aeronave!
    // se não for válida já descartamos.
    let [valida, mensagem] = (0, Validadores_1.aeronaveValida)(aero);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        // continuamos o processo porque passou na validação.
        let connection;
        try {
            const cmdInsertAero = `INSERT INTO AERONAVES 
      (CODIGO, FABRICANTE, MODELO, ANO_FABRICACAO, TOTAL_ASSENTOS, REFERENCIA)
      VALUES
      (SEQ_AERONAVES.NEXTVAL, :1, :2, :3, :4, :5)`;
            const dados = [aero.fabricante, aero.modelo, aero.anoFabricacao, aero.totalAssentos, aero.referencia];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resInsert = yield connection.execute(cmdInsertAero, dados);
            // importante: efetuar o commit para gravar no Oracle.
            yield connection.commit();
            // obter a informação de quantas linhas foram inseridas. 
            // neste caso precisa ser exatamente 1
            const rowsInserted = resInsert.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Aeronave inserida.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
app.put("/inserirAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // UAU! Agora com um tipo definido podemos simplesmente converter tudo que 
    // chega na requisição para um tipo nosso!
    const aero = req.body;
    console.log(aero);
    let connection;
    try {
        const cmdInsertAero = `INSERT INTO AEROPORTOS 
        (CODIGO, NOME, SIGLA, CIDADE)
        VALUES
        (SEQ_AEROPORTOS.NEXTVAL, :1, :2, :3)`;
        const dados = [aero.nome, aero.sigla, aero.cidade];
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        let resInsert = yield connection.execute(cmdInsertAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Aeroporto inserido.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        //fechar a conexao.
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
app.put("/inserirTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // UAU! Agora com um tipo definido podemos simplesmente converter tudo que 
    // chega na requisição para um tipo nosso!
    const trecho = req.body;
    console.log(trecho);
    let connection;
    try {
        const cmdInsertAero = `INSERT INTO TRECHOS 
        (CODIGO, NOME, ORIGEM, DESTINO, AERONAVE)
        VALUES
        (SEQ_TRECHOS.NEXTVAL, :1, :2, :3, :4)`;
        const dados = [trecho.nome, trecho.origem, trecho.destino, trecho.aeronave];
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        let resInsert = yield connection.execute(cmdInsertAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Trecho inserido.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        //fechar a conexao.
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
app.put("/inserirVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // UAU! Agora com um tipo definido podemos simplesmente converter tudo que 
    // chega na requisição para um tipo nosso!
    const voo = req.body;
    console.log(voo);
    let connection;
    try {
        const cmdInsertAero = `INSERT INTO VOOS
        (CODIGO, DATA_VOO, HR_CHEGADA, HR_SAIDA, VALOR, TRECHO)
        VALUES
        (:1, TO_DATE(:2, 'yyyy-mm-dd'), TO_DATE(:3, 'hh24:mi:ss'),  
        TO_DATE(:4, 'hh24:mi:ss'), :5, :6)`;
        const dados = [voo.codigo, voo.dataVoo, voo.hrChegada, voo.hrSaida, voo.valor, voo.trecho];
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        let resInsert = yield connection.execute(cmdInsertAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Voo inserido.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        //fechar a conexao.
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
app.put("/inserirCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // UAU! Agora com um tipo definido podemos simplesmente converter tudo que 
    // chega na requisição para um tipo nosso!
    const cidade = req.body;
    console.log();
    // continuamos o processo porque passou na validação.
    let connection;
    try {
        const cmdInsertAero = `INSERT INTO CIDADES
        (CODIGO, NOME, UF, PAIS)
        VALUES
        (SEQ_CIDADES.NEXTVAL, :1, :2, :3)`;
        const dados = [cidade.nome, cidade.uf, cidade.pais];
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        let resInsert = yield connection.execute(cmdInsertAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Cidade inserida.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        //fechar a conexao.
        if (connection !== undefined) {
            yield connection.close();
        }
        res.send(cr);
    }
}));
app.delete("/excluirVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // excluindo o voo pelo código dele:
    const codigo = req.body.codigo;
    console.log('Codigo recebido: ' + codigo);
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // conectando 
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const cmdDeleteAero = `DELETE VOOS WHERE codigo = :1`;
        const dados = [codigo];
        let resDelete = yield connection.execute(cmdDeleteAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsDeleted = resDelete.rowsAffected;
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Voo excluído.";
        }
        else {
            cr.message = "Voo não excluído. Verifique se o código informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        // fechando a conexao
        if (connection !== undefined)
            yield connection.close();
        // devolvendo a resposta da requisição.
        res.send(cr);
    }
}));
app.delete("/excluirAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // excluindo a aeronave pelo código dela:
    const codigo = req.body.codigo;
    console.log('Codigo recebido: ' + codigo);
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // conectando 
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const cmdDeleteAero = `DELETE AERONAVES WHERE codigo = :1`;
        const dados = [codigo];
        let resDelete = yield connection.execute(cmdDeleteAero, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsDeleted = resDelete.rowsAffected;
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Aeronave excluída.";
        }
        else {
            cr.message = "Aeronave não excluído. Verifique se o código informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        // fechando a conexao
        if (connection !== undefined)
            yield connection.close();
        // devolvendo a resposta da requisição.
        res.send(cr);
    }
}));
app.delete("/excluirAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // excluindo o aeroporto pelo código dele:
    const codigo = req.body.codigo;
    console.log('Codigo recebido: ' + codigo);
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // conectando 
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const cmdDeleteAeroporto = `DELETE AEROPORTOS WHERE codigo = :1`;
        const dados = [codigo];
        let resDelete = yield connection.execute(cmdDeleteAeroporto, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsDeleted = resDelete.rowsAffected;
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Aeroporto excluído.";
        }
        else {
            cr.message = "Aeroporto não excluído. Verifique se o código informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        // fechando a conexao
        if (connection !== undefined)
            yield connection.close();
        // devolvendo a resposta da requisição.
        res.send(cr);
    }
}));
app.delete("/excluirTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // excluindo o trecho pelo código dele:
    const codigo = req.body.codigo;
    console.log('Codigo recebido: ' + codigo);
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // conectando 
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const cmdDeleteTrecho = `DELETE TRECHOS WHERE codigo = :1`;
        const dados = [codigo];
        let resDelete = yield connection.execute(cmdDeleteTrecho, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsDeleted = resDelete.rowsAffected;
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Trecho excluído.";
        }
        else {
            cr.message = "Trecho não excluído. Verifique se o código informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        // fechando a conexao
        if (connection !== undefined)
            yield connection.close();
        // devolvendo a resposta da requisição.
        res.send(cr);
    }
}));
app.delete("/excluirCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // excluindo a cidade pelo código dela:
    const codigo = req.body.codigo;
    console.log('Codigo recebido: ' + codigo);
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // conectando 
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const cmdDeleteCid = `DELETE CIDADES WHERE codigo = :1`;
        const dados = [codigo];
        let resDelete = yield connection.execute(cmdDeleteCid, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsDeleted = resDelete.rowsAffected;
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Cidade excluída.";
        }
        else {
            cr.message = "Cidade não excluída. Verifique se o código informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        // fechando a conexao
        if (connection !== undefined)
            yield connection.close();
        // devolvendo a resposta da requisição.
        res.send(cr);
    }
}));
app.delete("/excluirAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // excluindo a cidade pelo código dela:
    const codigo = req.body.codigo;
    console.log('Codigo recebido: ' + codigo);
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    // conectando 
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
        const cmdDeleteAss = `DELETE ASSENTOS WHERE codigo = :1`;
        const dados = [codigo];
        let resDelete = yield connection.execute(cmdDeleteAss, dados);
        // importante: efetuar o commit para gravar no Oracle.
        yield connection.commit();
        // obter a informação de quantas linhas foram inseridas. 
        // neste caso precisa ser exatamente 1
        const rowsDeleted = resDelete.rowsAffected;
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Assento excluído.";
        }
        else {
            cr.message = "Assento não excluído. Verifique se o código informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        // fechando a conexao
        if (connection !== undefined)
            yield connection.close();
        // devolvendo a resposta da requisição.
        res.send(cr);
    }
}));
app.put("/alterarAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const aero = req.body;
    console.log(aero);
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    let [valida, mensagem] = (0, Validadores_1.aeronaveValida)(aero);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        let connection;
        try {
            const cmdUpdateAero = `UPDATE AERONAVES SET FABRICANTE=(:1), MODELO=(:2), ANO_FABRICACAO=(:3), TOTAL_ASSENTOS=(:4), REFERENCIA=(:5) WHERE CODIGO=(:6) `;
            const dados = [aero.fabricante, aero.modelo, aero.anoFabricacao, aero.totalAssentos, aero.referencia, aero.codigo];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resUpdate = yield connection.execute(cmdUpdateAero, dados);
            yield connection.commit();
            const rowsInserted = resUpdate.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Aeronave alterada.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
app.put("/alterarAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const aeroporto = req.body;
    console.log(aeroporto);
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    let [valida, mensagem] = (0, Validadores_1.aeroportoValida)(aeroporto);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        let connection;
        try {
            const cmdUpdateAero = `UPDATE AEROPORTOS SET NOME=(:1), SIGLA=(:2), CIDADE=(:3) WHERE CODIGO=(:4)`;
            const dados = [aeroporto.nome, aeroporto.sigla, aeroporto.cidade, aeroporto.codigo];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resUpdate = yield connection.execute(cmdUpdateAero, dados);
            yield connection.commit();
            const rowsInserted = resUpdate.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Aeroporto alterado.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
app.put("/alterarTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trecho = req.body;
    console.log(trecho);
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    let [valida, mensagem] = (0, Validadores_1.trechoValida)(trecho);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        let connection;
        try {
            const cmdUpdateTrecho = `UPDATE TRECHOS SET NOME=(:1), ORIGEM=(:2), DESTINO=(:3), AERONAVE=(:4) WHERE CODIGO=(:5) `;
            const dados = [trecho.nome, trecho.origem, trecho.destino, trecho.aeronave, trecho.codigo];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resUpdate = yield connection.execute(cmdUpdateTrecho, dados);
            yield connection.commit();
            const rowsInserted = resUpdate.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Trecho alterada.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
app.put("/alterarVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const voo = req.body;
    console.log(voo);
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    let [valida, mensagem] = (0, Validadores_1.vooValida)(voo);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        let connection;
        try {
            const cmdUpdateVoo = `UPDATE VOOS SET DATA_VOO= TO_DATE((:1), 'dd/mm/yyyy'), HR_CHEGADA= TO_DATE((:2), 'HH24:MI:SS'), HR_SAIDA= TO_DATE((:3), 'HH24:MI:SS'), VALOR=(:4), TRECHO=(:5)  WHERE CODIGO=(:6)`;
            const dados = [voo.dataVoo, voo.hrChegada, voo.hrSaida, voo.valor, voo.trecho, voo.codigo];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resUpdate = yield connection.execute(cmdUpdateVoo, dados);
            yield connection.commit();
            const rowsInserted = resUpdate.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Voo alterado.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
app.put("/alterarAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assento = req.body;
    console.log(assento);
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    let [valida, mensagem] = (0, Validadores_1.assentoValida)(assento);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        let connection;
        try {
            const cmdUpdateAssento = `UPDATE ASSENTOS SET AERONAVE=(:1), VOO=(:2) WHERE CODIGO=(:3) `;
            const dados = [assento.aeronave, assento.voo, assento.codigo];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resUpdate = yield connection.execute(cmdUpdateAssento, dados);
            yield connection.commit();
            const rowsInserted = resUpdate.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Assento alterado.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
app.put("/alterarCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cidade = req.body;
    console.log(cidade);
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)
    // definindo um objeto de resposta.
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    let [valida, mensagem] = (0, Validadores_1.cidadeValida)(cidade);
    if (!valida) {
        // já devolvemos a resposta com o erro e terminamos o serviço.
        cr.message = mensagem;
        res.send(cr);
    }
    else {
        let connection;
        try {
            const cmdUpdateCidade = `UPDATE CIDADES SET NOME=(:1), UF=(:2), PAIS =(:3) WHERE CODIGO=(:4) `;
            const dados = [cidade.nome, cidade.uf, cidade.pais, cidade.codigo];
            connection = yield oracledb_1.default.getConnection(OracleConnAtribs_1.oraConnAttribs);
            let resUpdate = yield connection.execute(cmdUpdateCidade, dados);
            yield connection.commit();
            const rowsInserted = resUpdate.rowsAffected;
            if (rowsInserted !== undefined && rowsInserted === 1) {
                cr.status = "SUCCESS";
                cr.message = "Cidade alterada.";
            }
        }
        catch (e) {
            if (e instanceof Error) {
                cr.message = e.message;
                console.log(e.message);
            }
            else {
                cr.message = "Erro ao conectar ao oracle. Sem detalhes";
            }
        }
        finally {
            //fechar a conexao.
            if (connection !== undefined) {
                yield connection.close();
            }
            res.send(cr);
        }
    }
}));
app.listen(port, () => {
    console.log("Servidor HTTP funcionando...");
});
