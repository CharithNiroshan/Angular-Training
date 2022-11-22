import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public content = new BehaviorSubject<string>("");

  constructor() {
    console.log("Inside Data Service Constructor");
  }

  updateData(text: string) {
    this.content.next(text);
  }
}
