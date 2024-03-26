
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLogedIn()) {
      return true;
    } else {
      // Redirect to login page if user is not logged in
      this.router.navigate(['/login']);
      console.log('you are not auth ...!');
      return false;
    }
  }
}
