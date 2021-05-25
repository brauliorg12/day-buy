import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

// Busqueda
import { ProductoListPage } from './producto-list.page';
import { ProductFilterPipe } from '../../../pipes/filters.products.pipe';

const routes: Routes = [
  {
    path: '',
    component: ProductoListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductoListPage, ProductFilterPipe]
})
export class ProductoListPageModule { }
