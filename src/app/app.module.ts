import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// image
import { ImageCropperModule } from 'ngx-image-cropper';

// Storage
import { IonicStorageModule } from '@ionic/storage';

// Tamaño texto
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';

// App Version
import { AppVersion } from '@ionic-native/app-version/ngx';

// Market
import { Market } from '@ionic-native/market/ngx';

// Modals
import { ModalGalleryPageModule } from './components/modal-gallery/modal-gallery.module';

// image Android/iOS
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ProductPopComponent } from './components/product-pop/product-pop.component';

// Pipe date Español
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-Ar');

// Lotie
// import { LottieAnimationViewModule } from 'ng-lottie';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
// Note we need a separate function as it's required
// by the AOT compiler
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent, ProductPopComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule,
    HttpClientModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    ModalGalleryPageModule,
    IonicStorageModule.forRoot(),
    LottieModule.forRoot({
      player: playerFactory,
      useCache: true
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MobileAccessibility,
    AppVersion,
    Market,
    Crop,
    File,
    PhotoViewer,
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
