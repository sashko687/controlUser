import { UserService } from './../shared/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit {
  submited = false;
  form: FormGroup;
  user: User;

  constructor(
    private userServ: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.userServ.getById(params['id']);
        })
      )
      .subscribe((user) => {
        this.user = user;
        this.form = new FormGroup({
          title: new FormControl(this.user.title, Validators.required),
          type: new FormControl(this.user.type, Validators.required),
          min: new FormControl(this.user.min),
          max: new FormControl(this.user.max),
          maxLength: new FormControl(this.user.maxLength),
          isRequired: new FormControl(
            this.user.isRequired,
            Validators.required
          ),
          order: new FormControl(this.user.order, Validators.required),
        });
        this.cdr.detectChanges();
      });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submited = true;

    this.userServ
      .update({
        ...this.user,
        title: this.form.value.title,
        type: this.form.value.type,
        min: this.form.value.min,
        max: this.form.value.max,
        maxLength: this.form.value.maxLength,
        isRequired: this.form.value.isRequired,
        updated_at: new Date(),
      })
      .subscribe((res) => {
        this.submited = false;
        this.router.navigate(['/', 'dashboard']);
      });
  }
}
