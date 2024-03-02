/**Manejo de Errores Global:
Este interceptor te permite manejar errores de manera centralizada para todas las solicitudes HTTP. 
Puedes capturar los errores y tomar medidas adecuadas, como mostrar mensajes de error al usuario o 
realizar acciones de recuperación.
*/

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejar el error aquí
        console.error('Error en la solicitud:', error.message);
        // Puedes lanzar el error nuevamente para que el controlador de errores global de Angular lo maneje
        return throwError(error);
      })
    );
  }
}
