import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Articulo } from '../models/model';

@Injectable({
    providedIn: 'root'
})
export class ArticuloCarritoService {

    private _articulos: Articulo[] = [];
    private _articulosSubjects: BehaviorSubject<Articulo[]> = new BehaviorSubject(this._articulos);
    public articulos: Observable<Articulo[]> = this._articulosSubjects.asObservable();
    constructor() { }

    addToCart(articulo: Articulo) {
        let index = this._articulos.findIndex(b => b.descripcion === articulo.descripcion);
        if (index === -1)
            this._articulos.push(articulo);
        else
            this._articulos[index].cantidad = articulo.cantidad;
        if (articulo.cantidad == 0) {
            this._articulos.splice(index, 1);
        }
    }

    cleanCart(){
       this._articulos.splice(0, this._articulos.length);
    }
}