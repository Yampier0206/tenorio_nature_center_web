import { Component, Signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { audit } from 'rxjs';
import { enviroment } from '../../enviroments';
import { Post } from '../../models/post';
import { ActivatedRoute,Router,RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public user : any
  public url:string
  public posts:Array<Post>

  constructor(
    private _auth:AuthService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _postService:PostService
  ){
    this.user=_auth.currentUser()
    this.url=enviroment.apiUrl
    this.posts=[]
    this.loadPosts()
  }
  loadPosts(){
    let idCategory
    this._route.params.subscribe(params=>{
      idCategory=params['id']
    })
    if(idCategory){
      console.log("IdCategory obtenido de la ruta->"+idCategory)

    }else{
      this._postService.getPosts().subscribe({
        next:(response)=>{
          console.log(response)
          this.posts=response
        },
        error:(err:Error)=>{
          console.log("Error al obtener los post>",err)
        }
      })
    }
    
  }
}