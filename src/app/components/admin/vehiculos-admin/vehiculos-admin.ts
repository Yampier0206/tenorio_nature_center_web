import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { manejarErrorGuardado } from '../../../helpers/error.helper';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ChoferService } from '../../../services/chofer.service';

@Component({
  selector: 'app-vehiculos-admin',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './vehiculos-admin.html',
  styleUrl: './vehiculos-admin.css'
})
export class VehiculosAdmin implements OnInit {

  public vehiculos:any[] = [];
  public choferes:any[] = [];

  public mensaje:string = '';
  public mensajeError: string = '';
  public editando:boolean = false;

  public idVehiculoEliminar:number = 0;

  public vehiculosFiltrados:any[] = [];

  public filtroMatricula:string = '';
  public filtroModelo:string = '';

  public columnaOrden:string = 'matricula';
  public ascendente:boolean = true;

  public vehiculo:any = {

    idVehiculo:null,
    idChofer:null,
    matricula:'',
    capacidad:null,
    modelo:''

  };

  constructor(
    private vehiculoService:VehiculoService,
    private choferService:ChoferService,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadVehiculos();
    this.loadChoferes();

  }

  loadVehiculos(){

    this.vehiculoService.getVehiculos()
    .subscribe({

      next:(response:any)=>{

        this.vehiculos = response;
        this.vehiculosFiltrados = [...response];

        this.aplicarFiltros();

        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  loadChoferes(){

    this.choferService.getChoferes()
    .subscribe({

      next:(response:any)=>{

        this.choferes = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarVehiculo(){

    if(this.editando){

      this.vehiculoService.updateVehiculo(this.vehiculo)
      .subscribe({

        next:()=>{

          this.mensaje =
          'Vehículo actualizado correctamente';

          this.cancelar();
          this.loadVehiculos();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },

        error: (err) => manejarErrorGuardado(
          err,
          'UPDATE',
          (msg) => this.mensajeError = msg,
          this.cdr,
          'Ya existe un vehiculo con esa matricula'
        )

      });

    }else{

      this.vehiculoService.createVehiculo(this.vehiculo)
      .subscribe({

        next:()=>{

          this.mensaje =
          'Vehículo creado correctamente';

          this.cancelar();
          this.loadVehiculos();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },

        error: (err) => manejarErrorGuardado(
          err,
          'CREATE',
          (msg) => this.mensajeError = msg,
          this.cdr,
          'Ya existe un vehiculo con esa matricula'
        )

      });

    }

  }

  editarVehiculo(item:any){

    this.editando = true;

    this.vehiculo = {

      idVehiculo:item.idvehiculo,
      idChofer:item.idchofer,
      matricula:item.matricula,
      capacidad:item.capacidad,
      modelo:item.modelo

    };

  }

  seleccionarVehiculoEliminar(id:number){

    this.idVehiculoEliminar = id;

  }

  confirmarEliminarVehiculo(){

    this.vehiculoService
    .deleteVehiculo(this.idVehiculoEliminar)
    .subscribe({

      next:()=>{

        this.mensaje =
        'Vehículo eliminado correctamente';

        this.loadVehiculos();

        setTimeout(()=>{
          this.mensaje='';
        },3000);

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  cancelar(){

    this.editando = false;

    this.vehiculo = {

      idVehiculo:null,
      idChofer:null,
      matricula:'',
      capacidad:null,
      modelo:''

    };

  }

  aplicarFiltros() {

    this.vehiculosFiltrados =
      this.vehiculos.filter(v => {

        const coincideMatricula =
          !this.filtroMatricula ||
          v.matricula?.toLowerCase()
            .includes(this.filtroMatricula.toLowerCase());

        const coincideModelo =
          !this.filtroModelo ||
          v.modelo?.toLowerCase()
            .includes(this.filtroModelo.toLowerCase());

        return coincideMatricula && coincideModelo;

      });

    this.ordenar(this.columnaOrden, false);

  }

  ordenar(
  columna:string,
  cambiarDireccion:boolean = true
){

  if(cambiarDireccion){

    if(this.columnaOrden === columna){

      this.ascendente = !this.ascendente;

    }else{

      this.columnaOrden = columna;
      this.ascendente = true;

    }

  }

    this.vehiculosFiltrados.sort((a,b)=>{

      let valorA:any;
      let valorB:any;

      switch(columna){

        case 'matricula':
          valorA = a.matricula ?? '';
          valorB = b.matricula ?? '';
          break;

        case 'modelo':
          valorA = a.modelo ?? '';
          valorB = b.modelo ?? '';
          break;

        case 'capacidad':
          valorA = Number(a.capacidad);
          valorB = Number(b.capacidad);
          break;

        case 'chofer':
          valorA = a.nombre_chofer ?? '';
          valorB = b.nombre_chofer ?? '';
          break;

        default:
          return 0;

      }

      if(typeof valorA === 'string'){
        valorA = valorA.toLowerCase();
      }

      if(typeof valorB === 'string'){
        valorB = valorB.toLowerCase();
      }

      if(valorA < valorB){
        return this.ascendente ? -1 : 1;
      }

      if(valorA > valorB){
        return this.ascendente ? 1 : -1;
      }

      return 0;

    });

  }

}