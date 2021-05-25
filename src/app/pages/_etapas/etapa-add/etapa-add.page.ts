import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IonContent, LoadingController,
  AlertController, IonInput,
  IonDatetime,
  IonToggle
} from '@ionic/angular';
import { ProductoService } from '../../../services/producto.service';
import { Commerce, Usuario } from '../../../classes/interfaces';
import { PopoverController, ActionSheetController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import * as moment from 'moment';
import { EventsApp } from '../../../services/events.service';
import { UiServiceService } from '../../../services/ui-service.service';
import { Storage } from '@ionic/storage';
import { EtapaService } from '../../../services/etapas.service';


@Component({
  selector: 'app-etapa-add',
  templateUrl: './etapa-add.page.html',
  styleUrls: ['./etapa-add.page.scss'],
})
export class EtapaAddPage implements OnInit {

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

  loading: any;

  public etapaForm: FormGroup;

  public today = moment(new Date).format('YYYY-MM-DD');

  public status = 'loading';

  stock_variable: any = 1;
  descuento_variable: any = 1;
  status_variable = false;

  public selectedMoments = [
    new Date(),
    new Date()
  ];

  public product_id: '';

  constructor(
    private productoService: ProductoService,
    private etapaService: EtapaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    public actionSheetController: ActionSheetController,
    public formBuilder: FormBuilder,
    private uiService: UiServiceService,
    public popoverController: PopoverController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private refreshEvent: EventsApp
  ) {
    this.etapaForm = this.formBuilder.group({
      fecha_ini_etapa: ['', Validators.required],
      fecha_fin_etapa: [''],
      stock: [1, Validators.required],
      descuento: [1, Validators.required],
      estado: [true, Validators.required],
      notas: [''],
      producto: ['', Validators.required],
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

    this.etapaForm.patchValue({
      producto: this.route.snapshot.params['id']
    });
  }

  onChange($event) {
    console.log($event);
  }

  check_precio_oferta() {
    if (this.inputPromo.value <= 20) {
      this.etapaForm.patchValue({
        precio_oferta: null
      });
    } else {
      this.etapaForm.patchValue({
        precio_oferta: 0,
        precio_valid: 0
      });
    }
  }

  check_precio_con_oferta() {
    if (this.inputPrecioO.value <= 20) {
      this.etapaForm.patchValue({
        precio_valid2: null
      });
    } else {
      this.etapaForm.patchValue({
        precio_valid2: 0,
        precio_valid: 0
      });
    }
  }


  check_precio() {
    if (this.inputPrecio.value <= 20) {
      this.etapaForm.patchValue({
        precio_valid: null
      });
    } else {
      this.etapaForm.patchValue({
        precio_valid: 0,
        precio_valid2: 0,
        precio_oferta: 0
      });
    }
  }

  check_stock() {
    this.stock_variable = this.inputStock.value;
    if (this.inputStock.value <= 0) {
      this.etapaForm.patchValue({
        stock: null
      });
    } else {
      this.etapaForm.patchValue({
        stock: this.stock_variable,
      });
    }
  }

  check_descuento() {
    this.stock_variable = this.inputDesc.value;
    if (this.inputDesc.value <= 0) {
      this.etapaForm.patchValue({
        descuento_valid: null,
        descuento: null
      });
    } else {
      this.etapaForm.patchValue({
        descuento: this.stock_variable,
        descuento_valid: true
      });
    }
  }

  transfCheck() {
    this.etapaForm.patchValue({
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
            this.router.navigateByUrl('/etapas/' + this.route.snapshot.params['id']);

            this.etapaForm.reset();
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
    this.stock_variable++;

    this.etapaForm.patchValue({
      stock: this.stock_variable
    });

  }

  decrement() {
    this.stock_variable--;

    this.etapaForm.patchValue({
      stock: this.stock_variable
    });
  }

  // + - count
  incrementD() {
    this.descuento_variable++;

    this.etapaForm.patchValue({
      descuento: this.descuento_variable
    });

  }

  decrementD() {
    this.descuento_variable--;

    this.etapaForm.patchValue({
      descuento: this.descuento_variable
    });
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

  setFecha() {
    if (this.etapaForm.get('fecha_ini_etapa').value) {
      this.etapaForm.patchValue({
        fecha_fin_etapa: this.etapaForm.get('fecha_ini_etapa').value[1].toString(),
      });
    }


    console.log('fechaa')
  }

  // ! CREATE
  async createEtapa() {
    this.presentLoading('Creando Publicación...');
    console.log('componente:       ', this.etapaForm.value)
    this.etapaService.createEtapa(this.etapaForm.value).then(
      async res => {
        console.log(res)
        if (res.etapa) {

          setTimeout(() => {
            this.loading.dismiss();
            this.router.navigateByUrl('/etapas/' + res.etapa.producto);
            this.etapaForm.reset();
          }, 300);

          await this.presentToast();
        }

      },
    );
    return false;


  }


  // Metodos de pago
  checkBox() {
    const pays = [];

    if (this.etapaForm.get('check_e').value === true) {
      pays.push('efectivo');

    }

    if (this.etapaForm.get('check_t').value === true) {
      pays.push('transferencia');
    }

    if (this.etapaForm.get('check_m').value === true) {
      pays.push('mercadopago');

      if (!this.etapaForm.get('link_mp').value) {
        this.etapaForm.patchValue({
          valid_mp: null,
        });
        setTimeout(() => {
          this.input_mp.setFocus();
        }, 300);
      } else {
        this.etapaForm.patchValue({
          valid_mp: ['ok'],
        });
      }
    } else {
      this.etapaForm.patchValue({
        valid_mp: ['ok'],
      });
    }

    if (this.etapaForm.get('check_m').value === false) {
      this.etapaForm.patchValue({
        link_mp: ''
      });

    }

    this.etapaForm.patchValue({
      pagos: pays
    });
  }


  // Formas de entrega
  checkBoxEntrega() {
    const sends = [];

    if (this.etapaForm.get('check_local').value === true) {
      sends.push('comercio');

    }

    if (this.etapaForm.get('check_delivery').value === true) {
      sends.push('delivery');
    }

    if (this.etapaForm.get('check_envio').value === true) {
      sends.push('envio');

    }


    this.etapaForm.patchValue({
      entrega: sends
    });
  }

  // Aditional
  statusCheck() {
    if (this.inputToggle.checked) {
      this.status_variable = true;
      this.etapaForm.patchValue({
        status: true
      });

    } else {
      this.status_variable = false;
      this.etapaForm.patchValue({
        status: false
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
