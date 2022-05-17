export interface Animal {
  //elemento Animal e suas propriedades
  id: number;
  postDate: Date;
  url: string;
  description: string;
  allowComments: boolean;
  likes: number;
  comments: number;
  userId: number;
}

//Dependendo do endPoint que a gente vai chamar do back, ele pode me retornar
//uma coleção de animais
//Então eu vou criar um tipo

export type Animais = Array<Animal>;
