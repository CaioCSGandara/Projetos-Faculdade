package br.edu.puccampinas.estudodirigidocontas

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.widget.AppCompatTextView
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth

class MainActivity : AppCompatActivity() {

    private lateinit var tvUserData: AppCompatTextView
    private lateinit var btnSairLogout: Button
    private lateinit var simpleStorage: SimpleStorage

    private lateinit var firebaseAuth: FirebaseAuth


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        firebaseAuth = Firebase.auth

        simpleStorage = SimpleStorage(this)

        // view que exibira os dados do local storage.
        tvUserData = findViewById(R.id.tvUserData)
        btnSairLogout = findViewById(R.id.btnSairLogout)

        // Temos duas maneiras aqui de mostrar os dados que temos.
        // Esta é via intent, para experimentar, comente a linha abaixo e descomente
        // o metodo que mostra os dados armazenados.
        // mostrarOsDadosRecebidosPorIntent()
        mostrarOsDadosArmazenadosLocalmente()


        // evento de sair
        btnSairLogout.setOnClickListener {

            // sair notificando os serviços locais.
            firebaseAuth.signOut()

            // limpando os dados armazenados.
            simpleStorage.clearUserAccount()

            // direcionar para o login
            startActivity(Intent(this, LoginActivity::class.java))
            finish()

        }

    }

    /***
     * Acessa o intent (Toda activity nasce a partir de uma Intent)
     * e obtem os dados que "chegaram" nela.
     */
    private fun getIntentData() : String?{
        return if(intent.hasExtra("completeName") && intent.hasExtra("email") &&
            intent.hasExtra("uid")){
            val receivedName = intent.getStringExtra("completeName")
            val receivedEmail = intent.getStringExtra("email")
            val uid = intent.getStringExtra("uid")
            "Usuário: Nome: $receivedName, Email: $receivedEmail, uid: $uid"
        }else{
            null
        }
    }

    private fun getAccountData() : String {
        val account =  simpleStorage.getUserAccountData()
        return "Usuário: Nome: ${account.name}, Email: ${account.email}, uid: ${account.uid}"
    }

    private fun mostrarOsDadosRecebidosPorIntent(){
        // vamos obter os dados que chegaram na Intent e exibí-los de uma vez
        val allData = getIntentData()
        tvUserData.text = allData
    }

    private fun mostrarOsDadosArmazenadosLocalmente(){
        val allData = getAccountData()
        tvUserData.text = allData
    }
}