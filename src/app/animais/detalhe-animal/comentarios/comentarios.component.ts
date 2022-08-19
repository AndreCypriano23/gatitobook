import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ComentariosService } from './comentarios.service';
import { Comentarios } from './comentarios';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  //Recebendo o Id da foto
  @Input() id!: number;

  //Principal propriedade desse component
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentariosService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario:['', Validators.maxLength(300)]
    })
  }

  gravar(): void{
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    //no momento que o usuário publicar, a página terá que ser recarregada, vamos usar o RXJS.
    this.comentarios$ = this.comentariosService.incluiComentario(
      this.id, comentario
    ).pipe(switchMap(() =>
      this.comentariosService.buscaComentario(this.id)//vou mudar o fluxo, de incluir para buscar
      ),
      tap(() => {
        this.comentarioForm.reset();
        alert("Comentário Salvo");
      })
    );
    //Efeitos Colateriais: vou colocar um, que vai ser coisas que nao vão influenciar o
    //fluxo mas precisam acontecer durante esse fluxo. Para isso vou usar o tap()

  }


}
