import { Injectable, ViewChildren, QueryList } from '@angular/core';
import {
    IonRouterOutlet, ActionSheetController, PopoverController,
    ModalController, MenuController, ToastController
} from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AutocloseOverlaysService {
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

    constructor(
        private alertController: AlertController,
        private actionSheetCtrl: ActionSheetController,
        private popoverCtrl: PopoverController,
        private modalCtrl: ModalController,
        private menu: MenuController,
        private toastController: ToastController
    ) { }
    async trigger() {

        // Hide overlays
        try {
            const element =
                (await this.alertController.getTop()) ||
                (await this.actionSheetCtrl.getTop()) ||
                (await this.popoverCtrl.getTop()) ||
                (await this.modalCtrl.getTop()) ||
                (await this.toastController.getTop());
            if (element) {
                element.dismiss();
                return true; // Prevent navigation
            } else {
                return false;
            }
        } catch (error) {
        }
        // Close menu if open
        try {
            const element = await this.menu.getOpen();
            if (element !== null) {
                this.menu.close();
                return true;
            } else {
                return false;
            }
        } catch (error) {
        }
    }


}

// import { Injectable, ViewChildren, QueryList } from '@angular/core';
// import {
//     IonRouterOutlet, ActionSheetController, PopoverController,
//     ModalController, ToastController
// } from '@ionic/angular';
// import { AlertController } from '@ionic/angular';

// @Injectable({
//     providedIn: 'root'
// })
// export class AutocloseOverlaysService {
//     @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

//     constructor(
//         private alertController: AlertController,
//         private actionSheetCtrl: ActionSheetController,
//         private popoverCtrl: PopoverController,
//         private modalCtrl: ModalController,
//         private toastController: ToastController
//     ) { }
//     async trigger() {

//         // Hide overlays
//         const element =
//             (await this.alertController.getTop()) ||
//             (await this.actionSheetCtrl.getTop()) ||
//             (await this.popoverCtrl.getTop()) ||
//             (await this.modalCtrl.getTop()) ||
//             (await this.toastController.getTop());
//         if (element) {
//             element.dismiss();
//             return false; // Prevent navigation
//         } else {
//             return true;
//         }
//     }


// }
