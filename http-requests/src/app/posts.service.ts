import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http
    .post<{ name: string }>('https://angular-http-requests-demo.firebaseio.com/posts.json', postData)
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchPosts() {
    return this.http
    .get<{ [key: string]: Post }>('https://angular-http-requests-demo.firebaseio.com/posts.json')
    .pipe(map((response) => {
      const postsArray: Post[] = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          postsArray.push({ ...response[key], id: key });
        }
      }
      return postsArray;
    }));
  }
}
