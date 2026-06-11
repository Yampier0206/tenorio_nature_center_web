import { Routes } from '@angular/router';
import { Home } from './components/home/home'
import { Error } from './components/error/error';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { UsersManagement } from './components/users-management/users-management';
import { NewPost } from './components/new-post/new-post';
import { routeGuard } from './core/guards/routes.guard';
import { PostDetail } from './components/post-detail/post-detail';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'login',component:Login},
    {path:'categoria/:id',component:Home},
    {path:'register',component:Registro},
    {path:'detalle/:id',component:PostDetail},
    {path:'nuevo-post',canActivate:[routeGuard],loadComponent:()=>{
        return NewPost
    }},
    { path: 'users-management', component: UsersManagement },
    {path:'**',component:Error}
];