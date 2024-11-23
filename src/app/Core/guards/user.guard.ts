import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const userGuard: CanActivateFn = ( state ) => {
  const route = inject(Router);
  const auth = inject(AuthService);

  const token = localStorage.getItem('userToken');
  const role = localStorage.getItem('role');

  if(token !== null && role == 'SystemUser')
  {
    return true
  } else
  {
    auth.getProfile();
    route.navigate(['/dashboard']);
    return false;
  }
};