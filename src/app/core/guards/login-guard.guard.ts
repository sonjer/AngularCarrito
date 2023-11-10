import { CanActivateFn, Router } from '@angular/router';
import { Constants} from '../constants/constants'
import { inject } from '@angular/core';


export const loginGuardGuard: CanActivateFn = () => {
  const router = inject(Router)
  if (window.localStorage.getItem(Constants.User)) {
    return true
  } else {
    router.navigate(['/Login'])
    return false
  }
};
