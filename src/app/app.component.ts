import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';

// GoogleAuth.initialize({
//   clientId:
//     '389824675125-99qjdgtc48blc2p7c40otses2jcnn015.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   grantOfflineAccess: true,
// });

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize();
    });
  }
}
