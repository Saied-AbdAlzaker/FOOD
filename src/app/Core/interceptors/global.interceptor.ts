import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('userToken');
    const baseUrl: string = 'https://upskilling-egypt.com:3006/api/v1/';

    let newHeader = {};
    if (token !== null) {
      newHeader =
      {
        'Authorization': `Bearer ${token}`
      }
    }

    let clonedRequest = request.clone({
      setHeaders: newHeader, url: baseUrl + request.url,
    })

    return next.handle(clonedRequest);
  }
}
