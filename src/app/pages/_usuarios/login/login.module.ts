import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

// Lottie
// import { LottieModule } from 'ngx-lottie';
// import player from 'lottie-web';

// export function playerFactory() {
//   return player;
// }

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // LottieModule.forRoot({
    //   player: playerFactory,
    //   useCache: true
    // })
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
