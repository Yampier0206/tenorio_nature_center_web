import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuiaService } from '../../../services/guia.service';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IdiomaService } from '../../../services/idioma.service';
import { IdiomaGuiaService } from '../../../services/idioma-guia.service';
import { manejarErrorGuardado } from '../../../helpers/error.helper';

@Component({
  selector: 'app-guias-admin',
  standalone: true,
  imports: [FormsModule,RouterLink, DatePipe],
  templateUrl: './guias-admin.html',
  styleUrl: './guias-admin.css',
})
export class GuiasAdmin implements OnInit {

  public guias:any[] = [];
  public mensaje:string='';
  public mensajeError:string='';
  public idGuiaEliminar:number = 0;

  public idiomas: any[] = [];      
  public idiomasDelGuia: any[] = [];    
  public guiaSeleccionado: any = null; 
  public idiomaSeleccionado: number = 0;

  public guiasFiltrados:any[] = [];

  public filtroNombre:string = '';
  public filtroIdentificacion:string = '';

  public columnaOrden:string = 'nombre';
  public ascendente:boolean = true;

  public guia:any = {
    nombre:'',
    identificador:'',
    fechanac:'',
    telefono:'',
    nacionalidad:'',
    email:''
  };

  public editando:boolean = false;

  constructor(
    private guiaService: GuiaService,
    private idiomaguiaService: IdiomaGuiaService,
    private idiomaService: IdiomaService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadGuias();
    this.loadIdiomas();

  }

  loadGuias(){
    this.guiaService.getGuias().subscribe({

      next:(response:any)=>{
        console.log('GUIAS RECARGADOS', response);
        this.guias = response;
        this.guiasFiltrados = [...response];

        this.aplicarFiltros();
        
        this.cdr.detectChanges();
      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarGuia(){
  const fecha = this.guia.fechanac ? this.guia.fechanac.toString().substring(0, 10): null;

  const payload = {
    ...this.guia,
    fechanac: fecha,
    telefono: String(this.guia.telefono),
    identificador: this.guia.identificador || 'DOC-DEFAULT'
  };

  console.log('PAYLOAD:', JSON.stringify(payload)); 

  if(this.editando){
    this.guiaService.updateGuia(payload).subscribe({
      next:()=>{
        this.mensaje='Guia actualizado correctamente';
        this.cancelar();
        this.loadGuias();
        setTimeout(()=>{ this.mensaje=''; },3000);
      },
      error: (err) => manejarErrorGuardado(
          err,
          'UPDATE',
          (msg) => this.mensajeError = msg,
          this.cdr
        )
    });
  }else{
    this.guiaService.createGuia(payload).subscribe({
      next:()=>{
        this.mensaje = 'Guia creado correctamente';
        this.cancelar();
        this.loadGuias();
        setTimeout(()=>{ this.mensaje = ''; },3000);
      },
      error: (err) => manejarErrorGuardado(
          err,
          'CREATE',
          (msg) => this.mensajeError = msg,
          this.cdr
        )
    });
  }
}

  editarGuia(guia:any){

    this.editando = true;

    this.guia = {

      idGuia: guia.idguia,
      nombre: guia.nombre,
      identificador: guia.identificador,  
      fechanac: guia.fechanac?.split('T')[0],
      telefono: guia.telefono,
      nacionalidad: guia.nacionalidad,
      email: guia.email
    };

  }

  seleccionarGuiaEliminar(id:number){
    this.idGuiaEliminar = id;
  }

  confirmarEliminarGuia(){
    this.guiaService.deleteGuia(this.idGuiaEliminar)
    .subscribe({
      next:()=>{
        this.mensaje = 'Guia eliminado correctamente';
        this.loadGuias();
        setTimeout(()=>{
          this.mensaje = '';
        },3000);

    },
    error:(err)=>{
      console.log('ERROR DELETE', err);
    }
    });
  }

  aplicarFiltros() {

    this.guiasFiltrados = this.guias.filter(g => {

      const coincideNombre =
        !this.filtroNombre ||
        g.nombre?.toLowerCase()
        .includes(this.filtroNombre.toLowerCase());

      const coincideIdentificacion =
        !this.filtroIdentificacion ||
        g.identificador?.toLowerCase()
        .includes(this.filtroIdentificacion.toLowerCase());

      return coincideNombre && coincideIdentificacion;

    });

    this.ordenar(this.columnaOrden, false);
  }

  cancelar(){

    this.editando = false;

    this.guia = {
      nombre:'',
      identificador:'',
      fechanac:'',
      telefono:'',
      nacionalidad:'',
      email:''
    };

  }

  loadIdiomas() {
    this.idiomaService.getIdiomas().subscribe({
      next: (response: any) => { this.idiomas = response; },
      error: (err) => { console.log(err); }
    });
  }

  gestionarIdiomas(guia: any) {
    this.guiaSeleccionado = guia;
    console.log('GUIA SELECCIONADO:', guia);
    this.idiomaSeleccionado = 0;
    this.idiomaguiaService.getIdiomasByGuia(guia.idguia).subscribe({
      next: (response: any) => {
        console.log('IDIOMAS DEL GUIA:', response);
        this.idiomasDelGuia = response|| [];
        setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
      //Para que detecte los cambios hasta que se hayan aplicado en el loop, ntes salia error de deteccion.
      },
      error: (err) => { console.log(err); }
    });
  }

  agregarIdioma() {

    console.log('idiomaSeleccionado:', this.idiomaSeleccionado);
    console.log('guiaSeleccionado:', this.guiaSeleccionado);

    if (!this.idiomaSeleccionado || !this.guiaSeleccionado) return;

    const payload = {
        idguia: Number(this.guiaSeleccionado.idguia),
        ididioma: Number(this.idiomaSeleccionado)
    };
    console.log('PAYLOAD A ENVIAR:', payload);

    this.idiomaguiaService.addIdiomaToGuia(
      Number(this.guiaSeleccionado.idguia),
      Number(this.idiomaSeleccionado)
    ).subscribe({
      next: () => {
        this.mensaje = 'Idioma agregado correctamente';
        this.gestionarIdiomas(this.guiaSeleccionado); // recarga la lista
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => { console.log('ERROR ADD IDIOMA', err); }
    });
  }

  eliminarIdioma(idIdiomaguia: number) {
    this.idiomaguiaService.deleteIdiomaGuia(idIdiomaguia).subscribe({
      next: () => {
        this.mensaje = 'Idioma eliminado correctamente';
        this.gestionarIdiomas(this.guiaSeleccionado);
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => { console.log('ERROR DELETE IDIOMA', err); }
    });
  }

  getIniciales(nombre: string): string {
  return nombre?.substring(0, 2).toUpperCase() ?? '';
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

  this.guiasFiltrados.sort((a,b)=>{

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
  
