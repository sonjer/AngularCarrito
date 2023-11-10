import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IArticulos } from 'src/app/core/interfaces/articulos.interface';
import { Articulo } from 'src/app/core/models/model';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  GridComponent,
  GridDataResult,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";
import { ArticulosService } from '../../core/services/articulos.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public view: Articulo[] = [];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };
  public formGroup: FormGroup;
  dataSource: Articulo[] = [];
  displayedColumns: string[] = ['codigo', 'descripcion', 'precio', 'stock'];
  editedRowIndex: number;
  editeArticulo: Articulo;

  constructor(private articulosService: ArticulosService) {
    this.articulosService.getArticulos().then(dataArticulos => {
      this.dataSource = dataArticulos;
      this.view = this.dataSource;
      console.log('this.view', this.view)
    })
  }

  ngOnInit(): void {

  }

  public onStateChange(state: State) {
    this.gridState = state;
  }

  public addHandler(args: AddEvent, formInstance: NgForm): void {
    formInstance.reset();
    // close the previously edited item
    this.closeEditor(args.sender);
    // open a new item editor
    args.sender.addRow(new Articulo());
  }

  public editHandler(args: EditEvent): void {
    // close the previously edited item
    this.closeEditor(args.sender);
    // track the most recently edited row
    // it will be used in `closeEditor` for closing the previously edited row
    this.editedRowIndex = args.rowIndex;
    // clone the current - `[(ngModel)]` will modify the original item
    // use this copy to revert changes
    this.editeArticulo = Object.assign({}, args.dataItem);
    console.log('this.editeArticulo', this.editeArticulo)
    // edit the row
    args.sender.editRow(args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source
    // in this example, the dataItem is `editService`
    //this.editService.remove(args.dataItem);
  }

  public saveHandler(args: SaveEvent): void {
    // update the data source
    //this.editService.save(args.dataItem, args.isNew);

    // close the editor, that is, revert the row back into view mode
    args.sender.closeRow(args.rowIndex);

    //this.editedRowIndex = undefined;
    //this.editedProduct = undefined;
  }


  private closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    // close the editor
    grid.closeRow(rowIndex);
    // revert the data item to original state
    //this.editService.resetItem(this.editedProduct);
    // reset the helpers
    this.editedRowIndex = 0;
    //this.editedProduct = null;
  }

  public cancelHandler(args: CancelEvent): void {
    // call the helper method
    this.closeEditor(args.sender, args.rowIndex);
  }

}
