import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  subscription: Subscription;

  constructor(
    private postService: PostService,
    ) { }

  ngOnInit(): void {
    this.subscription = this.postService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.posts = this.postService.getPosts();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
