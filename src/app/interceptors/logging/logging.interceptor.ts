import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Outgoing HTTP request', req);
  return next(req).pipe(tap((event: HttpEvent<any>) => {
    console.log('Incoming HTTP response', event);
  }));
};
