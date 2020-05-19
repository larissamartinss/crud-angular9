import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Cliente } from 'src/app/model/cliente';
import { ClinicaService } from 'src/app/services/clinica.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CepService } from 'src/app/services/cep.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})

export class CadastrarComponent implements OnInit {

  @ViewChild('cpf') cpfElement: ElementRef;
  @ViewChild('cep') cepElement: ElementRef;
  isCpfValido : boolean = false;
  FormGroupCliente : FormGroup;
  cliente : Cliente;
  cep : string;
  cpf : string;
  textoButton : string = "HabilitaDiv";
  enabled : boolean = false;
  mudaDiv : number = 0;


  constructor(private formBuilder: FormBuilder, private service: ClinicaService,
    private _snackBar: MatSnackBar, private cepService : CepService) {

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
      residencial: new FormControl('',[Validators.maxLength(11)]),
      cep: new FormControl('',[Validators.maxLength(11)]),
      logradouro: new FormControl({value: '', disabled: true}),
      complemento: new FormControl('',[Validators.maxLength(11)]),
      bairro: new FormControl({value: '', disabled: true}),
      localidade: new FormControl({value: '', disabled: true}),
      uf: new FormControl({value: '', disabled: true}),
      numero: new FormControl('',[Validators.maxLength(11)]),
    } );
  }

  habilitaDiv(){

    debugger;
    this.enabled = true

    this.mudaDiv = this.mudaDiv + 1;
    // debugger;
    // if(this.enabled == true){

    //   this.enabled = false ;
    //   this.textoButton = "HabilitaDiv";
    // }else{
    //   this.enabled = true;
    //   this.textoButton = "Desabilita";
    // }

  }
  //popula o modelo de cliente com os campos do formulario MAPPER
  popularCliente(){

    var cliente = new Cliente();

    cliente.nome = this.FormGroupCliente.get("nome").value;
    cliente.cpf = this.FormGroupCliente.get("cpf").value;
    cliente.residencial = this.FormGroupCliente.get("residencial").value;
    cliente.cep = this.FormGroupCliente.get("cep").value;
    cliente.logradouro = this.FormGroupCliente.get("logradouro").value;
    cliente.bairro = this.FormGroupCliente.get("bairro").value;
    cliente.uf = this.FormGroupCliente.get("uf").value;
    cliente.localidade = this.FormGroupCliente.get("localidade").value;
    cliente.numero = this.FormGroupCliente.get("numero").value;
    cliente.complemento = this.FormGroupCliente.get("complemento").value;
  
    return cliente;
  }

 //chama o servico no angular que chama a API atraves do contexto http para salvar no banco de dados
salvarCliente(){
  this.cliente = this.popularCliente();

  // if(this.FormGroupCliente.valid){
    
  // }

  if(!this.cliente.nome || !this.cliente.cpf || !this.cliente.residencial || !this.cliente.bairro || !this.cliente.cep
    || !this.cliente.localidade || !this.cliente.logradouro || !this.cliente.uf || !this.cliente.numero){
   this.openSnackBar('Por favor , preencha todos os campos','Preencha!');
    
  }else{
    this.service.salvarCliente(this.cliente).subscribe (
       () => {
         
        this.openSnackBar('Registro cadastrado com sucesso.','Cadastrado!');
        this.criarFormulario(); 
      },
      error => {
        console.log(error);
        this.openSnackBar(error.error.message,"Mude o CPF para prosseguir!");
      });
  }
}


buscarCep(){
  this.cep = this.FormGroupCliente.get("cep").value;

  this.cepService.buscarCep(this.cep).subscribe(endereco =>{

    console.log(endereco);

    if(!endereco.erro){
    
      this.FormGroupCliente.controls['bairro'].setValue(endereco.bairro);
      this.FormGroupCliente.controls['logradouro'].setValue(endereco.logradouro);
      this.FormGroupCliente.controls['localidade'].setValue(endereco.localidade);
      this.FormGroupCliente.controls['uf'].setValue(endereco.uf);
    }
    else{
      this.openSnackBar(`Cep ${this.cep} não encontrado`,"Coloque um CEP valido!");
      this.cepElement.nativeElement.focus();
      this.FormGroupCliente.controls['cep'].setErrors({'incorrect': true});
    }
  })
}

validaCpf(){
  this.cpf = this.FormGroupCliente.get("cpf").value

  this.service.obterClientePorCpf(this.cpf).subscribe( cpf =>{
    if(!cpf){
      this.isCpfValido = false;
      this.openSnackBar('CPF já cadastrado na base.','Mude o CPF!');
      this.cpfElement.nativeElement.focus();
      this.FormGroupCliente.controls['cpf'].setErrors({'incorrect': true});

    }
    else{
      this.isCpfValido = !this.isCpfValido;
    }
  })
}

openSnackBar(mensagem: string, acao: string) {
  this._snackBar.open(mensagem, acao, {
    duration: 5000,
  });
}

}
