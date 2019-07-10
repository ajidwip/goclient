import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {
  public listmodul = [];
  public listproduk = [];
  constructor(
    public navCtrl: NavController,
    public dbProvider: SqlProvider,
    public screenOrientation: ScreenOrientation,
    public platform: Platform,
    public androidFullScreen: AndroidFullScreen,
    public appCtrl: App,
    public navParam: NavParams) {
    this.doGetModule()
  }

  doGetModule() {
    this.listmodul = [];
    this.listproduk = [];
    let query = "SELECT * FROM goapps.ms_appmodule ORDER BY appmod_seq"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        if (res.item(i)['appmod_type'] != 'SUBMODULE') {
          this.listmodul.push(res.item(i))
          if (this.listmodul[i]['appmod_id'] == 'GOPROPOSAL') {
            this.listmodul[i]['appmod_icon'] = 'fas fa-file-alt'
          }
          else if (this.listmodul[i]['appmod_type'] == 'DEFAULT') {
            this.listmodul[i]['appmod_icon'] = 'fas fa-file-pdf'
          }
        }
        else {
          this.listproduk.push(res.item(i))
        }
      }
      console.log(this.listmodul, this.listproduk)
    });
  }
  doCloseInformation() {
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

}
