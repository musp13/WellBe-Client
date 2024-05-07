import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button1',
  templateUrl: './button1.component.html',
  styleUrl: './button1.component.css'
})
export class Button1Component {
@Input() buttonText: string = '';
@Output() buttonClick = new EventEmitter<void>();

handleClick(): void {
  this.buttonClick.emit();
}

}
