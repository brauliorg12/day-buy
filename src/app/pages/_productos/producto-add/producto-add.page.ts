import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ModalController, IonContent, LoadingController,
  Platform, AlertController, IonInput,
  IonDatetime,
  IonToggle
} from '@ionic/angular';
import { ProductoService } from '../../../services/producto.service';
import { Commerce, Usuario } from '../../../classes/interfaces';
import { PopoverController, ActionSheetController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import * as moment from 'moment';
import { ModalImagePage } from '../../../components/modal-image/modal-image.page';
// import { ModalEjemplosCuponPage } from '../../_modals/modal-ejemplos-cupon/modal-ejemplos-cupon.page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
// import { BranchIo } from '@ionic-native/branch-io/ngx';
// import { productoService } from '../../../services/offers.service';
import { EventsApp } from '../../../services/events.service';
import { UiServiceService } from '../../../services/ui-service.service';
import { Storage } from '@ionic/storage';
import { CropOptions, Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
// import { TransferenciaService } from '../../../services/transfer_b.service';
// import { ModalTransfersPage } from '../../_transfers/modal-transfers/modal-transfers.page';


@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.page.html',
  styleUrls: ['./producto-add.page.scss'],
})
export class ProductoAddPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  @ViewChild('input_desc', { static: false }) inputDesc: IonInput;

  @ViewChild('input_toggle', { static: false }) inputToggle: IonToggle;

  @ViewChild('input_promo', { static: false }) inputPromo: IonInput;

  @ViewChild('input_precio', { static: false }) inputPrecio: IonInput;

  @ViewChild('input_precio_con', { static: false }) inputPrecioO: IonInput;

  @ViewChild('input_fecha', { static: false }) inputFecha: IonDatetime;

  @ViewChild('input_mp', { static: false }) input_mp: IonInput;

  @ViewChild('input_t', { static: false }) input_t: IonInput;

  @ViewChild('input_s', { static: false }) inputStock: IonInput;


  // Declare
  commerce: Commerce = {};
  usuario: Usuario = {};

  foto: File = null;

  photoSelected: string | ArrayBuffer;
  croppedImage: any = '';
  // Modal img
  public image = {
    croppedImage: '',
  };

  loading: any;

  public offerForm: FormGroup;

  com_id: Object;

  public today = moment(new Date).format('YYYY-MM-DD');

  public status = 'loading';

  promo = '';
  porciento = '';
  fecha_c = '';
  com = '';
  stock = 1;

  public examples = true;

  // Pesos
  public pesos = false;

  // Caducidad
  public fecha: boolean;
  public fecha_no: boolean;

  // optional fields
  analytics = {
    channel: 'facebook',
    feature: 'onboarding',
    campaign: 'content 123 launch',
    stage: 'new user',
    tags: ['one', 'two', 'three']
  };

  // optional fields
  properties = {
    $desktop_url: 'https://codiapp.com.ar',
    $android_url: 'https://play.google.com/store/apps/details?id=com.codi.cubanova',
    $ios_url: 'https://codiapp.com.ar',
    $ipad_url: 'https://codiapp.com.ar',
    $deeplink_path: '',
    $match_duration: 2000,
    custom_string: 'data',
    custom_integer: Date.now(),
    custom_boolean: true
  };

  PrimerDato = {
    canonicalIdentifier: 'producto/123',
    canonicalUrl: 'https://codiapp.com.ar',
    title: 'CODI',
    contentDescription: 'Content 123 Description ' + Date.now(),
    contentImageUrl: 'http://vps-1663776-x.dattaweb.com/uploads/codiapp.png',
    price: 12.12,
    currency: 'GBD',
    contentIndexingMode: 'private',
    contentMetadata: {
      custom: 'data',
      testing: 123,
      this_is: true
    }
  };

  branchUniversalObj = null;

  // Cats
  customAlertOptionsBussines: any = {
    header: 'Categorías',
    subHeader: 'Seleccione una o más categorías para su publicación.',
    translucent: true
  };

  cats: string[] = [
    'Hogar',
    'Salud y Belleza',
    'Estilo de vida',
    'Otros'
  ];

  // Vista avanzada
  avanzada = false;

  cropOptions: CropOptions = {
    quality: 50
  };

  croppedImagepath = '';
  isLoading = false;


  // Estado Transfer
  public status_2 = 'loading';

  // transfers: any = [];

  id_transfer: any;

  // Modal User
  public transfers = {
    id: '',
  };

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private crop: Crop,
    private file: File,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    public formBuilder: FormBuilder,
    private uiService: UiServiceService,
    // private transferService: TransferenciaService,
    public popoverController: PopoverController,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private http: HttpClient,
    // private oneSignal: OneSignal,
    public alertController: AlertController,
    //private branch: BranchIo,
    private refreshEvent: EventsApp
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





      promo: [''],
      porciento: null,
      visitas: [0],
      shares: [0],
      premium: ['false'],
      status: ['true'],
      precio_valid: [''], // Para que no este vacio oferta precio
      precio_valid2: [''], // Para que no este vacio oferta precio
      precio_oferta: [''], // Para que no este vacio oferta precio
      precio_inicial: [''],
      oferta: ['false'],
      tipo: ['producto'],
      condicion: ['nuevo'],
      garantia: ['no'],
      entrega: [''],
      pagos: [''],
      transfer: [null],
      link_mp: [''],
      // ! Pagos
      check_e: [false],
      check_t: [false],
      check_m: [false],
      valid_transfer: [''],
      valid_mp: [''],
      // ! Entregas
      check_local: [false],
      check_delivery: [false],
      check_envio: [false],

      tags: [''],

      commerce_id: [''],
      location: [''],
      province: [''],
    });

    // Refresh image preview
    this.refreshEvent.currentData.subscribe(value => {
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.croppedImage);
    });

    // Refresh transfer
    this.refreshEvent.nuevoEventPub.subscribe((value: any) => {
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


  async presentToast() {
    this.uiService.toastGeneral('Publicación creada correctamente');
  }

  async pub_incompleta() {
    this.uiService.alertaInformativa('Faltan datos, volvé a revisar el formulario. (los campos con asterísco (*) son obligatorios)');
  }

  ionViewWillEnter() {
    this.status = 'ok';
  }


  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();

  }

  cambiarVista() {
    this.avanzada = !this.avanzada;
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

  // File
  fileUpl(files: FileList) {
    const reader = new FileReader();
    reader.onload = e => this.photoSelected = reader.result;
    reader.readAsDataURL(files[0]);
    this.croppedImage = files.item(0);
    this.offerForm.patchValue({
      img: files.item(0)
    });
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

  transfCheck() {
    this.offerForm.patchValue({
      valid_transfer: null,
    });

  }

  // BACK
  async back() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: '¿Está seguro?, Se perderán todos los datos agregados.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmar',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('/publicaciones-list');

            this.offerForm.reset();
          }
        }
      ]
    });

    await alert.present();
  }

  convertFormat(date) {
    return moment(date).format('YYYYMMDD');
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


  // Caducidad
  fecha_cupon_Si() {
    this.fecha = true;
    this.fecha_no = false;

    setTimeout(() => {
      this.inputFecha.open();
    }, 500);
  }
  fecha_cupon_No() {
    this.offerForm.patchValue({
      fecha_fin: ''
    });

    this.fecha = false;
    this.fecha_no = true;
  }


  goToT() {
    this.router.navigateByUrl('transfer/' + this.commerce._id);

    const array = {
      id: this.route.snapshot.params['id'],
      tipo: 'new'
    };

    this.storage.set('new_transf', array);
  }

  goToMP() {
    window.open('https://www.mercadopago.com.ar/tools/create', '_system');
  }


  scrollTo() {
    this.content.scrollToPoint(0, 580, 1000);
  }

  cropImage(imgPath) {
    this.crop.crop(imgPath, this.cropOptions)
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0]);
        },
        error => {
          // alert('Error cropping image' + error);
        }
      );
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
      });

    }, error => {
      alert('Error al mostrar la impagen' + error);
      this.isLoading = false;
    });
  }


  // ! CREATE
  async createOffer() {
    this.presentLoading('Creando Publicación...');


    if (this.pesos === true) {
      const peso = '$';

      this.offerForm.patchValue({
        precio_inicial: this.offerForm.get('precio_inicial').value,
        precio_final: this.offerForm.get('precio_final').value,
        oferta: 'true'
      });
    }


    const pays = [];

    if (this.offerForm.get('check_e').value === true) {
      pays.push('efectivo');

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



    await this.productoService
      .createProducto(this.offerForm.value, this.croppedImage)
      .then(
        async res => {
          console.log(res)
          if (res.producto) {


            await this.loading.dismiss();

            await this.storage.set('addprod', res.producto._id);

            setTimeout(() => {
              this.router.navigateByUrl('/publicaciones-list');
              this.offerForm.reset();
            }, 800);

            await this.presentToast();
          }

        },
      );
    return false;
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

  // Metodos de pago
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


  // Formas de entrega
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

  async presentLoading(msg) {
    this.loading = await this.loadingController.create({
      message: msg
    });
    return await this.loading.present();
  }

}
