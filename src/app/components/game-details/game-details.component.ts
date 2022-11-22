import {Component, OnInit} from '@angular/core';
import {Game} from "../../models/game";
import {HttpService} from "../../services/http/http.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs"

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})

export class GameDetailsComponent implements OnInit {
  public game: Game | undefined;
  routeSub: Subscription | undefined;
  gameSub: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.getGameDetails( params["id"])
    })
  }

  getGameDetails(id: string) {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp;
    })
  }

  getRating(): number {
    return 3.5;
  }

  getColor(value: number): string {
    if (value > 75) {
      return "#5ee432";
    } else if (value > 50) {
      return "#fffa50";
    } else if (value > 30) {
      return "#f7aa38";
    } else {
      return "#ef4655";
    }
  }
}
