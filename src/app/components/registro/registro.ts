import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { User } from '../../models/user';
import { UserServices } from '../../services/user.services';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  public user:User
  constructor(private userServices:UserServices){
    this.user=new User(1,"","","","","user_role","")
  }

  uploadImage(e:any){
    const file : File=e.target.files[0]
    if(file){
      const formData=new FormData()
      formData.append('file0',file)
      this.userServices.uploadImage(formData).subscribe({
        next:(response)=>{
          console.log(response)
          this.user.image=response.filename
        },
        error:(err:Error)=>{
          console.log("Error al cargar la imagen",err)
        }
      })
    }
  }

  onSubmit(form:any){
    this.userServices.createUser(this.user).subscribe({
      next:(response)=>{
        console.log(response)
      },error:(err:Error)=>{
        console.log("Error-----> ",err)
      }
    })
  }
}

