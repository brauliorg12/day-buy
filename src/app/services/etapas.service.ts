import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Commerce, RespuestaCommerce, RespuestaEmergencys, RespuestaFarmacys,
  RespuestaIceCreams, RespuestaTaxis, RespuestaDeliverys, RespuestaUsefuls
} from '../classes/interfaces';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { RespuestaOffers, Offer } from '../classes/interface-profesional';
import { RespuestaProducto } from '../classes/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EtapaService {

  paginaSales = 0;

  images = {};

  nuevoSale = new EventEmitter<Commerce>();


  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }


  getProducts(pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaProducto>(`${URL}/productos/list/?pagina=${this.paginaSales}`, { headers });

  }

  getProductsAll(pull: boolean = false) {

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaProducto>(`${URL}/productos/lista/?pagina=${this.paginaSales}`);

  }

  createProducto(product: any, photo: File): any {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {
      const fd = new FormData();

      fd.append('nombre', product.nombre);
      fd.append('image', photo);
      fd.append('img_2', product.img_2);
      fd.append('img_3', product.img_3);
      fd.append('img_4', product.img_4);
      fd.append('img_5', product.img_5);
      fd.append('img_6', product.img_6);
      fd.append('img_7', product.img_7);
      fd.append('img_8', product.img_8);
      fd.append('img_9', product.img_9);
      fd.append('img_10', product.img_10);
      fd.append('descripcion', product.descripcion);
      fd.append('moneda', product.moneda);
      fd.append('precio_final', product.precio_final);
      fd.append('stock', product.stock);
      fd.append('costo_financiero', product.costo_financiero);
      fd.append('costo_producto', product.costo_producto);
      fd.append('moneda_envio', product.moneda_envio);
      fd.append('costo_envio', product.costo_envio);
      fd.append('estado', product.estado);
      fd.append('costo_total', product.costo_total);
      fd.append('margen', product.margen);
      // Guardar rubro como array en formdata
      if (product.categoria) {
        const arr = product.categoria;
        for (let i = 0; i < arr.length; i++) {
          fd.append('categoria', arr[i]);
        }
      }
      fd.append('notas', product.notas);
      fd.append('etiquetas', product.etiquetas);

      this.http.post(`${URL}/productos`, fd, { headers })
        .subscribe(resp => {

          // this.nuevoOffer.emit(resp['offer']);
          // resolve(true); Como estaba antes
          resolve(resp); // lo cambie para obtener el ID
        });

    });
  }


  getSale(id: string): Observable<any> {

    return this.http.get(`${URL}/productos/` + id);

  }

  getEtapa(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get(`${URL}/etapas/list/` + id, { headers });
  }


  createEtapa(etapa: any): any {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/etapas`, etapa, { headers })
        .subscribe(resp => {

          resolve(resp); // lo cambie para obtener el ID
        });

    });
  }



  getSaleAdm(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });


    return this.http.get(`${URL}/productos/adm/` + id, { headers });

  }

  getOffer(id: string): Observable<any> {

    return this.http.get(`${URL}/offers/` + id);

  }



  getMyCommerce(): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get(`${URL}/productos/commerce`, { headers });

  }


  getCommerceUserMsj(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get(`${URL}/productos/commerceum/` + id, { headers });

  }



  getDeliverys(pull: boolean = false) {

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaDeliverys>(`${URL}/productos/comidas/?pagina=${this.paginaSales}`);

  }


  // ! TOTALES
  getComAdmTotalNP() {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmontotalnp`, { headers });

  }

  // ! borrados
  getComAdmTotalB() {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmontotalb`, { headers });

  }

  getComAdmTotalP() {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmontotalp`, { headers });

  }

  getComAdmTotalU() {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmontotalu`, { headers });

  }

  // Eliminar Descuento
  eliminarOffer(id: any): Observable<Offer> {

    const params = id;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/offers/delete/${id._id}`, params, { headers });
  }

  updateOfferNoPhoto(offer: any): Observable<Offer> {

    const params = offer;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/offers/updated/${offer._id}`, params, { headers });

  }

  updateOffer(offer: any, photo: File): Observable<Offer> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    const fd = new FormData();

    fd.append('commerce_id', offer.commerce_id);
    fd.append('descripcion', offer.descripcion);
    fd.append('promo', offer.promo);
    fd.append('porciento', offer.porciento);
    fd.append('visitas', offer.visitas);
    fd.append('shares', offer.shares);
    fd.append('premium', offer.premium);
    fd.append('status', offer.status);

    fd.append('oferta', offer.oferta);
    fd.append('precio_inicial', offer.precio_inicial);
    fd.append('precio_final', offer.precio_final);

    fd.append('stock', offer.stock);

    fd.append('titulo', offer.titulo);

    fd.append('condicion', offer.condicion);
    fd.append('garantia', offer.garantia);
    fd.append('entrega', offer.entrega);
    fd.append('pagos', offer.pagos);

    fd.append('tags', offer.tags);


    // Guardar rubro como array en formdata
    if (offer.categoria) {
      const arr = offer.categoria;
      for (let i = 0; i < arr.length; i++) {
        fd.append('categoria', arr[i]);
      }
    }

    fd.append('img_2', offer.img_2);
    fd.append('img_3', offer.img_3);
    fd.append('img_4', offer.img_4);
    fd.append('img_5', offer.img_5);

    fd.append('image', photo);

    if (offer.fecha_fin) {
      fd.append('fecha_fin', offer.fecha_fin);
    }

    return this.http.put(`${URL}/offers/update/${offer._id}`, fd, { headers });

  }

  crearOffer(offer): any {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/offers`, offer, { headers })
        .subscribe(resp => {

          // this.nuevoOffer.emit(resp['offer']);
          // resolve(true); Como estaba antes
          resolve(resp); // lo cambie para obtener el ID
        });
    });



  }

  getMyOffers(id: string) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaOffers>(`${URL}/offers/mis_descuentos/` + id, { headers });

  }

  // ! Total HOY
  getComAdmTotalHoy() {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmontotalt`, { headers });

  }


  getComAdmTotalH() {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmontotalh`, { headers });

  }

  // Con Usuarios
  getComAdmSoloU(page) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmon/?pagina=${page}`, { headers });

  }

  getComAdmSoloUs(pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmon/?pagina=${this.paginaSales}`, { headers });

  }

  getComAdmSoloUsEmails() {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmonemail`, { headers });

  }



  // No Publicados
  getComAdmSoloOff(pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmoff/?pagina=${this.paginaSales}`, { headers });

  }


  // Home
  getComAdmSoloHome(pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/comadmhome/?pagina=${this.paginaSales}`, { headers });

  }

  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN
  getComAdm(page) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadm/?pagina=${page}`, { headers });

  }

  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN whats
  getComAdmWhats(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmwhats/?pagina=${this.paginaSales}`, { headers });

  }


  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN views
  getComAdmViews(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmviews/?pagina=${this.paginaSales}`, { headers });

  }


  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN tel
  getComAdmTel(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmtel/?pagina=${this.paginaSales}`, { headers });

  }


  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN cell
  getComAdmCell(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmcell/?pagina=${this.paginaSales}`, { headers });

  }



  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN SOLO U
  getComAdmWhatSoloU(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmwhatssu/?pagina=${this.paginaSales}`, { headers });

  }


  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN views SOLO U
  getComAdmViewsSoloU(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmviewssu/?pagina=${this.paginaSales}`, { headers });

  }


  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN tel SOLO U
  getComAdmTelSoloU(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmtelsu/?pagina=${this.paginaSales}`, { headers });

  }


  // Publicados
  // !Obtener COMERCIOS de usuarios para ADMIN cell SOLO U
  getComAdmCellSoloU(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmcellsu/?pagina=${this.paginaSales}`, { headers });

  }


  getComAdmPage(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadm/?pagina=${this.paginaSales}`, { headers });

  }


  getComAdmPageBorrados(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadborrados/?pagina=${this.paginaSales}`, { headers });

  }

  // Home
  getHomeAdm(page) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmhome/?pagina=${page}`, { headers });

  }

  getHomeAdmPage(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmhome/?pagina=${this.paginaSales}`, { headers });

  }


  getComAdmSoloOfft(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    return this.http.get<RespuestaCommerce>(`${URL}/productos/cadmoff/?pagina=${this.paginaSales}`, { headers });

  }


  getPremiums(city: any, provincia: any) {

    return this.http.get<RespuestaCommerce>(`${URL}/comercios/premium/${city}/${provincia}`);

  }

  getPremiumsMapa(city: any, provincia: any) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/comercios/premiummap/${city}/${provincia}`, { headers });

  }

  getUtilesMapa(city: any, provincia: any) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/comercios/utilesmap/${city}/${provincia}`, { headers });

  }


  getPostresMapa(city: any, provincia: any) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/comercios/postresmap/${city}/${provincia}`, { headers });

  }


  getComidasMapa(city: any, provincia: any) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/comercios/comidasmap/${city}/${provincia}`, { headers });

  }


  getKioskosMapa(city: any, provincia: any) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<RespuestaCommerce>(`${URL}/comercios/kioskosmap/${city}/${provincia}`, { headers });

  }


  getmySales() {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });


    return this.http.get<any>(`${URL}/productos/productos/?pagina=${this.paginaSales}`, { headers });

  }

  getCommercesRubros(busqueda: string, pull: boolean = false) {

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/search/rubros/` + busqueda + `/?pagina=${this.paginaSales}`);

  }

  // ! ambos buscar y filtro
  getCommercesAmbos(city: any, provincia: any, busqueda: string, filtro: string, pull: boolean = false) {

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/buscador/two/${city}/${provincia}/${busqueda}/${filtro}/?pagina=${this.paginaSales}`);

  }


  // ! ambos buscar y filtro
  getCommercesAmbosP(city: any, provincia: any, busqueda: string, filtro: string) {

    return this.http.get<RespuestaCommerce>(`${URL}/buscador/twop/${city}/${provincia}/${busqueda}/${filtro}`);

  }


  getCommercesRubrosPremium(busqueda: string) {

    return this.http.get<RespuestaCommerce>(`${URL}/search/rubrosp/` + busqueda);

  }


  getCommercesEstado(busqueda: string, pull: boolean = false) {

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/search/estado/` + busqueda + `?pagina=${this.paginaSales}`);

  }


  // Buscador ADM
  searchCommercesAdm(busqueda: string, pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/search/comerciosadm/` + busqueda + `?pagina=${this.paginaSales}`, { headers });

  }


  searchCommercesAdmSU(busqueda: string, pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/search/comerciosadmsu/` + busqueda + `?pagina=${this.paginaSales}`, { headers });

  }


  searchCommercesAdmNP(busqueda: string, pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/search/comerciosadmnp/` + busqueda + `?pagina=${this.paginaSales}`, { headers });

  }


  searchCommercesAdmHome(busqueda: string, pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/search/searchcomadmhome/` + busqueda + `?pagina=${this.paginaSales}`, { headers });

  }

  searchCommerces(city: any, provincia: any, busqueda: string, pull: boolean = false) {

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaCommerce>(`${URL}/buscador/comercios/${city}/${provincia}/${busqueda}/?pagina=${this.paginaSales}`);

  }

  searchCommercesPremium(city: any, provincia: any, busqueda: string) {

    return this.http.get<RespuestaCommerce>(`${URL}/buscador/comerciosp/${city}/${provincia}/${busqueda}`);

  }




  createPago(sale: any): any {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/pagos/mercadopago_pbasic/`, sale, { headers })
        .subscribe(resp => {
          resolve(resp); // lo cambie para obtener el ID
        });

    });
  }


  // ! Stats de comercio
  getMyStats(id: string) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<any>(`${URL}/productos/mis_visitas/` + id, { headers });

  }

  getMyStatsF(id: string) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<any>(`${URL}/productos/mis_llamadasf/` + id, { headers });

  }

  getMyStatsC(id: string) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<any>(`${URL}/productos/mis_llamadasc/` + id, { headers });

  }


  getMyStatsW(id: string) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<any>(`${URL}/productos/mis_whatsapp/` + id, { headers });

  }


  getMyStatsS(id: string) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get<any>(`${URL}/productos/mis_compartir/` + id, { headers });

  }




  updateCom(commer: any, photo: File): Observable<Commerce> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    const fd = new FormData();


    fd.append('image', photo);

    return this.http.put(`${URL}/productos/update/${commer._id}`, fd, { headers });

  }



  // Update image 2
  updateCom2(commer: any, photo: File): Observable<Commerce> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    const fd = new FormData();

    fd.append('coords', commer.coords);
    fd.append('commerce', commer.commerce);
    fd.append('street', commer.street);
    fd.append('province', commer.province);
    fd.append('municipality', commer.municipality);
    fd.append('location', commer.location);
    fd.append('neighborhood', commer.neighborhood);

    // Guardar rubro como array en formdata
    if (commer.rubro) {
      const arr = commer.rubro;
      for (let i = 0; i < arr.length; i++) {
        fd.append('rubro', arr[i]);
      }
    }

    if (commer.home) {
      const arrh = commer.home;
      for (let i = 0; i < arrh.length; i++) {
        fd.append('home', arrh[i]);
      }
    }

    if (commer.bussines_days) {
      const bs = commer.bussines_days;
      for (let b = 0; b < bs.length; b++) {
        fd.append('bussines_days', bs[b]);
      }
    }


    fd.append('visitas', commer.visitas);
    fd.append('clickswhats', commer.clickswhats);
    fd.append('clickscell', commer.clickscell);
    fd.append('clickstel', commer.clickstel);
    fd.append('shares', commer.shares);
    fd.append('favs', commer.favs);

    fd.append('linkinsta', commer.linkinsta);
    fd.append('linkface', commer.linkface);
    fd.append('linkweb', commer.linkweb);

    fd.append('bio', commer.bio);
    fd.append('cellphone', commer.cellphone);
    fd.append('telephone', commer.telephone);
    fd.append('image', photo);

    fd.append('status', commer.status);
    fd.append('whatsapp', commer.whatsapp);
    fd.append('delivery', commer.delivery);
    fd.append('card', commer.card);
    fd.append('opening_hours', commer.opening_hours);
    fd.append('closing_schedule', commer.closing_schedule);

    fd.append('premium', commer.premium);
    fd.append('coupons', commer.coupons);


    fd.append('img', commer.img);
    fd.append('img_3', commer.img_3);
    fd.append('img_4', commer.img_4);
    fd.append('img_5', commer.img_5);

    return this.http.put(`${URL}/productos/update2/${commer._id}`, fd, { headers });
  }


  // Update image 3
  updateCom3(commer: any, photo: File): Observable<Commerce> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    const fd = new FormData();

    fd.append('coords', commer.coords);
    fd.append('commerce', commer.commerce);
    fd.append('street', commer.street);
    fd.append('province', commer.province);
    fd.append('municipality', commer.municipality);
    fd.append('location', commer.location);
    fd.append('neighborhood', commer.neighborhood);

    // Guardar rubro como array en formdata
    if (commer.rubro) {
      const arr = commer.rubro;
      for (let i = 0; i < arr.length; i++) {
        fd.append('rubro', arr[i]);
      }
    }

    if (commer.home) {
      const arrh = commer.home;
      for (let i = 0; i < arrh.length; i++) {
        fd.append('home', arrh[i]);
      }
    }

    if (commer.bussines_days) {
      const bs = commer.bussines_days;
      for (let b = 0; b < bs.length; b++) {
        fd.append('bussines_days', bs[b]);
      }
    }


    fd.append('visitas', commer.visitas);
    fd.append('clickswhats', commer.clickswhats);
    fd.append('clickscell', commer.clickscell);
    fd.append('clickstel', commer.clickstel);
    fd.append('shares', commer.shares);
    fd.append('favs', commer.favs);

    fd.append('linkinsta', commer.linkinsta);
    fd.append('linkface', commer.linkface);
    fd.append('linkweb', commer.linkweb);

    fd.append('bio', commer.bio);
    fd.append('cellphone', commer.cellphone);
    fd.append('telephone', commer.telephone);
    fd.append('image', photo);

    fd.append('status', commer.status);
    fd.append('whatsapp', commer.whatsapp);
    fd.append('delivery', commer.delivery);
    fd.append('card', commer.card);
    fd.append('opening_hours', commer.opening_hours);
    fd.append('closing_schedule', commer.closing_schedule);

    fd.append('premium', commer.premium);
    fd.append('coupons', commer.coupons);


    fd.append('img', commer.img);
    fd.append('img_2', commer.img_2);
    fd.append('img_4', commer.img_4);
    fd.append('img_5', commer.img_5);

    return this.http.put(`${URL}/productos/update3/${commer._id}`, fd, { headers });

  }



  // Update image 4
  updateCom4(commer: any, photo: File): Observable<Commerce> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    const fd = new FormData();

    fd.append('coords', commer.coords);
    fd.append('commerce', commer.commerce);
    fd.append('street', commer.street);
    fd.append('province', commer.province);
    fd.append('municipality', commer.municipality);
    fd.append('location', commer.location);
    fd.append('neighborhood', commer.neighborhood);

    // Guardar rubro como array en formdata
    if (commer.rubro) {
      const arr = commer.rubro;
      for (let i = 0; i < arr.length; i++) {
        fd.append('rubro', arr[i]);
      }
    }

    if (commer.home) {
      const arrh = commer.home;
      for (let i = 0; i < arrh.length; i++) {
        fd.append('home', arrh[i]);
      }
    }

    if (commer.bussines_days) {
      const bs = commer.bussines_days;
      for (let b = 0; b < bs.length; b++) {
        fd.append('bussines_days', bs[b]);
      }
    }


    fd.append('visitas', commer.visitas);
    fd.append('clickswhats', commer.clickswhats);
    fd.append('clickscell', commer.clickscell);
    fd.append('clickstel', commer.clickstel);
    fd.append('shares', commer.shares);
    fd.append('favs', commer.favs);

    fd.append('linkinsta', commer.linkinsta);
    fd.append('linkface', commer.linkface);
    fd.append('linkweb', commer.linkweb);

    fd.append('bio', commer.bio);
    fd.append('cellphone', commer.cellphone);
    fd.append('telephone', commer.telephone);
    fd.append('image', photo);

    fd.append('status', commer.status);
    fd.append('whatsapp', commer.whatsapp);
    fd.append('delivery', commer.delivery);
    fd.append('card', commer.card);
    fd.append('opening_hours', commer.opening_hours);
    fd.append('closing_schedule', commer.closing_schedule);

    fd.append('premium', commer.premium);
    fd.append('coupons', commer.coupons);


    fd.append('img', commer.img);
    fd.append('img_3', commer.img_3);
    fd.append('img_2', commer.img_2);
    fd.append('img_5', commer.img_5);

    return this.http.put(`${URL}/productos/update4/${commer._id}`, fd, { headers });

  }




  // Update image 5
  updateCom5(commer: any, photo: File): Observable<Commerce> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    const fd = new FormData();

    fd.append('coords', commer.coords);
    fd.append('commerce', commer.commerce);
    fd.append('street', commer.street);
    fd.append('province', commer.province);
    fd.append('municipality', commer.municipality);
    fd.append('location', commer.location);
    fd.append('neighborhood', commer.neighborhood);

    // Guardar rubro como array en formdata
    if (commer.rubro) {
      const arr = commer.rubro;
      for (let i = 0; i < arr.length; i++) {
        fd.append('rubro', arr[i]);
      }
    }

    if (commer.home) {
      const arrh = commer.home;
      for (let i = 0; i < arrh.length; i++) {
        fd.append('home', arrh[i]);
      }
    }

    if (commer.bussines_days) {
      const bs = commer.bussines_days;
      for (let b = 0; b < bs.length; b++) {
        fd.append('bussines_days', bs[b]);
      }
    }


    fd.append('visitas', commer.visitas);
    fd.append('clickswhats', commer.clickswhats);
    fd.append('clickscell', commer.clickscell);
    fd.append('clickstel', commer.clickstel);
    fd.append('shares', commer.shares);
    fd.append('favs', commer.favs);

    fd.append('linkinsta', commer.linkinsta);
    fd.append('linkface', commer.linkface);
    fd.append('linkweb', commer.linkweb);

    fd.append('bio', commer.bio);
    fd.append('cellphone', commer.cellphone);
    fd.append('telephone', commer.telephone);
    fd.append('image', photo);

    fd.append('status', commer.status);
    fd.append('whatsapp', commer.whatsapp);
    fd.append('delivery', commer.delivery);
    fd.append('card', commer.card);
    fd.append('opening_hours', commer.opening_hours);
    fd.append('closing_schedule', commer.closing_schedule);

    fd.append('premium', commer.premium);
    fd.append('coupons', commer.coupons);


    fd.append('img', commer.img);
    fd.append('img_3', commer.img_3);
    fd.append('img_4', commer.img_4);
    fd.append('img_2', commer.img_2);

    return this.http.put(`${URL}/productos/update5/${commer._id}`, fd, { headers });

  }

  updateSale(sale): Observable<Commerce> {

    const params = sale;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/updated/${sale._id}`, params, { headers });

  }

  updateSaleAdm(sale): Observable<Commerce> {

    const params = sale;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/updatedadm/${sale._id}`, params, { headers });

  }


  updateCompartir(sale): Observable<Commerce> {

    const params = sale;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/updatedcomp/${sale._id}`, params, { headers });

  }




  updateComB(sale): Observable<Commerce> {

    const params = sale;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/updbo/${sale._id}`, params, { headers });

  }

  updateSalefinal(sale): Observable<Commerce> {

    const params = sale;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/update`, params, { headers });

  }

  // Eliminar Comercio
  eliminarCom(id: string): Observable<Commerce> {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.get(`${URL}/productos/delete/` + id, { headers });

  }


  // Eliminar Imgagen Comercio 2
  eliminarImg2(id): Observable<Commerce> {

    const params = id;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/deleteimg2/${id._id}`, params, { headers });
  }


  // Eliminar Imgagen Comercio 3
  eliminarImg3(id): Observable<Commerce> {

    const params = id;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/deleteimg3/${id._id}`, params, { headers });

  }

  // Eliminar Imgagen Comercio 4
  eliminarImg4(id): Observable<Commerce> {

    const params = id;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/deleteimg4/${id._id}`, params, { headers });
  }


  // Eliminar Imgagen Comercio 5
  eliminarImg5(id): Observable<Commerce> {

    const params = id;

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return this.http.put(`${URL}/productos/deleteimg5/${id._id}`, params, { headers });

  }

}





