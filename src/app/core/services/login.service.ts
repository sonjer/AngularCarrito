import { ILoginForm } from '../interfaces/login.interface'
import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from "@angular/common/http"
import { Router } from '@angular/router'
import { Constants } from '../constants/constants'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
  }

  isLoggedIn (): boolean {
    if (window.localStorage.getItem(Constants.User)) {
      return true
    } else {
      return false
    }
  }

  logout() {
    window.localStorage.removeItem(Constants.User)
    window.localStorage.removeItem(Constants.DataUser)
    this.route.navigate(['/Login'])
  }


  async viaKiosko(username: string, password: string): Promise<any> {
    const url = (environment.apiUrl + 'Login')
    return this.http.post(url, { email: username, password: password })
      .toPromise().then((response: any) => {
        console.log('response', response)
        if (response) {
          let data = response.result
          console.log(data)
          return data
        }
        return null
      })
      .catch(err => {
        console.error('Login error', err)
        return null
      })
  }
}
