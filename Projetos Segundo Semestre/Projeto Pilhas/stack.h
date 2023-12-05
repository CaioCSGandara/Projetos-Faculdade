#ifndef STACK_H_INCLUDED
#define STACK_H_INCLUDED

//
//  stack.h
//
//===============================================================
// esta biblioteca foi construida especificamente para o teste dos
//  exercicios.
//===============================================================
// a representacao utilizada para esta biblioteca foi a
// representacao por contiguidade fisica.
//================================================================
//
//  Created by Angela Engelbrecht on 02/04/19.
//  Copyright � 2019 Angela Engelbrecht. All rights reserved.
//

#include  <stdlib.h>
#include  <iostream>
#define MAXELEMENTS 100
using namespace std;

struct Stack{
    int top;
    stack_element local[MAXELEMENTS];
};
///fun��o auxiliar para as mensagens de erros
void error(int i){
    switch(i){
        case 1:cerr<< " OVERFLOW "; exit(1);
        case 2:cerr<< " UNDERFLOW ";exit(1);
        default: exit(1);
    }
}
///fun��o para iniciar a pilha vazia
void initStack(Stack& p){ p.top =-1;}
///fun��o que inserir informa��o no topo da pilha
void push(Stack & p, stack_element x){
    if ( p.top == MAXELEMENTS-1)error(1);
    p.local[++(p.top)]=x;
}
///fun��o que eliminar informa��o do topo da pilha
stack_element pop (Stack& p){
    if( p.top ==-1)error(2);
    return (p.local[p.top--]);
}
///fun��o que consultar informa��o do topo da pilha
stack_element peek(Stack p){
    if( p.top ==-1) error(2);
        return (p.local[p.top]);
}
///fun��o que verificar se pilha vazia(1) ou n�o(0)
int isEmpty(Stack p){
    if( p.top == -1 )return 1; // verdade
    return 0;  // falso
}


#endif // STACK_H_INCLUDED
