import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-gallery',
  templateUrl: './modal-gallery.page.html',
  styleUrls: ['./modal-gallery.page.scss'],
})
export class ModalGalleryPage {

  img = '';
  img2 = '';
  img3 = '';
  img4 = '';
  img5 = '';

  type = '';

  slideOpts = {
    // allowSlidePrev: false,
    // allowSlideNext: false,
    zoom: {
      maxRatio: 2,
    },
  };



  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
  ) { }


  ionViewWillEnter() {
    this.img = this.navParams.get('img');
    this.img2 = this.navParams.get('img_2');
    this.img3 = this.navParams.get('img_3');
    this.img4 = this.navParams.get('img_4');
    this.img5 = this.navParams.get('img_5');
    this.type = this.navParams.get('type');
  }

  ionViewWillLeave() {
    setTimeout(() => {
      this.img = '';
      this.img2 = '';
      this.img3 = '';
      this.img4 = '';
      this.img5 = '';
      this.type = '';
    }, 300);

  }

  closeModal() {
    this.modalController.dismiss();
  }

}
