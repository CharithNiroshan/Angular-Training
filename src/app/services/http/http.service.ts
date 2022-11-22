import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {map} from "rxjs/operators"
import {APIResponse} from "../../models/api-response";
import {Game} from "../../models/game";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) {
  }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }
    const games: Observable<APIResponse<Game>> = this.http.get<APIResponse<Game>>(`${environment.baseUrl}/games`, {params: params});
    const filteredGames = games.pipe(map(game => game.results.length > 20));
    filteredGames.subscribe(val => console.log(`Is No of Results in the API Response greater than 20: ${val}`));
    return games;
  }

  getGameDetails(id: string): Observable<Game> {
    return this.http.get<Game>(`${environment.baseUrl}/games/${id}`);
  }
}
