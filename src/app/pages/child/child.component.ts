import { Component, computed, EventEmitter, Input, input, OnInit, output, Output, signal, effect } from '@angular/core';

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
  @Output() c_count = new EventEmitter<number>();
  @Output() total = new EventEmitter<number>();
  name: string = "";

  constructor(){
    console.log(this.message);
    
  }

  count = signal(0);
  x = signal(4);
  y = signal(8);

  total_compute = computed(()=>this.x()*this.y());

  sendTotal(){
    this.total.emit(this.total_compute());
  }

  c_increment(){
    this.count.set(this.count()+1);
    this.c_count.emit(this.count());
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
  

