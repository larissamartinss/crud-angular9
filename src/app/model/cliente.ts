import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

export class Cliente  {

    public id : number;
    public nome : string;
    public cpf : string;
    public telefone: string;
    public data: DatePipe;  
    public actions : MatButton;
  }