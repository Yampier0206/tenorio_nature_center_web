import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../../services/tour.service';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tours-admin',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './tours-admin.html',
  styleUrl: './tours-admin.css',
})
export class ToursAdmin implements OnInit {

  public tours:any[] = [];
  public mensaje:string='';
  public idTourEliminar:number = 0;

  public filtroNombre: string = '';
  public filtroHorario: string = '';

  public columnaOrden: string = '';
  public ascendente: boolean = true;
  public ordenCampo: string = 'nombre';

  public tour:any = {
    nombre:'',
    descripcion:'',
    horario:'',
    duracion:null,
    cuposMaximos:null,
    precioBase:''
  };

  public editando:boolean = false;

  constructor(
    private tourService:TourService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadTours();

  }

  loadTours(){
    this.tourService.getTours().subscribe({

      next:(response:any)=>{
        console.log('TOURS RECARGADOS', response);
        this.tours = response;
        this.cdr.detectChanges();
      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarTour(){

    const payload = {
      ...this.tour,
      precioBase: String(this.tour.precioBase)
    };

    if(this.editando){

      this.tourService.updateTour(payload)
      .subscribe({

        next:()=>{
          this.mensaje='Tour actualizado correctamente';

          this.cancelar();
          this.loadTours();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },
        error:(err)=>{
          console.log('ERROR UPDATE',err);
        }

      });

    }else{

      this.tourService.createTour(payload)
      .subscribe({

        next:()=>{
          this.mensaje = 'Tour creado correctamente';

          this.cancelar();
          this.loadTours();

          setTimeout(()=>{
            this.mensaje = '';
          },3000);

        },
        error:(err)=>{
          console.log('ERROR CREATE', err);
        }

      });

    }

  }

  editarTour(tour:any){

    this.editando = true;

    this.tour = {

      idTour: tour.idtour,
      nombre: tour.nombre,
      descripcion: tour.descripcion,
      horario: tour.horario,
      duracion: tour.duracion,
      cuposMaximos: tour.cuposmaximos,
      precioBase: tour.preciobase

    };

  }

  seleccionarTourEliminar(id:number){
    this.idTourEliminar = id;
  }

  confirmarEliminarTour(){
    this.tourService.deleteTour(this.idTourEliminar)
    .subscribe({
      next:()=>{
        this.mensaje = 'Tour eliminado correctamente';
        this.loadTours();
        setTimeout(()=>{
          this.mensaje = '';
        },3000);

    },
    error:(err)=>{
      console.log('ERROR DELETE', err);
    }
    });
  }

  cancelar(){

    this.editando = false;

    this.tour = {
      nombre:'',
      descripcion:'',
      horario:'',
      duracion:null,
      cuposMaximos:null,
      precioBase:''
    };

  }
  
  get toursFiltrados() {

    let resultado = this.tours.filter(t => {

      const coincideNombre =
        !this.filtroNombre ||
        t.nombre?.toLowerCase().includes(
          this.filtroNombre.toLowerCase()
        );

      const coincideHorario =
        !this.filtroHorario ||
        t.horario?.toLowerCase().includes(
          this.filtroHorario.toLowerCase()
        );

      return coincideNombre && coincideHorario;

    });

    resultado.sort((a, b) => {

      let valorA: any;
      let valorB: any;

      switch (this.ordenCampo) {

        case 'nombre':
          valorA = a.nombre ?? '';
          valorB = b.nombre ?? '';
          break;

        case 'horario':
          valorA = a.horario ?? '';
          valorB = b.horario ?? '';
          break;

        case 'duracion':
          valorA = a.duracion ?? 0;
          valorB = b.duracion ?? 0;
          break;

        case 'cupos':
          valorA = a.cuposmaximos ?? 0;
          valorB = b.cuposmaximos ?? 0;
          break;

        case 'precio':
          valorA = a.preciobase ?? 0;
          valorB = b.preciobase ?? 0;
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

    this.tours.sort((a, b) => {

      let valorA: any;
      let valorB: any;

      switch (columna) {

        case 'nombre':
          valorA = a.nombre ?? '';
          valorB = b.nombre ?? '';
          break;

        case 'horario':
          valorA = a.horario ?? '';
          valorB = b.horario ?? '';
          break;

        case 'duracion':
          valorA = Number(a.duracion);
          valorB = Number(b.duracion);
          break;

        case 'cupos':
          valorA = Number(a.cuposmaximos);
          valorB = Number(b.cuposmaximos);
          break;

        case 'precio':
          valorA = Number(a.preciobase);
          valorB = Number(b.preciobase);
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