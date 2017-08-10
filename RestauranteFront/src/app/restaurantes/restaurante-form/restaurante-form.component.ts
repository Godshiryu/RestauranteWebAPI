import { RouterModule, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Location } from '@angular/common';

import { Restaurante } from './../../model/Restaurante';
import { RestaurantesService } from './../restaurantes.service';

@Component({
  selector: 'app-restaurante-form',
  templateUrl: './restaurante-form.component.html',
  styleUrls: ['./restaurante-form.component.css']
})
export class RestauranteFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  popOutTitle: string = 'Tem certeza disso?';
  popOutMsg: string = 'Qualquer alteração não salva será perdida.';
  restaurante: Restaurante = new Restaurante();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private location: Location
  ) {
    this.form = formBuilder.group({
      nome: [null, [
        Validators.required,
        Validators.minLength(3)
      ]]
    })
  };

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Editar Restaurante' : 'Cadastro de Restaurante';
      if (!id)
        return;


      this.restaurantesService.getRestaurante(id).subscribe(
        result => {
          this.restaurante = result.Data[0];
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
    var result;
    if (this.restaurante.id) {
      result = this.restaurantesService.updateRestaurante(this.restaurante).subscribe(
        result => {
            this.router.navigate(['restaurantes'],
              { queryParams: { state: 0, stateMsg: 'atualizado' } }
          );
        },
        error => {
          alert('Não foi possível contactar o servidor');
          console.log(error);
        }
      );
    } else {
      result = this.restaurantesService.addRestaurante(this.restaurante).subscribe(
        result => {
            this.router.navigate(['restaurantes'],
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