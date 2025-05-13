import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BuscarEmpleoComponent } from './pages/buscar-empleo/buscar-empleo.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'buscarempleo', component: BuscarEmpleoComponent},
    {path: 'recomendaciones', component: RecomendacionesComponent},
    {path: 'registro', component: RegistroPageComponent}
];
