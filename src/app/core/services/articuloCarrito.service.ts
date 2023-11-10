import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Articulo } from '../models/model';

@Injectable({
    providedIn: 'root'
})
export class ArticuloCarritoService {

    private _articulo: Articulo[] = [];
    private _articulosSubjects: BehaviorSubject<Articulo[]> = new BehaviorSubject(this._articulo);
    public articulos: Observable<Articulo[]> = this._articulosSubjects.asObservable();
    constructor() { }

    addToCart(articulo: Articulo) {
        let index = this._articulo.findIndex(b => b.descripcion === articulo.descripcion);
        if (index === -1)
            this._articulo.push(articulo);
        else
            this._articulo[index].descripcion = articulo.descripcion;
        if (articulo.cantidad == 0) {
            this._articulo.splice(index, 1);
        }
    }
}