import { RestauranteFormComponent } from './restaurante-form/restaurante-form.component';
import { RestaurantesComponent } from './restaurantes.component';
import { Routes, RouterModule } from '@angular/router';


const restauranteRoutes: Routes = [
  { path: 'restaurantes', component: RestaurantesComponent, pathMatch: 'full' },
  { path: 'restaurantes/new', component: RestauranteFormComponent},
  { path: 'restaurantes/:id', component: RestauranteFormComponent}
];

export const restauranteRouting = RouterModule.forChild(restauranteRoutes);