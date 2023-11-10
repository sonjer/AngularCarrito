import { Component, OnInit } from '@angular/core';
import { IArticulos } from 'src/app/core/interfaces/articulos.interface';

import { ArticulosService } from '../../core/services/articulos.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource: IArticulos[] = [];
  displayedColumns: string[] = ['codigo','descripcion','precio','stock'];

  constructor(private articulosService: ArticulosService) {
    this.articulosService.getArticulos().then(dataArticulos => {
      this.dataSource = dataArticulos;
      console.log('this.dataSource', this.dataSource)
    })
  }

  ngOnInit(): void {

  }

}
