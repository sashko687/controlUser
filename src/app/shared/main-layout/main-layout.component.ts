import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {}
  logout(event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/', 'login']);
    localStorage.clear();
  }
}
