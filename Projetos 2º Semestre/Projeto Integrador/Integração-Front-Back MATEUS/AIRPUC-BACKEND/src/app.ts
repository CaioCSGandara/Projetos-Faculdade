/*
 * >>>>>>> MUITA ATENÇÃO <<<<<<<<
 * Este código é extremamente repetitivo, para iniciantes.
 * Cabe a você estudante melhorá-lo. 
 * Colocarei uma lista de melhorias E CORREÇÕES
 * para que você realize.
 * No entanto, primeiro, coloque-o para funcionar.
 */

// recursos/modulos necessarios.
import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";

// usando o módulo de CORS
import cors from "cors";

// preparar o servidor web de backend na porta 3000
const app = express();
const port = 3000;
// preparar o servidor para dialogar no padrao JSON 
app.use(express.json());
app.use(cors());

// já configurando e preparando o uso do dotenv para 
// todos os serviços.
dotenv.config();

// criando um TIPO chamado CustomResponse.
// Esse tipo vamos sempre reutilizar.
type CustomResponse = {
  status: string,
  message: string,
  payload: any
};


async function setupDatabaseConnection() {
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    const connection = await oracledb.getConnection(connAttibs);
    return connection;
  } catch (e) {
    console.error("Erro ao configurar a conexão com o Oracle:", e);
    throw e;
  }
}


// servicos de backend
app.get("/listarAeronaves", async(req,res)=>{

  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,}; //variavel "let" vai sumir depois.

  const connection = await setupDatabaseConnection();
  try{
    let resultadoConsulta = await connection.execute("SELECT * FROM AERONAVES");

    cr.status = "SUCCESS"
  
    cr.message = "Dados obtidos";

    cr.payload = resultadoConsulta.rows;

  }
  catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    }else{
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    await connection.close();
    res.send(cr);
  }

});

app.put("/alterarAeronave", async(req,res)=> { // servico de alterar 

  const cod_altera = req.body.cod_altera as number;
  const marca = req.body.marca as string;
  const modelo = req.body.modelo as string;
  const qtdeAssentos = req.body.qtdeAssentos as number;
  const registro = req.body.registro as string; 

  // correção: verificar se tudo chegou para prosseguir com o cadastro.
  // verificar se chegaram os parametros
  // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
  // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)

  // definindo um objeto de resposta.
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  const connection = await setupDatabaseConnection();

  try {

    const cmdUpdateAero = `UPDATE AERONAVES SET MARCA=(:2), MODELO=(:3), NUMERO_ASSENTOS=(:4), REGISTRO=(:5) WHERE CODIGO=(:1) `
    const data = [marca, modelo, qtdeAssentos, registro, cod_altera];
    let resUpdate = await connection.execute(cmdUpdateAero, data);

    await connection.commit();

    const rowsInserted = resUpdate.rowsAffected
    if(rowsInserted !== undefined &&  rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave alterada.";
    }

  }catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    }else{
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    //fechar a conexao.
    if(connection!== undefined){
      await connection.close();
    }
    res.send(cr);  
  }
});

app.post("/inserirAeronave", async(req,res)=>{ // foi trocado put por post, verificar com professor
  
  // para inserir a aeronave temos que receber os dados na requisição. 
  const marca = req.body.marca as string;
  const modelo = req.body.modelo as string;
  const qtdeAssentos = req.body.qtdeAssentos as number;
  const registro = req.body.registro as string; 

  // correção: verificar se tudo chegou para prosseguir com o cadastro.
  // verificar se chegaram os parametros
  // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
  // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)

  // definindo um objeto de resposta.
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  const connection = await setupDatabaseConnection();
  // conectando 
  try
  {

    const cmdInsertAero = `INSERT INTO AERONAVES 
    (CODIGO, MARCA, MODELO, NUMERO_ASSENTOS, REGISTRO)
    VALUES
    (SEQ_AERONAVES.NEXTVAL, :1, :2, :3, :4)`

    const dados = [marca, modelo, qtdeAssentos, registro];
    let resInsert = await connection.execute(cmdInsertAero, dados);
    
    // importante: efetuar o commit para gravar no Oracle.
    await connection.commit();
  
    // obter a informação de quantas linhas foram inseridas. 
    // neste caso precisa ser exatamente 1
    const rowsInserted = resInsert.rowsAffected
    if(rowsInserted !== undefined &&  rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave inserida.";
    }

  }catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    }else{
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    //fechar a conexao.
    if(connection!== undefined){
      await connection.close();
    }
    res.send(cr);  
  }
});

app.delete("/excluirAeronave", async(req,res)=>{
  // excluindo a aeronave pelo código dela:
  const codigo = req.body.codigo as number;
 
  // definindo um objeto de resposta.
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  
  const connection = await setupDatabaseConnection();
  // conectando 
  try{

    const cmdDeleteAero = `DELETE AERONAVES WHERE codigo = :1`
    const dados = [codigo];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    
    // importante: efetuar o commit para gravar no Oracle.
    await connection.commit();
  
    // encerrar a conexao. 
    
    // obter a informação de quantas linhas foram inseridas. 
    // neste caso precisa ser exatamente 1
    const rowsDeleted = resDelete.rowsAffected
    if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave excluída.";
    }else{
      cr.message = "Aeronave não excluída. Verifique se o código informado está correto.";
    }

  }catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    }else{
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    // devolvendo a resposta da requisição.
    await connection.close();
    res.send(cr);
  }
});

app.listen(port,()=>{
  console.log("Servidor HTTP funcionando...");
});