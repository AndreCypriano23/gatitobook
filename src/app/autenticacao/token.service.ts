import { Injectable } from '@angular/core';

//chave para o novo local storage
const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  retornaToken(){
    return localStorage.getItem(KEY) ?? '';//Caso nao pegue, ele usa uma variável em branco
  }

  salvaToken(token: string){
    localStorage.setItem(KEY, token);//seto na minha KEY o token que eu receber
  }

  //excluir o token do localSotorage quando fizer o logout

  excluiToken(){
    localStorage.removeItem(KEY);
  }

  possuiToken(){
    return !! this.retornaToken(); //quero retornar só um boolean, se tem ou nao tem token
  }

}
