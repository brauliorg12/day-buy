import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';

import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Storage } from '@ionic/storage';
import { EventsApp } from '../../services/events.service';

@Component({
  selector: 'app-modal-image5',
  templateUrl: './modal-image5.page.html',
  styleUrls: ['./modal-image5.page.scss'],
})
export class ModalImage5Page implements OnInit {

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  @ViewChild(IonInput) photoInput;


  showCropper = false;
  failed = false;

  public status: string;

  commerce_id: string;

  // public previewImage = '';
  croppedImage: any = '';
  public imageChangedEvent: any = null;

  constructor(
    private modalController: ModalController,
    public storage: Storage,
    private refreshEvent: EventsApp
  ) { }


  ionViewWillEnter() {
    this.storage.get('commerce_id').then(res => {
      this.commerce_id = res;
    });

  }

  ngOnInit() {
    document.getElementById('file').click();
  }


  async closeSelect() {
    await this.modalController.dismiss(this.croppedImage);
    this.refresh();
  }

  refresh() {
    this.refreshEvent.serviceFunction5();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  fileChangeEvent(event: any): void {
    this.failed = false;
    this.imageChangedEvent = event;
    this.status = 'loading';
  }

  imageCropped(event: ImageCroppedEvent) {
    // this.previewImage = event.base64; // Raw base64 image string.
    this.croppedImage = event.file; // Blob image. (Reusable anywhere. like: firebase storage, etc)

  }

  imageLoaded() {
    this.showCropper = true;
    this.status = 'ready';
  }

  loadImageFailed() {
    this.failed = true;
  }

  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }

}
