import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './inicio.page';

import { Tab1PageRoutingModule } from './inicio-routing.module';
import { CountdownComponent } from '../../components/countdown/countdown.component';

// Lottie
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    LottieModule.forRoot({
      player: playerFactory,
      useCache: true
    })
  ],
  declarations: [Tab1Page, CountdownComponent]
})
export class Tab1PageModule {}
