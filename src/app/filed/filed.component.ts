import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FiledService } from './../services/filed.service';
import { UserModel } from './../models/userModel';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-filed',
  templateUrl: './filed.component.html',
  styleUrls: ['./filed.component.scss']
})
export class FiledComponent implements OnInit {
  signupForm!: FormGroup;
  users!: UserModel;
  subscription!: Subscription;
  isLoading!: Observable<boolean>;

  constructor(private filedService: FiledService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      user_email: new FormControl(null, [Validators.email, Validators.required]),
      user_budget: new FormControl(null),
      phone_number: new FormControl(null)
    });
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

    const filedItem: UserModel = this.users = (
       this.signupForm.get('first_name')?.value,
       this.signupForm.get('last_name')?.value,
       this.signupForm.get('user_email')?.value,
       this.signupForm.get('user_budget')?.value,
       this.signupForm.get('phone_number')?.value
    );
    this.filedService.addFiled(filedItem).subscribe((data: any) => {
      if (data.affectedRows === 1) {
        alert('Welcome...!!');
        this.ngOnInit();
      } else {
        alert('Something went wrong');
      }
    });
  }

  showToasterSuccess(): void {
    this.notifyService.showSuccess('Data Submitted Successfully!!', 'ItSolutionStuff.com');
  }

  showToasterError(): void {
    this.notifyService.showError('Something is wrong!!', 'ItSolutionStuff.com');
  }
}
