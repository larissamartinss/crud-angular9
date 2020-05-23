import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { Cliente } from 'src/app/model/cliente';
import { ClinicaService } from 'src/app/services/clinica.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CepService } from 'src/app/services/cep.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../../shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { isNullOrUndefined } from 'util';
import { ErrorStateMatcher } from '@angular/material/core';


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

  celular1 : boolean = false;
  celular2 : boolean = false;
  celular3 : boolean = false;
  celular4 : boolean = false;
  celular5 : boolean = false;


  constructor(private formBuilder: FormBuilder, private service: ClinicaService,
    private _snackBar: MatSnackBar, private cepService : CepService,public dialog: MatDialog ) {

  }

  //Primeiro metodo a ser executado quando chamado o componente nesse caso estamos criamos no nosso formulario reativo
  ngOnInit(): void {
   this.criarFormulario(); 
  }


  //cria o formulario reativo
  criarFormulario(){
    this.FormGroupCliente = this.formBuilder.group({
      nome: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
      cpf: new FormControl('',[Validators.required,Validators.maxLength(11),]),
      residencial: new FormControl('',[Validators.maxLength(11)]),
      cep: new FormControl('',[Validators.required, Validators.maxLength(11)]),
      logradouro: new FormControl({value: '', disabled: true}),
      complemento: new FormControl('',[Validators.maxLength(11)]),
      bairro: new FormControl({value: '', disabled: true}),
      localidade: new FormControl({value: '', disabled: true}),
      uf: new FormControl({value: '', disabled: true}),
      numero: new FormControl('',[Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      comercial: new FormControl('',[Validators.maxLength(11)]),
      whatsApp: new FormControl('',[Validators.maxLength(11)]),
      celular1: new FormControl('',[Validators.maxLength(11)]),
      celular2: new FormControl('',[Validators.maxLength(11)]),
      celular3: new FormControl('',[Validators.maxLength(11)]),
      celular4: new FormControl('',[Validators.maxLength(11)]),
    } );
  }
  matcher = new MyErrorStateMatcher();
  

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

  removeCampo($event){

    console.log('evento',event);
    // switch(){
    //   case value:
    //     break;
    //     case value:

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
    cliente.email = this.FormGroupCliente.get("email").value;
    cliente.comercial = this.FormGroupCliente.get("comercial").value;
    cliente.whatsApp = this.FormGroupCliente.get("whatsApp").value;
    cliente.celular1 = this.FormGroupCliente.get("celular1").value;
    cliente.celular2 = this.FormGroupCliente.get("celular2").value;
    cliente.celular3 = this.FormGroupCliente.get("celular3").value;
    cliente.celular4 = this.FormGroupCliente.get("celular4").value;
  
    return cliente;
  }

 //chama o servico no angular que chama a API atraves do contexto http para salvar no banco de dados
salvarCliente(){
  this.cliente = this.popularCliente();
  
  //
  this.openDialog(this.cliente);
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

openDialog(cliente): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
    width: '250px',
    data: {cliente: cliente, mensagem: `Deseja manter contato pelo e-mail?`, acao: "manterContato", isManterContato: false}
  });

  dialogRef.afterClosed().subscribe(result => {

    console.log('result',result);
    
    if(!isNullOrUndefined(result)){
      if(!result){
        cliente.isManterContato = false;
      }
      else{
        cliente.isManterContato = true;
      }
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
    
  });
}



}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
