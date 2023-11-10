import { Component } from '@angular/core';
import { Articulo } from 'src/app/core/models/model';

import { ArticulosService } from '../../core/services/articulos.service';
import { ArticuloCarritoService } from '../../core/services/articuloCarrito.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})


export class FirstPageComponent {

  articulos : Articulo[] = [];
  articulosCarrito: Articulo[] = [];

  constructor(private articuloService: ArticulosService, private articuloCarritoService: ArticuloCarritoService) { }

  ngOnInit(): void {
    this.articuloService.getArticulos().then(data => this.articulos = data);
    this.articuloCarritoService.articulos.subscribe( data => this.articulosCarrito = data);
  }

  total(){
    let sum=0;
    this.articulosCarrito.forEach(articulo => {
      sum += articulo.cantidad * articulo.precio
    });
    return sum;
  }

  upQuantity(articulo : Articulo): void{
    if(articulo.stock > articulo.cantidad) {
      articulo.cantidad ++;
      this.articuloCarritoService.addToCart(articulo);
    }
  }

  downQuantity(articulo : Articulo): void{
    if(articulo.cantidad > 0) {
      articulo.cantidad --;
      this.articuloCarritoService.addToCart(articulo);
    }
  }

  verifyArticuloQuantity(articulo : Articulo): void {
    if(articulo.stock < articulo.cantidad) {
      alert("No se pueden pedir más de las cervezas que hay en stock");
      articulo.cantidad = articulo.stock;
    }

    if(articulo.cantidad < 0) {
      alert("No se pueden pedir menos que 0 cervezas");
      articulo.cantidad = 0;
    }
  }
}
