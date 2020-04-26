import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor(private http: HttpClient) { }

  protected UrlApi: string = "http://localhost:8080/api/v1/";

  obterClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.UrlApi + "usuarios");
  }
  obterClientesPorId(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(this.UrlApi + `usuarios/${id}`);
  }
  salvarCliente(cliente : Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.UrlApi + "usuarios",cliente);
  }
  editarCliente(cliente : Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.UrlApi + `usuarios/${cliente.id}`, cliente);
  }
  deletarCliente(id : number): Observable<Cliente>{
    return this.http.delete<Cliente>(this.UrlApi + `usuarios/${id}`);
  }


}
