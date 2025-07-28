
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUser || JSON.parse(localStorage.getItem('user') || 'null');

  if (user?.role === 'admin') {
    return true;
  } else {
    alert('Access denied. Admins only.');
    router.navigate(['/login']);
    return false;
  }
};
