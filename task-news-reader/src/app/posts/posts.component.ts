import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  isLoading = true;
  error: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.postsLoading.subscribe(state => {
      this.isLoading = state;
    });
    this.postService.occurredError.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

}
