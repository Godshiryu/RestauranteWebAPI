import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PratosComponent } from './pratos/pratos.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'naoEncontrado', component: PaginaNaoEncontradaComponent },
    { path: '**', component: PaginaNaoEncontradaComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);