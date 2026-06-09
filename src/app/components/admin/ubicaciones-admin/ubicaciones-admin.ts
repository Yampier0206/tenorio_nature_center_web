import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  selector: 'app-ubicaciones-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './ubicaciones-admin.html',
  styleUrl: './ubicaciones-admin.css',
})
export class UbicacionesAdmin implements OnInit {

  public ubicaciones: any[] = [];
  public mensaje: string = '';
  public idUbicacionEliminar: number = 0;

  public ubicacion: any = {
    nombre: '',
    direccion: ''
  };

  public editando: boolean = false;

  constructor(
    private ubicacionService: UbicacionService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadUbicaciones();
  }

  loadUbicaciones(){
    this.ubicacionService.getUbicaciones().subscribe({
      next:(response: any) => {
        this.ubicaciones = response;
        this.cdr.detectChanges();
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  guardarUbicacion(){
    if(this.editando){
      this.ubicacionService.updateUbicacion(this.ubicacion).subscribe({
        next:() => {
          this.mensaje = 'Ubicación actualizada correctamente';
          this.cancelar();
          this.loadUbicaciones();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error:(err) => {
          console.log('ERROR UPDATE', err);
        }
      });
    } else {
      this.ubicacionService.createUbicacion(this.ubicacion).subscribe({
        next:() => {
          this.mensaje = 'Ubicación creada correctamente';
          this.cancelar();
          this.loadUbicaciones();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error:(err) => {
          console.log('ERROR CREATE', err);
        }
      });
    }
  }

  editarUbicacion(item: any){
    this.editando = true;
    this.ubicacion = {
      idubicacion: item.idubicacion,
      nombre: item.nombre,
      direccion: item.direccion
    };
  }

  seleccionarUbicacionEliminar(id: number){
    this.idUbicacionEliminar = id;
  }

  confirmarEliminarUbicacion(){
    this.ubicacionService.deleteUbicacion(this.idUbicacionEliminar).subscribe({
      next:() => {
        this.mensaje = 'Ubicación eliminada correctamente';
        this.loadUbicaciones();
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error:(err) => {
        console.log('ERROR DELETE', err);
      }
    });
  }

  cancelar(){
    this.editando = false;
    this.ubicacion = {
      nombre: '',
      direccion: ''
    };
  }
}
