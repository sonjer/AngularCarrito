import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";

//Interface
import { IArticulos } from "../interfaces/articulos.interface"
import { Articulo } from "../models/model"
import { environment } from "../../../environments/environment"

//Constants
import { Constants } from "../constants/constants"
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ArticulosService {

  url: string;
  dataArticulos: Articulo[] = [];
  constructor(
    private http: HttpClient
  ) { }

  async getArticulos(): Promise<any> {
    let url = environment.apiUrl + 'ListaArticulos';
    return this.http.get(url).toPromise().then((response) => {
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

  async genericService(articulo: Articulo, spType: string): Promise<any> {

    switch (spType) {
      case 'insertArticulo':
        this.url = (environment.apiUrl + Constants.spInsert);
        return this.http.post(this.url, articulo
        ).toPromise().then(resp => {
          const respuesta = resp
          return respuesta
        })
          .catch(err => {
            console.error(Constants.errorInsertArticulos, err);
            return null
          });
      case 'updateArticulo':
        this.url = (environment.apiUrl + Constants.spUpdate);
        return this.http.put(this.url, articulo
        ).toPromise().then(resp => {
          const respuesta = resp
          return respuesta
        }).catch(err => {
          console.error(Constants.errorUpdateArticulos, err);
          return null
        })
      case 'deleteArticulo': this.url = (environment.apiUrl + Constants.spInsert);
      this.url = (environment.apiUrl + Constants.spDelete);
        return this.http.post(this.url, articulo.codigo
        ).toPromise().then(resp => {
          const respuesta = resp
          return respuesta
        }).catch(err => {
          console.error(Constants.errorUpdateArticulos, err);
          return null
        })
      default:
        console.log(Constants.errorGeneric);
    }


  }
}