package br.edu.puccampinas.estudodirigidocontas

class Account(var uid: String?, val name: String?, val email:String?, var age:Int, var password: String?) {

    class Validator(private val account: Account){

        private fun isTheAgeValid(): Boolean{
            return account.age in 14..120
        }

        private fun wasFormFilledOut():Boolean{
            return if(account.name != null && account.email != null
                && account.password != null) {
                        account.name.isNotEmpty() &&
                        account.age > 0 &&
                        account.email.isNotEmpty() &&
                        account.password!!.isNotEmpty()
            }else{
                false
            }
        }

        fun isValid() : Boolean{
            return wasFormFilledOut() && isTheAgeValid()
        }
    }

}