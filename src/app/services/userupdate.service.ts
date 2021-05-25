import { Injectable } from '@angular/core';
import { Usuario } from '../classes/interfaces';
import { Storage } from '@ionic/storage';
import { UsuarioService } from './usuario.service';

@Injectable({
    providedIn: 'root'
})
export class UserUpdateService {

    usuario: Usuario = {};

    token: string = null;

    constructor(
        private usuarioService: UsuarioService,
        private storage: Storage
    ) {


    }

    async cargarToken() {

        this.token = await this.storage.get('token') || null;

    }


    async updateUser(): Promise<boolean> {

        await this.cargarToken();

        if (!this.token) {
            return Promise.resolve(false);
        }


        // Version
        await this.storage.get('version').then(res => {
            if (res) {
                this.usuario.version = res;

                // alert('version: ' + res);
            }
        });

        // Nombre FB
        this.storage.get('usuariocache').then(resp => {
            if (resp) {
                this.usuario.nombre = resp.nombre;
            }
        });

        // NotiID
        await this.storage.get('notiID').then(resp => {
            if (resp) {
                this.usuario.notification_id = resp;

                // alert('notiID: ' + resp);
            }
        });

        await this.usuarioService.actualizarUsuario(this.usuario).then(respu => {
            if (respu) {
                // alert('version: ' + this.usuario.version + ' notiID: ' + this.usuario.notification_id);
            }
        });

    }

}
