import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, ViewController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { TouchID } from '@ionic-native/touch-id';
import { TabsPage } from '../tabs/tabs';

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

    login() {
        this.touchId.verifyFingerprintWithCustomPasswordFallback('Scan your fingerprint please')
            .then(
                res => this.viewCtrl.dismiss(),
                err => console.error(err)
            );
    }

    ionViewDidEnter() {
        this.touchId.isAvailable().then(
            isTrue => this.login(),
            isFalse => this.viewCtrl.dismiss()
        );
    }

}