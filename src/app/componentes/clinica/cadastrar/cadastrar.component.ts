import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Cliente } from 'src/app/model/cliente';
import { ClinicaService } from 'src/app/services/clinica.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultarComponent } from '../consultar/consultar.component';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})

export class CadastrarComponent implements OnInit {

  FormGroupCliente : FormGroup;
  cliente : Cliente;

  constructor(private formBuilder: FormBuilder, private service: ClinicaService,
    private _snackBar: MatSnackBar) {

  }

  //Primeiro metodo a ser executado quando chamado o componente nesse caso estamos criamos no nosso formulario reativo
  ngOnInit(): void {
   this.criarFormulario(); 
  }


  //cria o formulario reativo
  criarFormulario(){
    this.FormGroupCliente = this.formBuilder.group({
      nome: new FormControl('',[Validators.maxLength(50), Validators.minLength(1)]),
      cpf: new FormControl('',[Validators.maxLength(11)]),
      telefone: new FormControl('',[Validators.maxLength(11)]),
    } );
  }

  //popula o modelo de cliente com os campos do formulario MAPPER
  popularCliente(){

    var cliente = new Cliente();

    cliente.nome = this.FormGroupCliente.get("nome").value;
    cliente.cpf = this.FormGroupCliente.get("cpf").value;
    cliente.telefone = this.FormGroupCliente.get("telefone").value;

    return cliente;

  }

 //chama o servico que chama a API atraves do contexto http para salvar no banco de dados
salvarCliente(){
  this.cliente = this.popularCliente();

  if(!this.cliente.nome || !this.cliente.telefone || !this.cliente.cpf){
    this.openSnackBar('Por favor , preencha todos os campos','Preencha!');
    
  }else{
    this.service.salvarCliente(this.cliente).subscribe(
      x => {
        this.openSnackBar('Registro cadastrado com sucesso.','Cadastrado!');
      },
      error => console.log(error)
      );
  
      this.criarFormulario(); 

  }
  

}

openSnackBar(mensagem: string, acao: string) {
  this._snackBar.open(mensagem, acao, {
    duration: 2000,
  });
}

}
