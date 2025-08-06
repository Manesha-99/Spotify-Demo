import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnInit {

  // message = input<string>();

  @Input() message: string = '';
  @Input() number_c = 0;
  @Input() dial_c: any;
  @Output() cToP = new EventEmitter<string>();
  @Output() beenu = new EventEmitter<string>();
  name: string = "";

  constructor(){
    console.log(this.message);
  }

  sendMessage(){
    this.cToP.emit("Hi this is from child");
  }


  sendMessage2(){
    this.beenu.emit("hi Beenu is here....");
  }
  
  ngOnInit(): void {
    if(this.dial_c){
      this.name = this.dial_c.name;
    }
  }

  
  
}
