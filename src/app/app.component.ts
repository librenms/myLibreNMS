import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { LibreNMS } from '../providers/libre-nms';
import { MenuController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { Globalization } from '@ionic-native/globalization';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = 'Login';

    pages: Array<{ title: string, component: any, icon: string }>;
    settings: Array<{ title: string, component: any }>;

    constructor(public platform: Platform,
        private statusBar: StatusBar,
        private api: LibreNMS,
        private translate: TranslateService,
        public menuCtrl: MenuController,
        private storage: Storage,
        private globalization: Globalization) {
        
            translate.setDefaultLang('en');
            this.initializeApp();

            this.pages = [
                { title: 'DASHBOARD', component: 'Dashboard', icon: 'analytics' },
                { title: 'DEVICES', component: 'Devices', icon: 'list-box' },
                { title: 'GROUPS', component: 'Groups', icon: 'albums' },
                { title: 'ALERTS', component: 'AlertsPage', icon: 'notifications' },
                { title: 'SERVICES', component: 'ServicesPage', icon: 'logo-buffer' },
                { title: 'BILLS', component: 'BillsPage', icon: 'paper' }
            ];
            this.settings = [{ title: "Settings", component: 'SettingsPage' }];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            this.statusBar.styleDefault();

            if(!this.platform.is('core')) {
                this.globalization.getPreferredLanguage().then((response) => {
                    let lang = response.value.split('-')[0];
                    this.translate.use(lang);    
                })
            }

            // Initialize Storage
            this.storage.get('servers').then((servers) => {
                if (servers == null || servers == undefined) {
                    this.storage.set('servers', []);
                }
            });
            
            if (this.platform.is('android')) {
                this.platform.registerBackButtonAction(() => {
                    if (this.nav.canGoBack()) {
                        this.nav.pop();
                    } else {
                        //Exit app if logged out
                        if (!this.api.connected()) {
                            this.platform.exitApp();
                        }
                        else {
                            //if menu is open, close it
                            if (this.menuCtrl.isOpen()) {
                                this.menuCtrl.close();
                            }
                            //  Log out of app
                            else {
                                this.api.logout();
                                this.nav.setRoot('Login');
                            }
                        }
                    }
                });
            }
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
    display_pane(status = true) {
        return status;
    }
}
