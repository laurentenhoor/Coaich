import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, ViewController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { TouchID } from '@ionic-native/touch-id';
import { Diary } from '../../pages/diary/diary';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
})
export class Login {
    fingerprintOptions: FingerprintOptions;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        private platform: Platform,
        private faio: FingerprintAIO,
        private touchId: TouchID
    ) {
        this.fingerprintOptions = {
            clientId: 'Fingerprint-Demo',
            clientSecret: 'password', // Only Android
            disableBackup: true,  //Only for Android(optional)
            localizedFallbackTitle: 'Use Pin', // Only iOS
            localizedReason: 'Please authenticate' // Only iOS
        }
    }

    ionViewDidEnter() {
        this.login();
    }

    login() {
        this.touchId.verifyFingerprintWithCustomPasswordFallback('This is a secure environment.')
            .then(
                res => this.navCtrl.setRoot(Diary),
                err => { }
            );
        // this.faio.show(this.fingerprintOptions).then(() => {
        //     this.viewCtrl.dismiss()
        // })

    }

}