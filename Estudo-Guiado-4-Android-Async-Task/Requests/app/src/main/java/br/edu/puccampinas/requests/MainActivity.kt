package br.edu.puccampinas.requests

import android.os.AsyncTask
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import br.edu.puccampinas.requests.databinding.ActivityMainBinding
import com.google.gson.Gson

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // onClick do botão para testar Async.
        binding.btnRequestByAsyncTask.setOnClickListener {
            // executando a asynctask
            //TaskRequestAllItems().execute()
            TaskRequestAllItems().execute()
        }

        binding.btnAdd.setOnClickListener {
            TaskAddNewItem().execute()
        }

    }

    private fun showResultsAsyncTask(result: List<Item?>?){
        val gson = Gson()
        binding.tvResultado.text = gson.toJson(result)
    }

    private fun showStatusMessage(result: String) {
        Toast.makeText(applicationContext, result, Toast.LENGTH_SHORT).show()
    }


    inner class TaskRequestAllItems: AsyncTask<Void, Void, List<Item?>>() {

        override fun doInBackground(vararg params: Void?): List<Item?> {
            val api = ItemsApi()
            return api.getAllItems()
        }

        override fun onPostExecute(result: List<Item?>?) {
            super.onPostExecute(result)
            // aqui sim podemos interagir com a Thread de UI pois não está mais bloqueada.
            showResultsAsyncTask(result)
        }

    }

    inner class TaskAddNewItem: AsyncTask<String, String, String>() {

        override fun doInBackground(vararg params: String?): String {
            val api = ItemsApi()
            return api.addNewItem(binding.etnovoItem.text.toString())
        }

        override fun onPostExecute(result: String) {
            super.onPostExecute(result)
            showStatusMessage(result)
        }


    }




}