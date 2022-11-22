import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private http: HttpClient) {
  }

  getPosts(){
    let url="https://jsonplaceholder.typicode.com/posts";
    return this.http.get(url);
  }
}
