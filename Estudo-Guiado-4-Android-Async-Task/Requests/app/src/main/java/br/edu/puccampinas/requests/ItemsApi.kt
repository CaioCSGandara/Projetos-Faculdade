package br.edu.puccampinas.requests

import android.util.Log
import android.widget.Toast
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.lang.reflect.Type
import java.net.HttpURLConnection
import java.net.URL

/***
 * Classe para auxiliar nas operações de HttpRequest e HttpResponse
 * da maneira original no Android, trafegando bytes puramente e
 * convertendo a resposta para texto limpo.
 *
 * Nota importante:
 * A máquina de desenvolvimento, tem o loopback adapter com endereço 127.0.0.1.
 * No entanto, no emulador, o endereço de loopback é reservado para o próprio emulador.
 * para requisitar algo na máquina de desenvolvimento, use o IP 10.0.2.2
 * Mais detalhes você pode consultar aqui:
 * @see { https://developer.android.com/studio/run/emulator-networking }
 * @author Mateus Dias
 */
class ItemsApi {

    private val baseUrl = "http://10.0.2.2:4000/api/"
    private val gson = Gson()

    private fun httpPerformGet(myURL: String?): String {

        val inputStream: InputStream //define um InputStream, que será onde a resposta do método GET será armazenada para ser lida depois
        val result: String // define uma string que será retornada como resultado
        val url: URL = URL(myURL) // transforma a URL passada com string em um objeto URL
        val conn: HttpURLConnection =
            url.openConnection() as HttpURLConnection // define a abertura da conexão
        conn.connect() // realiza a conexão

        inputStream = conn.inputStream // atribui a resposta do servidor para uma variável

        if (inputStream != null) // caso tenha vindo algo na resposta
            result =
                inputStreamToString(inputStream) // transforma a reposta do tipo InputStream em String e a atribue ao resultado
        else
            result =
                "Erro" // caso nao tenha vindo nada na resposta, o resultado apontará uma msg de erro

        return result // retorna o conteúdo de resultado
    }

    private fun inputStreamToString(inputStream: InputStream): String {
        val bufferedReader: BufferedReader? =
            BufferedReader(InputStreamReader(inputStream)) // define um bufferReader para ler o InputStream
        var line: String? =
            bufferedReader?.readLine() // chama a função para ler uma linha do InputStream
        var result: String = "" // inicializa a string de resultado vazia

        while (line != null) { // enquanto nao tiverem acabado as linhas
            result += line // concatena a linha lida ao resultado
            line = bufferedReader?.readLine() // le a proxima linha
        }

        inputStream.close() // finaliza o inputStream
        return result // retorna a string
    }

    fun getAllItems(): List<Item?> {
        val urlAllItems = "$baseUrl/items"
        val strItems = httpPerformGet(urlAllItems)

        val listOfItemsType: Type = object : TypeToken<List<Item>>() {}.type
        return gson.fromJson(strItems, listOfItemsType)
    }

    fun addNewItem(item: String): String {
        val url = baseUrl
        val instanceOfItem = Item(description = item)
        val itemToJson = gson.toJson(instanceOfItem)
        val response = postRequest(url, itemToJson)
        return when(response) {
            200 -> "Item adicionado!"
            else -> "Deu errado."
        }
    }

    fun postRequest(urltoPost: String, jsonData: String): Int {
        Log.i("Teste:", "Entrou no post request")
        val url = URL(urltoPost) // transforma a url passada em objeto url
        (url.openConnection() as HttpURLConnection).apply {// abre a conexao e suas propriedades abaixo para serem modificadas
            requestMethod = "POST" // metodo da requisiçao
            doOutput = true // permite que a conexao de saida envie dados (necessario para post!!)
            setRequestProperty("Content-Type", "application/json") // define o tipo de dados passados como json
            Log.i("Teste:", "Definiu cabeçalho")
            OutputStreamWriter(outputStream).use { writer -> // converte caracteres em bytes. outputStream é o canal pelo qual os dados são enviados para o servidor
                writer.write(jsonData) // escreve os dados no OutputStreamWriter
                writer.flush() // envia todos os dados escritos no buffer
                Log.i("Teste:", "Enviou os dados")
            }

            Log.i("Response:", "Response Code: $responseCode") // Logar código de resposta
            BufferedReader(InputStreamReader(inputStream)).use { reader -> // pega o inputStream (mensagem recebida)
                var line: String? // define a linha
                var response: String = ""
                while (reader.readLine().also { line = it } != null) { // utiliza um readLine para ler as linhas da resposta
                    response+=line + "\n" // concatena as linhas
                }
                Log.i("Response:", "Message: $response") // log da resposta
                return responseCode

            }
        }
    }
}