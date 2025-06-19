import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getToken()) {
    console.log('Guard si es true ');
    return true;
  }

  console.log('Guard si es false ');
  router.navigate(['/']);
  return false;
};
