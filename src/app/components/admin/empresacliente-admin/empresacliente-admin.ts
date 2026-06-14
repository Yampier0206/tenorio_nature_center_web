import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { manejarErrorGuardado } from '../../../helpers/error.helper';
import { EmpresaClienteService } from '../../../services/empresacliente.service';

@Component({
  selector: 'app-empresacliente-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './empresacliente-admin.html',
  styleUrl: './empresacliente-admin.css'
})
export class EmpresaClienteAdmin implements OnInit {

  public empresas:any[] = [];

  public mensaje:string = '';
  public mensajeError:string = '';
  public idEmpresaEliminar:number = 0;

  public editando:boolean = false;

  public empresa:any = {
    razonSocial: '',
    cedulaJuridica: '',
    email: '',
    telefono: ''
  };

  constructor(
    private empresaClienteService: EmpresaClienteService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadEmpresas();

  }

  loadEmpresas(){

    this.empresaClienteService.getEmpresasCliente().subscribe({

      next:(response:any)=>{

        console.log('EMPRESAS CLIENTE', response);

        this.empresas = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarEmpresa(){

    if(this.editando){

      this.empresaClienteService.updateEmpresaCliente(this.empresa)
      .subscribe({

        next:()=>{

          this.mensaje = 'Empresa cliente actualizada correctamente';

          this.cancelar();
          this.loadEmpresas();

          setTimeout(()=>{

            this.mensaje = '';

          },3000);

        },
        error: (err) => manejarErrorGuardado(
          err,
          'UPDATE',
          (msg) => this.mensajeError = msg,
          this.cdr,
          'Ya existe un empresa con esa cedula juridica'
        )

      });

    }else{

      this.empresaClienteService.createEmpresaCliente(this.empresa)
      .subscribe({

        next:()=>{

          this.mensaje = 'Empresa cliente creada correctamente';

          this.cancelar();
          this.loadEmpresas();

          setTimeout(()=>{

            this.mensaje = '';

          },3000);

        },
        error: (err) => manejarErrorGuardado(
          err,
          'CREATE',
          (msg) => this.mensajeError = msg,
          this.cdr,
          'Ya existe un empresa con esa cedula juridica'
        )

      });

    }

  }

  editarEmpresa(empresa:any){

    this.editando = true;

    this.empresa = {

      idEmpresaCliente: empresa.idempresacliente,
      razonSocial: empresa.razonsocial,
      cedulaJuridica: empresa.cedulajuridica,
      email: empresa.email,
      telefono: empresa.telefono?.String

    };

  }

  seleccionarEmpresaEliminar(id:number){

    console.log('EMPRESA A ELIMINAR:', id);
    this.idEmpresaEliminar = id;

  }

  confirmarEliminarEmpresa(){

    console.log('CONFIRMAR ELIMINAR');
    console.log('ID:', this.idEmpresaEliminar);
    this.empresaClienteService.deleteEmpresaCliente(this.idEmpresaEliminar)
    .subscribe({

      next:()=>{

        this.mensaje = 'Empresa cliente eliminada correctamente';

        this.loadEmpresas();

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

    this.empresa = {

      razonSocial: '',
      cedulaJuridica: '',
      email: '',
      telefono: ''

    };

  }

}