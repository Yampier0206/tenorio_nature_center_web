import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public categories:any
  protected readonly title = signal('webapp');
  constructor(private categoryService:CategoryService){
    this.loadCategories()
  }
  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next:(response:any)=>{
        console.log('Respuesta---->',response)
      },
      error:(err:Error)=>{
        console.log('Error---->',err)
      }
    })
  }

}
