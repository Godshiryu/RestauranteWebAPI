import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Restaurante } from './../model/restaurante';
import { RestaurantesService } from './restaurantes.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  restaurantes: Restaurante[] = [];
  filtroNome: String;
  state: number;
  stateMsg: string;
  popOutTitle: string = 'Tem certeza que quer deletar o restaurante?';
  popOutMsg: string = '';

  constructor(
    private restaurantesService: RestaurantesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe(
      params => {
        this.state = params.state,
          this.stateMsg = params.stateMsg
      }
    );
  }

  ngOnInit() {
    this.restaurantesService.getRestaurantes()
      .subscribe(data => this.restaurantes = data.Data);
  }

  deleteRestaurante(restaurante: Restaurante) {
    this.restaurantesService.deleteRestaurante(restaurante.id)
      .subscribe(
      result => {
        this.state = 0;
        this.stateMsg = 'deletado';
        this.restaurantesService.getRestaurantes()
          .subscribe(data => this.restaurantes = data.Data);
      },
      error => console.log(error)
      );
  }

  pesquisaRestaurantes() {
    this.limpaState();
    this.restaurantesService.getRestauranteByName(this.filtroNome)
      .subscribe(data => this.restaurantes = data.Data);
  }

  adicionaRestaurante() {
    this.router.navigate(['/restaurantes/new']);
  }

  limpaState() {
    this.state = null;
    this.stateMsg = null;
    this.router.navigate(['/restaurantes/']);
  }
}