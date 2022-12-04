import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';


const routes: Routes = [
  // {
  //   path : '', redirectTo:'add-blog' , pathMatch:'full'
  // },
  {
    path: 'blog-list', component:BlogsListComponent
  },
  {
    path: 'add-blog', component:AddBlogComponent
  },
  {
    path: 'edit-blog/:id', component:BlogDetailComponent
  }
  // {
  //   path: 'delete-blog/:id', component:BlogDetailComponent
  // }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
