import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChoferService } from '../../../services/chofer.service';
import { manejarErrorGuardado } from '../../../helpers/error.helper';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chofer-admin',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './chofer-admin.html',
  styleUrl: './chofer-admin.css'
})
export class ChoferAdmin implements OnInit {

 
  public choferes: any[] = [];
  public mensaje: string = '';
  public mensajeError: string = '';
  public modoEdicion: boolean = false;
  public choferIdEliminar: number = 0;

  public tiposLicencia: string[] = ['B1', 'B2', 'B3', 'B4', 'C1', 'C2'];

  public chofer: any = {
    nombre: '',
    identificador: '',
    fechaNac: '',
    telefono: '',
    email: '',
    tipoLicencia: null,
    nacionalidad: ''
  };

  constructor(
    private choferService: ChoferService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadChoferes();
  }

  loadChoferes() {
    this.choferService.getChoferes()
    .subscribe({
      next: (response: any) => {
        this.choferes = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarChofer(c: any) {
    this.modoEdicion = true;
    this.chofer = {
        idChofer:      c.idchofer,
        nombre:        c.nombre,
        identificador: c.identificador,
        fechaNac:      c.fechanac ? c.fechanac.substring(0, 10) : '', 
        telefono:      c.telefono,
        email:         c.email,
        tipoLicencia:  c.tipolicencia,  
        nacionalidad:  c.nacionalidad
    };
    this.cdr.detectChanges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

  seleccionarChoferEliminar(id: number) {
    this.choferIdEliminar = id;
}

  confirmarEliminarChofer() {
    this.choferService.deleteChofer(this.choferIdEliminar)
    .subscribe({
        next: () => {
            this.mensaje = 'Chofer eliminado correctamente';
            this.loadChoferes();
            setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => { console.log(err); }
    });
}

  guardarChofer() {
    if (this.modoEdicion) {
      this.choferService.updateChofer(this.chofer)
      .subscribe({
        next: () => {
          this.mensaje = 'Chofer actualizado correctamente';
          this.cancelar();
          this.loadChoferes();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => manejarErrorGuardado(
          err,
          'CREATE',
          (msg) => this.mensajeError = msg,
          this.cdr
        )
      });
    } else {
      this.choferService.createChofer(this.chofer)
      .subscribe({
        next: () => {
          this.mensaje = 'Chofer creado correctamente';
          this.cancelar();
          this.loadChoferes();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error:(err)=>{
          console.log('ERROR CREATE', err);
          if(err.status === 500 && err.error?.error?.includes('Duplicate entry')){
            this.mensajeError = 'Ya existe un chofer con esa identificación.';
          } else if(err.status === 0){
            this.mensajeError = 'No se pudo conectar con el servidor.';
          } else {
          this.mensajeError = 'Ocurrió un error al guardar. Intentá de nuevo.';
          }
          this.cdr.detectChanges();
          setTimeout(()=>{ this.mensajeError = ''; }, 3000);
        }
      });
    }
  }

  cancelar() {
    this.modoEdicion = false;
    this.chofer = {
      nombre: '',
      identificador: '',
      fechaNac: '',
      telefono: '',
      email: '',
      tipoLicencia: null,
      nacionalidad: ''
    };
  }
}