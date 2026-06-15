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

  public filtroNombre: string = '';
  public filtroDireccion: string = '';

  public columnaOrden: string = '';
  public ascendente: boolean = true;
  public ordenCampo: string = 'nombre';

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

  get ubicacionesFiltradas() {

    let resultado = this.ubicaciones.filter(u => {

      const coincideNombre =
        !this.filtroNombre ||
        u.nombre?.toLowerCase().includes(
          this.filtroNombre.toLowerCase()
        );

      const coincideDireccion =
        !this.filtroDireccion ||
        u.direccion?.toLowerCase().includes(
          this.filtroDireccion.toLowerCase()
        );

      return coincideNombre && coincideDireccion;

    });

    resultado.sort((a, b) => {

      let valorA: any;
      let valorB: any;

      switch (this.ordenCampo) {

        case 'nombre':
          valorA = a.nombre ?? '';
          valorB = b.nombre ?? '';
          break;

        case 'direccion':
          valorA = a.direccion ?? '';
          valorB = b.direccion ?? '';
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

    this.ubicaciones.sort((a, b) => {

      let valorA: any;
      let valorB: any;

      switch (columna) {

        case 'nombre':
          valorA = a.nombre ?? '';
          valorB = b.nombre ?? '';
          break;

        case 'direccion':
          valorA = a.direccion ?? '';
          valorB = b.direccion ?? '';
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
