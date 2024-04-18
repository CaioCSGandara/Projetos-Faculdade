package br.edu.puccampinas.estudodirigidocontas

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import com.google.android.material.textfield.TextInputEditText
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.firestore

class LoginActivity : AppCompatActivity() {

    private val TAG = "LoginActivity"

    private lateinit var auth: FirebaseAuth
    private lateinit var firestore: FirebaseFirestore

    private lateinit var simpleStorage: SimpleStorage

    private lateinit var etEmail: TextInputEditText
    private lateinit var etPassword: TextInputEditText

    private lateinit var btnCreateAccount: Button
    private lateinit var btnLogin: Button
    private lateinit var btnRecoveryPassword: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // inicializamos a instancia para guardar informações persistentes localmente.
        simpleStorage = SimpleStorage(this)

        // inicializando os servico de auth e firestore.
        auth = Firebase.auth
        firestore = Firebase.firestore

        val account = simpleStorage.getUserAccountData()

        // método que prepara as views a serem carregadas na tela.
        // porém ao invés de invocá-lo vamos checar se o usuário já fez login alguma vez.
        // se o usuário fez login, não mostraremos essa tela, vamos direcioná-lo para a
        // principal, entendendo que o login não faria sentido.

        if(account.uid != null) {
            loadMainActivity()
        }else{
            prepareViews()
        }

    }

    private fun prepareViews(){

        // caixas de email e senha
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)

        // referenciando os botões:
        btnCreateAccount = findViewById(R.id.btnCreateAccount)
        btnLogin = findViewById(R.id.btnLogin)
        btnRecoveryPassword = findViewById(R.id.btnRecoveryPassword)


        // Preparando os eventos deles e deixando vazios prontos para serem programados.
        btnCreateAccount.setOnClickListener {
            // direcionar para a outra activity.
            val iCreateAccount = Intent(this, CreateAccountActivity::class.java)
            startActivity(iCreateAccount)
        }

        btnRecoveryPassword.setOnClickListener {
            // Recuperar a senha (COM BASE NO CAMPO DE EMAIL)
        }

        btnLogin.setOnClickListener {
            // Realizar o login. Se der certo, direcionar o usuário para a activity principal (MAIN)
            val email = etEmail.text.toString()
            val password = etPassword.text.toString()
            if(email.isNotEmpty() && password.isNotEmpty()){
                auth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener(this) { task ->
                        if (task.isSuccessful) {

                            val user = auth.currentUser!!

                            // vamos criar um objeto conta apenas para armazenar os dados iniciais.
                            // depois vamos pesquisar no firestore para obter a idade e alterar ;-)
                            val account = Account(user.uid, user.displayName, user.email, 0, null)

                            // obtendo os dados do usuário que estão no firestore. Porém, vamos precisar apenas da idade
                            firestore.collection("users").whereEqualTo("uid",user.uid).get()
                                .addOnSuccessListener { documents ->
                                    for (document in documents) {
                                        Log.d(TAG, "${document.id} => ${document.data}")

                                        // obtendo o atributo age do documento que retornou da consulta.
                                        account.age = (document.data.get("age") as Long).toInt()

                                        // salvando localmente.
                                        simpleStorage.storageUserAccount(account)

                                        // enviando para a activity principal.
                                        loadMainActivity()

                                    }
                                }
                                .addOnFailureListener { exception ->
                                    Log.w(TAG, "Error getting documents: ", exception)
                                }


                        } else {

                            Log.w(TAG, "Falha de login", task.exception)
                            Toast.makeText(
                                baseContext,
                                "Falha na autenticação. Verifique os dados e tente novamente.",
                                Toast.LENGTH_SHORT,
                            ).show()
                            etEmail.text!!.clear()
                            etPassword.text!!.clear()
                        }
                    }
            }
        }

    }

    private fun loadMainActivity(){
        startActivity(Intent(this, MainActivity::class.java))
        this.finish()
    }
}