import { RouterModule, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Location } from '@angular/common';

import { PratosService } from './../pratos.service';
import { RestaurantesService } from './../../restaurantes/restaurantes.service';
import { Prato } from './../../model/Prato';
import { Restaurante } from './../../model/Restaurante';

@Component({
  selector: 'app-prato-form',
  templateUrl: './prato-form.component.html',
  styleUrls: ['./prato-form.component.css']
})
export class PratoFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  popOutTitle = 'Tem certeza disso?';
  popOutMsg = 'Qualquer alteração não salva será perdida.';
  prato: Prato = new Prato();
  restaurantes: Restaurante[] = [];
  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private pratosService: PratosService,
    private location: Location
  ) {
    this.form = formBuilder.group({
      nome: [null, [
        Validators.required
      ]],
      restaurantes: [null, [
        Validators.required
      ]],
      preco: [null, [
        Validators.required
      ]]
    })
  };

  ngOnInit() {
    let id = this.route.params.subscribe(params => {
      let id = params['id'];

      this.title = id ? 'Editar Prato' : 'Cadastro de Prato';

      this.restaurantesService.getRestaurantes().subscribe(
        result => {
          this.restaurantes = result.Data;

          if (result.status == 404) {
            this.router.navigate(['naoEncontrado']);
          }
        },
        error => {
          alert('Não foi possível contactar o servidor');
          console.log(error);
        }
      );

      if (!id)
        return;


      this.pratosService.getPrato(id).subscribe(
        result => {
          this.prato = result.Data[0];
          if (result.status == 404) {
            this.router.navigate(['naoEncontrado']);
          }
        },
        error => {
          alert('Não foi possível contactar o servidor');
          console.log(error);
        }
      );
    });
  }

  save() {
    let result;
    if (this.prato.id) {
      result = this.pratosService.updatePrato(this.prato).subscribe(
        result => {
            this.router.navigate(['pratos'],
              { queryParams: { state: 0, stateMsg: 'atualizado' } }
          );
        },
        error => {
          alert('Não foi possível contactar o servidor');
          console.log(error);
        }
      );
    } else {
      result = this.pratosService.addPrato(this.prato).subscribe(
        result => {
            this.router.navigate(['pratos'],
            { queryParams: { state: 0, stateMsg: 'cadastrado' } }
          );
        },
        error => {
          alert('Não foi possível contactar o servidor');
          console.log(error);
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}