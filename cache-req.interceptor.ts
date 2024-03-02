/**Caché de Solicitudes:
Este interceptor implementa una caché simple para almacenar y recuperar respuestas de solicitudes HTTP.
*/

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      // Solo cachea solicitudes GET
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      // Si la respuesta está en caché, devuelve la respuesta en un Observable
      return of(cachedResponse);
    }

    // Si la respuesta no está en caché, continúa con la solicitud y almacena la respuesta en caché
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event);
        }
      })
    );
  }
}
