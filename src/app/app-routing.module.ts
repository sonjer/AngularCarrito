import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { loginGuardGuard } from './core/guards/login-guard.guard';
import { FirstPageComponent } from './components/first-page/first-page.component';

const routes: Routes = [
  { 
    path: 'Login', component: LoginComponent,
  },
  { 
    path: 'Home', 
    component: FirstPageComponent,
    canActivate: [loginGuardGuard]
  },
  { 
    path: 'Articulos', 
    component: HomeComponent
    },
  {
    path: '', redirectTo: 'Login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
