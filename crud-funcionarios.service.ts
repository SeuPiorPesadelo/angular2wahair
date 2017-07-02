import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod } from '@angular/http';
import { Funcionario } from '../app/funcionario';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CrudFuncionariosService {

  http: Http;
  headers: Headers;
  baseUrl: string = 'http://localhost:8080/WSHair/funcionario';
  private funcionarios: Funcionario[] = [];

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getFuncionarios(): Observable<Funcionario []>{
      return this.http.get((this.baseUrl + '/funcionarios')).map(res => res.json());
  }

  adicionarFuncionario(funcionario: Funcionario){
    return this.http.post(this.baseUrl, JSON.stringify(funcionario), {headers: this.headers});
  }

  removerFuncionario(funcionario: Funcionario){
	 	return this.http.delete(this.baseUrl + '/funcionarios/delete/' + funcionario['id']);
  }

  atualizaFuncionario(codigo: string, funcionario: Funcionario){
    return this.http.put(this.baseUrl + '/' + codigo, JSON.stringify(funcionario), {headers: this.headers});
  }

  getFuncionarioPorCodigo(codigo: string): Observable<Funcionario>{
    return this.http.get((this.baseUrl + '/funcionarios/'+ codigo)).map(res => res.json());
  }
}