import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { Observable } from 'rxjs';
import { ClinicaService } from 'src/app/services/clinica.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { isNull } from 'util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../../shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})

export class ConsultarComponent implements OnInit {
  clientes : Cliente[];

  displayedColumns: string[] = [ 'id','nome', 'cpf', 'telefone', 'data', 'actions'];

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
      data: {cliente: cliente, mensagem: `Deseja realmente excluir o Id: ${cliente.id}?`, acao: "excluir"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deletarCliente(cliente.id)
      }
    });
  }


  carregaCliente(){
    this.clinicaService.obterClientes().subscribe(clientes => 
      {
        console.log(clientes);
        
        this.dataSource.data = clientes;
        this.clientes = clientes;
      },
      error => console.log(error));
  }

  editarCliente(id: any){
    this.router.navigate(['editar', id])
  }
  
  deletarCliente(id){
    this.clinicaService.deletarCliente(id)
      .subscribe(
        data => {
        this.openSnackBar("Id: " + id + " excluído com sucesso!",'Excluido!');
        this.carregaCliente();
        },
        error => console.log(error));
  }
  openSnackBar(mensagem: string, acao: string) {
    this._snackBar.open(mensagem, acao, {
      duration: 2000,
    });
  }
}
