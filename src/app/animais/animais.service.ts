import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animais';

const API = environment.apiURL;
//Importante: não utilize essa constante entre o decorator Injectable
//e a classe, serão dará erro de compilação
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient,
              private tokenService: TokenService
              ) { }



  listaDoUsuario(nomeDoUsuario: string): Observable<Animais>{
      //vai retornar um observable, que é um retorno da minha API
      return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorId(id: number): Observable<Animal>{
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal>{
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  //Na API ela retorna 200 caso OK, ou 304 caso o curtir com o mesmo Token já tenha sido feito
  curtir(id: number): Observable<boolean>{
    return this.http.post(`${API}/photos/${id}/like`, {},
     { observe: 'response' } //o Angular vai passar a response inteira
    ).pipe(//vou manipular os fluxos da requisição.
       mapTo(true), catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error);
      }));
  }
}
