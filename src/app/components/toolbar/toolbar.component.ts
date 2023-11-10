import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../core/services/login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() isLogged: boolean;
  @Input() isAdmin: boolean;
  public link: string;
  public username: string | null;

  constructor(private loginService: LoginService, private route: Router) {
    this.isLogged = true
    this.isAdmin = true
    this.link = route.url
    this.username = localStorage.getItem('user');

   }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }

  navigateHomeUser(){
    this.route.navigate(['/Home']);
  }

  navigateFirstPage(){
    this.route.navigate(['/FirstPage']);
  }

}
