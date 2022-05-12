import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  //quando esse service é instanciado por algum componente através de injeção de
  //dependencia, ele instancia esse objeto em um Single, então nao precisa importar localmente no nosso modulo de feature
})

export class AutenticacaoService {

  //Vou fazer uma requisição para uma API específica, e caso essa API retorne 200
  //ele poderá acessar de outras partes da nossa aplicação, vamos usar o http client do algular

  constructor(private httpClient: HttpClient) { }

  autentica(usuario: string, senha: string):Observable<any>{
    return this.httpClient.post('http://localhost:3000/user/login', {
      userName: usuario,
      password: senha
    });
  }




}
