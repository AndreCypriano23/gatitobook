import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoComponent } from './cartao.component';



@NgModule({
  declarations: [
    CartaoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartaoComponent //O módulo externo que utilizar esse módulo vai poder usar esse
    //cartão component, ou seja, nao tem como um módulo utilizar um componente sem importar o módulo do mesmo
  ]
})
export class CartaoModule { }
