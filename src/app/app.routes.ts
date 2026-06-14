import { Routes } from '@angular/router';
import { Home } from './components/home/home';
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
import { routesGuard } from './core/guards/routes.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    // Público
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Registro },

    // Navegación principal — público
    { path: 'tour/:id', component: Tours },
    { path: 'vehiculo/:id', component: Vehiculos },
    { path: 'chofer/:id', component: Chofer },
    { path: 'guia/:id', component: Guias },
    { path: 'ubicacion/:id', component: Ubicaciones },

    // Usuario autenticado
    { path: 'perfil', component: Perfil, canActivate: [routesGuard] },
    { path: 'reservas', component: Reservas, canActivate: [routesGuard] },

    // Admin — requiere rol Admin
    { path: 'admin', component: Admin, canActivate: [adminGuard] },
    { path: 'admin/tours', component: ToursAdmin, canActivate: [adminGuard] },
    { path: 'admin/reservas', component: ReservasAdmin, canActivate: [adminGuard] },
    { path: 'admin/facturas', component: FacturasAdmin, canActivate: [adminGuard] },
    { path: 'admin/choferes', component: ChoferAdmin, canActivate: [adminGuard] },
    { path: 'admin/usuarios', component: UsuariosAdmin, canActivate: [adminGuard] },
    { path: 'admin/ubicaciones', component: UbicacionesAdmin, canActivate: [adminGuard] },
    { path: 'admin/vehiculos', component: VehiculosAdmin, canActivate: [adminGuard] },
    { path: 'admin/clientes', component: ClientesAdmin, canActivate: [adminGuard] },
    { path: 'admin/empresa-cliente', component: EmpresaClienteAdmin, canActivate: [adminGuard] },
    { path: 'admin/guias', component: GuiasAdmin, canActivate: [adminGuard] },
    { path: 'admin/idiomas', component: IdiomasAdmin, canActivate: [adminGuard] },

    // Error
    { path: '**', component: Error }
];
