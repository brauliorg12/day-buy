import { Component, OnInit } from '@angular/core';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
// import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-product-pop',
  templateUrl: './product-pop.component.html',
  styleUrls: ['./product-pop.component.scss'],
})
export class ProductPopComponent implements OnInit {
  product: any;
  countOffers = 0;

  constructor(
    private params: NavParamsService,
    private router: Router,
    public popoverController: PopoverController,
    // private dbService: DbService
  ) { }


  newOfferPrice() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        p: this.product._id
      }
    };

    this.popoverController.dismiss();
    this.router.navigate(['new-offer-price'], navigationExtras);
  }


  newOfferGratis() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        p: this.product.product_ref._id
      }
    };

    this.popoverController.dismiss();
    this.router.navigate(['new-offer-gratis'], navigationExtras);
  }

  editar() {
    this.router.navigateByUrl('publicacion-edit/' + this.product._id);
    this.popoverController.dismiss();
  }

  newOfferDescuento() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        p: this.product.product_ref._id
      }
    };

    this.popoverController.dismiss();
    this.router.navigate(['new-offer-descuento'], navigationExtras);
  }

  ngOnInit() {
    this.product = this.params.GetParam;

    // this.dbService.getTotalOfertasProducto(this.product.product_ref._id)
    //   .toPromise()
    //   .then((data: any) => {
    //     if (data.ok) {
    //       this.countOffers = data.total;
    //     }
    //   })

  }

}
