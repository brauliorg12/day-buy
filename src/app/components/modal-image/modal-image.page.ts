import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { EventsApp } from '../../services/events.service';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage implements OnInit {

  // ! WEB
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  @ViewChild(IonInput) photoInput;


  showCropper = false;
  failed = false;

  public status: string;

  // public previewImage = '';
  croppedImage: any = '';
  public imageChangedEvent: any = '';

  commerce_id: string;


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


  refresh() {
    this.refreshEvent.serviceFunction();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  // ! WEB
  async closeSelect() {
    await this.modalController.dismiss(this.croppedImage);
    this.refresh();
  }

  fileChangeEvent(event: any): void {
    this.failed = false;
    this.imageChangedEvent = event;
    this.status = 'loading';
  }

  imageCropped(event: ImageCroppedEvent) {
    // this.croppedImage = event.base64; // Raw base64 image string.
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
