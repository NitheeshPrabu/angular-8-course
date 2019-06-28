import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http
    .post<{ name: string }>('https://angular-http-requests-demo.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(response => {
      console.log(response);
    }, err => {
      this.error.next(err.message);
    });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>('https://angular-http-requests-demo.firebaseio.com/posts.json',
       {
         headers: new HttpHeaders({'Custom-Header': 'hello'}),
         params: new HttpParams().set('print', 'pretty')
       }
      )
      .pipe(map((response) => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({ ...response[key], id: key });
          }
        }
        return postsArray;
      }), catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deletePosts() {
    return this.http
      .delete('https://angular-http-requests-demo.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }).pipe(tap(event => {
        if (event.type === HttpEventType.Sent) {
          // ...
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }));
  }
}
