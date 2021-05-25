import { Component } from '@angular/core';
import { Usuario } from '../../../classes/interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { EventsApp } from '../../../services/events.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  usuario: Usuario = {};

  user = {
    nombre: '',
    email: '',
    avatar: '',
    avatarfb: '',
    fb: ''
  };

  status = 'loading';

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private route: Router,
    private storage: Storage,
    private refreshEvent: EventsApp,
  ) { }

  ionViewWillEnter() {
    this.status = 'loading';
    this.storage.get('usuariocache')
      .then(async data => {
        if (data) {


          this.user = {
            nombre: await data.nombre,
            email: await data.email,
            avatarfb: await data.avatarfb,
            avatar: await data.avatar,
            fb: await data.fb
          };

          if (this.user.fb === 'true') {
            this.status = 'fb';
          } else {
            this.status = 'nofb';
          }
        }

      }, (error) => {
      });

  }

  async actualizar() {

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
    if (actualizado) {
      // toast con el mensaje de actualizado
      this.uiService.presentToast('Usuario actualizado');
      this.route.navigateByUrl('/main/tabs/tab3');
    } else {
      // toast con el error
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  logout() {
    this.usuarioService.logout().then(resp => {
      if (resp) {
        this.user = {
          nombre: '',
          email: '',
          avatarfb: '',
          avatar: '',
          fb: ''
        };
        this.refreshEvent.Page();
      }
    });
  }

}
