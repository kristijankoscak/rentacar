import { NgModule } from "@angular/core";

import { PostService } from './posts/post.service';

@NgModule({
  providers:[
    PostService
  ]
})

export class CoreModule {}
