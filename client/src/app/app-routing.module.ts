import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { DeleteBlogComponent } from './components/delete-blog/delete-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';

const routes: Routes = [
  {
    path : '', redirectTo:'add-blog' , pathMatch:'full'
  },
  {
    path: 'blog-list', component:BlogsListComponent
  },
  {
    path: 'add-blog', component:AddBlogComponent
  },
  {
    path: 'edit-blog/:id', component:EditBlogComponent
  },
  {
    path: 'delete-blog/:id', component:DeleteBlogComponent
  },







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
