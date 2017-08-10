import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Prato } from './../model/Prato';
import { PratosService } from './pratos.service';
import { RestaurantesService } from './../restaurantes/restaurantes.service';

@Component({
  selector: 'app-pratos',
  templateUrl: './pratos.component.html',
  styleUrls: ['./pratos.component.css']
})
export class PratosComponent implements OnInit {

  pratos: Prato[] = [];
  state: number;
  stateMsg: string;
  popOutTitle: string = 'Tem certeza que quer deletar o prato?';
  popOutMsg: string = '';

  constructor(
    private pratosService: PratosService,
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
    this.pratosService.getPratos()
      .subscribe(
      data => {
      this.pratos = data.Data
      });
  }

  deletePrato(prato: Prato) {
    this.pratosService.deletePrato(prato.id)
      .subscribe(
      result => {
        this.state = 0;
        this.stateMsg = 'deletado';
        this.pratosService.getPratos()
          .subscribe(data => this.pratos = data.Data);
      },
      error => console.log(error)
      );
  }

  adicionaPrato() {
    this.router.navigate(['/pratos/new']);
  }

  limpaState() {
    this.state = null;
    this.stateMsg = null;
    this.router.navigate(['/pratos/']);
  }
}