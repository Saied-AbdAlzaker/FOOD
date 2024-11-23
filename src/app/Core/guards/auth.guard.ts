import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const authGuard: CanActivateFn = (state) => {
  const route = inject(Router);
  const auth = inject(AuthService);

  const token = localStorage.getItem('userToken');

  if (token !== null) {
    return true;
  } else {
    // auth.getProfile();
    route.navigate(['/auth']);
    return false;
  }
};
