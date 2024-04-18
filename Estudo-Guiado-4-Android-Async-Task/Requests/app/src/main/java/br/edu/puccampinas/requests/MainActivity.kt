package br.edu.puccampinas.requests

import android.os.AsyncTask
import android.os.Bundle
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

    }

    private fun showResultsAsyncTask(result: List<Item?>?){
        val gson = Gson()
        binding.tvResultado.text = gson.toJson(result)
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




}