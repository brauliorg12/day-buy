import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EventsApp } from '../../../services/events.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalImage2Page } from '../../../components/modal-image2/modal-image2.page';
import { ModalImage4Page } from '../../../components/modal-image4/modal-image4.page';
import { ModalImage3Page } from '../../../components/modal-image3/modal-image3.page';
import { ModalImage5Page } from '../../../components/modal-image5/modal-image5.page';
import { UiServiceService } from '../../../services/ui-service.service';
import { Commerce } from '../../../classes/interfaces';
import { ProductoService } from '../../../services/producto.service';


@Component({
  selector: 'app-producto-gallery',
  templateUrl: './producto-gallery.page.html',
  styleUrls: ['./producto-gallery.page.scss'],

})
export class ProductoGalleryPage implements OnInit {

  loading: any;
  commerce: any = {};
  moderator = 'loading';

  img_2 = '';
  img_3 = '';
  img_4 = '';
  img_5 = '';


  photoSelected2: string | ArrayBuffer;
  croppedImage2: any = '';

  photoSelected3: string | ArrayBuffer;
  croppedImage3: any = '';


  photoSelected4: string | ArrayBuffer;
  croppedImage4: any = '';

  photoSelected5: string | ArrayBuffer;
  croppedImage5: any = '';

  // Modal img
  public image = {
    croppedImage: '',
  };

  close2 = false;
  close3 = false;
  close4 = false;
  close5 = false;

