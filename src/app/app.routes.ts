import { Routes } from '@angular/router';
import{Home} from './components/home/home'
import { Error } from './components/error/error';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { UsersManagement } from './components/users-management/users-management';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'login',component:Login},
    {path:'categoria/:id',component:Home},
    {path:'register', component:Registro},
    { path: 'users-management', component: UsersManagement },  // sin :id
    {path:'**',component:Error}
];
