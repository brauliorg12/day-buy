import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario, RespuestaUser } from '../classes/interfaces';
import { NavController, Platform } from '@ionic/angular';
// import { Facebook } from '@ionic-native/facebook/ngx';
// import { NetworkService, ConnectionStatus } from './network.service';
// import { AngularFireAuth } from '@angular/fire/auth';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  paginaSales = 0;

  token: string = null;
  private usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    // private fb: Facebook,
    private platform: Platform,
    // private afAuth: AngularFireAuth,
  ) { }


  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {

      this.http.post(`${URL}/usuarios_productos/login`, data)
        .subscribe(async resp => {
          

          if (resp['ok']) {
            await this.guardarToken(resp['token']);

            const user = {
              nombre: resp['nombre'],
              email: resp['email'],
              avatar: resp['avatar'],
              fb: 'false'
            };
            this.storage.set('usuariocache', user);

            resolve(true);
          } else {
            this.token = null;
            this.storage.remove('token');
            resolve(false);
          }

        });

    });

  }

  // Login Facebook
  loginfb(email: string, password: string, nombre: string) {

    const data = { email, password, nombre };

    return new Promise(resolve => {

      this.http.post(`${URL}/usuarios_productos/loginfb`, data)
        .subscribe(async resp => {

          if (resp['ok']) {
            await this.guardarToken(resp['token']);

            const user = {
              nombre: resp['nombre'],
              email: resp['email'],
              avatar: resp['avatar'],
              fb: 'true'
            };
            this.storage.set('usuariocache', user);

            resolve(true);
          } else {
            this.token = null;
            this.storage.remove('token');
            resolve(false);
          }

        });

    }).catch(err => {
      alert(err);
    });
  }

  async logout() {

    return new Promise(async resolve => {

      this.token = null;
      this.usuario = {};
      await this.storage.remove('token');
      await this.storage.remove('tipomapa');
      await this.storage.remove('specialkey-icecreamp');
      await this.storage.remove('specialkey-farmacys');
      await this.storage.remove('specialkey-favcommerces');
      await this.storage.remove('version');
      await this.storage.remove('commerce_id');
      await this.storage.remove('filter');
      await this.storage.remove('user');
      await this.storage.remove('usuariocache');
      await this.storage.remove('cat_name');
      await this.storage.remove('dark');
      await this.storage.remove('search_text_c');
      await this.storage.remove('search_text_o');
      await this.storage.remove('search_text_p');
      await this.storage.remove('search_text_s');
      await this.navCtrl.navigateRoot('/inicio', { animated: true }).then(resp => {
        resolve(true);
      });

    //   if (this.platform.is('capacitor')) {
    //     await this.fb.logout()
    //       .then(res => {
    //         resolve(true);
    //       }, error => {
    //       });
    //   } else {
    //     await this.afAuth.signOut()
    //       .then(res => {
    //         resolve(true);
    //       }, error => {
    //       });
    //   }
    }).catch(err => {
      alert(err);
    });
  }

  registro(usuario: Usuario) {

    return new Promise(resolve => {

      this.http.post(`${URL}/usuarios_productos/create`, usuario)
        .subscribe(async resp => {

          if (resp['ok']) {
            await this.guardarToken(resp['token']);

            const user = {
              nombre: resp['nombre'],
              email: resp['email'],
              avatar: resp['avatar'],
              fb: 'false'
            };
            this.storage.set('usuariocache', user);

            resolve(true);
          } else {
            this.token = null;
            this.storage.remove('token');
            resolve(false);
          }

        });


    });


  }

  // !Admin users Modal
  getUsers() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusers`, { headers });

  }

  // Admin all users
  getUsersAll(page) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusers/?pagina=${page}`, { headers });

  }

  getUsersPage(pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusers/?pagina=${this.paginaSales}`, { headers });

  }

  // Admin users by date
  getUsersAllByDate(fecha_init: any, fecha_fin: any) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusersa/` + fecha_init + '/' + fecha_fin, { headers });

  }

  getUsersPageByDate(pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusersa/?pagina=${this.paginaSales}`, { headers });

  }

  // ! TOTAL
  getUsersTotal() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admuserstotal`, { headers });

  }

  getUsersTotalFb() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusersfb`, { headers });

  }

  getUsersTotalEm() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusersem`, { headers });

  }

  getUsersTotalLS() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admusersat`, { headers });

  }

  getUsersTotalRegT() {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return this.http.get<RespuestaUser>(`${URL}/usuarios_productos/admuserstreg`, { headers });

  }



  getUsuario() {

    if (!this.usuario._id) {
      this.validaToken();
    }

    return { ...this.usuario };

  }


  searchUsers(busqueda: string, pull: boolean = false) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    if (pull) {
      this.paginaSales = 0;
    }

    this.paginaSales++;

    return this.http.get<RespuestaUser>(`${URL}/search/usuarios/` + busqueda + `?pagina=${this.paginaSales}`, { headers });

  }


  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();


  }

  async cargarToken() {

    this.token = await this.storage.get('token') || null;

  }


  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      // this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }


    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });


      this.http.get(`${URL}/usuarios_productos/`, { headers })
        .subscribe(async resp => {

          if (resp['ok']) {
            this.usuario = resp['usuario'];

            this.storage.get('usuariocache')
              .then(async (data) => {
                const user = {
                  nombre: this.usuario.nombre,
                  email: this.usuario.email,
                  avatar: this.usuario.avatar,
                  fb: this.usuario.fb
                };
                this.storage.set('usuariocache', user);
              });

            resolve(true);
          } else {
            await this.storage.remove('token');
            await this.storage.remove('usuariocache');
            await this.storage.remove('user');
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });

    });

  }

  // Token ADMINS

  async validaTokenAdm(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }


    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });


      this.http.get(`${URL}/usuarios_productos/gadmin/`, { headers })
        .subscribe(async resp => {

          if (resp['ok']) {
            this.usuario = resp['usuario'];

            this.storage.get('usuariocache')
              .then(async (data) => {
                const user = {
                  nombre: this.usuario.nombre,
                  email: this.usuario.email,
                  avatar: this.usuario.avatar,
                  fb: this.usuario.fb
                };
                this.storage.set('usuariocache', user);
              });

            resolve(true);
          } else {
            await this.storage.remove('token');
            await this.storage.remove('usuariocache');
            await this.storage.remove('user');
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });

    });

  }



  actualizarUsuario(usuario: Usuario) {


    const headers = new HttpHeaders({
      'x-token': this.token
    });


    return new Promise(resolve => {

      this.http.post(`${URL}/usuarios_productos/update`, usuario, { headers })
        .subscribe(resp => {

          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);

          } else {
            resolve(false);
          }

        });

    });

  }

}
