import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { IonicApp, IonicModule, Platform } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage'

//Providers
import { LibreNMS } from "../providers/libre-nms";
import { GraphHelper } from "../providers/graph";
import { DeviceProvider } from "../providers/device/device-provider";
import { PortProvider } from "../providers/device/port-provider";
import { WirelessProvider } from "../providers/device/wireless-provider";
import { SensorProvider } from "../providers/device/sensor-provider";
import { LogProvider } from "../providers/device/log-provider";
import { GlobalBillProvider } from "../providers/bill-provider";
import { GlobalAlertProvider } from "../providers/alert-provider";


//Native
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { Globalization } from '@ionic-native/globalization';

//Validators
import { CustomValidation } from '../CustomValidators';
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicImageViewerModule,
        HttpClientModule,
        NativeHttpModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp, {
            platforms: {
                ios: {
                    tabsHideOnSubPages: true,
                    statusBarPadding: true
                }
            }
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        LibreNMS,
        DeviceProvider,
        PortProvider,
        WirelessProvider,
        GraphHelper,
        LogProvider,
        SensorProvider,
        GlobalBillProvider,
        GlobalAlertProvider,
        BarcodeScanner,
        ScreenOrientation,
        StatusBar,        
        CustomValidation,
        {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
        Globalization
    ]
})



export class AppModule { }
