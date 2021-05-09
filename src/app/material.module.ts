import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [ MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  exports: [ MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCheckboxModule]
})


export class MaterialModule {

}
