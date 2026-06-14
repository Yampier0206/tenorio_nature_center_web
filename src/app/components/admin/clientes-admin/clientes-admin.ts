import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { manejarErrorGuardado } from '../../../helpers/error.helper';
import { ClienteService } from '../../../services/cliente.service';
import { EmpresaClienteService } from '../../../services/empresacliente.service';

@Component({
  selector: 'app-clientes-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './clientes-admin.html',
  styleUrl: './clientes-admin.css'
})
export class ClientesAdmin implements OnInit {

  public clientes:any[] = [];
  public empresas:any[] = [];

  public mensaje:string = '';
  public mensajeError:string = '';
  public idClienteEliminar:number = 0;

  public editando:boolean = false;

  public filtroNombre:string = '';
  public filtroIdentificacion:string = '';

  public ordenCampo:string = 'nombre';
  public ordenAsc:boolean = true;

  public cliente:any = {
    idEmpresaCliente: null,
    idUsuario: null,
    nombre: '',
    identificador: '',
    fechaNac: '',
    telefono: '',
    nacionalidad: '',
    fechaRegistro: ''
  };

  constructor(
    private clienteService: ClienteService,
    private empresaClienteService: EmpresaClienteService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadClientes();
    this.loadEmpresas();

  }

  loadClientes(){

    this.clienteService.getClientes().subscribe({

      next:(response:any)=>{

        console.log('CLIENTES', response);

        this.clientes = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  get clientesFiltrados(){

    let lista = [...this.clientes];

    if(this.filtroNombre){

      lista = lista.filter(c =>
        c.nombre
          ?.toLowerCase()
          .includes(
            this.filtroNombre.toLowerCase()
          )
      );

    }

    if(this.filtroIdentificacion){

      lista = lista.filter(c =>
        c.identificador
          ?.toLowerCase()
          .includes(
            this.filtroIdentificacion.toLowerCase()
          )
      );

    }

    lista.sort((a,b)=>{

      const valorA =
        a[this.ordenCampo]
        ?.toString()
        .toLowerCase();

      const valorB =
        b[this.ordenCampo]
        ?.toString()
        .toLowerCase();

      if(valorA < valorB)
        return this.ordenAsc ? -1 : 1;

      if(valorA > valorB)
        return this.ordenAsc ? 1 : -1;

      return 0;

    });

    return lista;

  }

  loadEmpresas(){

    this.empresaClienteService.getEmpresasCliente().subscribe({

      next:(response:any)=>{

        console.log('EMPRESAS', response);

        this.empresas = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarCliente(){

    if(this.editando){

      this.clienteService.updateCliente(this.cliente)
      .subscribe({

        next:()=>{

          this.mensaje = 'Cliente actualizado correctamente';

          this.cancelar();
          this.loadClientes();

          setTimeout(()=>{

            this.mensaje = '';

          },3000);

        },

        error: (err) => manejarErrorGuardado(
          err,
          'CREATE',
          (msg) => this.mensajeError = msg,
          this.cdr
        )

      });

    }else{

      this.clienteService.createCliente(this.cliente)
      .subscribe({

        next:()=>{

          this.mensaje = 'Cliente creado correctamente';

          this.cancelar();
          this.loadClientes();

          setTimeout(()=>{

            this.mensaje = '';

          },3000);

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

  editarCliente(cliente:any){

    this.editando = true;

    this.cliente = {

      idCliente: cliente.idcliente,
      idEmpresaCliente:
      cliente.idempresacliente?.Valid
      ? cliente.idempresacliente.Int32
      : null,
      idUsuario:
      cliente.idusuario?.Valid
      ? cliente.idusuario.Int32
      : null,
      nombre: cliente.nombre,
      identificador: cliente.identificador,
      fechaNac: cliente.fechanac?.split('T')[0],
      telefono: cliente.telefono,
      nacionalidad: cliente.nacionalidad,
      fechaRegistro: cliente.fecharegistro?.split('T')[0]

    };

  }

  getEmpresaNombre(cliente:any):string{

    const idEmpresa = cliente.idempresacliente?.Valid
      ? cliente.idempresacliente.Int32
      : null;

    if(!idEmpresa){

      return '-';

    }

    const empresa = this.empresas.find(
      (e:any) => e.idempresacliente === idEmpresa
    );

    return empresa ? empresa.razonsocial : '-';

  }

  seleccionarClienteEliminar(id:number){

    console.log('CLIENTE A ELIMINAR:', id);
    this.idClienteEliminar = id;

  }

  confirmarEliminarCliente(){

    console.log('CONFIRMAR ELIMINAR');
    console.log('ID:', this.idClienteEliminar);
    this.clienteService.deleteCliente(this.idClienteEliminar)
    .subscribe({

      next:()=>{

        this.mensaje = 'Cliente eliminado correctamente';

        this.loadClientes();

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

    this.cliente = {

      idEmpresaCliente: null,
      idUsuario: null,
      nombre: '',
      identificador: '',
      fechaNac: '',
      telefono: '',
      nacionalidad: '',
      fechaRegistro: ''

    };

  }

  ordenarPor(campo:string){

  if(this.ordenCampo === campo){

    this.ordenAsc = !this.ordenAsc;

  }else{

    this.ordenCampo = campo;
    this.ordenAsc = true;

  }

}

}