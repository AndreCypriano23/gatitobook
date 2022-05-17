import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
  //quando esse service é instanciado por algum componente através de injeção de
  //dependencia, ele instancia esse objeto em um Single, então nao precisa importar localmente no nosso modulo de feature
})

export class AutenticacaoService {

  //Vou fazer uma requisição para uma API específica, e caso essa API retorne 200
  //ele poderá acessar de outras partes da nossa aplicação, vamos usar o http client do algular

  constructor(private httpClient: HttpClient,
              private usuarioService: UsuarioService
            ) { }

  autentica(usuario: string, senha: string):Observable<HttpResponse<any>>{
    return this.httpClient.post(`${API}/user/login`, {
      userName: usuario,
      password: senha
    },
    {  observe: 'response' } //eu nao quero só o body, quero o header da requisição
    //aí devemos pegar o header e jogar no nosso serviço de Usuário
  ).pipe(
    //toda vez que ele fizer uma requisição, além de pegar as info, eu quero salvar o token no meu serviço
    //efeito colateral, nao altero o fluxo, então vou usar o operador tap, do rxjs
    tap((res) => {
      //pega o token que está no header
      const authToken = res.headers.get('x-access-token') ?? '';
      this.usuarioService.salvaToken(authToken);
    })
   );
 }




}
