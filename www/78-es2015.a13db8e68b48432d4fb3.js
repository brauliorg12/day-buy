(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{"37vE":function(e,t,o){"use strict";o.r(t),o.d(t,"pwa_camera_modal_instance",(function(){return n}));var i=o("At8z");const n=class{constructor(e){Object(i.h)(this,e),this.noDevicesText="No camera found",this.noDevicesButtonText="Choose image",this.handlePhoto=async e=>{this.onPhoto.emit(e)},this.handleNoDeviceError=async e=>{this.noDeviceError.emit(e)},this.onPhoto=Object(i.d)(this,"onPhoto",7),this.noDeviceError=Object(i.d)(this,"noDeviceError",7)}handleBackdropClick(e){e.target!==this.el&&this.onPhoto.emit(null)}handleComponentClick(e){e.stopPropagation()}handleBackdropKeyUp(e){"Escape"===e.key&&this.onPhoto.emit(null)}render(){return Object(i.g)("div",{class:"wrapper",onClick:e=>this.handleBackdropClick(e)},Object(i.g)("div",{class:"content"},Object(i.g)("pwa-camera",{onClick:e=>this.handleComponentClick(e),handlePhoto:this.handlePhoto,handleNoDeviceError:this.handleNoDeviceError,noDevicesButtonText:this.noDevicesButtonText,noDevicesText:this.noDevicesText})))}get el(){return Object(i.f)(this)}static get style(){return":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;contain:strict;--inset-width:600px;--inset-height:600px}.wrapper,:host{display:-ms-flexbox;display:flex}.wrapper{-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0,0,0,.15)}.content{-webkit-box-shadow:0 0 5px rgba(0,0,0,.2);box-shadow:0 0 5px rgba(0,0,0,.2);width:var(--inset-width);height:var(--inset-height);max-height:100%}@media only screen and (max-width:600px){.content{width:100%;height:100%}}"}}}}]);