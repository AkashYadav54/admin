import { Component } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  phoneNumber: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';

  returnUrl: string = '/dashboard';

  constructor(private loginService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const returnUrl =
      this.router.routerState.snapshot.root.queryParams['returnUrl'];
    if (returnUrl) {
      this.returnUrl = returnUrl;
    }
  }

  onLogin(): void {
    this.errorMessage = '';
    this.loginService.login(this.phoneNumber, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);

        localStorage.setItem('authToken', response.access_token);

        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      },
    });
  }
}