  public commerceForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private commerceService: ProductoService,
    public loadingController: LoadingController,
    private refreshEvent: EventsApp,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private modalController: ModalController,
    private uiService: UiServiceService,
  ) {

    this.commerceForm = this.formBuilder.group({
      _id: [''],
      fecha_fin: [''],
      descripcion: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      promo: [''],
      porciento: null,
      visitas: [0],
      shares: [0],
      favs: [0],
      premium: [''],
      img: ['', Validators.required],
      commerce_id: [''],
      img_2: [''],
      img_3: [''],
      img_4: [''],
      img_5: [''],
    });

    // Refresh image preview
    this.refreshEvent.currentData2.subscribe(value => {
      const reader = new FileReader();
      reader.onload = e => this.photoSelected2 = reader.result;
      reader.readAsDataURL(this.croppedImage2);
    });

    this.refreshEvent.currentData3.subscribe(value => {
      const reader = new FileReader();
      reader.onload = e => this.photoSelected3 = reader.result;
      reader.readAsDataURL(this.croppedImage3);
    });


    this.refreshEvent.currentData4.subscribe(value => {
      const reader = new FileReader();
      reader.onload = e => this.photoSelected4 = reader.result;
      reader.readAsDataURL(this.croppedImage4);
    });


    this.refreshEvent.currentData5.subscribe(value => {
      const reader = new FileReader();
      reader.onload = e => this.photoSelected5 = reader.result;
      reader.readAsDataURL(this.croppedImage5);
    });

  }

  ngOnInit() {
    this.loadPage();
  }


  async presentToast() {
    this.uiService.toastGeneral('Imágen subida correctamente!');
  }

  async eraseToast() {
    this.uiService.presentToast('Imágen Eliminada correctamente');
  }

  loadPage() {
    const idCompany = this.route.snapshot.params['id'];
    this.obtenerComercio(idCompany);
  }

  obtenerComercio(id: any) {
    this.commerceService.getOffer(id).subscribe(async postLoad2 => {

      if (postLoad2.offer) {
        this.commerce = postLoad2.offer;

        this.moderator = 'ok';

        this.commerceForm.patchValue({
          _id: postLoad2.offer._id,
          fecha_fin: postLoad2.offer.fecha_fin,
          descripcion: postLoad2.offer.descripcion,
          porciento: postLoad2.offer.porciento,
          promo: postLoad2.offer.promo,
          visitas: postLoad2.offer.visitas,
          shares: postLoad2.offer.shares,
          premium: postLoad2.offer.premium,
          img: postLoad2.offer.img,
          tipo: postLoad2.offer.tipo,
          status: postLoad2.offer.status,
          commerce_id: postLoad2.offer.commerce_id._id,

          img_2: postLoad2.offer.img_2,
          img_3: postLoad2.offer.img_3,
          img_4: postLoad2.offer.img_4,
          img_5: postLoad2.offer.img_5

        });

        if (!this.commerceForm.get('img_2').value) {
          this.commerceForm.patchValue({
            img_2: ''
          });
        }

        if (this.commerceForm.get('img_2').value) {
          this.close2 = true;
        }

        if (!this.commerceForm.get('img_3').value) {
          this.commerceForm.patchValue({
            img_3: ''
          });
        }

        if (this.commerceForm.get('img_3').value) {
          this.close3 = true;
        }

        if (!this.commerceForm.get('img_4').value) {
          this.commerceForm.patchValue({
            img_4: ''
          });
        }


        if (this.commerceForm.get('img_4').value) {
          this.close4 = true;
        }

        if (!this.commerceForm.get('img_5').value) {
          this.commerceForm.patchValue({
            img_5: ''
          });
        }

        if (this.commerceForm.get('img_5').value) {
          this.close5 = true;
        }

        if (postLoad2.offer.img_2) {
          this.img_2 = postLoad2.offer.img_2;
        }

        if (postLoad2.offer.img_3) {
          this.img_3 = postLoad2.offer.img_3;
        }

        if (postLoad2.offer.img_4) {
          this.img_4 = postLoad2.offer.img_4;
        }

        if (postLoad2.offer.img_5) {
          this.img_5 = postLoad2.offer.img_5;
        }
      }
      if (!postLoad2.offer) {
        this.moderator = '';
      }

    });
  }

  async delete2() {
    const alert = await this.alertController.create({
      header: 'Eliminar imágen!',
      message: 'No podrá volver a recuperarla.!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteImg2();
          }
        }
      ]
    });

    await alert.present();
  }


  async delete3() {
    const alert = await this.alertController.create({
      header: 'Eliminar imágen!',
      message: 'No podrá volver a recuperarla.!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteImg3();
          }
        }
      ]
    });

    await alert.present();
  }


  async delete4() {
    const alert = await this.alertController.create({
      header: 'Eliminar imágen!',
      message: 'No podrá volver a recuperarla.!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteImg4();
          }
        }
      ]
    });

    await alert.present();
  }


  async delete5() {
    const alert = await this.alertController.create({
      header: 'Eliminar imágen!',
      message: 'No podrá volver a recuperarla.!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteImg5();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteImg2() {
    if (this.close2 === true) {
      this.commerceService.eliminarImg2(this.commerceForm.value).subscribe((response: any) => {
        if (response.ok) {
          this.photoSelected2 = null;
          this.img_2 = '';
          this.eraseToast();
          this.close2 = false;
          this.obtenerComercio(this.route.snapshot.params['id']);
        }
      });
    }
  }

  deleteImg3() {
    if (this.close3 === true) {
      this.commerceService.eliminarImg3(this.commerceForm.value).subscribe((response: any) => {
        if (response.ok) {
          this.photoSelected3 = null;
          this.img_3 = '';
          this.eraseToast();
          this.close3 = false;
          this.obtenerComercio(this.route.snapshot.params['id']);
        }
      });
    }
  }

  deleteImg4() {
    if (this.close4 === true) {
      this.commerceService.eliminarImg4(this.commerceForm.value).subscribe((response: any) => {
        if (response.ok) {
          this.photoSelected4 = null;
          this.img_4 = '';
          this.eraseToast();
          this.close4 = false;
          this.obtenerComercio(this.route.snapshot.params['id']);
        }
      });
    }
  }

  deleteImg5() {
    if (this.close5 === true) {
      this.commerceService.eliminarImg5(this.commerceForm.value).subscribe((response: any) => {
        if (response.ok) {
          this.photoSelected5 = null;
          this.img_5 = '';
          this.eraseToast();
          this.close5 = false;
          this.obtenerComercio(this.route.snapshot.params['id']);
        }
      });
    }
  }

  // Modal img2
  async openModalImg() {
    const modal = await this.modalController.create({
      component: ModalImage2Page,
      swipeToClose: true,
      componentProps: {
        lunch: this.image
      }
    });
    modal.onWillDismiss().then(dataReturned => {

      if (dataReturned.data) {
        this.commerceForm.patchValue({
          img_2: dataReturned.data,
        });

        // croppedImage Obtiene imagen de modal
        this.croppedImage2 = dataReturned.data;

        this.updateCome2();
      }



    });
    return await modal.present().then(_ => {

    });
  }

  // Modal img3
  async openModalImg3() {
    const modal = await this.modalController.create({
      component: ModalImage3Page,
      swipeToClose: true,
      componentProps: {
        lunch: this.image
      }
    });
    modal.onWillDismiss().then(dataReturned => {

      if (dataReturned.data) {
        this.commerceForm.patchValue({
          img_3: dataReturned.data,
        });

        // croppedImage Obtiene imagen de modal
        this.croppedImage3 = dataReturned.data;

        this.updateCome3();
      }

    });
    return await modal.present().then(_ => {

    });
  }


  // Modal img4
  async openModalImg4() {
    const modal = await this.modalController.create({
      component: ModalImage4Page,
      swipeToClose: true,
      componentProps: {
        lunch: this.image
      }
    });
    modal.onWillDismiss().then(dataReturned => {



      if (dataReturned.data) {
        this.commerceForm.patchValue({
          img_4: dataReturned.data,
        });

        // croppedImage Obtiene imagen de modal
        this.croppedImage4 = dataReturned.data;

        this.updateCome4();
      }

    });
    return await modal.present().then(_ => {

    });
  }



  // Modal img5
  async openModalImg5() {
    const modal = await this.modalController.create({
      component: ModalImage5Page,
      swipeToClose: true,
      componentProps: {
        lunch: this.image
      }
    });
    modal.onWillDismiss().then(dataReturned => {



      if (dataReturned.data) {
        this.commerceForm.patchValue({
          img_5: dataReturned.data,
        });

        // croppedImage Obtiene imagen de modal
        this.croppedImage5 = dataReturned.data;

        this.updateCome5();
      }

    });
    return await modal.present().then(_ => {

    });
  }

  async presentLoading(msg) {
    this.loading = await this.loadingController.create({
      message: msg
    });
    return await this.loading.present();
  }



  async updateCome2() {
    this.close2 = false;
    this.commerceService.updateCom2(await this.commerceForm.value, this.croppedImage2).subscribe((response: any) => {
      if (response.ok) {
        this.presentToast();
        this.close2 = true;
        this.obtenerComercio(this.route.snapshot.params['id']);
      }
    });
  }

  async updateCome3() {
    this.close3 = false;
    this.close2 = false;
    this.commerceService.updateCom3(await this.commerceForm.value, this.croppedImage3).subscribe((response: Commerce) => {
      if (response) {
        this.presentToast();
        this.close3 = true;
        this.obtenerComercio(this.route.snapshot.params['id']);
      }
    });
  }


  async updateCome4() {
    this.close4 = false;
    this.close3 = false;
    this.close2 = false;
    this.commerceService.updateCom4(await this.commerceForm.value, this.croppedImage4).subscribe((response: Commerce) => {
      if (response) {
        this.presentToast();
        this.close4 = true;
        this.obtenerComercio(this.route.snapshot.params['id']);
      }
    });
  }


  async updateCome5() {
    this.close5 = false;
    this.close4 = false;
    this.close3 = false;
    this.close2 = false;
    this.commerceService.updateCom5(await this.commerceForm.value, this.croppedImage5).subscribe((response: Commerce) => {
      if (response) {
        this.presentToast();
        this.close5 = true;
        this.obtenerComercio(this.route.snapshot.params['id']);
      }
    });
  }

  goToLink(url: string) {
    window.open(url, '_system');
  }

}
