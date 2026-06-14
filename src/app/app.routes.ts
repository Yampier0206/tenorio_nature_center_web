import { Routes } from '@angular/router';
import {Home} from './components/home/home'
import { Login } from './components/login/login';
import { Error } from './components/error/error';
import { Perfil } from './components/perfil/perfil';
import { Reservas } from './components/mis-reservas/reservas';
import { Admin } from './components/admin/admin';
import { Tours } from './components/tours/tours';
import { Vehiculos } from './components/vehiculos/vehiculos';
import { Chofer } from './components/chofer/chofer';
import { ToursAdmin } from './components/admin/tours-admin/tours-admin';
import { Guias } from './components/guias/guias';
import { Ubicaciones } from './components/ubicaciones/ubicaciones';
import { ReservasAdmin } from './components/admin/reservas-admin/reservas-admin';
import { FacturasAdmin } from './components/admin/facturas-admin/facturas-admin';
import { ChoferAdmin } from './components/admin/chofer-admin/chofer-admin';
import { Registro } from './components/registro/registro';
import { UsuariosAdmin } from './components/admin/usuarios-admin/usuarios-admin';
import { UbicacionesAdmin } from './components/admin/ubicaciones-admin/ubicaciones-admin';
import { VehiculosAdmin } from './components/admin/vehiculos-admin/vehiculos-admin';
import { ClientesAdmin } from './components/admin/clientes-admin/clientes-admin';
import { EmpresaClienteAdmin } from './components/admin/empresacliente-admin/empresacliente-admin';
import { GuiasAdmin } from './components/admin/guias-admin/guias-admin';
import { IdiomasAdmin } from './components/admin/idiomas-admin/idiomas-admin';
import { routerGuard } from './components/guards/routes.guards';

export const routes: Routes = [
    //Público
    { path: '',component:Home},
    { path: 'login',component:Login},
    //Navegación principal
    { path: 'tour/:id', component: Tours},
    { path: 'vehiculo/:id', component: Vehiculos},
    { path: 'chofer/:id', component: Chofer},
    { path: 'guia/:id', component: Guias},
    { path: 'ubicacion/:id', component: Ubicaciones},
    //Usuario autenticado
    { path: 'perfil', canActivate:[routerGuard], component: Perfil},
    { path: 'reservas', canActivate:[routerGuard], component: Reservas},
    //Admin
    { path: 'admin',canActivate:[routerGuard], component: Admin},
    { path: 'admin/tours',canActivate:[routerGuard], component: ToursAdmin},
    { path: 'admin/reservas',canActivate:[routerGuard], component: ReservasAdmin},
    { path: 'admin/facturas',canActivate:[routerGuard], component: FacturasAdmin },
    { path: 'admin/choferes',canActivate:[routerGuard], component: ChoferAdmin },
    { path: 'admin/usuarios',canActivate:[routerGuard], component: UsuariosAdmin },
    { path: 'admin/ubicaciones',canActivate:[routerGuard], component: UbicacionesAdmin },
    { path: 'admin/vehiculos',canActivate:[routerGuard], component: VehiculosAdmin },
    { path: 'admin/clientes',canActivate:[routerGuard], component: ClientesAdmin },
    { path: 'admin/empresa-cliente',canActivate:[routerGuard], component: EmpresaClienteAdmin },
    { path: 'admin/guias',canActivate:[routerGuard], component: GuiasAdmin },
    { path: 'admin/idiomas',canActivate:[routerGuard], component: IdiomasAdmin },
    //Registro
    { path: '',component:Home},
    { path: 'login',component:Login},
    { path: 'register',component:Registro},
    //Error
    { path: '**',component:Error}
];