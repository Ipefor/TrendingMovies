import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../shared/state/auth/auth.facade';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css',
})
export class CallbackComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.isTokenApproved();
  }

  isTokenApproved(): void {
    console.log('Antes del debugger')
    debugger;
    console.log('Después del debugger')
    this.activatedRoute.queryParams.subscribe((params) => {
      const approved = params['approved'];
      const requestToken = params['request_token'];

      if (approved === 'true') {
        this.authFacade.createSessionId(requestToken);
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
