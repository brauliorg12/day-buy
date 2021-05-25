import { Component, OnInit, ViewChild } from '@angular/core';
import { Offer, Usuario } from '../../../classes/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {

  ToastController,
  PopoverController,
  IonContent, ModalController, LoadingController, AlertController, IonToggle
} from '@ionic/angular';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import * as moment from 'moment';
import { ModalImagePage } from '../../../components/modal-image/modal-image.page';
import { EventsApp } from '../../../services/events.service';
import { IonInput, IonDatetime } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../../services/ui-service.service';
import { CropOptions } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ProductoService } from '../../../services/producto.service';


@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss'],
})
export class ProductoEditPage implements OnInit {


  @ViewChild('input_toggle', { static: false }) inputToggle: IonToggle;

  @ViewChild('input_mp', { static: false }) input_mp: IonInput;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  @ViewChild('input_desc', { static: false }) inputDesc: IonInput;

  @ViewChild('input_promo', { static: false }) inputPromo: IonInput;

  @ViewChild('input_precio', { static: false }) inputPrecio: IonInput;

  @ViewChild('input_precio_con', { static: false }) inputPrecioO: IonInput;

  @ViewChild('input_fecha', { static: false }) inputFecha: IonDatetime;

  @ViewChild('input_t', { static: false }) input_t: IonInput;

  @ViewChild('input_s', { static: false }) inputStock: IonInput;


  inputPhotoSend = false;

  photoSelected: string | ArrayBuffer;
  croppedImage: any = '';
  // Modal img
  public image = {
    croppedImage: '',
  };

  loading: any;

  public offerForm: FormGroup;

  public today = moment(new Date).format('YYYY-MM-DD');

  timer: any;

  producto: any = {};

  usuario: any = {};

  commerce: any;

  promo = '';
  porciento = '';
  cant = '';
  fecha_c = '';
  com = '';

  public status: string;
  public preview_cupon = false;

  usuariomod: Usuario = {};
  moderator = 'loading';

  // Pesos
  precio_inicial = '';
  precio_final = '';
  public pesos = false;


  // Cats
  customAlertOptionsBussines: any = {
    header: 'Categorías',
    subHeader: 'Seleccione una o más categorías para su publicación.',
    translucent: true
  };

  cats: string[] = [
    'Moda',
    'Salud y Belleza',
    'Estilo de vida',
    'Gastronomia',
    'Mascotas',
    'Chicos',
    'Otros'
  ];


  // Metodos de pago
  metodosOptions: any = {
    header: 'Métodos de pago',
    subHeader: 'Seleccione uno o varios métodos de pago para su cliente.',
    translucent: true
  };

  metodos: Array<any> = [
    { value: 'efectivo', name: 'Efectivo al retirar' },
    { value: 'transferencia', name: 'Transferencia Bancaria' },
    { value: 'mercadopago', name: 'MercadoPago' }
  ];


  // Estado Transfer
  public status_2 = 'loading';

  // transfers: any = [];

  id_transfer: any;

  // Modal User
  public transfers = {
    id: '',
  };

  // Envio
  entregaAlertOptionsBussines: any = {
    header: 'Formas de entrega',
    subHeader: 'Seleccione una o varias formas de entrega',
    translucent: true
  };

  cropOptions: CropOptions = {
    quality: 50
  };

  croppedImagepath = '';
  isLoading = false;

