import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

  parentMessage = "Hello from Parent";
  fromChild = "";
  fromchild2 = "";
  number = 4;
  dial = {
    "name": "Mane",
    "age": 14
  }

  recieveMessage(event: string){
    this.fromChild = event;
  }

  recieveMessage2(event: string){
    this.fromchild2 = event;
  }

}
