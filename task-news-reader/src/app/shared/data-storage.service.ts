import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
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

  fetchPosts() {
    return this.http
      .get<any>(
        'http://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey='+environment.dataApiKey
      )
      .pipe(
        catchError(this.handleError),
        map(posts => {
          return posts.articles.map(post => {
            return {
              imagePath: post.urlToImage,
              title: post.title,
              description: post.description
            }
          })
        }),
        tap((posts: Post[]) => {
          this.postService.setPosts(posts);
          this.setRefreshInterval();
        })
      )
  }

  private setRefreshInterval(){
    setTimeout(()=>{
      this.fetchPosts().subscribe();
    },this.dataRefreshInterval*60*1000)
  }
  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'Ups,error occurred!';
    return throwError(errorMessage);
  }
}

