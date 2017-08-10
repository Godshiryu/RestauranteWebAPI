import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RestaurantesService } from './../restaurantes/restaurantes.service';
import { PratosService } from './pratos.service';
import { pratosRouting } from './pratos.routing';
import { PratoFormComponent } from './prato-form/prato-form.component';
import { PratosComponent } from './pratos.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    pratosRouting,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'primary' // set defaults here
    })
  ],
  declarations: [
    PratosComponent,
    PratoFormComponent
  ],
  exports: [
    PratosComponent
  ],
  providers: [
    PratosService,
    RestaurantesService
  ]
})
export class PratosModule { }
