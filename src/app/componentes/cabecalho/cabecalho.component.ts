import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent{

  //tem cifrao pq é um observable, é uma convencao apenas
  user$ = this.usuarioService.retornaUsuario();

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  logout(){
    this.usuarioService.logout();
    //voltar para tela de login
    this.router.navigate(['']);
  }

}
