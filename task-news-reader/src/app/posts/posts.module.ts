import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostItemComponent } from './post-list/post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';


@NgModule({
  declarations:[
    PostsComponent,
    PostListComponent,
    PostDetailComponent,
    PostItemComponent
  ],
  imports:[
    RouterModule,
    PostsRoutingModule,
    SharedModule
  ]

})

export class PostsModule {}
