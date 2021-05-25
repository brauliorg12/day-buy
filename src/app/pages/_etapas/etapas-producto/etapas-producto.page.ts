import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { EtapaService } from '../../../services/etapas.service';


@Component({
  selector: 'app-etapas-producto',
  templateUrl: './etapas-producto.page.html',
  styleUrls: ['./etapas-producto.page.scss'],

})
export class EtapasPage {

  loading: any;
  producto: any = {};
  status = '';
  status_etapas = 'loading';
  etapas: any[];

  public productoForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private etapaService: EtapaService,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) { }

  ionViewWillEnter() {
    this.loadPage();
  }

  loadPage() {
    const idCompany = this.route.snapshot.params['id'];
    this.obtenerProducto(idCompany);
  }

  obtenerProducto(id: any) {
    this.productoService.getSale(id).subscribe(async postLoad2 => {

      if (postLoad2.ok) {
        this.producto = postLoad2.producto;

        this.loadEtapas(postLoad2.producto._id);
        this.status = 'ok';
      }
      if (!postLoad2.producto) {
        this.status = 'cero';
      }

    });
  }


  loadEtapas(id: string) {
    this.status_etapas = 'loading';

    this.etapaService.getEtapa(id)
      .subscribe(async (itemsLoad: any) => {
        console.log(itemsLoad)
        if (itemsLoad.ok === true) {
          this.etapas = itemsLoad.etapas;
          this.status_etapas = 'ok';

          if (itemsLoad.etapas.length === 0) {
            this.status_etapas = 'none';
          }
        }

      });
  }

  addNew(id: string) {
    this.router.navigateByUrl('etapa-add/' + id);
  }



  async presentLoading(msg) {
    this.loading = await this.loadingController.create({
      message: msg
    });
    return await this.loading.present();
  }

  goToLink(url: string) {
    window.open(url, '_system');
  }

}
