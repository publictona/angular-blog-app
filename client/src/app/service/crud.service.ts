import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from './blog';
import {  Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //node js api link
  REST_API : string = "http://localhost:8800";
  //set http header so it can not give cors error
  httpHeaders = new HttpHeaders().set('Content-Type' ,'application/json')
 constructor(private httpClient:HttpClient) { }

 AddBlog(data:Blog): Observable<any>{
  let API_URL = `${this.REST_API}/add-blog`
  return this.httpClient.post(API_URL ,data).pipe( catchError(this.handleError))
}
//get all blog  details
getBlogs(){
  return this.httpClient.get(`${this.REST_API}`)
}

//get single blog
getBlog(id:any) : Observable<any>{
  let API_URL = `${this.REST_API}/read-blog/${id}`;
  return this.httpClient.get(API_URL , {headers:this.httpHeaders}).pipe(map((res:any)=>{
    return res || {}
  }),
  catchError(this.handleError)
  )
}

//update single blog
updateBlog(id:any , data:any) : Observable<any>{
  let API_URL= `${this.REST_API}/update-blog/${id}`
  return this.httpClient.put(API_URL , data , {headers:this.httpHeaders}).pipe(
    catchError(this.handleError)
  )
}

//delete single blog
deleteBlog(id:any ) : Observable<any>{
  let API_URL= `${this.REST_API}/delete-blog/${id}`
  return this.httpClient.delete(API_URL , {headers:this.httpHeaders}).pipe(
    catchError(this.handleError)
  )
}



//handle error
handleError(error :HttpErrorResponse){
  let errorMessage = '';
  if(error.error instanceof ErrorEvent){
//handle client side error
errorMessage = error.error.message;

  }else {
    //handle server side error
    errorMessage = `Error code : ${error.status}\nMessage:${error.message}`;

  }
  console.log(errorMessage)
 return throwError(errorMessage)

}

}

