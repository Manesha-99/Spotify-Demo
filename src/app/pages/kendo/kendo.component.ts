import { Component } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { DataService } from '../../service/data.service';
import { KendoProduct } from '../../models/kendo.model';
import { PagerComponent } from "../../../../node_modules/@progress/kendo-angular-pager/pager/pager.component";
import { PageChangeEvent } from '@progress/kendo-angular-pager';

@Component({
  selector: 'app-kendo',
  imports: [KENDO_GRID,],
  templateUrl: './kendo.component.html',
  styleUrl: './kendo.component.css'
})
export class KendoComponent {

  constructor(private dataservice: DataService){}

  products : KendoProduct[] = []


  ngOnInit():void{
    this.dataservice.getProducts().subscribe((data)=>this.products = data.Products);
  }

  public tempArray = [
    {id: 1,
     name: "Ajith",
     marks: [2,3,4]
    },
    {id: 2,
      name: "Thomba",
      marks: [2,3,4]
     },
     {id: 3,
      name: "Playa",
      marks: [{tt:"dad", grade:"2"}, {tt:"dad", grade:"2"}]
     }
  ]




}
