import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;
  if(valor !== valor.toLowerCase()){//Se valor nao for igual ao toLowerCase
    //se o valor nao for o seu valor em minusculo
    //Se tiver erro vai retornar esse objeto, senao vai retornar nulo
    return {minusculo: true};
  }else{
    return null;
  }
};

