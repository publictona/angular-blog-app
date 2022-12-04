import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})

export class BlogsListComponent implements OnInit {
  Blogs: any = [];
  constructor(private crudApi: CrudService) { }

  ngOnInit(): void {
    //get (view blog ) method
    this.crudApi.getBlogs().subscribe(res => {
      console.log(res);
      this.Blogs = res;
    })
  }

  //delete method
  delete(id: any, i : any) {
    console.log(id);
    if (window.confirm("Are You sure You Want to delete this blog")) {
      this.crudApi.deleteBlog(id).subscribe(res => {
        this.Blogs.splice(i, 1)
      })
    }
  }
}
