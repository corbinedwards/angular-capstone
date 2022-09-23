import { Component } from '@angular/core';

export interface CarouselImage {
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  carouselImages: any[] = [
    { name: 'carousel-1.jpg', title: 'Battle of the Bands', caption: 'The most exciting thing ever!' },
    { name: 'carousel-2.jpg', title: 'Performance', caption: 'Yep. Music!' },
    { name: 'carousel-3.jpg', title: 'Sign-up Today!', caption: 'Click sign-up, sir' }
  ];
  // TODO: implement title service
  title = 'capstone';
}
