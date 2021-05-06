import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: any, title: any): void {
    this.toastr.success(message, title);
  }

  showError(message: any, title: any): void {
    this.toastr.error(message, title);
  }

  showInfo(message: any, title: any): void {
    this.toastr.info(message, title);
  }

  showWarning(message: any, title: any): void {
    this.toastr.warning(message, title);
  }
}
