import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../models/game";
import {HttpService} from "../../services/http/http.service";
import {ActivatedRoute, Params} from "@angular/router";
import {APIResponse} from "../../models/api-response";
import {Subscription} from 'rxjs';
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  public sort: string | undefined;
  public games: Array<Game> | undefined;
  public selectedGame: string | undefined;
  public searchQuery: string | undefined;
  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.dataService.content.subscribe(value => {
      this.searchQuery = value;
    })

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params["search-query"]) {
        this.searchGames('metacrit', params["search-query"])
      } else {
        this.searchGames("metacrit");
      }
    })

  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService.getGameList(sort, search)
      .subscribe((gamesList: APIResponse<Game>) => {
        this.games = gamesList.results;
      })
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  setSelectedGame(gameName: string) {
    this.selectedGame = gameName;
  }
}

