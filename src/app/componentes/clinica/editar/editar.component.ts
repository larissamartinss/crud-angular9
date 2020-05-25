import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicaService } from 'src/app/services/clinica.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogOverviewExampleDialogComponent } from '../../shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { CepService } from 'src/app/services/cep.service';
import { isNullOrUndefined } from 'util';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  @ViewChild('cpf') cpfElement: ElementRef;
  @ViewChild('cep') cepElement: ElementRef;
  id: number;
  cliente : Cliente;
  FormGroupCliente : FormGroup;
  cep : string;
  cpf : string;
  cpfEmUso : string;
  comercial : boolean = false;
  whatsapp: boolean = false;
  celular1 : boolean = false;
  celular2 : boolean = false;
  celular3 : boolean = false;
  celular4 : boolean = false;
  celular5 : boolean = false; 

  constructor(private route: ActivatedRoute, private router: Router,private clinicaService: ClinicaService, private service: ClinicaService,
    private cepService : CepService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

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
        this.FormGroupCliente.controls["nome"].setValue(this.cliente.nome);
        this.FormGroupCliente.controls["cpf"].setValue(this.cliente.cpf);
        this.FormGroupCliente.controls["residencial"].setValue(this.cliente.residencial);
        this.FormGroupCliente.controls["cep"].setValue(this.cliente.cep);
        this.FormGroupCliente.controls["logradouro"].setValue(this.cliente.logradouro);
        this.FormGroupCliente.controls["bairro"].setValue(this.cliente.bairro);
        this.FormGroupCliente.controls["uf"].setValue(this.cliente.uf);
        this.FormGroupCliente.controls["localidade"].setValue(this.cliente.localidade);
        this.FormGroupCliente.controls["numero"].setValue(this.cliente.numero);
        this.FormGroupCliente.controls["complemento"].setValue(this.cliente.complemento);
        this.cpfEmUso = cliente.cpf;
      },
      error => console.log(error));
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

    if(this.cpf != this.cpfEmUso){
      this.service.obterClientePorCpf(this.cpf).subscribe( cpf =>{
        if(!cpf){
          this.openSnackBar('CPF já cadastrado na base.','Mude o CPF!');
          this.cpfElement.nativeElement.focus();
          this.FormGroupCliente.controls['cpf'].setErrors({'incorrect': true});
        }
      });
    }
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
  habilitaDiv(){

    if(!this.comercial){
      this.comercial = true;
      return;
    }

    if(!this.whatsapp){
      this.whatsapp = true;
      return;
    }

    if(!this.celular1){
      this.celular1 = true;
      return;
    }

    if(!this.celular2){
      this.celular2 = true;
      return;
    }

    if(!this.celular3){
      this.celular3 = true;
      return;
    }

    if(!this.celular4){
      this.celular4 = true;
      return;
    }

    if(!this.celular5){
      this.celular5 = true;
      return;
    }
    
  }
  editarCliente(){

    this.cliente.nome = this.FormGroupCliente.get('nome').value;
    this.cliente.cpf = this.FormGroupCliente.get('cpf').value;
    this.cliente.residencial = this.FormGroupCliente.get('residencial').value;
    this.cliente.bairro = this.FormGroupCliente.get('bairro').value;
    this.cliente.cep = this.FormGroupCliente.get('cep').value;
    this.cliente.logradouro = this.FormGroupCliente.get('logradouro').value;
    this.cliente.localidade = this.FormGroupCliente.get('localidade').value;
    this.cliente.uf = this.FormGroupCliente.get('uf').value;
    this.cliente.numero = this.FormGroupCliente.get('numero').value;
    
        
    if(!this.cliente.nome || !this.cliente.cpf || !this.cliente.residencial || !this.cliente.bairro || !this.cliente.cep
       || !this.cliente.localidade || !this.cliente.logradouro || !this.cliente.uf || !this.cliente.numero){
      this.openSnackBar('Por favor , preencha todos os campos','Preencha!');
      
    }else{
      this.clinicaService.editarCliente(this.cliente).subscribe(x => { 

        console.log("api", x);
        // alert("Editado com sucesso!!");
        this.openSnackBar('Registro editado com sucesso.','Editado!');
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> 
       this.router.navigate(['consultar']));
      },
      error => {
        console.log(error);
      this.openSnackBar(error.error.message,"Mude o CPF para prosseguir!");
      }
      )};
  }
  removeCampo(idBotao){

    switch (idBotao) {
      case 'comercial':
        this.comercial = false;
        this.FormGroupCliente.controls["comercial"].setValue(null);
        break;
      case 'whatsapp':
        this.whatsapp = false;
        this.FormGroupCliente.controls["whatsapp"].setValue(null);
      case 'celular1':
        this.celular1 = false;
        this.FormGroupCliente.controls["celular1"].setValue(null);
        break;
      case 'celular2':
        this.celular2 = false
        this.FormGroupCliente.controls["celular2"].setValue(null);
        break;
      case 'celular3':
        this.celular3 = false;
        this.FormGroupCliente.controls["celular3"].setValue(null);
        break;
      case 'celular4':
        this.celular4 = false; 
        this.FormGroupCliente.controls["celular4"].setValue(null);
        break;
      case 'celular5':
        this.celular5 = false;
        this.FormGroupCliente.controls["celular5"].setValue(null);
        break;
      default:
        break;
    }
  }

  editarTelefoneresidencial(){
    
  }

  openSnackBar(mensagem: string, acao: string) {
  this._snackBar.open(mensagem, acao, {
    duration: 2000,
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