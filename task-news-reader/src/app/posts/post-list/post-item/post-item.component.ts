import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;
  @Input() postId: number;
  descStart = 0;
  descEnd = 30;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  onPostSelected(): void{
    this.postService.selectedPostTitle.next(this.post.title);
  }

}
