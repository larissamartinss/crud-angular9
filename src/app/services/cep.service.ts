import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class CepService {

 
 constructor(private http: HttpClient) { }

//  protected UrlApi: string  = "https://viacep.com.br/ws//json/";

 buscarCep(cep: string): Observable<Endereco>{
 return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
}
}