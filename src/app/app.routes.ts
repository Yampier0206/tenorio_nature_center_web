import { Routes } from '@angular/router';
import{Home} from './components/home/home'
import { Error } from './components/error/error';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { NewPost } from './components/new-post/new-post';
import { routeGuard } from './core/guards/routes.guard';
import { PostDetail } from './components/post-detail/post-detail';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'login',component:Login},
    {path:'categoria/:id',component:Home},
    {path:'register',component:Register},
    {path:'detalle/:id',component:PostDetail},
    {path:'nuevo-post',canActivate:[routeGuard],loadComponent:()=>{
        return NewPost
    }},
    {path:'**',component:Error}
];
