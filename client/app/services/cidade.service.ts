import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CidadeService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCidades(): Observable<any> {
    return this.http.get('/api/cidades').map(res => res.json());
  }

  countCidades(): Observable<any> {
    return this.http.get('/api/cidades/count').map(res => res.json());
  }

  addCidade(cidade): Observable<any> {
    return this.http.post('/api/cidade', JSON.stringify(cidade), this.options);
  }

  getCidade(cidade): Observable<any> {
    return this.http.get(`/api/cidade/${cidade._id}`).map(res => res.json());
  }

  editCidade(cidade): Observable<any> {
    return this.http.put(`/api/cidade/${cidade._id}`, JSON.stringify(cidade), this.options);
  }

  deleteCidade(cidade): Observable<any> {
    return this.http.delete(`/api/cidade/${cidade._id}`, this.options);
  }

}