/**
Internacionalización de Solicitudes:
Este interceptor te permite modificar las solicitudes HTTP para incluir encabezados de internacionalización, 
como el idioma preferido del usuario.
 
*/

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtiene el idioma del navegador o alguna configuración específica del usuario
    const userLanguage = navigator.language || 'en';
    // Clona la solicitud y agrega el encabezado de internacionalización
    const modifiedReq = req.clone({ headers: req.headers.set('Accept-Language', userLanguage) });
    // Continuar con la solicitud modificada
    return next.handle(modifiedReq);
  }
}
