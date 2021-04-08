import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';

const routes: Routes = [
  {
    path: "",
    component: CreateAccountComponent
  },
  {
    path: "create",
    component: CreateAccountComponent
  },
  {
    path: "update",
    component: UpdateAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
