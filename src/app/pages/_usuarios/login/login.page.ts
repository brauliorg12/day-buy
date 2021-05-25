import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, NgForm } from '@angular/forms';
import { Platform, IonInput, NavController, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';
// import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { Router } from '@angular/router';

// Lottie
// import { AnimationOptions } from 'ngx-lottie';
// Firebase
// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonInput) inputEmailR: IonInput;
  @ViewChild(IonInput) inputEmailL: IonInput;

  loginUser = {
    email: '',
    password: ''
  };

  fborlogin = 'fb';

  public userReady = 'false';

  public passtype = 'password';

  // Facebook
  isLoggedIn = false;
  users: any;
  user: any;
  logging: any;
  img_fb: any;
  userg: any;
  public password: string;
  private large = 23232323;
  private short = 23;

  public registerUser: FormGroup;

  public confirmp = false;

  touchL = false;
  touchR = false;


  // // Lottie
  // optionsL: AnimationOptions = {
  //   path: 'assets/icon/spinner.json'
  // };

  // Detector
  public web: boolean;

  public loading: any;
  public isGoogleLogin = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    // private fb: Facebook,
    // private googlePlus: GooglePlus,
    private storage: Storage,
    // private lottieSplashScreen: LottieSplashScreen,
    public formBuilder: FormBuilder,
    private platform: Platform,

    ////////////////////////////
    public loadingController: LoadingController,

    // private afAuth: AngularFireAuth,
  ) {
    this.registerUser = this.formBuilder.group({
      _id: [''],
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      password_c: ['',
        [
          Validators.required,
          this.matchValues('password'),
        ],
      ],
      avatar: ['av-1.png'],
      role: ['user'],
      fb: ['false']
    });

  }

  // Contraseña
  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  ionViewWillEnter() {

    this.storage.get('token').then(res => {
      if (res) {
        this.navCtrl.navigateRoot('/inicio', { animated: true, animationDirection: 'forward' });
      } else {
        this.userReady = 'false';
      }
    });

  }

  async ngOnInit() {
    // this.slides.lockSwipes(true);

    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        // this.lottieSplashScreen.hide();
      });
    } else {
      this.web = true;
    }

    ////////////////////////////
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  changeTypeText() {
    this.passtype = 'text';
  }

  changeTypePass() {
    this.passtype = 'password';
  }

  async login(fLogin: NgForm) {
    this.userReady = 'true';

    if (fLogin.invalid) { return; }

    await this.usuarioService.login(this.loginUser.email, this.loginUser.password).then(async valido => {

      if (valido) {
        const fb = 'false';

        await this.storage.set('user', { fb: fb }).then((data) => {
          this.user = {
            fb: data.fb
          };

          this.navCtrl.navigateRoot('/inicio', { animated: true, animationDirection: 'forward' });
          this.loginUser.email = '';
          this.loginUser.password = '';
          this.touchL = false;
          this.fborlogin = 'fb';
        }, error => {
        });
        this.userReady = 'ok';
      } else {
        this.userReady = 'false';
        this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
      }
    });




  }

  async registro() {
    this.userReady = 'true';

    await this.usuarioService.registro(this.registerUser.value).then(async resp => {
      if (resp) {
        const fb = 'false';

        await this.storage.set('user',
          {
            fb: fb
          })
          .then((data) => {
            this.user = {
              fb: data.fb
            };

            this.navCtrl.navigateRoot('/inicio', { animated: true, animationDirection: 'forward' });
            this.registerUser.reset();
            this.touchR = false;
            this.fborlogin = 'fb';
          }, error => {
          });
        this.userReady = 'ok';
      } else {
        this.userReady = 'false';
        this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
      }
    });
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////


  // loginFacebook() {
  //   if (this.platform.is('capacitor')) {
  //     this.loginFbApp();
  //   } else {
  //     this.loginFacebookWeb();
  //   }
  // }

  // loginFbApp() {
  //   if (this.platform.is('capacitor')) {
  //     this.platform.ready().then(async () => {
  //       this.userReady = 'true';
  //       const permissions = ['public_profile', 'email'];
  //       await this.fb.login(permissions)
  //         .then(async (res: any) => {
  //           if (res.status === 'connected') {
  //             this.isLoggedIn = true;
  //             this.userReady = 'ok';
  //             this.password = await res.authResponse.userID * this.large + this.short + 'CoDi_app_faceBook';
  //             await this.getUserDetailApp(await res.authResponse.userID);
  //           } else {
  //             this.isLoggedIn = false;
  //             this.userReady = 'false';
  //           }
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         });

  //     });
  //   }
  // }

  // async getUserDetailApp(userid: any) {
  //   const permissions = ['public_profile', 'email'];
  //   await this.fb.api('/me?fields=name,email', permissions)
  //     .then(async res => {

  //       if (await res) {
  //         this.users = await res;
  //         this.img_fb = 'https://graph.facebook.com/' + await userid + '/picture?type=large';
  //         const fb = 'true';

  //         const valido = await this.usuarioService.loginfb(this.users.email, this.password, this.users.name);

  //         if (await valido) {
  //           // alert(await this.users + ', avatar ' + this.img_fb )
  //           await this.storage.set('usuariocache',
  //             {
  //               name: this.users.name,
  //               email: this.users.email,
  //               avatarfb: this.img_fb,
  //               fb: fb
  //             })
  //             .then(async (data) => {
  //               // alert(JSON.stringify('datalogin: ' + data))
  //               // this.router.navigate(['/inicio']);
  //               this.navCtrl.navigateRoot('/inicio', { animated: true, animationDirection: 'forward' });
  //             }, error => {
  //             });
  //         } else {
  //           this.userReady = 'false';
  //         }

  //       }

  //     })
  //     .catch(e => {
  //     });
  // }

  // async loginFacebookWeb() {

  //   await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(async resp => {
  //     this.userReady = 'true';
  //     if (resp.additionalUserInfo.profile) {

  //       this.users = resp.additionalUserInfo.profile;

  //       this.password = await this.users.id * this.large + this.short + 'CoDi_app_faceBook';

  //       this.isLoggedIn = true;

  //       this.img_fb = 'https://graph.facebook.com/' + await this.users.id + '/picture?type=large';
  //       const fb = 'true';

  //       const valido = await this.usuarioService.loginfb(this.users.email, this.password, this.users.name);

  //       if (await valido) {

  //         this.userReady = 'ok';

  //         await this.storage.set('user',
  //           {
  //             name: this.users.name,
  //             email: this.users.email,
  //             avatar: this.img_fb,
  //             fb: fb
  //           })
  //           .then(async (data) => {
  //             this.user = {
  //               name: data.name,
  //               email: data.email,
  //               avatar: data.avatar,
  //               fb: data.fb
  //             };

  //             // this.router.navigate(['/inicio']);
  //             await this.navCtrl.navigateRoot('/inicio', { animated: true, animationDirection: 'forward' });
  //           }, error => {
  //           });
  //       } else {
  //         this.isLoggedIn = false;
  //         this.userReady = 'false';
  //       }

  //     } else {
  //       this.isLoggedIn = false;
  //       this.userReady = 'false';
  //     }
  //   });

  // }

  clicksWhatsapp() {
    window.location.href = 'whatsapp://send?text=Hola, tengo inconvenientes para entrar en CoDi.&phone=+5492364624963';
  }

  // loginGoogle() {
  //   if (this.platform.is('capacitor')) {
  //     this.loginGoogleAndroid();
  //   } else {
  //     this.loginGoogleWeb();
  //   }
  // }

  // async loginGoogleAndroid() {
  //   this.platform.ready().then(async () => {
  //     await this.googlePlus.login({
  //       'webClientId': '910989092424-qfkvd9p5dek70anm2dikghcmhch9rsdh.apps.googleusercontent.com',
  //       'offline': true
  //     }).then(async (res: any) => {
  //       alert(await res)
  //       const resConfirmed = await this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(resp => {

  //         const user = resp.user;
  //         alert(resConfirmed);
  //         // this.picture = user.photoURL;
  //         // this.name = user.displayName;
  //         // this.email = user.email;
  //       });
  //     }).catch(e => {
  //       console.log(e);
  //     });
  //   });
  // }

  // async loginGoogleWeb() {
  //   const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  //   const user = res.user;
  //   alert('usuario: ' + user.email);
  //   // this.picture = user.photoURL;
  //   // this.name = user.displayName;
  //   // this.email = user.email;
  // }


  /////////////////////////////////////////////////////////////////////////////////////////////


  // ! ////////////////////////

  // doLogin() {
  //   let params: any;
  //   if (this.platform.is('capacitor')) {
  //     this.platform.ready().then(() => {
  //       params = {
  //         webClientId: '910989092424-dibueh7cmfb97l3m97riamtfsj8gjnrb.apps.googleusercontent.com', //  webclientID 'string'
  //         offline: true
  //       };
  //     });
  //     this.googlePlus.login(params)
  //       .then((response) => {
  //         alert('response:' + JSON.stringify(response));
  //         const { idToken, accessToken } = response;
  //         this.onLoginSuccess(idToken, accessToken);
  //       }).catch((error) => {
  //         console.log(error);
  //         alert('error:' + JSON.stringify(error));
  //       });
  //   } else {
  //     console.log('else...');
  //     this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
  //       alert('success in google login' + success);
  //       this.isGoogleLogin = true;
  //       this.user = success.user;
  //     }).catch(err => {
  //       alert(err.message + 'error in google login');
  //     });
  //   }
  // }

  // onLoginSuccess(accessToken, accessSecret) {
  //   const credential = accessSecret ? firebase.auth.GoogleAuthProvider
  //     .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
  //       .credential(accessToken);
  //   this.afAuth.signInWithCredential(credential)
  //     .then((success) => {
  //       alert('successfully');
  //       this.isGoogleLogin = true;
  //       this.user = success.user;
  //       this.loading.dismiss();
  //     });

  // }
  // onLoginError(err) {
  //   console.log(err);
  // }
  // logout2() {
  //   this.afAuth.signOut().then(() => {
  //     this.isGoogleLogin = false;
  //   });
  // }


  // ! ///////////////////////
  // async loginFb() {

  //   this.fb.login(['email'])
  //     .then((response: FacebookLoginResponse) => {
  //       this.onLoginSuccessfb(response);
  //       console.log(response.authResponse.accessToken);
  //     }).catch((error) => {
  //       console.log(error);
  //       alert('error:' + error);
  //     });
  // }

  // onLoginSuccessfb(res: FacebookLoginResponse) {
  //   // const { token, secret } = res;
  //   const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //   this.afAuth.signInWithCredential(credential)
  //     .then((response) => {
  //       this.router.navigate(['/profile']);
  //       // this.loading.dismiss();
  //     });

  // }

  fbToLogin() {
    this.fborlogin = 'login';

    this.touchL = true;

    setTimeout(() => {
      this.inputEmailL.setFocus();
    }, 500);
  }

  registerNew() {
    this.fborlogin = 'login';

    this.touchR = true;

    setTimeout(() => {
      this.inputEmailR.setFocus();
    }, 500);
  }

  backNewR() {
    this.fborlogin = 'fb';
    this.touchR = false;
  }

  backNewL() {
    this.fborlogin = 'fb';
    this.touchL = false;
  }

  loginToFb() {
    this.fborlogin = 'fb';
  }

  openEmergency() {
    this.router.navigateByUrl('/main/tabs/emergencias');
  }

}
