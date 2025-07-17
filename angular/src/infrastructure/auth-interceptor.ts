import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuth } from 'src/app/auth/state/auth.selectors';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(
      firstValueFrom(this.store.select(selectAuth)).then(auth => {
        const token = auth?.token;
        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authReq).toPromise();
        } else {
          return next.handle(req).toPromise();
        }
      }).catch(() => next.handle(req).toPromise()).then(result => result as HttpEvent<any>)
    );
  }
}
