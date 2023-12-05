#ifndef STACK_LD_H_INCLUDED
#define STACK_LD_H_INCLUDED
//
//  Stackld.h
//  Exercícios pilha
//===============================================================
// esta biblioteca foi construida especificamente para o teste dos
//  exercicios.
//===============================================================
// a representacao utilizada para esta biblioteca foi a
// representacao ligada dinamica.
//================================================================
//  Created by Angela Engelbrecht on 03/04/19.
//  Copyright © 2019 Angela Engelbrecht. All rights reserved.
//

#include <iostream>
#include <stdlib.h>

using namespace std;


struct no {
    stack_element info;
    no * link;
};

struct Stack {
    no * top;
};

///função auxiliar para as mensagens de erros
void error(int i){
    switch(i){
        case 1:cerr<< " OVERFLOW "; exit(1);
        case 2:cerr<< " UNDERFLOW ";exit(1);
    }
}
///função para iniciar a pilha vazia
void initStack(Stack &p){ p.top= NULL;}
///função que alocamemória para um nó
no* novo_no(){
    no* novo = (no*) malloc (sizeof(no));
    if (!novo) error(1);
    return novo;
}
///função que inserir informação no topo da pilha
void push(Stack &p, stack_element a){
    no * novo = novo_no();
    novo->info = a;
    novo->link = p.top;
    p.top = novo;
}
///função que eliminar informação do topo da pilha
stack_element  pop (Stack& p){
    if(p.top == NULL) error (2);
    stack_element v = p.top ->info;
    no * x = p.top;
    p.top = (p.top)->link;
    free(x);
    return v;
}
///função que consultar informação do topo da pilha
stack_element  peek (Stack p){
    if(p.top == NULL) error(2);
    return  (p.top) ->info;
}
///função que verificar se pilha vazia(1) ou não(0)
int isEmpty(Stack p){
    if (p.top == NULL)  return 1; ///verdade
    return 0;///falso
}

#endif // STACK_LD_H_INCLUDED
