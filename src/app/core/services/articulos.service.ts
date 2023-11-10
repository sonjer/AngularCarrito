import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";

//Interface
import { IArticulos } from "../interfaces/articulos.interface"
import { environment } from "../../../environments/environment"

//Constants
import { Constants } from "../constants/constants"
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ArticulosService {

    dataArticulos: IArticulos[] = [];
    constructor(
        private http: HttpClient
    ) { }

   async  getArticulos(): Promise<any> {
     let url = environment.apiUrl + 'ListaArticulos';
          return  this.http.get(url).toPromise().then((response) => {
            console.log('response', response)
            if (response) {
              let data = response
              console.log(data)
              return data
            }
            return this.dataArticulos
          })
          .catch(err => {
            console.error('Articulos error', err)
            return this.dataArticulos
          })
    }
}