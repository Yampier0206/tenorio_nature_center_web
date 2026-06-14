import {inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, CanActivateFn} from '@angular/router';

export const routerGuard: CanActivateFn = () => {
    const router = inject(Router);
    const auth = inject(AuthService);
    if(auth.isAuthenticated()){
        return true;
    }   

    return router.createUrlTree(['/login']);
}