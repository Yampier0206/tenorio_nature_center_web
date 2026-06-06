import { Routes } from '@angular/router';
import{Home} from './components/home/home'
import { Error } from './components/error/error';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { UsersManagement } from './components/users-management/users-management';
import { NewPost } from './components/new-post/new-post';
import { routeGuard } from './core/guards/routes.guard';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'login',component:Login},
    {path:'categoria/:id',component:Home},
    {path:'register', component:Registro},
    {path:'nuevo-post',canActivate:[routeGuard],loadComponent:()=>{
        return NewPost
    }},
    { path: 'users-management', component: UsersManagement },
    {path:'**',component:Error}
];