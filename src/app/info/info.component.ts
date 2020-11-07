import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {
  user;

  constructor(private userServ: UserService,
     private route: ActivatedRoute,
     private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.userServ.getById(params.id)))
      .subscribe((user) => {
        this.user = user;
        this.cdr.detectChanges();
      });
  }
}
