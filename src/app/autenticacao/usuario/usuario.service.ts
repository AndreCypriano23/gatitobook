import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';

import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()){
      this.decodificaJWT();//notifico meus componentes
    }
   }

  //pego informação do meu token e decodifico a info para transformar em um objeto do usuário
  decodificaJWT(){
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);//sempre quando aciona esse método, todo mundo que se inscreveu nesse serviço recebe o usuário
  }
  retornaUsuario(){
    //nao vai retornar o subject, eu quero que somente o meu serviço manipule esse estado, nenhum de fora, então eu nao vou enviar meu subject direto, eu vou enviar como um observable, pq aí ele só recebe informações, nao envia
    return this.usuarioSubject.asObservable();//ngm de fora vai manipular meu estado de behavior component
  }

  //Salvar o token
  salvaToken(token: string){
    this.tokenService.salvaToken(token);
    //vou decodificar todos os meus componentes que temos um token
    this.decodificaJWT();
  }

  logout(){
    this.tokenService.excluiToken();
    this.usuarioSubject.next({}); //notifico todo mundo que nao tenho usuário nenhum
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }

}
