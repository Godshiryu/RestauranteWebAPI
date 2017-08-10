import { PratosModule } from './pratos/pratos.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RestaurantesModule } from './restaurantes/restaurantes.module';
import { PratosComponent } from './pratos/pratos.component';
import { RestauranteFormComponent } from './restaurantes/restaurante-form/restaurante-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { appRouting } from './app.routing.module';
import { restauranteRouting } from './restaurantes/retaurantes.routing';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PaginaNaoEncontradaComponent,
        NavBarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RestaurantesModule,
        PratosModule,
        appRouting
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }