import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Commerce, Offer } from '../../../classes/interfaces';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ProductoService } from '../../../services/producto.service';
import { ProductPopComponent } from '../../../components/product-pop/product-pop.component';
import { PopoverController } from '@ionic/angular';
import { NavParamsService } from '../../../services/nav-params.service';

@Component({
  selector: 'app-publicaciones-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage {

  publicaciones: any[];
  habilitado = true;

  commerce: Commerce = {};

  // Busqueda
  searchText: string;

  public today = moment(new Date).format('YYYYMMDD');

  public status = 'loading';
  public status_2 = 'loading';
  public status_3 = 'loading';


  // Evento Principal
  public event: Event;

  constructor(
    private router: Router,
    public storage: Storage,
    private productoService: ProductoService,
    public popoverController: PopoverController,
    public params: NavParamsService,
  ) { }


  ionViewWillEnter() {
    this.recargarms(this.event);
  }

  convertFormat(date) {
    return moment(date).format('YYYYMMDD');
  }

  recargarms(event) {
    this.siguientesms(event, true);
    this.habilitado = true;
    this.publicaciones = [];
  }

  siguientesms(event?, pull: boolean = false) {
    this.status = 'loading';
    this.status_2 = 'loading';
    this.status_3 = 'loading';


    this.productoService.getProducts(pull).subscribe(resp => {

      if (resp && resp.productos && resp.productos.length >= 1) {


        this.publicaciones.push(...resp.productos);


        this.status = 'ok';

        if (event) {
          event.target.complete();
        }

        if (resp.productos.length === 0) {
          this.habilitado = false;
          this.status = 'cero';

          this.commerce.coupons = 'false';

        }

        if (resp.productos.length >= 1) {

          this.commerce.coupons = 'true';

        }

      } else {
        this.status = 'ok';
      }

    });



  }


  goToV() {
    this.router.navigateByUrl('vendedor/' + this.commerce._id);
  }

  goToEtapa(id: string) {
    this.router.navigateByUrl('etapas/' + id);
  }

  addNew() {
    this.router.navigateByUrl('publicacion-add');
  }

  async presentPopover(ev: any, p: any) {

    this.params.SetParam = p;
    const popover = await this.popoverController.create({
      component: ProductPopComponent,
      event: ev,
      translucent: true,
      cssClass: 'pop_product',
    });
    return await popover.present();
  }

}
