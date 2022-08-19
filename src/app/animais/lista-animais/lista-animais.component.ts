import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  animais!: Animais;// !: pq eu vou instanciar ele apenas no ngOnInit nao de cara

  constructor(private activatedRoute: ActivatedRoute,
              ) { }
  //instanciei o Usuário service para pegar as informações do meu usuário Logado

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.animais = this.activatedRoute.snapshot.data['animais'];//No snapshot ele vai pegar a propriedade animais
      //Agora o this.animais já vai receber os dados bonitinhos do nosso resolver
    });
  }
}
