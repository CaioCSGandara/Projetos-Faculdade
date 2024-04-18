package br.edu.puccampinas.estudodirigidocontas

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputEditText
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.firestore

class CreateAccountActivity : AppCompatActivity() {

    private val TAG = "CreateAccountActivity"

    private lateinit var simpleStorage: SimpleStorage

    // referencia para o firebase auth e firestore.
    private lateinit var fireAuth: FirebaseAuth
    private lateinit var firestore: FirebaseFirestore

    // caixas de texto
    private lateinit var etCompleteName: TextInputEditText
    private lateinit var etEmail: TextInputEditText
    private lateinit var etAge: TextInputEditText
    private lateinit var etPassword: TextInputEditText

    // botoes
    private lateinit var btnCreateMyAccount: Button
    private lateinit var btnExit: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_account)

        // inicializando o servico de armazenamento de dados localmente.
        simpleStorage = SimpleStorage(this)

        // inicializando as referencias para todas as views da tela.
        initAllViews()

        // inicializando os objetos do firebase que vamos precisar.
        instantiateFirebaseObjects()
    }

    /***
     * Funcao auxiliar para instanciar os objetos
     * que vamos precisar para o Firebase.
     */
    private fun instantiateFirebaseObjects(){
        // preparando as instancias dos servicos do firebase (auth e firestore)
        fireAuth = Firebase.auth
        firestore = Firebase.firestore
    }

    /***
     * Com esta função, preparamos todas as instancias.
     * Deixamos mais limpo e mais curto o método onCreate.
     */
    private fun initAllViews(){

        // caixas de texto para entrada de dados.
        etCompleteName = findViewById(R.id.etCompleteName)
        etEmail = findViewById(R.id.etEmail)
        etAge = findViewById(R.id.etAge)
        etPassword = findViewById(R.id.etPassword)


        // referenciando todos os botoes.
        btnCreateMyAccount = findViewById(R.id.btnCreateMyAccount)
        btnExit = findViewById(R.id.btnExit)

        btnCreateMyAccount.setOnClickListener {
            // vamos criar um objeto account apenas para facilitar a validação e devolver a conta
            // a ser criada. Atenção o parâmetro uid modificaremos em seguida. preste atenção.
            val account = factoryAccountObject(null)
            if (account != null){
                // salvar a conta no firebase auth
                fireAuth.createUserWithEmailAndPassword(account.email!!,account.password!!)
                    .addOnCompleteListener { authResult ->

                        if(authResult.isSuccessful){
                            // prosseguir com a gravação do objeto
                            // acrescentando o uid obtido do firebase, e claro, retirando a senha.
                            account.uid = authResult.result.user!!.uid
                            account.password = ""

                            firestore.collection("users").add(account)
                                .addOnSuccessListener {

                                    // salvar localmente
                                    simpleStorage.storageUserAccount(account)

                                    // Redirecionar para a tela principal! :-)
                                    goToMainActivity(account.name!!,
                                        account.email, authResult.result.user!!.uid)
                                }
                                .addOnFailureListener {
                                    // houve um erro ao criar o documento no firestore.
                                    // ATENCAO: em cenários reais não daremos esse tipo de mensagem ao usuário.
                                    Snackbar.make(btnExit,"Infelizmente ocorreu um erro ao registrar o documento no firebase. Verifique.", Snackbar.LENGTH_LONG).show()
                                }
                        } else {
                            // ocorreu alguma falha ao criar a conta. vamos logar aqui no logcat para saber.
                            // trate adequadamente para exibir mensagem amigável ao usuário caso necessário ...
                            // exemplo: já existe uma outra conta com este email. Utilize outro email ou recupere a sua senha.
                            Log.e(TAG, "Erro ao criar a conta: ${authResult.exception!!.message}")
                        }

                    }
            } else {
                Snackbar.make(btnExit,"Preencha todos os campos.", Snackbar.LENGTH_LONG).show()

            }
        }

        btnExit.setOnClickListener {
            //encerrando a activity.
            this.finish()
        }
    }

    /***
     * Quando o login der certo, vamos aproveitar para guardar as informações localmente.
     * Sempre
     */
    private fun storeUserData(){

    }

    /***
     * Método que quando invocado abre a activity principal e encerra obviamente esta.
     * @param uid - User Id atribuido pelo firebase.
     */
    private fun goToMainActivity(completeName:String, email:String, uid :String){

        val iMain = Intent(this, MainActivity::class.java)
        // vamos enviar alguns parâmetros para a activity Main para exibirmos pois pode ser útil.
        // Usando a técnica de enviar parametro por parametro na mensagem de Intent.
        iMain.putExtra("completeName", completeName)
        iMain.putExtra("email", email)
        iMain.putExtra("uid",uid)

        // invocando a nova activity (principal)
        startActivity(iMain)

        // finalizando esta.
        finish()
    }

    /***
     * A função factory Account object tem a missão de "fabricar" uma instancia
     * de um objeto Account. Para em seguida usar a "inner class" Validator com o objetivo
     * de "prender as validações" no contexto da classe e não sujar o código da activity.
     *
     * @param uid User Id gerado pelo processo do firebase authentication.
     */
    private fun factoryAccountObject(uid: String?) : Account? {
        try {
            val a = Account(
                uid,
                etCompleteName.text.toString(),
                etEmail.text.toString(),
                etAge.text.toString().toInt(),
                etPassword.text.toString()
            )

            return if (Account.Validator(a).isValid()) {
                a
            } else {
                null
            }
        }catch (e: Exception){
            return null
        }
    }
}