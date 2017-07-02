import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod } from '@angular/http';
import { Servico } from '../app/servico';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CrudServicosService {

  http: Http;
  headers: Headers;
  baseUrl: string = 'http://localhost:8080/WSHair/servico';
  private servicos: Servico[] = [];

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getServicos(): Observable<Servico []>{
      return this.http.get((this.baseUrl + '/servicos')).map(res => res.json());
  }

  adicionarServico(servico: Servico){
    return this.http.post(this.baseUrl, JSON.stringify(servico), {headers: this.headers});
  }

  removerServico(servico: Servico){
	 	return this.http.delete(this.baseUrl + '/servicos/delete/' + servico['id']);
  }

  atualizaServico(codigo: string, servico: Servico){
    return this.http.put(this.baseUrl + '/' + codigo, JSON.stringify(servico), {headers: this.headers});
  }

  getServicoPorCodigo(codigo: string): Observable<Servico>{
    return this.http.get((this.baseUrl + '/servicos/'+ codigo)).map(res => res.json());
  }

}
