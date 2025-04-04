import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../shared/state/auth/auth.facade';

@Component({
  selector: 'app-login',
  providers: [AuthFacade],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly authFacade = inject(AuthFacade);

  login(): void {
    this.authFacade.createRequestToken();
  }
}
