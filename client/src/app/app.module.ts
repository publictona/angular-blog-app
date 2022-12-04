import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/http'
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddBlogComponent,
    BlogDetailComponent,
    BlogsListComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
