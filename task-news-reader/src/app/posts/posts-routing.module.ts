import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostResolverService } from './post-resolver.service';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: '',
        component: PostListComponent,
        resolve: [PostResolverService]
      },
      {
        path: ':id',
        component: PostDetailComponent,
        resolve: [PostResolverService]
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PostsRoutingModule { }
