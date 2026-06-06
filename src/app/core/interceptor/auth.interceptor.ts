import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { Token } from "@angular/compiler";
import {inject} from '@angular/core';
import { AuthService } from "../../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const authService = inject(AuthService)
   const token = authService.getToken()
   if (!token) {
        return next(req)
   }
   console.log(token)
   const Authorization:string[]=['Bearer',token]
   const authRequest = req.clone({
    setHeaders: {
        Authorization
    }
   })
   return next(authRequest)
}