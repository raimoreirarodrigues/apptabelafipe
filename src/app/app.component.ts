import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  goBack: boolean = true;

  constructor(private alertCtrl: AlertController, private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  myHandlerFunction() {
    if (this.goBack) {
      this.goBack = false;
      const alert = this.alertCtrl.create({
        title: 'Pergunta',
        message: 'Deseja fechar a aplicação?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.goBack = true;
          }
        }, {
          text: 'Fechar',
          handler: () => {
            this.platform.exitApp(); // Close this application
          }
        }]
      });
      alert.present();
    }
  }
}
