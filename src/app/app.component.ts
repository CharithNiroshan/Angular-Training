import {Component} from '@angular/core';
import {PostService} from "./services/post/post.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'GamesApp';

  constructor(private post: PostService) {
    this.post.getPosts().subscribe(data => console.log(data))
  }
}
