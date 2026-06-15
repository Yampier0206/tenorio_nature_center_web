import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const token = auth.getToken();

    if(!token){
        return next(req);
    }

    const authRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authRequest).pipe(
        catchError((err) => {
            if(err.status === 401){
                auth.logout();
                router.navigate(['/login']);
            }
            return throwError(() => err);
        })
    );
}