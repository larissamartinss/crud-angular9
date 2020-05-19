import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Endereco } from './endereco';


export class Cliente  {

    public id: number;
    public nome: string;
    public cpf: string;
    public residencial: string;
    public whatsApp: string;
    public comercial: string;
    public celular1: string;
    public celular2: string;
    public celular3: string;
    public celular4: string;
    public data: DatePipe;  
    public actions: MatButton;
    public cep: string;
    public logradouro: string;
    public localidade: string;
    public bairro: string;
    public uf: string;
    public numero: string;
    public complemento : string;
  }