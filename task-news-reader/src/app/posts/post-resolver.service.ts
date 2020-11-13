import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

import { Post } from './post.model';
import { PostService } from './post.service';

@Injectable({ providedIn: 'root' })
export class PostResolverService implements Resolve<Post[]>{

  constructor(
    private postService: PostService,
    private dataStorageService: DataStorageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Post[] {
    const posts = this.postService.getPosts();
    if (posts.length === 0) {
      this.dataStorageService.fetchPosts().subscribe(
        postsResponse => { },
        errorMessage => {
          this.postService.occurredError.next(errorMessage);
          this.postService.postsLoading.next(false);
        }
      );
    }
    else {
      return posts;
    }
  }
}
