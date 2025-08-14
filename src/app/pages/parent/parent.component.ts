import { Component, computed, effect,signal } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { NgIf } from '@angular/common';
import { linkedSignal } from '@angular/core';
import { fromEvent, map, of, tap } from 'rxjs';


@Component({
  selector: 'app-parent',
  imports: [ChildComponent, ],
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

  constructor(){
    // effect(()=>{
    //   console.log(`Hi ${this.word()}`); 
    // });
    
  }

  word = signal("Hora");
  
  

  from_c_total = 0;
  from_child_count = 0;

  recieveCount(event2: number){
    this.from_child_count = event2;
    this.word.set("Putha");
  }

  elementTesting =false;
  marks = 0;

  recieveTotal(event: number){
    this.from_c_total = event;
    this.word.set("Putha");
  }

  recieveMessage(event: string){
    this.fromChild = event;
  }

  recieveMessage2(event: string){
    this.fromchild2 = event;
    this.word.set("Samayan");
    this.word.set("Samayan_2");
    this.word.set("Samayan_3");
  }


  // price = signal(100);
  // discount = signal(20);

  // // discountedPrice = linkedSignal({
  // //   source:[this.price, this.discount],
  // //   computation: ([pc,dc])=> pc - (pc*dc)/100
  // // });


  // discountedPrice = linkedSignal({
  //   source: [this.price, this.discount],
  //   computation: ([pc, dc]) => pc - (pc * dc) / 100
  // });



  price = signal(100);
  discount = signal(20);

  // discountedPrice = linkedSignal({
  //   source: [this.price, this.discount],
  //   computation: ([pc, dc]:[number, number]) => pc - (pc * dc) / 100
  // });

  discountedPrice = computed(()=>{
    const pc = this.price();
    const dc = this.discount();
    return pc-(pc*dc)/100
  });

// tt(){
//   of(1,2,3).subscribe(valc=>console.log(valc))
// };
  

// questionMark$ = fromEvent<KeyboardEvent>(document, 'keyup');
// sub = this.questionMark$.subscribe(e=>console.log(e));

// practice$ = of(2,4,6).pipe(
//   map(item=>item*2),
//   tap(item=> console.log(item))
// )

// sub2 = this.practice$.subscribe();


}
