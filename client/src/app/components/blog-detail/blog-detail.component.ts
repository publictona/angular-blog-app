import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  getId: any;
  updateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudApi: CrudService) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudApi.getBlog(this.getId).subscribe(res => {
      this.updateForm.setValue({
        title: res[''],
        body: res[''],
        tags: res[''],
        category: res[''],
      })
    });
    this.updateForm = this.formBuilder.group({
      title: [''],
      body: [''],
      tags: [''],
      category: [''],
    })
  }

  ngOnInit(): void { }

  onUpdate():any {
    this.crudApi.updateBlog(this.getId, this.updateForm.value).subscribe(res=> {
      console.log("Data updated Success full");
      this.ngZone.run(() => {
        this.router.navigateByUrl('/blog-list')
    }, (err: any) => {
      console.log(err)
    })
  })
}
}



