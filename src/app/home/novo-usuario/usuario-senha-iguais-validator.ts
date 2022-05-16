import { FormGroup } from "@angular/forms";

//nao vou receber apenas um elemento, e sim o formulário inteiro, pq vamos
//comprar 2 campos dele
export function usuarioSenhaIguaisValidator(formGroup: FormGroup){

    //ele tbm vai retornar um objeto com o elemento true ou false
    const username = formGroup.get('userName')?.value ?? '';//caso nao exista quero ele em branco, tipo, se for undefined passa como vazio ?? ''
    const password = formGroup.get('password')?.value ?? '';

  if(username.trim() + password.trim()){ //se os dois existirem, nao forem vazio
    return username !== password ? null : { senhaIgualUsuario : true}; //se forem iguais, retorna o objeto senhaIgualUsuario com esse erro
  }else{
    return null;
  }

}
