import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EventsApp {

    // Carrito
    articulo = new EventEmitter<any>();

    // Locacion
    location = new EventEmitter<any>();

    // Pedido
    nuevoPedido = new EventEmitter<any>();

    // Servicios
    nuevoEventS = new EventEmitter<any>();
    nuevoEventS2 = new EventEmitter<any>();
    buscarS = new EventEmitter<any>();

    // profesionales
    nuevoEventP = new EventEmitter<any>();
    nuevoEventP2 = new EventEmitter<any>();
    buscarP = new EventEmitter<any>();

    // Comercios
    nuevoEvent = new EventEmitter<any>();

    nuevoEvent2 = new EventEmitter<any>();
    buscarC = new EventEmitter<any>();

    // Accesos rapidos
    accesos = new EventEmitter<any>();

    // Publicaciones
    nuevoEventPub = new EventEmitter<any>();
    nuevoEventPubEdit = new EventEmitter<any>();

    // Comprador
    nuevoEventComprador = new EventEmitter<any>();

    // ofertas
    nuevoEventO = new EventEmitter<any>();

    nuevoEventO2 = new EventEmitter<any>();

    buscarO = new EventEmitter<any>();

    eraseEvent = new EventEmitter<any>();

    buscarHome = new EventEmitter<any>();

    tabHome = new EventEmitter<any>(); // home tab

    homebtn = new EventEmitter<any>();

    queHacerLocation = new EventEmitter<any>();

    queHacerP = new EventEmitter<any>(); // Despues de crear producto

    private page = new Subject<string>();
    action = this.page.asObservable();

    eventPremium = new EventEmitter<any>();
    readMessage = new EventEmitter<any>();

    private myObservable = new Subject<string>();
    currentData = this.myObservable.asObservable();


    // ! IMG 2
    private myObservable2 = new Subject<string>();
    currentData2 = this.myObservable2.asObservable();

    // ! IMG 3
    private myObservable3 = new Subject<string>();
    currentData3 = this.myObservable3.asObservable();

    // ! IMG 4
    private myObservable4 = new Subject<string>();
    currentData4 = this.myObservable4.asObservable();

    // ! IMG 5
    private myObservable5 = new Subject<string>();
    currentData5 = this.myObservable5.asObservable();


    serviceFunction() {
        this.myObservable.next('');
    }

    serviceFunction2() {
        this.myObservable2.next('');
    }

    serviceFunction3() {
        this.myObservable3.next('');
    }

    serviceFunction4() {
        this.myObservable4.next('');
    }

    serviceFunction5() {
        this.myObservable5.next('');
    }

    servicePub(id: any) {
        this.nuevoEventPub.emit([id]);
    }

    servicePubEdit(id: any) {
        this.nuevoEventPubEdit.emit([id]);
    }

    serviceComprador(rubro: any) {
        this.nuevoEventComprador.emit([rubro]);
    }

    serviceGuia(rubro: any) {
        this.nuevoEvent.emit([rubro]);
    }

    serviceServ(rubro: any) {
        this.nuevoEventS.emit([rubro]);
    }

    serviceProf(rubro: any) {
        this.nuevoEventP.emit([rubro]);
    }

    serviceBusquedaGuia() {
        this.nuevoEvent.emit([[]]);
    }

    buscarTodosC(busqueda: any) {
        this.buscarC.emit([[busqueda]]);
    }

    serviceEntrarGuia() {
        this.nuevoEvent2.emit([[]]);
    }

    serviceAccesos() {
        this.accesos.emit([[]]);
    }

    serviceEntrarOfertas() {
        this.nuevoEventO2.emit([[]]);
    }

    serviceEntrarProf() {
        this.nuevoEventP2.emit([[]]);
    }

    // Pedido
    serviceAddPedido() {
        this.nuevoPedido.emit([[]]);
    }

    buscarTodosP(busqueda: any) {
        this.buscarP.emit([[busqueda]]);
    }

    buscarTodosO(busqueda: any) {
        this.buscarO.emit([[busqueda]]);
    }

    serviceEntrarServ() {
        this.nuevoEventS2.emit([[]]);
    }

    eventoTiempo(id: any) {
        this.articulo.emit([[id]]);
    }

    eventLocation(location: any) {
        this.location.emit(location);
    }

    buscarTodosS(busqueda: any) {
        this.buscarS.emit([[busqueda]]);
    }

    serviceEraseFilter() {
        this.eraseEvent.emit([[]]);
    }

    serviceBusquedaHome() {
        this.buscarHome.emit([[]]);
    }

    Page() {
        this.page.next('');
    }

    serviceComercioCreado() {
        this.myObservable.next('');
    }

    serviceMensajeLeido() {
        this.readMessage.emit([[]]);
    }

    home() {
        this.homebtn.emit([[]]);
    }

    queHacerConBotonL() {
        this.queHacerLocation.emit([[]]);
    }

    atrasGaleriaP() {
        this.queHacerP.emit([[]]);
    }

    homeTab() {
        this.tabHome.emit([[]]);
    }

}
