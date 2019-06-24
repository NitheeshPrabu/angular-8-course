import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // cannot select by id or psuedo selectors
  //selector: '[app-root]', // can select as attribute
  //selector: '.app-root', // can select as class
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';
  name = 'Nitheesh';
}
