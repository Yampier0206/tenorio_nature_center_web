import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public categories=signal<any|null>(null) 
  protected readonly title = signal('webapp');  
  public currentUser
  private checkCat
  private checkSessionInterval
  constructor(private categoryService:CategoryService,private _auth:AuthService){    
    this.loadCategories()
    this.checkCat=setInterval(()=>{this.loadCategories()},10000)    
    this.currentUser=_auth.currentUser
    this.checkSessionInterval=setInterval(()=>{this.checkSession()},1000)
  } 
  
  checkSession(){
    if(!this._auth.isAuthenticated()){
      this._auth.logout()
      this.currentUser.set(null)
    }
  }

  loadCategories(){    
    this.categoryService.getCategories().subscribe({
      next:(response:any)=>{       
        this.categories.set(response)
        console.log('Respuesta---->',this.categories)        
      },
      error:(err:Error)=>{
        console.log('Error---->',err)
      }
    })
  }

}