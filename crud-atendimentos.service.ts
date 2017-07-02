import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod } from '@angular/http';
import { Atendimento } from '../app/atendimento';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CrudAtendimentosService {

  http: Http;
  headers: Headers;
  baseUrl: string = 'http://localhost:8080/WSHair/atendimento';
  private atendimentos: Atendimento[] = [];

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getAtendimentos(): Observable<Atendimento []>{
      return this.http.get((this.baseUrl + '/atendimentos')).map(res => res.json());
  }

  adicionarAtendimento(atendimento: Atendimento){
    return this.http.post(this.baseUrl, JSON.stringify(atendimento), {headers: this.headers});
  }

  removerAtendimento(atendimento: Atendimento){
	 	return this.http.delete(this.baseUrl + '/atendimentos/delete/' + atendimento['id']);
  }

  atualizaAtendimento(codigo: string, atendimento: Atendimento){
    return this.http.put(this.baseUrl + '/' + codigo, JSON.stringify(atendimento), {headers: this.headers});
  }

  getAtendimentoPorCodigo(codigo: string): Observable<Atendimento>{
    return this.http.get((this.baseUrl + '/atendimentos/'+ codigo)).map(res => res.json());
  }
}
