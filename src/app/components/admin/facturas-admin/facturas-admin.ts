import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FacturaService } from '../../../services/factura.service';
import { EstadoPagoService } from '../../../services/estadopago.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-facturas-admin',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './facturas-admin.html',
  styleUrl: './facturas-admin.css'
})
export class FacturasAdmin implements OnInit {

  public facturas: any[] = [];
  public estadosPago: any[] = [];
  public mensaje: string = '';
  public modoEdicion: boolean = false;
  public facturaIdEliminar: number = 0;

  public metodosPago: string[] = ['Efectivo', 'Tarjeta', 'Transferencia'];
  public monedas: string[] = ['CRC', 'USD'];

  public factura: any = {
    idEstadoPago: null,
    numeroFactura: '',
    fechaFactura: '',
    metodoPago: null,  
    moneda: null,      
    fechaPago: '',
    subtotal: '',
    impuesto: '',
    descuento: '',
    precioTotal: ''
};

  constructor(
    private facturaService: FacturaService,
    private estadoPagoService: EstadoPagoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFacturas();
    this.loadEstadosPago();
  }

  loadFacturas() {
    this.facturaService.getFacturas()
    .subscribe({
      next: (response: any) => {
        this.facturas = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadEstadosPago() {
    this.estadoPagoService.getEstadosPago()
    .subscribe({
      next: (response: any) => {
        this.estadosPago = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calcularTotal() {
    const subtotal  = parseFloat(this.factura.subtotal)  || 0;
    const impuesto  = parseFloat(this.factura.impuesto)  || 0;
    const descuento = parseFloat(this.factura.descuento) || 0;
    this.factura.precioTotal = (subtotal + impuesto - descuento).toFixed(2);
  }

  editarFactura(f: any) {
    this.modoEdicion = true;
    this.factura = {
        idFactura:     f.idfactura,
        idEstadoPago:  f.idestadopago,
        numeroFactura: f.numerofactura,
        fechaFactura:  f.fechafactura ? f.fechafactura.substring(0, 10) : '', 
        metodoPago:    f.metodopago, 
        moneda:        f.moneda,
        fechaPago:     f.fechapago ? f.fechapago.substring(0, 10) : '', 
        subtotal:      f.subtotal,
        impuesto:      f.impuesto,
        descuento:     f.descuento,
        precioTotal:   f.preciototal  
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

  seleccionarFacturaEliminar(id: number) {
    this.facturaIdEliminar = id;
  }
  confirmarEliminarFactura() {
    this.facturaService.deleteFactura(this.facturaIdEliminar)
    .subscribe({
        next: () => {
            this.mensaje = 'Factura eliminada correctamente';
            this.loadFacturas();
            setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => { console.log(err); }
    });
}

  guardarFactura() {
    if (this.modoEdicion) {
      this.facturaService.updateFactura(this.factura)
      .subscribe({
        next: () => {
          this.mensaje = 'Factura actualizada correctamente';
          this.cancelar();
          this.loadFacturas();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => { console.log(err); }
      });
    } else {
      this.facturaService.createFactura(this.factura)
      .subscribe({
        next: () => {
          this.mensaje = 'Factura creada correctamente';
          this.cancelar();
          this.loadFacturas();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => { console.log(err); }
      });
    }
  }

  cancelar() {
    this.modoEdicion = false;
    this.factura = {
        idEstadoPago: null,
        numeroFactura: '',
        fechaFactura: '',
        metodoPago: null,  
        moneda: null,     
        fechaPago: '',
        subtotal: '',
        impuesto: '',
        descuento: '',
        precioTotal: ''
    };
}
}