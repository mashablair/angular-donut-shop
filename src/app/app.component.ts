import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h1>{{ newMessage.length ? newMessage : message }}</h1>
      <input type="text" [value]="message" (input)="handleInput($event)" />
    </div>
  `,
  styles: [
    `
      .app {
        margin-top: 50px;
        font-size: 22px;
        color: #fff;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  message!: string;
  newMessage!: string;

  ngOnInit() {
    this.message = 'Hello World';
    this.newMessage = '';
  }

  handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.newMessage = value;
  }
}
