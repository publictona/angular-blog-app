import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  blogForm: FormGroup
  constructor(private formBuilder:FormBuilder,
    private router : Router,
    private ngZone : NgZone,
    private crudApi : CrudService ){
      this.blogForm = this.formBuilder.group({
        _id : [''],
        title :  [''],
        body : [''],
        tags:[''],
        category:[''],
      })
    }
    ngOnInit(): void {}

    onSubmit():any {
      this.crudApi.AddBlog(this.blogForm.value).subscribe((res:any)=>{
        console.log("data added successfully")
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/blog-list')
        }, (err:any) => {
          console.log(err);

        })
      })

    }
    

}
