import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EstadoService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getEstados(): Observable<any> {
    return this.http.get('/api/estados').map(res => res.json());
  }

  countEstados(): Observable<any> {
    return this.http.get('/api/estados/count').map(res => res.json());
  }

  addEstado(estado): Observable<any> {
    return this.http.post('/api/estado', JSON.stringify(estado), this.options);
  }

  getEstado(estado): Observable<any> {
    return this.http.get(`/api/estado/${estado._id}`).map(res => res.json());
  }

  editEstado(estado): Observable<any> {
    return this.http.put(`/api/estado/${estado._id}`, JSON.stringify(estado), this.options);
  }

  deleteEstado(estado): Observable<any> {
    return this.http.delete(`/api/estado/${estado._id}`, this.options);
  }

}
