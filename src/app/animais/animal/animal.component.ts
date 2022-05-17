import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
 //componente de fotos
  private urlOriginal = '';

  @Input() descricao = '';

  @Input() set url(url:string){
    if(url.startsWith('data')){
      // entao nao é uma url externa, ela é da minha própria pasta da aplicação do meu front
      this.urlOriginal = url;
    }else{
      this.urlOriginal = `${API}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urlOriginal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
