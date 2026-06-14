import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { IdiomaService } from '../../../services/idioma.service';
import { manejarErrorGuardado } from '../../../helpers/error.helper';

@Component({
  selector: 'app-idiomas-admin',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './idiomas-admin.html',
  styleUrl: './idiomas-admin.css',
})
export class IdiomasAdmin implements OnInit {

  public idiomas:any[] = [];
  public mensaje:string='';
  public mensajeError:string='';
  public idIdiomaEliminar:number = 0;

  public idiomasFiltrados:any[] = [];

  public filtroNombre:string = '';

  public columnaOrden:string = 'nombre';
  public ascendente:boolean = true;
  public ordenCampo: string = 'nombre';

  public idioma:any = {
    nombre:''
  };

  public editando:boolean = false;

  constructor(
    private idiomaService:IdiomaService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadIdiomas();

  }

  loadIdiomas(){
    this.idiomaService.getIdiomas().subscribe({

      next:(response:any)=>{
        console.log('IDIOMAS RECARGADOS', response);
        this.idiomas = response;
        this.idiomasFiltrados = [...response];

        this.aplicarFiltros();
        this.cdr.detectChanges();
      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  aplicarFiltros() {

    this.idiomasFiltrados = this.idiomas.filter(i => {


      const coincideNombre =
        !this.filtroNombre ||
        i.nombre?.toLowerCase()
          .includes(this.filtroNombre.toLowerCase());

      return coincideNombre;

    });

      this.ordenar(this.ordenCampo, false);

  }

  guardarIdioma(){
    if(this.editando){

      this.idiomaService.updateIdioma(this.idioma)
      .subscribe({

        next:()=>{
          this.mensaje='Idioma actualizado correctamente';

          this.cancelar();
          this.loadIdiomas();

          setTimeout(()=>{
            this.mensaje='';
          },3000);

        },
        error: (err) => manejarErrorGuardado(
          err,
          'UPDATE',
          (msg) => this.mensajeError = msg,
          this.cdr, "Ya existe este idioma"
        )

      });

    }else{

      this.idiomaService.createIdioma(this.idioma)
      .subscribe({

        next:()=>{
          this.mensaje = 'Idioma creado correctamente';

          this.cancelar();
          this.loadIdiomas();

          setTimeout(()=>{
            this.mensaje = '';
          },3000);

        },
        error: (err) => manejarErrorGuardado(
          err,
          'CREATE',
          (msg) => this.mensajeError = msg,
          this.cdr, "Ya existe este idioma"
        )
      });

    }

  }

  editarIdioma(idioma:any){

    this.editando = true;

    this.idioma = {

      idIdioma: idioma.ididioma,
      nombre: idioma.nombre,
    };

  }

  seleccionarIdiomaEliminar(id:number){
    this.idIdiomaEliminar = id;
  }

  confirmarEliminarIdioma(){
    this.idiomaService.deleteIdioma(this.idIdiomaEliminar)
    .subscribe({
      next:()=>{
        this.mensaje = 'Idioma eliminado correctamente';
        this.loadIdiomas();
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

    this.idioma = {
      nombre:''
    };

  }
  
  ordenar(columna:string, cambiarDireccion:boolean = true){

  if(cambiarDireccion){

    if(this.columnaOrden === columna){

      this.ascendente = !this.ascendente;

    }else{

      this.columnaOrden = columna;
      this.ascendente = true;

    }

  }

  this.idiomasFiltrados.sort((a,b)=>{

    let valorA = a[columna];
    let valorB = b[columna];

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