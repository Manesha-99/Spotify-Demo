import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUser || JSON.parse(localStorage.getItem('user') || 'null');

  if (auth.isLoggedIn()) {
    return true;
  } else {
    alert('Please Login First....');
    router.navigate(['/login']);
    return false;
  }
};