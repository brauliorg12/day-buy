import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonSlides, ModalController, Platform } from '@ionic/angular';
import { EventsApp } from '../../services/events.service';
import { ModalGalleryPage } from '../../components/modal-gallery/modal-gallery.page';
import { AutocloseOverlaysService } from '../../services/autoCloseOverlay.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { UsuarioService } from '../../services/usuario.service';
import { UserUpdateService } from '../../services/userupdate.service';
import { ProductoService } from '../../services/producto.service';
import * as moment from 'moment';
import { timer } from 'rxjs';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild('slideshome', { static: true }) slide: IonSlides;

  offers: any[];
  public status = 'loading';
  public status_2 = 'loading';
  public status_3 = 'loading';

  // Boton Top
  btn_top: string;

  // Evento principal
  event: Event;

  slideManyOpts = {
    // autoplay: {
    //   delay: 3500,
    //   disableOnInteraction: true,
    // },
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 0,
    // zoom: {
    //   maxRatio: 5
    // },
    // loop: true,
    direction: 'vertical',
  };


  timeLeft = 60;
  interval;

  slide_position: number;

  // Timmer
  public defaultFrom = '2020-10-03T01:04:43.000';
  public defaultTo = '2020-11-30T08:56:25.275+00:00';
  public deltas: string[];

  public horas: string[];
  public minutos: string[];
  public segundos: string[];



  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;

  // Lottie
  options: AnimationOptions = {
    path: 'assets/icon/clock-animation.json'
  };

  constructor(
    private refreshEvent: EventsApp,
    private modalController: ModalController,
    private autocloseOverlaysService: AutocloseOverlaysService,
    private photoViewer: PhotoViewer,
    private platform: Platform,
    private usuarioService: UsuarioService,
    private userupdateService: UserUpdateService,
    private productoService: ProductoService
  ) {

    // Eliminar Elemento a la vista
    this.refreshEvent.articulo.subscribe(resp => {
      if (resp) {
        const searchId = (element) => element._id === resp._id;

        const indexArralimentos = this.offers.findIndex(searchId);

        this.offers.splice(indexArralimentos, 1);
      }
    })

  }

  ngOnInit() {
    this.eventBtn();

    this.logScrolling(this.event);

    // Timmer
    this.deltas = [];

    // this.parseDates(this.defaultFrom, this.defaultTo);

    this.recargarms(this.event);

  }


  showDate() {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
    return this.seconds;
  }


  showDateHou(end) {
    console.log(end)
    let distance = end - this.now;
    this.day = Math.floor(distance / this._day);
    const hou = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);

    return hou;
  }

  showDateMin(end) {
    let distance = end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    const min = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);

    return min;
  }

  showDateSeg(end) {
    let distance = end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    const seg = Math.floor((distance % this._minute) / this._second);

    return seg;
  }



  slideChanged() {
    this.slide.getActiveIndex().then(index => {
      this.slide_position = index;
      console.log(index);
    });
  }

  // Timmer
  // I parse the given dates and calculate all of the meaningful deltas.
  public parseDates(toValue: string): void {



    let fromMs = Date.parse(new Date().toDateString()) - Date.parse(new Date().toDateString());
    let toMs = Date.parse(toValue) - Date.parse(new Date().toDateString());
    // var toMs = Date.parse('2020-11-30T04:29:29.275+00:00');
    this.interval = setInterval(() => {

      toMs = toMs - 1000;

      // Ensure that we have a valid date-range to work with.
      if (isNaN(fromMs) || isNaN(toMs) || (fromMs > toMs)) {

        console.group('Invalid date range - no calculations to perform.');
        console.log('From:', fromMs);
        console.log('To:', toMs);
        console.groupEnd();
        return;

      }


      var deltaSeconds = ((toMs - fromMs) / 1000);

      this.horas = [
        this.format(this.calculateHoursMinutesSeconds(deltaSeconds)),
      ];

      this.minutos = [
        this.formatM(this.calculateMinutesSeconds(deltaSeconds)),
      ];

      this.segundos = [
        this.formatS(this.calculateSeconds(deltaSeconds)),
      ];

    }, 1000);


    // --
    // NOTE: Always using the first value, even if "0 Seconds".
    this.deltas = this.deltas.filter(
      (value, index) => {

        return (!index || !value.startsWith('0'));

      }
    );

    this.horas = this.deltas.filter(
      (value, index) => {

        return (!index || !value.startsWith('0'));

      }
    );

    this.minutos = this.deltas.filter(
      (value, index) => {

        return (!index || !value.startsWith('0'));

      }
    );

    this.segundos = this.deltas.filter(
      (value, index) => {

        return (!index || !value.startsWith('0'));

      }
    );

  }







  convertFormat(date) {
    return moment(date).format('YYYYMMDD');
  }

  recargarms(event) {
    this.siguientesms(event, true);
    this.offers = [];
  }

  async updateUser() {
    this.usuarioService.validaToken().then(async response => {
      if (response) {
        await this.userupdateService.updateUser();
      }
    });
  }

  siguientesms(event?, pull: boolean = false) {
    this.status = 'loading';
    this.status_2 = 'loading';
    this.status_3 = 'loading';


    this.productoService.getProductsAll(pull).subscribe((resp: any) => {

      console.log(resp)
      if (resp.productos.length >= 1) {


        // this.offers.push(...resp.productos);
        // for (let i = 0; i < resp.productos.length; i++) {
        for (let item of resp.productos) {

          this.clock = this.source.subscribe(t => {
            let distance = item.fecha_fin_etapa - this.now;
            this.day = Math.floor(distance / this._day);
            this.hours = Math.floor((distance % this._day) / this._hour);
            this.minutes = Math.floor((distance % this._hour) / this._minute);
            this.seconds = Math.floor((distance % this._minute) / this._second);
          });

          // this.clock = this.source.subscribe(t => {
          this.now = new Date();
          this.end = item.fecha_fin_etapa;
          // console.log(this.now, '  ',  this.end)
          this.showDate();



          const array = {
            _id: item._id,
            descuento: item.descuento,
            precio_final: item.producto.precio_final,
            estado: true,
            fecha: item.fecha,
            fecha_fin_etapa: item.fecha_fin_etapa,
            fecha_ini_etapa: item.fecha_ini_etapa,
            stock: item.stock + item.producto.stock,
            img: item.producto.img,
            nombre: item.producto.nombre,
            descripcion: item.producto.descripcion,
            days: this.day,
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
          };
          this.offers.push(array);


        }

        console.log(this.offers)


        this.status = 'ok';

        if (event) {
          event.target.complete();
        }

        if (resp.productos.length === 0) {
          this.status = 'cero';
        }

        this.slideChanged();

      } else {
        this.status = 'cero';

        if (event) {
          event.target.complete();
        }

        this.slideChanged();
      }

    });



  }

  // I calculate the delta breakdown using Hour as the largest unit.
  private calculateHoursMinutesSeconds(delta: number): number[] {
    var hours = Math.floor(delta / 60 / 60);
    return ([hours]);
  }
  // I calculate the delta breakdown using Minute as the largest unit.
  private calculateMinutesSeconds(delta: number): number[] {
    var hours = Math.floor(delta / 3600);
    var minutes = Math.floor((delta - (hours * 3600)) / 60);
    return ([minutes]);
  }
  // I calculate the delta breakdown using Second as the largest unit.
  private calculateSeconds(delta: number): number[] {
    var minutes = Math.floor(delta / 60);

    var hours = Math.floor(delta / 3600);
    var minutes = Math.floor((delta - (hours * 3600)) / 60);
    var seconds = delta - (hours * 3600) - (minutes * 60);

    var remainder = (delta - (minutes * 60) - 1000);
    return ([seconds]);
  }
  // I format the set of calculated delta-values as a human readable string.
  private format(values: number[]): string {

    var parts: string[] = [];

    // Since the values are calculated largest to smallest, let's iterate over them
    // backwards so that we know which values line up with which units.
    for (var value of values.slice().reverse()) {

      parts.unshift(value.toLocaleString());

    }

    return (parts.join(','));

  }
  // I format the set of calculated delta-values as a human readable string.
  private formatM(values: number[]): string {
    var parts: string[] = [];

    // Since the values are calculated largest to smallest, let's iterate over them
    // backwards so that we know which values line up with which units.
    for (var value of values.slice().reverse()) {

      parts.unshift(value.toLocaleString());

    }
    return (parts.join(''));

  }
  // I format the set of calculated delta-values as a human readable string.
  private formatS(values: number[]): string {
    var parts: string[] = [];

    // Since the values are calculated largest to smallest, let's iterate over them
    // backwards so that we know which values line up with which units.
    for (var value of values.slice().reverse()) {

      parts.unshift(value.toLocaleString());

    }
    return (parts.join(','));

  }


  // Boton top mostrar ocultar
  async logScrolling(event: Event) {
    await this.content.getScrollElement().then(res => {

      if (res.scrollTop === 0) {
        this.btn_top = 'top';
      }
      if (res.scrollTop > 0) {
        this.btn_top = 'scroll';
      }
    });
  }

  eventBtn() {
    this.refreshEvent.homebtn.subscribe(async value => {

      await this.autocloseOverlaysService.trigger().then(async resp => {
        if (!resp) {
          await navigator['app'].exitApp();
        }
      });


      // if (this.btn_top === 'top') {
      //   // tslint:disable-next-line: no-string-literal
      //   await this.back();
      // } else {
      //   this.content.scrollToTop(1000);
      // }

    });
  }

  // ! Volver y cerrar popus
  async back() {
    await this.autocloseOverlaysService.trigger().then(async resp => {
      if (!resp) {
        await navigator['app'].exitApp();
      }
    });
  }

  // Modal
  async viewPhoto(image: any) {

    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        this.photoViewer.show(image);
      });

    } else {

      const modal = await this.modalController.create({
        component: ModalGalleryPage,
        componentProps: {
          img: image
        }
      });
      modal.onWillDismiss().then(dataReturned => {

      });
      return await modal.present().then(_ => {
      });
    }
  }


}
