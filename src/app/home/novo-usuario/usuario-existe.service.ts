import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  //metodo para validação, retorna uma função, essa vai ser assíncrona
  //que vai retornar ou o Objeto com chave e valor, ou nulo

  usuarioJaExiste(){
    //isso nao é uma promisse, no Angular a gente usa mais observable
    return(control: AbstractControl) => {
      //vou converter a digitação do usuário numa requisição com rxjs
      return control.valueChanges.pipe(
        //operadores
        //To usando uma arrow function para nao precisar usar return
        switchMap((nomeUsuario) =>
            this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)//o switch map recebe o que o usuário está digitando e converte isso na requisição do back-end
          ),
          map(
            (usuarioExiste) => (usuarioExiste? {usuarioExistente: true} : null)
          ),
          first()//First para encerrar o Observable, o fluxo da validação
       );
    };
  }

}
