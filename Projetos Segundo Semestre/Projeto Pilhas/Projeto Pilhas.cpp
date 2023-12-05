// Integrantes:
// Caio Cezar Gandara dos Santos
// Filipe Daniel Tertuliano Mota
// João Pedro Giaretta de Oliveira
// Melissa Seleghin Leite

#include <iostream>
#include <stdlib.h>
#include <time.h>
#include <windows.h>

#define TAM 6
using namespace std;

typedef int stack_element;

#include "stack.h"

typedef struct {
	   int numero_elementos;
	   Stack pilha;
}Tubo;


void muda_cor(int cor){
    //0 = Preto       8 = Cinza
    //1 = Azul        9 = Azul claro
    //2 = Verde       A = Verde claro
    //3 = Verde-água  B = Verde-água claro
    //4 = Vermelho    C = Vermelho claro
    //5 = Roxo        D = Lilás
    //6 = Amarelo     E = Amarelo claro
    //7 = Branco      F = Branco brilhante

    HANDLE Saida;
    Saida = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(Saida, cor);
}



void printa_cor(int I){
    int cor[5]={9,13,2,15,6};
    muda_cor(cor[I-1]);
    cout<<"o";
    muda_cor(15);
}



void iniciar_vazias(Tubo T[]) { // criado um loop para percorrer o vetor de struct e iniciar todas as 6 pilhas
   int i;
   for(i=0;i<TAM;i++) {
	   initStack(T[i].pilha);
	   T[i].numero_elementos=0;
   }
}

void distribuir(Tubo T[]) {
   int aux[TAM-1] = {0}; // vetor para armazenar quantidade de numeros já repetidos (maximo 5 de cada cor!!)
   int i, numero_aleatorio;
   srand(time(0));
   for(i=0;i<TAM-1;i++) {
	   while(T[i].numero_elementos!=TAM-1) {
	       do {
	           numero_aleatorio = (rand() % (TAM-1));
	       }while (aux[numero_aleatorio]==TAM-1);
	           push(T[i].pilha, numero_aleatorio+1);
	           T[i].numero_elementos++;
	           aux[numero_aleatorio]++;
	   }
   }
}

void mostrar(Tubo T[]) {
   Tubo aux[TAM];
   iniciar_vazias(aux);
   int i, v;

   cout << "\nTUBOS ATUAIS\n " << endl;
   for (int j = TAM-1;  j > 0; j--)
   {
	   for(i=0;i<TAM;i++) {
	       if (T[i].numero_elementos >= j){
	           v=pop(T[i].pilha);
	           push(aux[i].pilha, v);
	           cout<<"|  ";
               //cout<<v;
               printa_cor(v);
               cout<<"  |  ";          
	       }
	       else{
	           cout<<"|  "<<" "<<"  |  ";
	       }
	   }
	   cout<<endl;
   }

   for (int j = 0;  j < TAM-1; j++)
   {
	   for(i=0; i<TAM; i++) {
	       if (!isEmpty(aux[i].pilha)){
	           v=pop(aux[i].pilha);
	           push(T[i].pilha, v);
	       }
	   }
   }
   cout << " -----    -----    -----    -----    -----    -----" << endl;
   cout << " - " << "1" << " -   " << " - " << "2" << " -   " << " - " << "3" << " -   " << " - " << "4" << " -   " << " - " << "5" << " -   "<< " - " << "6" << " -   " << endl;
}

int validar(Tubo T[], int o, int d){
   if (isEmpty(T[o-1].pilha)){
	   cout<<"Origem Vazia"<<endl;
	   return 0;
   }
   else{
	   if (T[d-1].numero_elementos == TAM-1){
	        cout<<"Destino cheio"<<endl;
	        return 0;
	   }
	   else{
	       return 1;
	   }
   }
}

int validar_fim(Tubo T[]){
   Stack aux;
   initStack(aux);
   int j, i, v, x, k = 0;
   for (i = 0; i < TAM; i++){
       if(!isEmpty(T[i].pilha)){
	       if (T[i].numero_elementos < TAM-1){
		       return 1;
	       }
	       else{
		       x = peek(T[i].pilha);
		       for (j=0; j< TAM-1; j++){
		           v = pop(T[i].pilha);
		           if (x == v){
			           push(aux, v);
			           k++;
		           }
		           else{
			           push(T[i].pilha, v);
			           while(!isEmpty(aux)){
			               v = pop(aux);
                           cout << "caso 2: " << v << endl;
			               push(T[i].pilha,v);
			           }
			           return 1;
		           }
		       }
		       while(!isEmpty(aux)){ //while !isempty
		           v = pop(aux);
                    cout << "caso 1: "<< v << endl;
		           push(T[i].pilha, v);
		       }               
	       }
       }
   }
   return 0;
}

int jogada(Tubo T[]){
   int o, d, i, v;
   while(true){
       do
       {
	       cout<<"ORIGEM < 1 a 6 (-1 sair)>: ";
	       cin>>o;
       } while (o != -1 && (o < 1 || o > 6));
       if (o == -1)
	       exit(0);
       do
       {
	       cout<<"DESTINO < 1 a 6 (-1 sair)>: ";
	       cin>>d;
       } while (d != -1 && (d < 1 || d > 6));
       if (d == -1)
	       exit(0);       
       i = validar(T, o, d);
       if (i == 1){
	       break;
       }      
   }
   v = pop(T[o-1].pilha);
   push(T[d-1].pilha, v);
   T[d-1].numero_elementos ++;
   T[o-1].numero_elementos --;
   i = validar_fim(T);
   return i;
}

int main() {
   Tubo T[TAM];
   int repetir = 1, retorno;
   do{
       iniciar_vazias(T);
       distribuir(T);
       mostrar(T);
       do
       {
	       retorno = jogada(T);
	       mostrar(T);
	       if (retorno == 0)
		       break;
       } while (retorno);
       mostrar(T);
       cout<<endl<<" P A R A B É N S ! ! ! !";
       cout<<endl<<" Jogar novamente ? 1(Sim) ou 0(Não): "; cin>>repetir;
   } while (repetir);
   cout<<endl<<" Fim de Jogo!"<<endl;
   return 0;
}