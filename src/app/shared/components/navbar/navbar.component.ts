import {
  Component,
  inject
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthFacade } from '../../state/auth/auth.facade';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  providers: [AuthFacade],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  logout() {
    this.localStorageService.cleanLocalStorage()
    this.router.navigate(['/']);
  }
}
