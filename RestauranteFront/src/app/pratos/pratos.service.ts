import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Prato } from './../model/prato';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PratosService {

  private url= 'http://localhost:58444/api/Pratos';
  headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions;
  constructor(
    private http: Http
  ) { }

  getPratos() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getPrato(id) {
    return this.http.get(this.getPratoUrl(id), { headers: this.headers })
      .map(res => res.json());
  }

  addPrato(Prato) {
    return this.http.post(this.url, JSON.stringify(Prato), { headers: this.headers })
      .map(res => res.json());
  }

  updatePrato(Prato) {
    return this.http.put(this.getPratoUrl(Prato.id), JSON.stringify(Prato), { headers: this.headers })
      .map(res => res.json());;
  }

  deletePrato(id) {
    return this.http.delete(this.getPratoUrl(id), { headers: this.headers })
      .map(res => res.json());
  }

  private getPratoUrl(id) {
    return this.url + '/' + id;
  }
}