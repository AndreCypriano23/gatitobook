import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais } from './animais';

const API = environment.apiURL;
//Importante: não utilize essa constante entre o decorator Injectable
//e a classe, serão dará erro de compilação

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient,
              private tokenService: TokenService
              ) { }



  listaDoUsuario(nomeDoUsuario: string): Observable<Animais>{
      //mais um detalhe: preciso enviar de alguma forma o Token de autenticalção, no Header
      //da requisição pq a nossa API exige um Token
      const token = this.tokenService.retornaToken();
      const headers = new HttpHeaders().append('x-access-token', token);
      //vai retornar um observable, que é um retorno da minha API
      return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`, {
        headers,
      });
  }

}