  // stock
  stock = 1;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private file: File,
    public router: Router,
    public storage: Storage,
    public toastController: ToastController,
    public popoverController: PopoverController,
    public formBuilder: FormBuilder,
    private uiService: UiServiceService,
    private modalController: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private refreshEvent: EventsApp,
    private usersService: UsuarioService,
  ) {
    this.offerForm = this.formBuilder.group({
      _id: [''],
      nombre: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      img: ['', Validators.required],
      img_2: [''],
      img_3: [''],
      img_4: [''],
      img_5: [''],
      img_6: [''],
      img_7: [''],
      img_8: [''],
      img_9: [''],
      img_10: [''],
      descripcion: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.required
      ])),
      moneda: [''],
      precio_final: ['', Validators.required],
      stock: [1, Validators.required],
      costo_financiero: [''],
      costo_producto: [''],
      moneda_envio: [''],
      costo_envio: [''],
      costo_total: [''],
      margen: [''],
      categoria: ['', Validators.required],
      notas: [''],
      etiquetas: [''],

      stock_valid: [''], // Para que no este vacio oferta precio
      precio_valid: [''], // Para que no este vacio oferta precio
      precio_inicial: [''],
      tipo: ['producto'],

      condicion: ['nuevo'],
      garantia: ['no'],

      transfer: [null],

      link_mp: [''],

      // ! Pagos
      check_e: [false],
      check_t: [false],
      check_m: [false],



      // ! Entregas
      check_local: [false],
      check_delivery: [false],
      check_envio: [false],
    });

    // Refresh image preview
    this.refreshEvent.currentData.subscribe(value => {
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.croppedImage);

      this.inputPhotoSend = true;
    });

    // Refresh transfer
    this.refreshEvent.nuevoEventPubEdit.subscribe((value: any) => {
      if (value[0]) {
        this.offerForm.patchValue({
          transfer: value[0],
          valid_transfer: ['ok']
        });

        this.status_2 = 'ok';
        this.id_transfer = value[0]._id;
        this.scrollTo();
      }
    });

  }

  goToMP() {
    window.open('https://www.mercadopago.com.ar/tools/create', '_system');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vista previa activada',
      duration: 800,
      position: 'bottom',
      cssClass: 'toast_connection'
    });
    toast.present();
  }





  ionViewWillEnter() {
    this.usuariomod = this.usersService.getUsuario();

    this.tipoUsuario();

  }


  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const idCompany = this.route.snapshot.params['id'];
    this.getOffer(idCompany);
  }


  tipoUsuario() {
    if (this.usuariomod.role === 'admin' && this.usuariomod._id === '5d9cbff44b725d06b82f1c57') { // Admin
      this.moderator = 'admin';
    }

    if (this.usuariomod.role === 'admin' && this.usuariomod._id === '5da1b8889380e30629e18f5e') { // Nico
      this.moderator = 'admin';
    }

    if (this.usuariomod.role === 'admin' && this.usuariomod._id === '5da0a6209380e30629e18f56') { // Braulio
      this.moderator = 'admin';
    }

    if (this.usuariomod.role === 'admin' && this.usuariomod._id === '5e667338848b8106b6e3e8ce') { // Lucia
      this.moderator = 'admin';
    }

  }


  fecha_cupon_No() {
    this.offerForm.patchValue({
      fecha_fin: ''
    });
  }

  // + - count
  increment() {
    this.stock++;

    this.offerForm.patchValue({
      stock: this.stock
    });

  }

  decrement() {
    this.stock--;

    this.offerForm.patchValue({
      stock: this.stock
    });
  }

  // Aditional
  oferta() {
    if (this.inputToggle.checked) {
      this.pesos = true;
      this.offerForm.patchValue({
        precio_inicial: this.offerForm.get('precio_final').value,
        precio_final: '',
        porciento: null
      });

      setTimeout(() => {
        if (this.inputPrecioO.value > 20) {
          this.offerForm.patchValue({
            precio_valid2: 0
          });
          this.inputPrecioO.value = this.offerForm.get('precio_inicial').value;
        }
        this.inputPromo.setFocus();
      }, 300);

    } else {
      this.pesos = false;
      this.offerForm.patchValue({
        precio_inicial: '',
        precio_final: '',
        porciento: null
      });

      setTimeout(() => {
        this.inputPrecio.setFocus();
      }, 300);
    }
    if (this.offerForm.get('oferta').value === 'false') {
      this.offerForm.patchValue({
        oferta: 'true',
      });
    }

    if (this.offerForm.get('oferta').value === 'true') {
      this.offerForm.patchValue({
        oferta: 'false',
      });
    }
  }

  check_precio_oferta() {
    if (this.inputPromo.value <= 20) {
      this.offerForm.patchValue({
        precio_oferta: null
      });
    } else {
      this.offerForm.patchValue({
        precio_oferta: 0,
        precio_valid: 0
      });
    }
  }

  check_precio_con_oferta() {
    if (this.inputPrecioO.value <= 20) {
      this.offerForm.patchValue({
        precio_valid2: null
      });
    } else {
      this.offerForm.patchValue({
        precio_valid2: 0,
        precio_valid: 0
      });
    }
  }

  check_precio() {
    if (this.inputPrecio.value <= 20) {
      this.offerForm.patchValue({
        precio_valid: null
      });
    } else {
      this.offerForm.patchValue({
        precio_valid: 0,
        precio_valid2: 0,
        precio_oferta: 0
      });
    }
  }

  check_stock() {
    if (this.inputStock.value <= 0) {
      this.offerForm.patchValue({
        stock_valid: null
      });
    } else {
      this.offerForm.patchValue({
        stock_valid: 0
      });
    }
  }

  close() {
    this.pesos = false;
    this.offerForm.patchValue({
      precio_inicial: '',
      precio_final: '',
      oferta: 'false',
      porciento: null
    });
  }

  async eraseToast() {
    const toast = await this.toastController.create({
      message: 'Producto Eliminado!',
      duration: 1000,
      position: 'bottom',
      cssClass: 'toast_connection_off'
    });
    toast.present();
  }

  async editToast() {
    const toast = await this.toastController.create({
      message: 'Publicación Modificada!',
      duration: 1000,
      position: 'bottom',
      cssClass: 'toast_connection'
    });
    toast.present();
  }

  // !DELETE
  async eliminar() {
    this.status = 'loading';
    this.productoService.eliminarOffer(this.producto).subscribe(response => {

      if (response) {
        this.router.navigateByUrl('publicaciones-list');

        this.eraseToast();
      }

    });
  }

  getOffer(id) {

    this.status = 'loading';

    this.productoService.getSale(id).subscribe(async response => {
      console.log(response.producto)
      if (response.ok) {

        this.producto = response.producto;


        this.offerForm.patchValue({
          _id: response.producto._id,

          nombre: response.producto.nombre,
          img: response.producto.img,
          img_2: response.producto.img_2,
          img_3: response.producto.img_3,
          img_4: response.producto.img_4,
          img_5: response.producto.img_5,
          img_6: response.producto.img_6,
          img_7: response.producto.img_7,
          img_8: response.producto.img_8,
          img_9: response.producto.img_9,
          img_10: response.producto.img_10,
          descripcion: response.producto.descripcion,
          moneda: response.producto.moneda,
          precio_final: response.producto.precio_final,
          stock: response.producto.stock,
          costo_financiero: response.producto.costo_financiero,
          costo_producto: response.producto.costo_producto,
          moneda_envio: response.producto.moneda_envio,
          costo_envio: response.producto.costo_envio,
          costo_total: response.producto.costo_total,
          margen: response.producto.margen,
          categoria: response.producto.categoria,
          notas: response.producto.notas,
          etiquetas: response.producto.etiquetas,

        });

        this.stock = response.producto.stock;



        if (!this.offerForm.get('stock').value) {
          this.offerForm.patchValue({
            stock: ''
          });
        }

        if (this.offerForm.get('stock').value > 0) {
          this.offerForm.patchValue({
            stock_valid: 0
          });

          setTimeout(() => {
            this.check_stock();
          }, 500);
        }


        this.status = 'ok';

      } else {
        this.status = 'error';
      }

    },
      error => {
        this.status = 'error';
      }
    );
  }



  // DELETE
  async delete() {
    const alert = await this.alertController.create({
      header: 'Borrar Publicación!',
      message: 'Está seguro?, no podrá volver a recuperarla.',
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
            this.eliminar();
          }
        }
      ]
    });

    await alert.present();
  }


  // Modal img
  async openModalImg() {
    const modal = await this.modalController.create({
      component: ModalImagePage,
      componentProps: {
        lunch: this.image
      }
    });
    modal.onWillDismiss().then(dataReturned => {



      if (dataReturned.data) {
        this.offerForm.patchValue({
          img: dataReturned.data,
        });

        // croppedImage Obtiene imagen de modal
        this.croppedImage = dataReturned.data;


        this.updateImg();
      }

    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
    });
  }

  // ! APP IMAGE
  pickImage() {
    this.openModalImg();
  }



  showCroppedImage(ImagePath) {
    this.isLoading = true;
    const copyPath = ImagePath;
    const splitPath = copyPath.split('/');
    const imageName = splitPath[splitPath.length - 1];
    const filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(async base64 => {
      this.croppedImagepath = base64;

      this.isLoading = false;
      return fetch(this.croppedImagepath).then((_data) => {
        return _data.blob();
      }).then(async (_blob) => {
        this.photoSelected = this.croppedImagepath;

        this.croppedImage = _blob;

        this.offerForm.patchValue({
          img: imageName,
        });

        this.updateImg();
      });

    }, error => {
      alert('Error al mostrar la impagen' + error);
      this.isLoading = false;
    });
  }

  goToT() {
    this.router.navigateByUrl('transfer/' + this.commerce);

    const array = {
      id: this.route.snapshot.params['id'],
      tipo: 'edit'
    };

    this.storage.set('new_transf', array);
  }

  scrollTo() {
    this.content.scrollToPoint(0, 580, 1000);
  }



  checkBox() {
    const pays = [];

    if (this.offerForm.get('check_e').value === true) {
      pays.push('efectivo');

    }

    if (this.offerForm.get('check_t').value === true) {
      pays.push('transferencia');
    }

    if (this.offerForm.get('check_m').value === true) {
      pays.push('mercadopago');

      if (!this.offerForm.get('link_mp').value) {
        this.offerForm.patchValue({
          valid_mp: null,
        });
        setTimeout(() => {
          this.input_mp.setFocus();
        }, 300);
      } else {
        this.offerForm.patchValue({
          valid_mp: ['ok'],
        });
      }
    } else {
      this.offerForm.patchValue({
        valid_mp: ['ok'],
      });
    }

    if (this.offerForm.get('check_m').value === false) {
      this.offerForm.patchValue({
        link_mp: ''
      });

    }

    this.offerForm.patchValue({
      pagos: pays
    });
  }

  checkBoxEntrega() {
    const sends = [];

    if (this.offerForm.get('check_local').value === true) {
      sends.push('comercio');

    }

    if (this.offerForm.get('check_delivery').value === true) {
      sends.push('delivery');
    }

    if (this.offerForm.get('check_envio').value === true) {
      sends.push('envio');

    }


    this.offerForm.patchValue({
      entrega: sends
    });
  }

  // UPDATE
  updateOfferNoImage() {
    this.presentLoading('Modificando datos...').then((value) => {
      const pays = [];

      if (this.offerForm.get('check_e').value === true) {
        pays.push('efectivo');

      }

      if (this.offerForm.get('check_t').value === true) {
        pays.push('transferencia');

        this.offerForm.patchValue({
          transfer: this.id_transfer
        });

      }

      if (this.offerForm.get('check_m').value === true) {
        pays.push('mercadopago');

      }

      this.offerForm.patchValue({
        pagos: pays
      });



      // ! Entrega
      const sends = [];

      if (this.offerForm.get('check_local').value === true) {
        sends.push('comercio');

      }

      if (this.offerForm.get('check_delivery').value === true) {
        sends.push('delivery');
      }

      if (this.offerForm.get('check_envio').value === true) {
        sends.push('envio');

      }


      this.offerForm.patchValue({
        entrega: sends
      });



      this.productoService.updateOfferNoPhoto(this.offerForm.value).subscribe(async itemsLoad => {
        if (itemsLoad) {
          this.router.navigateByUrl('publicaciones-list');
          this.editToast();
          await this.loading.dismiss();
        } else {
          await this.loading.dismiss();
        }
      });

    });
  }

  updateImg() {
    this.presentLoading('Modificando imágen...').then((value) => {
      this.productoService
        .updateOffer(this.offerForm.value, this.croppedImage)
        .subscribe(itemsLoad => {
          if (itemsLoad) {
            this.uiService.toasAddCart('imágen cambiada');
            this.loading.dismiss();

            this.loadPage();
          }
        });
    });
  }


  // ! admin
  // Status
  statusCommerce() {
    if (this.offerForm.get('status').value === 'false') {
      this.offerForm.patchValue({
        status: 'true',
      });
    }
    if (this.offerForm.get('status').value === 'true') {
      this.offerForm.patchValue({
        status: 'false',
      });
    }
  }

  // Premium
  premiumCommerce() {
    if (this.offerForm.get('premium').value === 'false') {
      this.offerForm.patchValue({
        premium: 'true',
      });
    }
    if (this.offerForm.get('premium').value === 'true') {
      this.offerForm.patchValue({
        premium: 'false',
      });
    }
  }

  // Categorias
  segmentChanged(event) {

    this.offerForm.patchValue({
      categoria: event.detail.value
    });
  }

  // Preview
  preview() {
    this.preview_cupon = !this.preview_cupon;
    this.content.scrollToTop(1000);

    this.timer = setTimeout(() => {
    }, 1000);
  }

  async presentLoading(msg) {
    this.loading = await this.loadingController.create({
      message: msg
    });
    return await this.loading.present();
  }

}
