import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod } from '@angular/http';
import { Cliente } from '../app/cliente';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CrudClientesService {

  http: Http;
  headers: Headers;
  baseUrl: string = 'http://localhost:8080/WSHair/cliente';
  private clientes: Cliente[] = [];

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
}

 getClientes(): Observable<Cliente []>{
    return this.http.get((this.baseUrl + '/clientes')).map(res => res.json());
  }

  adicionarCliente(cliente: Cliente){
    return this.http.post(this.baseUrl, JSON.stringify(cliente), {headers: this.headers});
  }

  getClientePorCodigo(codigo: number): Observable<Cliente>{
    console.log("busca cliente");
    return this.http.get((this.baseUrl + '/cliente/'+ codigo)).map(res => res.json());
  }

  removerCliente(cliente: Cliente){
    return this.http.delete(this.baseUrl + '/clientes/delete/' + cliente['id']);
  }

  atualizaCliente(codigo: number, cliente: Cliente){
    return this.http.put(this.baseUrl + '/' + codigo, JSON.stringify(cliente), {headers: this.headers});
  }

}

