import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string;
  subscription: Subscription;

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscription = this.postService.selectedPostTitle.subscribe(title => {
      this.title = title;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['../']);
    this.title = '';
  }

}
