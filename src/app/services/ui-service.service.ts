import { Injectable } from '@angular/core';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Market } from '@ionic-native/market/ngx';
import Swal from 'sweetalert2';

// import * as moment from 'moment';
import { Router } from '@angular/router';
// import { ModalCompraPage } from '../pages/_modals/modal-compra/modal-compra.page';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {


  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private storage: Storage,
    private router: Router,
    private market: Market
  ) { }


  async presentAlertConfirm(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: `<strong>${content}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Actualizar',
          handler: () => {
            this.market.open('com.codi.cubanova');
          }
        }
      ]
    });

    await alert.present();
  }


  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'bottom',
      cssClass: 'toast_connection_off'
    });
    toast.present();
  }

  alertSucces(data: any) {
    Swal.fire({
      title: '¡Reserva exitosa!',
      text: 'Puedes chequear el estado en "Mi Billetera / Mis Compras"',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Ver operación',
      cancelButtonText: 'Seguir Comprando',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('transaction-view/' + data);
      }
    });
  }



  alertDataBtn(data_id: any, url: string, icondata: any, title: string, text: string, btnconfirm: string, btncancel: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: icondata,
      showCancelButton: true,
      confirmButtonText: btnconfirm,
      cancelButtonText: btncancel,
    }).then((result) => {
      if (result.isConfirmed) {
        if (data_id) {
          this.router.navigateByUrl(url + '/' + data_id);
        } else {
          this.router.navigateByUrl(url);
        }

      }
    });
  }

  alertData(icondata: any, title: string, text: string, btnconfirm: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: icondata,
      showCancelButton: false,
      confirmButtonText: btnconfirm
    }).then((result) => {

    });
  }


  update(title: string, content: string) {
    Swal.fire({
      title: title,
      text: content,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Más Tarde',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigateByUrl('transaction-view/' + data);
      }
    });
  }

  // async AlertRate() {
  //   const alert = await this.alertController.create({
  //     header: '¿Te gusta CoDi?',
  //     message: 'Si te gusta, ¿podrías escribirnos una reseña? No te tomará más de un minuto. ¡Gracias por tu apoyo!',
  //     cssClass: 'alert_rate',
  //     buttons: [
  //       {
  //         text: 'Escribir reseña',
  //         cssClass: 'now_rate',
  //         handler: async () => {
  //           await this.storage.set('rate', moment().add(180, 'days').format('YYYYMMDD'));
  //           this.market.open('com.codi.cubanova');
  //         }
  //       }, {
  //         text: 'Recordar más tarde',
  //         cssClass: 'remember',
  //         handler: async () => {
  //           await this.storage.set('rate', moment().add(7, 'days').format('YYYYMMDD'));
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  async toastGeneral(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'bottom',
      cssClass: 'toast_connection'
    });
    toast.present();
  }

  async toasAddCart(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      // position: 'middle',
      position: 'bottom',
      cssClass: 'toast_add_cart'
    });
    toast.present();
  }


  async maximoCart() {
    const alert = await this.alertController.create({
      header: 'Lo sentimos',
      message: 'Es el máximo stock disponible',
      cssClass: 'alert_rate',
      buttons: [
        {
          text: 'Entendido',
          cssClass: 'now_rate',
          handler: async () => {
          }
        }
      ]
    });

    await alert.present();
  }

  // // Modal Info
  // async tutoAlert() {
  //   const modal = await this.modalController.create({
  //     component: ModalCompraPage,
  //     cssClass: 'modalinfo',
  //     componentProps: {
  //       data: {
  //         titulo: 'Tips!',
  //         texto_arriba: 'Deslizá y contactáte rápidamente.',
  //         texto_abajo: '',
  //         tipo: 'tuto_slide',
  //         link_1: '',
  //         link_2: '',
  //       }
  //     }
  //   });
  //   modal.onWillDismiss().then(dataReturned => {

  //   });
  //   return await modal.present().then(ress => {
  //     // triggered when opening the modal
  //   });
  // }

  async crearPagina() {
    const alert = await this.alertController.create({
      header: '¡Gracias por sumarte!',
      message: 'Primero necesitamos que definas tu actividad:',
      cssClass: 'alert_create',
      buttons: [
        {
          text: 'Comercio',
          cssClass: 'create_text_alert',
          handler: () => {
            this.router.navigateByUrl('/want-commerce');
          }
        }, {
          text: 'Profesional',
          cssClass: 'create_text_alert',
          handler: () => {
            this.router.navigateByUrl('/profesional-add');
          }
        }, {
          text: 'Servicio',
          cssClass: 'create_text_alert',
          handler: () => {
            this.router.navigateByUrl('/servicio-add');
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'remember',
          handler: (blah) => {

          }
        },
      ]
    });

    await alert.present();
  }


  async paginaCreada(tipo) {
    const alert = await this.alertController.create({
      header: '¡Felicitaciones!',
      message: tipo + ' creado con éxito, pendiente de la aprobación de un Administrador. (Puede demorar hasta 24 horas)',
      cssClass: 'alert_create_ok',
      buttons: [
        {
          text: '¡Super!',
          // role: 'cancel',
          cssClass: 'super',
          handler: (blah) => {
            this.alertController.dismiss();
          }
        },
      ]
    });

    await alert.present();
  }



  async CreateProduct(id: any) {
    const alert = await this.alertController.create({
      header: '¡Publicación creada!',
      message: '¿Querés agregar más imágenes a la publicación?',
      cssClass: 'alert_rate',
      buttons: [
        {
          text: 'AGREGAR',
          cssClass: 'now_rate',
          handler: async () => {
            await this.router.navigateByUrl('/producto-gallery/' + id);
          }
        }, {
          text: 'MÁS TARDE',
          cssClass: 'remember',
          handler: async () => {
            // await this.router.navigateByUrl('/producto-list/' + id);
          }
        }
      ]
    });

    await alert.present();
  }

  setTuto() {
    this.storage.set('tutorial_comercio', true);
  }

}
