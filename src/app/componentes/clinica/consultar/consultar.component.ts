import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClinicaService } from 'src/app/services/clinica.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../../shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tile } from 'src/app/model/tile';


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})

export class ConsultarComponent implements OnInit {
  clientes : Cliente[];

  displayedColumns: string[] = [ 'nome', 'cpf', 'telefone', 'data', 'cep','logradouro',
  'complemento','bairro','localidade','uf','numero', 'actions'];

  tiles: Tile[] = [
    {cols: 3, rows: 1, clientes: this.clientes}
  ];

  dataSource = new MatTableDataSource(this.clientes);

  resultado: string;



  constructor(private clinicaService : ClinicaService, 
    private router: Router,
    public dialog: MatDialog, 
    private _snackBar: MatSnackBar) {
   }

   
  ngOnInit(): void {
    this.carregaCliente();
  }


  openDialog(cliente): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {cliente: cliente, mensagem: `Deseja realmente excluir o usuario ${cliente.nome}?`, acao: "excluir"}
    });

    dialogRef.afterClosed().subscribe(result => {
      // debugger;
      if(result){
        this.deletarCliente(cliente)
      }
    });
  }

  // carrega todos os clentes do banco e preenche o data source para aparecer no GRID
  carregaCliente(){
    this.clinicaService.obterClientes().subscribe(clientes => 
      {
        console.log(clientes);
        
        this.dataSource.data = clientes;
        // this.clientes = clientes;
      },
      error => console.log(error));
  }

  // navega para o formulario de edição após clicar no botão editar
  editarCliente(id: any){
    this.router.navigate(['editar', id])
  }

  // deleta o cliente por ID apos clicar no botao excluir
  
  deletarCliente(cliente){
    this.clinicaService.deletarCliente(cliente.id)
      .subscribe(
        () => {
        this.openSnackBar("Usuario " + cliente.nome + " excluído com sucesso!",'Excluido!');
        this.carregaCliente();
        },
        error => console.log(error));
  }

   // abre informativo do tipo snack parametrizado
  openSnackBar(mensagem: string, acao: string) {
    this._snackBar.open(mensagem, acao, {
      duration: 2000,
    });
  }
}
