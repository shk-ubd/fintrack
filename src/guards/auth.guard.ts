import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
// import { AuthRepository } from '../repositories/auth.repository';

export const authGuard: CanActivateFn = () => {
//   const authRepo = inject(AuthRepository);
//   const router = inject(Router);

//   const user = authRepo.getCurrentUser();

//   if (!user) {
//     router.navigate(['/login']);
//     return false;
//   }

  return true;
};
