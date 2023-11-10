import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from '../../core/services/login.service';
import { environment } from '../../../environments/environment';
// Interfaces
import { ILoginForm } from '../../core/interfaces/login.interface'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isLoading: boolean = true
  loadingMessage: string = ''
  nameProject: string;
  showAlertLoginError: boolean = false;

  constructor(
    private route: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService
  ) {
    this.nameProject = environment.nameProject;
  }

  ngOnInit(): void {
  }

  close() {
    this.showAlertLoginError = false;
  }
  
  onSubmit() {
    this.isLoading = true
    this.spinner.show();
    let username = this.loginForm.value.username ? this.loginForm.value.username : '';
    let password = this.loginForm.value.password ? this.loginForm.value.password : '';

    this.loginService.viaKiosko(username, password)
      .then(responseKiosko => {
        console.log('login response', responseKiosko)
        if (responseKiosko) {
          window.localStorage.setItem('dataUser', JSON.stringify(responseKiosko))
          window.localStorage.setItem('user', responseKiosko.nombre)
          this.route.navigate(['/Home']);
          this.spinner.hide();
          return responseKiosko.nombre
        }
        this.showAlertLoginError = true;
        throw new Error('Credenciales de usuario incorrectas')
      })
      .then((user) => {
        if (user) {
          return user
        }
        this.showAlertLoginError = true;
        throw new Error('No se han encontrado datos de usuario')
      })
      .catch((err) => {
        this.showAlertLoginError = true;
        console.error('Login Error', err)
        this.route.navigate(['/Login']);
        this.spinner.hide();
      })
  }

}
