import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  $animais!: Observable<Animais>;// !: pq eu vou instanciar ele apenas no ngOnInit nao de cara

  constructor(private usuarioService: UsuarioService,
              private animaisService: AnimaisService
              ) { }
  //instanciei o Usuário service para pegar as informações do meu usuário Logado

  ngOnInit(): void {
      this.$animais = this.usuarioService.retornaUsuario().pipe(
      //vou usar operadores rxjs que são basicamente funções que manipulam o fluxo de info´s dentro de um observable
      //O SwitchMap altera o fluxo de um serviço específico, para outro. Este recebe como parametro o primeiro servico que no caso é o de usuário
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        //Vou retornar esse Observable
        return this.animaisService.listaDoUsuario(userName);
      })
    );

  }
}
