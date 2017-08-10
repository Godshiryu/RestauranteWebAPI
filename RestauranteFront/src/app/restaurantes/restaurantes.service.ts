import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Restaurante } from './../model/restaurante';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RestaurantesService {

  private url = 'http://localhost:58444/api/Restaurantes';
  headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions;
  constructor(
    private http: Http
  ) { }

  getRestaurantes() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getRestaurante(id) {
    return this.http.get(this.getRestauranteUrl(id), { headers: this.headers })
      .map(res => res.json());
  }

  getRestauranteByName(name) {
    if (name == null || name.trim() == '') {
      return this.getRestaurantes();
    } else {
      return this.http.get(this.url + '?nome=' + name, { headers: this.headers })
        .map(res => res.json());
    }
  }

  addRestaurante(restaurante) {
    return this.http.post(this.url, JSON.stringify(restaurante), { headers: this.headers })
      .map(res => res.json());
  }

  updateRestaurante(restaurante) {
    return this.http.put(this.getRestauranteUrl(restaurante.id), JSON.stringify(restaurante), { headers: this.headers })
      .map(res => res.json());;
  }

  deleteRestaurante(id) {
    return this.http.delete(this.getRestauranteUrl(id), { headers: this.headers })
      .map(res => res.json());
  }

  private getRestauranteUrl(id) {
    return this.url + '/' + id;
  }
}