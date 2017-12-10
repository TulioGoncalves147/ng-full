import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PaisService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getPaises(): Observable<any> {
    return this.http.get('/api/paises').map(res => res.json());
  }

  countPaises(): Observable<any> {
    return this.http.get('/api/paises/count').map(res => res.json());
  }

  addPais(pais): Observable<any> {
    return this.http.post('/api/pais', JSON.stringify(pais), this.options);
  }

  getPais(pais): Observable<any> {
    return this.http.get(`/api/pais/${pais._id}`).map(res => res.json());
  }

  editPais(pais): Observable<any> {
    return this.http.put(`/api/pais/${pais._id}`, JSON.stringify(pais), this.options);
  }

  deletePais(pais): Observable<any> {
    return this.http.delete(`/api/pais/${pais._id}`, this.options);
  }

}