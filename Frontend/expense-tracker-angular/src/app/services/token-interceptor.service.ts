import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loader: LoadingService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    let register = req.url.includes('register');

    this.loader.showLoading();
    if (token != null && !register) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          'content-type': 'application/json',
        },
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      finalize(() => {
        this.loader.hideLoading()
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router
            .navigate(['login'])
            .then((_) => console.log('redirect to login'));
        }
        return throwError(error);
      })
    );
  }
}
