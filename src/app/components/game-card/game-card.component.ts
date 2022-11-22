import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from 'src/app/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})

export class GameCardComponent {
  @Input() game: Game | undefined;
  @Output() newItemEvent = new EventEmitter<string>();

  transferDataToParent(value: string | undefined) {
    this.newItemEvent.emit(value);
  }

  constructor(
    private router: Router
  ) {
    console.log("Inside Home Component Constructor");
  }

  openGameDetails(id: string | undefined): void {
    this.router.navigate(["game-details", id])
  }


}
