import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FiledComponent } from './filed/filed.component';

const routes: Routes = [
  { path: '', redirectTo: '/filed', pathMatch: 'full' },
  { path: 'filed', component: FiledComponent },
  { path: 'users',  component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
