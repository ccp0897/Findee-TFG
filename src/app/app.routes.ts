import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BuscarEmpleoComponent } from './pages/buscar-empleo/buscar-empleo.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'buscarempleo', component: BuscarEmpleoComponent, canActivate:[AuthGuard]},
    {path: 'recomendaciones', component: RecomendacionesComponent, canActivate:[AuthGuard]},
    {path: 'registro', component: RegistroPageComponent},
    {path: 'perfilUsuario', component: ProfileComponent, canActivate:[AuthGuard]},
    {path: '**', redirectTo: 'home'}
];
