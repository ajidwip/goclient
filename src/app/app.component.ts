import { ViewChild, Component } from '@angular/core';
import { App, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SqlProvider } from '../providers/sql/sql';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') Nav: NavController;
  public listmenu = [];
  public username: any;
  public usercode: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public appCtrl: App,
    public androidFullScreen: AndroidFullScreen,
    public screenOrientation: ScreenOrientation,
    public menuCtrl: MenuController,
    public dbProvider: SqlProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.dbProvider.initializeDatabase().then(() => {
        console.log('initialize sukses')
        this.doGetCacheVersion()
        this.doGetListMenu()
        this.doGetUser()
        this.appCtrl.getRootNav().setRoot(HomePage);
      })
    });
  }
  ionViewDidEnter() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch(err => console.log(err));
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  doGetCacheVersion() {
    let query = "SELECT * FROM goapps.ms_cache"
    this.dbProvider.executeQuery(query).then((res: any) => {
      if (res.length > 0) {
        console.log(res.item(0)['cache_ver'])
      }
    }, err => {
      console.log('error', err)
    })
  }
  doGetListMenu() {
    let query = "SELECT * FROM goapps.ms_appmodule WHERE appmod_type = 'MODULE' ORDER BY appmod_seq"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listmenu.push(res.item(i))
        if (this.listmenu[i]['appmod_id'] == 'GOPROPOSAL') {
          this.listmenu[i]['appmod_icon'] = 'fas fa-file-alt'
        }
      }
      console.log(this.listmenu)
    }, err => {
      console.log('error', err)
    })
  }
  doGetUser() {
    let query = "SELECT * FROM goapps.ms_user"
    this.dbProvider.executeQuery(query).then((res: any) => {
      this.username = res.item(0).user_displayname
      this.usercode = res.item(0).user_code
    }, err => {
      console.log('error', err)
    })
  }
  doGoHome() {
    window.location.href = 'file:///android_asset/www/index.html'
  }
  doGoUrl(menu) {
    window.location.href = "file:///data/data/id.co.paninlife.goapps/files/" + menu.appmod_urldevice + "/www/index.html";
  }
  doInformation() {
    this.appCtrl.getRootNav().setRoot('InformationPage');
    this.menuCtrl.close()
  }
}

