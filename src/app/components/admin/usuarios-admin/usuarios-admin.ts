import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { manejarErrorGuardado } from '../../../helpers/error.helper';

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './usuarios-admin.html',
  styleUrl: './usuarios-admin.css',
})
export class UsuariosAdmin implements OnInit {

  public usuarios: any[] = [];
  public mensaje: string = '';
  public mensajeError: string = '';
  public idUsuarioEliminar: number = 0;

  public usuario: any = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    rol: 'user_role',
    descripcion: '',
    imagen: ''
  };

  public editando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(){
    this.usuarioService.getUsuarios().subscribe({
      next:(response: any) => {
        this.usuarios = response;
        this.cdr.detectChanges();
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  uploadImage(e: any){
    const file: File = e.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('file0', file);
      this.usuarioService.uploadImage(formData).subscribe({
        next:(response) => {
          this.usuario.imagen = response.filename;
        },
        error:(err) => {
          console.log("Error al cargar imagen", err);
        }
      });
    }
  }

  guardarUsuario(){
    if(this.editando){
      this.usuarioService.updateUsuario(this.usuario).subscribe({
        next:() => {
          this.mensaje = 'Usuario actualizado correctamente';
          this.cancelar();
          this.loadUsuarios();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => manejarErrorGuardado(
                  err,
                  'CREATE',
                  (msg) => this.mensajeError = msg,
                  this.cdr,
                  'Ya existe un usuario con ese correo'
        )
      });
    } else {
      this.usuarioService.createUsuario(this.usuario).subscribe({
        next:() => {
          this.mensaje = 'Usuario creado correctamente';
          this.cancelar();
          this.loadUsuarios();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => manejarErrorGuardado(
                  err,
                  'CREATE',
                  (msg) => this.mensajeError = msg,
                  this.cdr,
                  'Ya existe un usuario con ese correo'
        )
      });
    }
  }

  editarUsuario(item: any){
    this.editando = true;
    this.usuario = {
      idusuario: item.idusuario,
      nombre: item.nombre,
      apellido: item.apellido?.String || '',
      correo: item.correo,
      contrasena: item.contrasena,
      rol: item.rol?.String || 'user_role',
      descripcion: item.descripcion?.String || '',
      imagen: item.imagen?.String || ''
    };
  }

  seleccionarUsuarioEliminar(id: number){
    this.idUsuarioEliminar = id;
  }

  confirmarEliminarUsuario(){
    this.usuarioService.deleteUsuario(this.idUsuarioEliminar).subscribe({
      next:() => {
        this.mensaje = 'Usuario eliminado correctamente';
        this.loadUsuarios();
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error:(err) => {
        console.log('ERROR DELETE', err);
      }
    });
  }

  cancelar(){
    this.editando = false;
    this.usuario = {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      rol: 'user_role',
      descripcion: '',
      imagen: ''
    };
  }
}