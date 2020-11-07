import { UserService } from './../shared/user.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  users = [];
  pSub: Subscription;
  rSub: Subscription;
  productName;

  constructor(private userServ: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.pSub = this.userServ.getAll().subscribe((users) => {
      this.users = users;
      this.cdr.detectChanges();
    });
  }

  remove(id) {
    this.rSub = this.userServ.remove(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
      this.cdr.detectChanges();
    });
  }

  ngOnDesroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
