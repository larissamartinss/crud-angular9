import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicaService } from 'src/app/services/clinica.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id: number;
  cliente : Cliente;
  FormGroupCliente : FormGroup;

  constructor(private route: ActivatedRoute, 
    private router: Router,
     private clinicaService: ClinicaService,
     private formBuilder: FormBuilder,
     private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.criarFormulario();
    this.buscaePopulaCliente(this.id);
  }

  buscaePopulaCliente(id: number) {
    this.clinicaService.obterClientesPorId(id).subscribe(cliente => 
      {
        this.cliente = cliente;
        //setando no formulario reativo os valores do id correspondente
        this.FormGroupCliente.controls['nome'].setValue(this.cliente.nome);
        this.FormGroupCliente.controls['cpf'].setValue(this.cliente.cpf);
        this.FormGroupCliente.controls['telefone'].setValue(this.cliente.telefone);
      },
      error => console.log(error));
  }

  //cria o formulario reativo
  criarFormulario(){

    this.FormGroupCliente = this.formBuilder.group({
      nome: new FormControl('',[Validators.maxLength(50), Validators.minLength(1)]),
      cpf: new FormControl('',[Validators.maxLength(11)]),
      telefone: new FormControl('',[Validators.maxLength(11)]),
    } );
  }

  editarCliente(){

    this.cliente.nome = this.FormGroupCliente.get('nome').value;
    this.cliente.cpf = this.FormGroupCliente.get('cpf').value;
    this.cliente.telefone = this.FormGroupCliente.get('telefone').value;
    
    if(!this.cliente.nome || !this.cliente.cpf || !this.cliente.telefone){
      this.openSnackBar('Por favor , preencha todos os campos','Preencha!');
      
    }else{
      this.clinicaService.editarCliente(this.cliente).subscribe(() => { 
        // alert("Editado com sucesso!!");
        this.openSnackBar('Registro editado com sucesso.','Editado!');
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> 
       this.router.navigate(['consultar']));
      },
      error => console.log(error));
      }
  
  }
  

  openSnackBar(mensagem: string, acao: string) {
  this._snackBar.open(mensagem, acao, {
    duration: 2000,
  });
}
}