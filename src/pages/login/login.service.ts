import { Injectable, Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Injectable()
export class LoginService {
    private isOpen:boolean;

    constructor() {
    }

    show(navCtrl:NavController, targetComponent) {
        if (!this.isOpen) {
            navCtrl.setRoot(targetComponent);
            this.isOpen = true;
        }
    }

    close(navCtrl:NavController, targetComponent) {
        navCtrl.setRoot(targetComponent);
        this.isOpen = false;
    }

}
