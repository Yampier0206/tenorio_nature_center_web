import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public user:User  
  constructor(private userService:UserService){
    this.user=new User(1,"","","","","user_role","")
  }
  uploadImage(e:any){
      const file:File =e.target.files[0]
      if(file){        
        const formData=new FormData()        
        formData.append('file0',file)
        this.userService.uploadImage(formData).subscribe({
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
    this.userService.createUser(this.user).subscribe({
      next:(response)=>{
        console.log(response)
        form.reset()
      },
      error:(err:Error)=>{
        console.log("Error---->",err)
      }
    })
  }
}
