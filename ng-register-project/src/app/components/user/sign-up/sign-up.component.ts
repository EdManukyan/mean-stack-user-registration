import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {filter, take} from "rxjs/operators";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {

  public registerForm: FormGroup;
  public showSuccessMessage = false;
  public errorMessages: string;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this._formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  public submitUserForm() {
    const formValues = this.registerForm.value;
    this._userService.postUser(formValues)
      .pipe(filter(data => !!data), take(1))
      .subscribe(data => {
          this.showSuccessMessage = true;
          this.resetForm();
          console.log(data);
        },
        err => {
          if (err.status === 422) {
            this.errorMessages = err.error.join('<br/>')
          } else {
            this.errorMessages = 'Something went wrong, please contact admin';
          }
        })
  }

  private resetForm() {
    this._userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    this.errorMessages = '';
    this.showSuccessMessage = false;
    this.registerForm.reset();
  }
}
