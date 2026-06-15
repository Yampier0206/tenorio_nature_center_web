import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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

  public filtroNombre: string = '';
  public filtroCorreo: string = '';

  public columnaOrden: string = '';
  public ascendente: boolean = true;
  public ordenCampo: string = 'nombre';

  @ViewChild('fileInput') fileInput!: ElementRef;

  public usuario: any = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
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
  const { confirmarContrasena, ...payload } = this.usuario;

  if(this.editando){
    this.usuarioService.updateUsuario(payload).subscribe({
      next:() => {
        this.mensaje = 'Usuario actualizado correctamente';
        this.cancelar();
        this.loadUsuarios();
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => manejarErrorGuardado(
        err, 'UPDATE',
        (msg) => this.mensajeError = msg,
        this.cdr,
        'Ya existe un usuario con ese correo'
      )
    });
  } else {
    this.usuarioService.createUsuario(payload).subscribe({
      next:() => {
        this.mensaje = 'Usuario creado correctamente';
        this.cancelar();
        this.loadUsuarios();
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => manejarErrorGuardado(
        err, 'CREATE',
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
      contrasena: '',
      confirmarContrasena: '',
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
      confirmarContrasena: '',
      rol: 'user_role',
      descripcion: '',
      imagen: ''
    };
    if(this.fileInput){
      this.fileInput.nativeElement.value = '';
    }
  }

  get usuariosFiltrados() {

    let resultado = this.usuarios.filter(u => {

      const coincideNombre =
        !this.filtroNombre ||
        u.nombre?.toLowerCase().includes(
          this.filtroNombre.toLowerCase()
        );

      const coincideCorreo =
        !this.filtroCorreo ||
        u.correo?.toLowerCase().includes(
          this.filtroCorreo.toLowerCase()
        );

      return coincideNombre && coincideCorreo;

    });

    resultado.sort((a, b) => {

      let valorA: any;
      let valorB: any;

      switch (this.ordenCampo) {

        case 'nombre':
          valorA = a.nombre ?? '';
          valorB = b.nombre ?? '';
          break;

        case 'correo':
          valorA = a.correo ?? '';
          valorB = b.correo ?? '';
          break;

        case 'rol':
          valorA = a.rol?.String ?? '';
          valorB = b.rol?.String ?? '';
          break;

        default:
          return 0;

      }

      if (valorA < valorB) return -1;
      if (valorA > valorB) return 1;

      return 0;

    });

    return resultado;
  }

  ordenarPor(columna: string) {

    if (this.columnaOrden === columna) {
      this.ascendente = !this.ascendente;
    } else {
      this.columnaOrden = columna;
      this.ascendente = true;
    }

    this.usuarios.sort((a, b) => {

      let valorA: any;
      let valorB: any;

      switch (columna) {

        case 'nombre':
          valorA = a.nombre ?? '';
          valorB = b.nombre ?? '';
          break;

        case 'correo':
          valorA = a.correo ?? '';
          valorB = b.correo ?? '';
          break;

        case 'rol':
          valorA = a.rol?.String ?? '';
          valorB = b.rol?.String ?? '';
          break;

        default:
          return 0;
      }

      if (valorA < valorB) {
        return this.ascendente ? -1 : 1;
      }

      if (valorA > valorB) {
        return this.ascendente ? 1 : -1;
      }

      return 0;
    });

  }

}