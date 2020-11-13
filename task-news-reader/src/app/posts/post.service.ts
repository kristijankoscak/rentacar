import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable()
export class PostService {

  constructor() { }

  postsChanged = new Subject<Post[]>();
  postsLoading = new Subject<boolean>();
  selectedPostTitle = new Subject<string>();
  occurredError = new Subject<string>();


  private posts: Post[] = [];

  setPosts(posts: Post[]): void{
    this.posts = posts;
    this.postsChanged.next(this.posts.slice());
    this.postsLoading.next(false);
  }

  getPosts(): Post[] {
    return this.posts.slice();
  }
  getPost(postId: number): Post {
    return this.posts.find((post, index) => {
      return index === postId;
    });
  }
}
