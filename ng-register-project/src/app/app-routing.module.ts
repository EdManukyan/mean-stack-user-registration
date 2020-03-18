import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from "./components/user/user.component";
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";


const routes: Routes = [
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },
  {
    path: 'signup', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
