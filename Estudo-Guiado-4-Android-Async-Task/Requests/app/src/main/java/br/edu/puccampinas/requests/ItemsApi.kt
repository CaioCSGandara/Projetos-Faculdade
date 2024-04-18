package br.edu.puccampinas.requests

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
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

        val inputStream: InputStream
        val result:String
        val url: URL = URL(myURL)
        val conn: HttpURLConnection = url.openConnection() as HttpURLConnection
        conn.connect()

        inputStream = conn.inputStream

        if(inputStream != null)
            result = inputStreamToString(inputStream)
        else
            result = "Erro"

        return result
    }

    private fun inputStreamToString(inputStream: InputStream): String {
        val bufferedReader: BufferedReader? = BufferedReader(InputStreamReader(inputStream))
        var line:String? = bufferedReader?.readLine()
        var result:String = ""

        while (line != null) {
            result += line
            line = bufferedReader?.readLine()
        }

        inputStream.close()
        return result
    }

    fun getAllItems() : List<Item?>{
        val urlAllItems = "$baseUrl/items"
        val strItems = httpPerformGet(urlAllItems)

        val listOfItemsType: Type = object : TypeToken<List<Item>>() {}.type
        return gson.fromJson(strItems, listOfItemsType)
    }
}