import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { RestaurantesService } from './restaurantes.service';
import { restauranteRouting } from './retaurantes.routing';
import { RestaurantesComponent } from './restaurantes.component';
import { RestauranteFormComponent } from './restaurante-form/restaurante-form.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    restauranteRouting,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'primary' // set defaults here
    })
  ],
  declarations: [
    RestauranteFormComponent,
    RestaurantesComponent
  ],
  exports: [
    RestaurantesComponent
  ],
  providers: [
    RestaurantesService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
})
export class RestaurantesModule { }