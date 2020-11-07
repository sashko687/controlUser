import { User } from './../shared/interfaces';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  constructor(private userServ: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('Name', Validators.required),
      type: new FormControl('text', Validators.required),
      min: new FormControl(1),
      max: new FormControl(10),
      maxLength: new FormControl(200),
      isRequired: new FormControl(true, Validators.required),
      order: new FormControl(1, Validators.required)
    });
  }
 public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const User = {
      title: this.form.value.title,
      type: this.form.value.type,
      min: this.form.value.min,
      max: this.form.value.max,
      maxLength: this.form.value.maxLength,
      isRequired : this.form.value.isRequired,
      order: this.form.value.order,
      сreated_at: new Date(),
      updated_at : new Date (),
    };
    // console.log(this.form);
    this.userServ.create(User).subscribe((res) => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/dashboard']);
    });
  }
}
