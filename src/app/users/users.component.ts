import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserModel } from './../models/userModel';
import { Observable } from 'rxjs';
import { UserService } from './../user.service';
import * as fromRoot from '../app.reducer';
import * as Users from './users.action';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  signupForm!: FormGroup;
  users!: UserModel;
  isLoading!: Observable<boolean>;
  invalidNamesArr: string[] = ['payment', 'Isreal'];
  constructor(private userServiceObj: UserService, private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit(): void {
    this.store.dispatch(new Users.StartUsers());
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, this.invalidNameValidation.bind(this)]),
      last_name: new FormControl(null, [Validators.required]),
      user_email: new FormControl(null, [Validators.email, Validators.required]),
      user_budget: new FormControl(null),
      phone_number: new FormControl(null)
    });
    this.store.dispatch(new Users.StopUsers());
    this.store.subscribe(data => console.log(data));
  }  

  invalidNameValidation(control: AbstractControl) {
    if (this.invalidNamesArr.indexOf(control.value) >= 0) {
      return { invalidName: true };
    }

    return this.store.select(fromRoot.getIsUsers).pipe(take(1));
   }

   setNotificationValidation(value: string): void  {
     const phoneNumberControl = this.signupForm.get('phone_number');
     const emailControl = this.signupForm.get('user_email');
     if (value === 'phone') {
       phoneNumberControl?.setValidators(Validators.required);
       emailControl?.clearValidators();
       emailControl?.setValidators(Validators.required);
     } else {
       phoneNumberControl?.clearValidators();
       emailControl?.setValidators([Validators.email, Validators.required]);
     }
     phoneNumberControl?.updateValueAndValidity();
     emailControl?.updateValueAndValidity();
   }

  onSubmit(): void {
    console.log(this.signupForm);
 
    const userItem: UserModel = this.users = (
       this.signupForm.get('first_name')?.value,
       this.signupForm.get('last_name')?.value,
       this.signupForm.get('user_email')?.value,
       this.signupForm.get('user_budget')?.value,
       this.signupForm.get('phone_number')?.value
    );
    this.userServiceObj.addUser(userItem).subscribe((data: any) => {
      if (data.affectedRows === 1) {
        alert('Welcome...!!');
        this.ngOnInit();
      } else {
        alert('Something went wrong');
      }
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
     const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'terri@terri.com') {
            resolve({'emailIsForbidden': true });
          } else {
            resolve(null);
          }
        }, 1500);
     });
     return promise;
  }
}
