import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../posts/post.model';
import { PostService } from '../posts/post.service';


@Injectable({ providedIn: 'root' })

export class DataStorageService {

  private dataRefreshInterval = 5; // in minutes

  constructor(
    private http: HttpClient,
    private postService: PostService
  ) { }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<any>(
        environment.postsApiUrl + environment.postsApiKey
      )
      .pipe(
        catchError(this.handleError),
        map(posts => {
          return posts.articles.map(post => {
            return {
              imagePath: post.urlToImage,
              title: post.title,
              description: post.description
            };
          });
        }),
        tap((posts: Post[]) => {
          this.postService.setPosts(posts);
          this.setRefreshInterval();
        })
      );
  }

  private setRefreshInterval(): void {
    setTimeout(() => {
      this.fetchPosts().subscribe();
    }, this.dataRefreshInterval * 60 * 1000);
  }
  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    const errorMessage = 'Ups,error occurred!';
    return throwError(errorMessage);
  }
}

