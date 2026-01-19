import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
// import { AuthRepository } from '../repositories/auth.repository';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
//   const authRepo = inject(AuthRepository);

  // ---- Request phase ----
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  // ---- Response phase ----
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Network error
      if (error.status === 0) {
        return throwError(() => new Error('Network error. Please check your connection.'));
      }

      // Unauthorized
      if (error.status === 401) {
        // authRepo.logout();
        return throwError(() => error);
      }

      // Forbidden
      if (error.status === 403) {
        router.navigate(['/forbidden']);
        return throwError(() => error);
      }

      // Payload too large
      if (error.status === 413) {
        return throwError(() => new Error('Payload too large.'));
      }

      return throwError(() => error);
    })
  );
};
