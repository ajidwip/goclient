import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import moment from 'moment';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public width: any;
  public height: any;
  public client = [];
  public clientgroup = [];
  public clientnogroup = [];
  public clientnogroupsearch = [];
  public clientongroup = [];
  public clientongroupsearch = [];
  public clientdetail = [];
  public clientdetailupd = [];
  public clientgrupselect = [];
  public clients: any;
  public clientname = '';
  public clientgender = '';
  public clientbirthdate = '';
  public clientclass = '';
  public clientnote = '';
  public listclient = [];
  public overlay: boolean = false;
  public overlaygroup: boolean = false;
  public overlayoption: boolean = false;
  public clientnamegrupselect = '';
  public clientgendergrupselect = '';
  public clientbirthdategrupselect = '';
  public clientclassgrupselect = '';
  public listoptions = [];
  public titleoption: any;
  public nama = '';
  public tipeid = '';
  public noid = '';
  public tgllahir: any;
  public kota = '';
  public negara = '';
  public jkel = '';
  public kelaspekerjaan = '';
  public namaperusahaan = '';
  public bidangusaha = '';
  public jabatan = '';
  public uraianpekerjaan = '';
  public email = '';
  public nohp = '';
  public statuspernikahan = '';
  public kewarganegaraan = '';
  public pendidikan = '';
  public resikohobi = '';
  public hobi = '';
  public alamat1 = '';
  public alamat2 = '';
  public rtrw = '';
  public kelurahan = '';
  public kotaalamat = '';
  public kodepos = '';
  public alamatnegara = '';
  public telpalamat = '';
  public faxalamat = '';
  public alamatkorespondensi = '';
  public tipealamatkorespondensi = '';
  public alamat1korespondensi = '';
  public alamat2korespondensi = '';
  public rtrwkorespondensi = '';
  public kelurahankorespondensi = '';
  public kotakorespondensi = '';
  public kodeposkorespondensi = '';
  public alamatnegarakorespondensi = '';
  public telpalamatkorespondensi = '';
  public faxalamatkorespondensi = '';
  public npwpkorespondensi = '';
  public npwpasing = '';
  public negaranpwpasing = '';
  public tin = '';
  public notetin = '';
  public penghasilan = '';
  public notepenghasilan = '';
  public penghasilankotor = '';
  public tujuanpembelian = '';
  public notepembelian = '';
  public namarekening = '';
  public matauangrekening = '';
  public norekening = '';
  public namabank = '';
  public cabangbank = '';
  public kotabank = '';
  public catatan = ''
  public clientforeigntax = [];
  public clientincome = [];
  public clientpurpose = [];
  public datapost = [];
  public scroll = 0;
  public searchname: any;
  public searchdatebirth: any;
  public searchgender: any;
  public namasearch = '';
  public jkelsearch = '';
  public tgllahirsearch = '';

  constructor(
    public navCtrl: NavController,
    public dbProvider: SqlProvider,
    public screenOrientation: ScreenOrientation,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public androidFullScreen: AndroidFullScreen,
    public datePicker: DatePicker,
    public platform: Platform) {
    this.datapost['jkel'] = ''
    this.datapost['kelaspekerjaan'] = ''
    this.datapost['statuspernikahan'] = 'S'
    this.datapost['bidangusaha'] = ''
    this.datapost['jabatan'] = ''
    this.datapost['uraianpekerjaan'] = ''
    this.datapost['pendidikan'] = 'BS'
    this.datapost['kewarganegaraan'] = 'WNI'
    this.datapost['penghasilankotor'] = ''
    this.datapost['matauangrekening'] = 'RP.'
    this.datapost['negara'] = 'ID'
    this.datapost['alamatnegarakorespondensi'] = 'ID'
    this.datapost['alamatnegara'] = 'ID'
    this.datapost['tipeid'] = ''
    this.datapost['resikohobi'] = 'N'
    this.datapost['alamatkorespondensi'] = 'N'
    this.datapost['npwpasing'] = 'N'
    this.negara = 'INDONESIA'
    this.alamatnegarakorespondensi = 'INDONESIA'
    this.alamatnegara = 'INDONESIA'
    this.matauangrekening = 'RP.'
    this.kewarganegaraan = 'WNI'
    this.resikohobi = 'Tidak'
    this.alamatkorespondensi = 'Tidak'
    this.npwpasing = 'Tidak'
    platform.ready().then(() => {
      this.width = platform.width()
      this.height = platform.height()
      this.doGetClient().then((res) => {
        console.log(res[0].clientdet[0])
        this.doGetProfil(res[0].clientdet[0])
      })
    });
  }
  onScroll(e) {
    var em = document.getElementById("toolbar");
    var opacity = window.getComputedStyle(em).getPropertyValue("opacity");
    console.log(e.scrollTop, this.scroll)
    console.log('temp ', opacity)
    if (e.scrollTop > 0 && e.scrollTop > this.scroll) {
      document.getElementById('toolbar').style.opacity = (parseFloat(opacity) - 0.05).toString()
      console.log('opacity', parseFloat(opacity) - 0.05)
      if (parseFloat(opacity) < 0.2) {
        document.getElementById("toolbar").style.zIndex = '1'
      }
      else {
        document.getElementById("toolbar").style.zIndex = '999'
      }
      this.scroll = e.scrollTop
    }
    /*else if (e.scrollTop < this.scroll) {
      console.log('opacity change')
      document.getElementById('toolbar').style.opacity = '1'
      document.getElementById("toolbar").style.zIndex = '999'
      this.scroll = e.scrollTop
    }*/
    else if (e.scrollTop == 0) {
      document.getElementById('toolbar').style.opacity = '1'
      document.getElementById("toolbar").style.zIndex = '999'
      this.scroll = e.scrollTop
    }
  }
  ionViewDidEnter() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch(err => console.log(err));
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  doGetClient() {
    return new Promise((resolve, reject) => {
      var query = "SELECT * FROM ms_client WHERE is_delete = 0 ORDER BY UPPER(client_name)";
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.client.push(res.item(i))
        }
        const sorted = this.client.sort((a, b) => a.client_name > b.client_name ? 1 : -1);

        const grouped = sorted.reduce((groups, client) => {
          const letter = client.client_name.charAt(0);

          groups[letter] = groups[letter] || [];
          groups[letter].push(client);

          return groups;
        }, {});

        const result = Object.keys(grouped).map(key => ({ key, clientdet: grouped[key] }));
        this.clients = result;
        resolve(result)
      }, err => {
        console.log('error', err)
        reject(err)
      })
    });
  }
  doGetGroup(client) {
    return new Promise((resolve, reject) => {
      var query = "SELECT * FROM ms_client WHERE is_delete = 0 AND group_id != '' AND group_id='" + client.group_id + "' AND client_id !='" + client.client_id + "' ORDER BY UPPER(client_name)";
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.clientgroup.push(res.item(i))
        }
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doGetProfil(client) {
    this.clientgroup = [];
    this.clientdetail = client;
    this.doGetGroup(client)
    this.clientname = client.client_name
    if (client.client_gender == 'M') {
      this.clientgender = 'Laki-Laki'
    }
    else if (client.client_gender == 'F') {
      this.clientgender = 'Perempuan'
    }
    else {
      this.clientgender = '';
    }
    this.clientbirthdate = moment(client.client_dob).format('DD MMMM YYYY')
    this.clientclass = 'Kelas ' + client.client_class;
    if (client.client_note == '') {
      this.clientnote = '-'
    }
    else {
      this.clientnote = client.client_note
    }
  }
  doDetailClient() {
    this.navCtrl.push('ClientdetailPage', {
      client: this.clientdetail
    })
  }
  doShowMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Prospek',
      buttons: [
        {
          text: 'Buat Baru',
          icon: 'add',
          handler: () => {
            document.getElementById('myModalCreateProspek').style.display = 'block';
            document.getElementById('btnaddprospek').style.display = 'block';
            document.getElementById('btnmenu').style.display = 'none';
            document.getElementById('clientcount').style.display = 'none';
            document.getElementById('addprospek').style.display = 'block';
          }
        }
      ]
    });
    actionSheet.present();
  }
  doCancelAddProspek() {
    document.getElementById('myModalCreateProspek').style.display = 'none';
    document.getElementById('btnaddprospek').style.display = 'none';
    document.getElementById('btnmenu').style.display = 'block';
    document.getElementById('clientcount').style.display = 'block';
    document.getElementById('addprospek').style.display = 'none';
    this.doClearData()
  }
  doCancelUpdProspek() {
    document.getElementById('myModalCreateProspek').style.display = 'none';
    document.getElementById('btnupdprospek').style.display = 'none';
    document.getElementById('btnmenu').style.display = 'block';
    document.getElementById('clientcount').style.display = 'block';
    document.getElementById('updprospek').style.display = 'none';
    this.doClearData()
  }
  doMenuProfil() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Lihat Profil Lengkap',
          icon: 'person',
          handler: () => {
            this.doDetailClient()
          }
        },
        {
          text: 'Ubah',
          icon: 'create',
          handler: () => {
            this.doGetProfilDetail().then(() => {
              this.doGetClientAddress().then(() => {
                this.doGetClientForeignTax().then(() => {
                  this.doGetClientPurpose().then(() => {
                    this.doGetClientIncome().then(() => {
                      document.getElementById('myModalCreateProspek').style.display = 'block';
                      document.getElementById('btnupdprospek').style.display = 'block';
                      document.getElementById('btnmenu').style.display = 'none';
                      document.getElementById('clientcount').style.display = 'none';
                      document.getElementById('updprospek').style.display = 'block';
                    })
                  })
                })
              })
            })
          }
        },
        {
          text: 'Hapus',
          icon: 'remove',
          handler: () => {
            this.overlay = true;
          }
        }
      ]
    });
    actionSheet.present();
  }
  doMenuGrup() {
    if (this.clientgroup.length > 0) {
      const actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Tambah Grup',
            icon: 'add',
            handler: () => {
              this.clientnogroup = [];
              this.clientnogroupsearch = [];
              this.doGetClientNoGrup().then(() => {
                this.clientnogroupsearch = this.clientnogroup
                this.doUncheckAll()
                this.listclient = [];
                document.getElementById('myModalItems').style.display = 'block';
                document.getElementById('btnact').style.display = 'block';
                document.getElementById('btnmenu').style.display = 'none';
                document.getElementById('clientcount').style.display = 'none';
                document.getElementById('tbhgrup').style.display = 'block';
              })
            }
          },
          {
            text: 'Hapus Grup',
            icon: 'create',
            handler: () => {
              this.clientongroup = [];
              this.clientongroupsearch = [];
              this.doGetClientOnGrup().then(() => {
                this.clientongroupsearch = this.clientongroup
                this.doUncheckAllDel()
                this.listclient = [];
                document.getElementById('myModalItemsGroup').style.display = 'block';
                document.getElementById('btndel').style.display = 'block';
                document.getElementById('btnmenu').style.display = 'none';
                document.getElementById('clientcount').style.display = 'none';
                document.getElementById('delgrup').style.display = 'block';
              })
            }
          }
        ]
      });
      actionSheet.present();
    }
    else {
      const actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Buat Grup',
            icon: 'add',
            handler: () => {
              this.clientnogroup = [];
              this.clientnogroupsearch = [];
              this.doGetClientNoGrup().then(() => {
                this.clientnogroupsearch = this.clientnogroup
                this.doUncheckAll()
                this.listclient = [];
                document.getElementById('myModalItems').style.display = 'block';
                document.getElementById('btnaddact').style.display = 'block';
                document.getElementById('btnmenu').style.display = 'none';
                document.getElementById('clientcount').style.display = 'none';
                document.getElementById('addgrup').style.display = 'block';
              })
            }
          }
        ]
      });
      actionSheet.present();
    }
  }
  doDeleteClient() {
    var query = "UPDATE ms_client SET is_delete=1 WHERE client_id=" + "'" + this.clientdetail['client_id'] + "'";
    this.dbProvider.executeQuery(query).then((res: any) => {
      this.doToastSuccess('Hapus client sukses')
      this.client = [];
      this.clients = [];
      this.clientgroup = [];
      this.doGetClient().then((res) => {
        console.log(res[0].clientdet[0])
        this.doGetProfil(res[0].clientdet[0])
      })
      this.doOffOverlay()
    });
  }
  doOffOverlay() {
    this.overlay = false;
  }
  doCancel() {
    this.doUncheckAll()
    this.listclient = [];
    document.getElementById('myModalItems').style.display = 'none';
    document.getElementById('btnact').style.display = 'none';
    document.getElementById('btnmenu').style.display = 'block';
    document.getElementById('clientcount').style.display = 'block';
    document.getElementById('tbhgrup').style.display = 'none';
  }
  doCancelDel() {
    this.doUncheckAllDel()
    this.listclient = [];
    document.getElementById('myModalItemsGroup').style.display = 'none';
    document.getElementById('btndel').style.display = 'none';
    document.getElementById('btnmenu').style.display = 'block';
    document.getElementById('clientcount').style.display = 'block';
    document.getElementById('delgrup').style.display = 'none';
  }
  doCancelCreate() {
    this.doUncheckAll()
    this.listclient = [];
    document.getElementById('myModalItems').style.display = 'none';
    document.getElementById('btnaddact').style.display = 'none';
    document.getElementById('btnmenu').style.display = 'block';
    document.getElementById('clientcount').style.display = 'block';
    document.getElementById('addgrup').style.display = 'none';
  }
  doGetClientNoGrup() {
    return new Promise((resolve, reject) => {
      var query = "SELECT * FROM ms_client WHERE is_delete = 0 AND group_id ='' AND client_id != '" + this.clientdetail['client_id'] + "' ORDER BY UPPER(client_name)";
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.clientnogroup.push(res.item(i))
          this.clientnogroup[i]['Row'] = i
        }
        console.log(this.clientnogroup)
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doGetClientOnGrup() {
    return new Promise((resolve, reject) => {
      var query = "SELECT * FROM ms_client WHERE is_delete = 0 AND group_id ='" + this.clientdetail['group_id'] + "' ORDER BY UPPER(client_name)";
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.clientongroup.push(res.item(i))
          this.clientongroup[i]['Row'] = i
        }
        console.log(this.clientongroup)
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doCheckAll() {
    let checkall: any = document.getElementsByName('listclientall[]')
    if (checkall[0].checked == true) {
      let array: any = document.getElementsByName('listclient[]')
      console.log(array)
      for (let i = 0; i < array.length; i++) {
        array[i].checked = true;
        this.listclient.push(array[i].value)
      }
      console.log(this.listclient)
    }
    else {
      let array: any = document.getElementsByName('listclient[]')
      for (let i = 0; i < array.length; i++) {
        array[i].checked = false;
        this.listclient = [];
      }
      console.log(this.listclient)
    }
  }
  doCheckAllDel() {
    let checkall: any = document.getElementsByName('listclientalldel[]')
    if (checkall[0].checked == true) {
      let array: any = document.getElementsByName('listclientdel[]')
      console.log(array)
      for (let i = 0; i < array.length; i++) {
        array[i].checked = true;
        this.listclient.push(array[i].value)
      }
      console.log(this.listclient)
    }
    else {
      let array: any = document.getElementsByName('listclientdel[]')
      for (let i = 0; i < array.length; i++) {
        array[i].checked = false;
        this.listclient = [];
      }
      console.log(this.listclient)
    }
  }
  doUncheckAll() {
    let checkall: any = document.getElementsByName('listclientall[]')
    checkall[0].checked = false;
    let array: any = document.getElementsByName('listclient[]')
    for (let i = 0; i < array.length; i++) {
      array[i].checked = false;
      this.listclient = [];
    }
    console.log(this.listclient)
  }
  doUncheckAllDel() {
    let checkall: any = document.getElementsByName('listclientalldel[]')
    checkall[0].checked = false;
    let array: any = document.getElementsByName('listclientdel[]')
    for (let i = 0; i < array.length; i++) {
      array[i].checked = false;
      this.listclient = [];
    }
    console.log(this.listclient)
  }
  doCheck(client) {
    console.log(client, document.getElementsByName('listclient[]'))
    let index = client.Row
    let check: any = document.getElementsByName('listclient[]')[index]
    if (check.checked == true) {
      this.listclient.push(check.value)
      console.log(this.listclient)
    }
    else {
      let search = check.value
      console.log(search)
      for (var i = this.listclient.length; i >= 0; i--) {
        console.log(this.listclient, i)
        if (this.listclient[i] === search) {
          this.listclient.splice(i, 1);
        }
      }
      console.log(this.listclient)
    }
  }
  doCheckDel(client) {
    console.log(client, document.getElementsByName('listclientdel[]'))
    let index = client.Row
    let check: any = document.getElementsByName('listclientdel[]')[index]
    if (check.checked == true) {
      this.listclient.push(check.value)
      console.log(this.listclient)
    }
    else {
      let search = check.value
      console.log(search)
      for (var i = this.listclient.length; i >= 0; i--) {
        console.log(this.listclient, i)
        if (this.listclient[i] === search) {
          this.listclient.splice(i, 1);
        }
      }
      console.log(this.listclient)
    }
  }
  doSearch(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.clientnogroup = this.clientnogroupsearch.filter(client => {
        return client["client_name"].toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.clientnogroup = this.clientnogroupsearch;
    }
  }
  doSearchDel(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.clientongroup = this.clientongroupsearch.filter(client => {
        return client["client_name"].toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.clientongroup = this.clientongroupsearch;
    }
  }
  doGetMaxGroupID() {
    if (this.listclient.length > 0) {
      this.dbProvider.getDeviceInfo().then((res: any) => {
        let strDeviceId = res.item(0).device_id.substring(0, 12);
        var query = "SELECT '" + strDeviceId + "' || CAST(IFNULL(MAX(CAST(SUBSTR(group_id, 13, LENGTH(group_id)) as INT)), 0) + 1 as TEXT) as maxGroupId FROM ms_client WHERE SUBSTR(client_id, 0, 13) = '" + strDeviceId + "'"
        this.dbProvider.executeQuery(query).then((result: any) => {
          let maxgroupid = result.item(0).maxGroupId
          this.doCreateGroup(maxgroupid)
        }, err => {

        })
      }, err => {

      })
    }
    else {
      this.doToastError('Silahkan pilih client terlebih dahulu !!')
    }
  }
  doCreateGroup(maxgroupid) {
    this.listclient.push(this.clientdetail['client_id'])
    var cmd = []
    for (let i = 0; i < this.listclient.length; i++) {
      var query = "UPDATE ms_client SET group_id='" + maxgroupid + "' WHERE client_id =" + "'" + this.listclient[i] + "'"
      cmd.push(query)
    }
    this.dbProvider.executeQueryArr(cmd).then(() => {
      this.doToastSuccess('Create Sukses')
      this.client = [];
      this.clients = [];
      this.clientgroup = [];
      this.doGetClient().then((res) => {
        console.log(res[0].clientdet[0])
        this.doGetProfil(res[0].clientdet[0])
      })
      this.doCancelCreate()
    }, err => {
      this.doToastError(err)
    })
  }
  doAddGroup() {
    if (this.listclient.length > 0) {
      var cmd = []
      for (let i = 0; i < this.listclient.length; i++) {
        var query = "UPDATE ms_client SET group_id = (SELECT group_id FROM ms_client WHERE client_id = '" + this.clientdetail['client_id'] + "') WHERE client_id =" + "'" + this.listclient[i] + "'"
        cmd.push(query)
      }
      this.dbProvider.executeQueryArr(cmd).then(() => {
        this.doToastSuccess('Grup telah ditambahkan')
        this.client = [];
        this.clients = [];
        this.clientgroup = [];
        this.doGetClient().then((res) => {
          console.log(res[0].clientdet[0])
          this.doGetProfil(res[0].clientdet[0])
        })
        this.doCancel()
      }, err => {
        this.doToastError(err)
      })
    }
    else {
      this.doToastError('Silahkan pilih client terlebih dahulu !!')
    }
  }
  doDelGroup() {
    if (this.listclient.length > 0) {
      console.log(this.clientgroup.length, this.listclient.length)
      if ((this.clientgroup.length - this.listclient.length) >= 1) {
        var cmd = []
        for (let i = 0; i < this.listclient.length; i++) {
          var query = "UPDATE ms_client SET group_id='' WHERE client_id =" + "'" + this.listclient[i] + "'"
          cmd.push(query)
        }
        this.dbProvider.executeQueryArr(cmd).then(() => {
          this.doToastSuccess('Hapus Sukses')
          this.client = [];
          this.clients = [];
          this.clientgroup = [];
          this.doGetClient().then((res) => {
            console.log(res[0].clientdet[0])
            this.doGetProfil(res[0].clientdet[0])
          })
          this.doCancelDel()
        }, err => {
          this.doToastError(err)
        })
      }
      else {
        var query = "UPDATE ms_client SET group_id='' WHERE group_id=" + "'" + this.clientgroup[0]['group_id'] + "'";
        this.dbProvider.executeQuery(query).then((res: any) => {
          this.doToastSuccess('Hapus Sukses')
          this.client = [];
          this.clients = [];
          this.clientgroup = [];
          this.doGetClient().then((res) => {
            console.log(res[0].clientdet[0])
            this.doGetProfil(res[0].clientdet[0])
          })
          this.doCancelDel()
        }, err => {
        });
      }
    }
    else {
      this.doToastError('Silahkan pilih client terlebih dahulu !!')
    }
  }
  doToastError(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      cssClass: 'error',
      position: 'bottom'
    });

    toast.present();
  }
  doToastSuccess(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      cssClass: 'success',
      position: 'bottom'
    });

    toast.present();
  }
  doConfirmDeleteGroup(group) {
    this.clientgrupselect = group;
    this.clientnamegrupselect = group.client_name
    if (group.client_gender == 'M') {
      this.clientgendergrupselect = 'Laki-Laki'
    }
    else if (group.client_gender == 'F') {
      this.clientgendergrupselect = 'Perempuan'
    }
    else {
      this.clientgendergrupselect = '';
    }
    this.clientbirthdategrupselect = moment(group.client_dob).format('DD MMMM YYYY')
    this.clientclassgrupselect = 'Kelas ' + group.client_class;
    this.overlaygroup = true;
  }
  doOffConfirmDeleteGroup() {
    this.overlaygroup = false;
  }
  doDeleteGrup() {
    console.log('length' + this.clientgroup.length, this.clientgrupselect)
    if (this.clientgroup.length >= 2) {
      var query = "UPDATE ms_client SET group_id='' WHERE client_id=" + "'" + this.clientgrupselect['client_id'] + "'";
    }
    else {
      var query = "UPDATE ms_client SET group_id='' WHERE group_id=" + "'" + this.clientgrupselect['group_id'] + "'";
    }
    this.dbProvider.executeQuery(query).then((res: any) => {
      this.doToastSuccess('Hapus grup sukses')
      this.client = [];
      this.clients = [];
      this.clientgroup = [];
      this.doGetClient().then((res) => {
        console.log(res[0].clientdet[0])
        this.doGetProfil(res[0].clientdet[0])
      })
      this.doOffConfirmDeleteGroup()
    }, err => {
    });
  }
  doDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
        this.tgllahir = moment(date).format('YYYY-MM-DD')
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  doOpenListTipeID() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'IdType'"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Tipe ID'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doOpenListNegara() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Country' ORDER BY TRIM(code_desc1) ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Negara'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowOptionJkel() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Sex'"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Jenis Kelamin'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowClass() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Occupation Class' ORDER BY TRIM(code_value) ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        if (this.listoptions[i].code_value == '1') {
          this.listoptions[i]['description'] = 'Bekerja administratif 100% di dalam ruangan'
          this.listoptions[i]['note'] = 'Contoh: Kasir, Teller Bank, Guru Sekolah, Dokter, Ibu Rumah Tangga, Anak'
        }
        else if (this.listoptions[i].code_value == '2') {
          this.listoptions[i]['description'] = 'Bekerja administratif di dalam ruangan dan terkadang di lapangan'
          this.listoptions[i]['note'] = 'Contoh: Tenaga Penjual, Agen, Manajer Pabrik'
        }
        else if (this.listoptions[i].code_value == '3') {
          this.listoptions[i]['description'] = 'Bekerja di lingkungan berisiko dengan keselamatan kerja yang terjamin'
          this.listoptions[i]['note'] = 'Contoh: Buruh, Satpam, Supir Bus/Truk'
        }
      }
      this.titleoption = 'Kelas Pekerjaan'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowBidangUsaha() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Field of Work' ORDER BY TRIM(code_value) ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Bidang Usaha'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowJabatan() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Position'"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Jabatan'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowPekerjaan() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Occupation'"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Uraian Pekerjaan'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowListStatusNikah() {
    this.listoptions = [];
    this.listoptions.push({ 'code_value': 'S', 'code_desc1': 'Belum Menikah', 'description': '', 'note': '' }, { 'code_value': 'M', 'code_desc1': 'Menikah', 'description': '', 'note': '' }, { 'code_value': 'd', 'code_desc1': 'Duda/Janda', 'description': '', 'note': '' })
    this.titleoption = 'Status Pernikahan'
    this.doShowOption()
    console.log(this.listoptions)
  }
  doShowListKewarganegaraan() {
    this.listoptions = [];
    this.listoptions.push({ 'code_value': 'WNI', 'code_desc1': 'WNI', 'description': '', 'note': '' }, { 'code_value': 'WNA', 'code_desc1': 'WNA', 'description': '', 'note': '' })
    this.titleoption = 'Kewarganegaraan'
    this.doShowOption()
    console.log(this.listoptions)
  }
  doShowPendidikan() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Education'"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Pendidikan Formal Terakhir'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowHobi() {
    this.listoptions = [];
    this.listoptions.push({ 'code_value': 'Y', 'code_desc1': 'Ya', 'description': '', 'note': '' }, { 'code_value': 'N', 'code_desc1': 'Tidak', 'description': '', 'note': '' })
    this.titleoption = 'Hobi Berisiko Tinggi'
    this.doShowOption()
    console.log(this.listoptions)
  }
  doShowAlamatNegara() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Country' ORDER BY TRIM(code_desc1) ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Alamat Negara'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doAlamatBerbeda() {
    this.listoptions = [];
    this.listoptions.push({ 'code_value': 'Y', 'code_desc1': 'Ya', 'description': '', 'note': '' }, { 'code_value': 'N', 'code_desc1': 'Tidak', 'description': '', 'note': '' })
    this.titleoption = 'Alamat Berbeda'
    this.doShowOption()
    console.log(this.listoptions)
  }
  doTipeAlamat() {
    if (this.alamatkorespondensi == 'Ya') {
      this.listoptions = [];
      this.listoptions.push({ 'code_value': 'H', 'code_desc1': 'Rumah', 'description': '', 'note': '' }, { 'code_value': 'O', 'code_desc1': 'Kantor', 'description': '', 'note': '' }, { 'code_value': 'L', 'code_desc1': 'Lainnya', 'description': '', 'note': '' })
      this.titleoption = 'Tipe Alamat'
      this.doShowOption()
      console.log(this.listoptions)
    }
  }
  doShowAlamatKorespondensiNegara() {
    if (this.alamatkorespondensi == 'Ya') {
      this.listoptions = [];
      var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Country' ORDER BY TRIM(code_desc1) ASC"
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.listoptions.push(res.item(i))
          this.listoptions[i]['description'] = ''
          this.listoptions[i]['note'] = ''
        }
        this.titleoption = 'Alamat Negara Korespondensi'
        this.doShowOption()
        console.log(this.listoptions)
      });
    }
  }
  doShowNPWPAsing() {
    this.listoptions = [];
    this.listoptions.push({ 'code_value': 'Y', 'code_desc1': 'Ya', 'description': '', 'note': '' }, { 'code_value': 'N', 'code_desc1': 'Tidak', 'description': '', 'note': '' })
    this.titleoption = 'Wajib Pajak Negara Asing'
    this.doShowOption()
    console.log(this.listoptions)
  }
  doShowNegaraNPWP() {
    if (this.npwpasing == 'Ya') {
      this.listoptions = [];
      var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Country' ORDER BY TRIM(code_desc1) ASC"
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.listoptions.push(res.item(i))
          this.listoptions[i]['description'] = ''
          this.listoptions[i]['note'] = ''
        }
        this.titleoption = 'Negara / Jurisdiksi'
        this.doShowOption()
        console.log(this.listoptions)
      });
    }
  }
  doSumberPenghasilan() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Source Income' ORDER BY TRIM(code_desc1) ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Sumber Penghasilan'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowPerkiraanKotor() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Gross Income' ORDER BY TRIM(code_desc1) ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Penghasilan Kotor'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doTujuanPembelian() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Purpose' ORDER BY TRIM(code_desc1) ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Tujuan Membeli Asuransi'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doShowMataUang() {
    this.listoptions = [];
    this.listoptions.push({ 'code_value': 'RP.', 'code_desc1': 'RP.', 'description': '', 'note': '' }, { 'code_value': 'USD', 'code_desc1': 'USD', 'description': '', 'note': '' })
    this.titleoption = 'Mata Uang Rekening'
    this.doShowOption()
    console.log(this.listoptions)
  }
  doShowOption() {
    this.overlayoption = true;
  }
  doOffOverlayOption() {
    this.overlayoption = false;
  }
  doSelectOption(option) {
    this.doOffOverlayOption()
    if (this.titleoption == 'Tipe ID') {
      this.datapost['tipeid'] = option.code_value.replace(/\s/g, '');
      this.tipeid = option.code_desc1
    }
    else if (this.titleoption == 'Negara') {
      this.datapost['negara'] = option.code_value.replace(/\s/g, '');
      this.negara = option.code_desc1
    }
    else if (this.titleoption == 'Jenis Kelamin') {
      this.datapost['jkel'] = option.code_value.replace(/\s/g, '');
      this.jkel = option.code_desc1
    }
    else if (this.titleoption == 'Jenis Kelamin Search') {
      this.datapost['jkelsearch'] = option.code_value.replace(/\s/g, '');
      this.jkelsearch = option.code_desc1
    }
    else if (this.titleoption == 'Kelas Pekerjaan') {
      this.datapost['kelaspekerjaan'] = option.code_value.replace(/\s/g, '');
      this.kelaspekerjaan = option.code_desc1
    }
    else if (this.titleoption == 'Bidang Usaha') {
      this.datapost['bidangusaha'] = option.code_value.replace(/\s/g, '');
      this.bidangusaha = option.code_desc1
    }
    else if (this.titleoption == 'Jabatan') {
      this.datapost['jabatan'] = option.code_value.replace(/\s/g, '');
      this.jabatan = option.code_desc1
    }
    else if (this.titleoption == 'Uraian Pekerjaan') {
      this.datapost['uraianpekerjaan'] = option.code_value.replace(/\s/g, '');
      this.uraianpekerjaan = option.code_desc1
    }
    else if (this.titleoption == 'Status Pernikahan') {
      this.datapost['statuspernikahan'] = option.code_value.replace(/\s/g, '');
      this.statuspernikahan = option.code_desc1
    }
    else if (this.titleoption == 'Kewarganegaraan') {
      this.datapost['kewarganegaraan'] = option.code_value.replace(/\s/g, '');
      this.kewarganegaraan = option.code_desc1
    }
    else if (this.titleoption == 'Pendidikan Formal Terakhir') {
      this.datapost['pendidikan'] = option.code_value.replace(/\s/g, '');
      this.pendidikan = option.code_desc1
    }
    else if (this.titleoption == 'Hobi Berisiko Tinggi') {
      this.datapost['resikohobi'] = option.code_value.replace(/\s/g, '');
      this.resikohobi = option.code_desc1
    }
    else if (this.titleoption == 'Alamat Negara') {
      this.datapost['alamatnegara'] = option.code_value.replace(/\s/g, '');
      this.alamatnegara = option.code_desc1
    }
    else if (this.titleoption == 'Alamat Berbeda') {
      this.datapost['alamatkorespondensi'] = option.code_value.replace(/\s/g, '');
      this.alamatkorespondensi = option.code_desc1
    }
    else if (this.titleoption == 'Tipe Alamat') {
      this.datapost['tipealamatkorespondensi'] = option.code_value.replace(/\s/g, '');
      this.tipealamatkorespondensi = option.code_desc1
    }
    else if (this.titleoption == 'Alamat Negara Korespondensi') {
      this.datapost['alamatnegarakorespondensi'] = option.code_value.replace(/\s/g, '');
      this.alamatnegarakorespondensi = option.code_desc1
    }
    else if (this.titleoption == 'Wajib Pajak Negara Asing') {
      this.datapost['npwpasing'] = option.code_value.replace(/\s/g, '');
      this.npwpasing = option.code_desc1
    }
    else if (this.titleoption == 'Negara / Jurisdiksi') {
      this.datapost['negaranpwpasing'] = option.code_value.replace(/\s/g, '');
      this.negaranpwpasing = option.code_desc1
    }
    else if (this.titleoption == 'Sumber Penghasilan') {
      this.datapost['penghasilan'] = option.code_value.replace(/\s/g, '');
      this.penghasilan = option.code_desc1
    }
    else if (this.titleoption == 'Penghasilan Kotor') {
      this.datapost['penghasilankotor'] = option.code_value.replace(/\s/g, '');
      this.penghasilankotor = option.code_desc1
    }
    else if (this.titleoption == 'Tujuan Membeli Asuransi') {
      this.datapost['tujuanpembelian'] = option.code_value.replace(/\s/g, '');
      this.tujuanpembelian = option.code_desc1
    }
    else if (this.titleoption == 'Mata Uang Rekening') {
      this.datapost['matauangrekening'] = option.code_value.replace(/\s/g, '');
      this.matauangrekening = option.code_desc1
    }
  }
  doCreateProspek() {
    if (this.nama == '') {
      this.doToastError('Nama tidak boleh kosong !!')
    }
    else if (this.tgllahir == '') {
      this.doToastError('Tanggal Lahir tidak boleh kosong !!')
    }
    else if (this.jkel == '') {
      this.doToastError('Jenis Kelamin tidak boleh kosong !!')
    }
    else if (this.kelaspekerjaan == '') {
      this.doToastError('Kelas Pekerjaan tidak boleh kosong !!')
    }
    else {
      this.doGetMaxClientID()
    }
  }
  doGetMaxClientID() {
    this.dbProvider.getDeviceInfo().then((res: any) => {
      let strDeviceId = res.item(0).device_id.substring(0, 12);
      var query = "SELECT '" + strDeviceId + "' || CAST(IFNULL(MAX(CAST(SUBSTR(client_id, 13, LENGTH(client_id)) as INT)), 0) + 1 as TEXT) as maxClientID FROM ms_client WHERE SUBSTR(client_id, 0, 13) = '" + strDeviceId + "'"
      this.dbProvider.executeQuery(query).then((result: any) => {
        let maxClientID = result.item(0).maxClientID
        this.doCreateClient(maxClientID)
      }, err => {

      })
    }, err => {

    })
  }
  doCreateClient(maxClientID) {
    var queryinsertmsclient = "INSERT INTO ms_client (client_id, client_name, client_gender, client_dob, client_class, client_job, client_note, client_smoker, group_id, create_date, last_update, is_delete, client_company, client_marriage, client_business_fields, client_position, client_occupation, client_education, client_hobby, client_email, client_mobile_phone, client_nationality, client_npwp, client_gross_inc, client_bank_account_name, client_curr, client_bank_account_num, client_bank_branch, client_bank_city, client_bank_name, client_birthplace, client_country, client_id_type, client_id_no) " +
      "VALUES(" +
      '"' + maxClientID + '",' +
      '"' + this.nama + '",' +
      '"' + this.datapost['jkel'] + '",' +
      '"' + this.tgllahir + '",' +
      '"' + this.datapost['kelaspekerjaan'] + '",' +
      '"",' +
      '"' + this.catatan + '",' +
      '"",' +
      '"",' +
      '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
      '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
      0 + "," +
      '"' + this.namaperusahaan + '",' +
      '"' + this.datapost['statuspernikahan'] + '",' +
      '"' + this.datapost['bidangusaha'] + '",' +
      '"' + this.datapost['jabatan'] + '",' +
      '"' + this.datapost['uraianpekerjaan'] + '",' +
      '"' + this.datapost['pendidikan'] + '",' +
      '"' + this.hobi + '",' +
      '"' + this.email + '",' +
      '"' + this.nohp + '",' +
      '"' + this.datapost['kewarganegaraan'] + '",' +
      '"' + this.npwpkorespondensi + '",' +
      '"' + this.datapost['penghasilankotor'] + '",' +
      '"' + this.namarekening + '",' +
      '"' + this.datapost['matauangrekening'] + '",' +
      '"' + this.norekening + '",' +
      '"' + this.cabangbank + '",' +
      '"' + this.kotabank + '",' +
      '"' + this.namabank + '",' +
      '"' + this.kota + '",' +
      '"' + this.datapost['negara'] + '",' +
      '"' + this.datapost['tipeid'] + '",' +
      '"' + this.noid + '"' +
      "); "
    this.dbProvider.executeQuery(queryinsertmsclient).then((res: any) => {
      this.doCreateClientAddressHome(maxClientID)
    }, err => {
      console.log(err)
    });
  }
  doCreateClientAddressHome(maxClientID) {
    var query = "INSERT INTO tr_client_address (client_id, address_type, address1, address2, address3, address4, address_city, address_postal_code, address_phone, address_fax, create_date, last_update, address_country) " +
      "VALUES(" +
      '"' + maxClientID + '",' +
      '"H",' +
      '"' + this.alamat1 + '",' +
      '"' + this.alamat2 + '",' +
      '"' + this.rtrw + '",' +
      '"' + this.kelurahan + '",' +
      '"' + this.kotaalamat + '",' +
      '"' + this.kodepos + '",' +
      '"' + this.telpalamat + '",' +
      '"' + this.faxalamat + '",' +
      '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
      '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
      '"' + this.datapost['alamatnegara'] + '"' +
      "); "
    this.dbProvider.executeQuery(query).then((res: any) => {
      this.doCreateClientAddressKorespondensi(maxClientID)
    }, err => {
      console.log(err)
    });
  }
  doCreateClientAddressKorespondensi(maxClientID) {
    if (this.alamatkorespondensi == 'Ya') {
      var querykorespondensi = "INSERT INTO tr_client_address (client_id, address_type, address1, address2, address3, address4, address_city, address_postal_code, address_phone, address_fax, create_date, last_update, address_country) " +
        "VALUES(" +
        '"' + maxClientID + '",' +
        '"' + this.datapost['tipealamatkorespondensi'] + '",' +
        '"' + this.alamat1korespondensi + '",' +
        '"' + this.alamat2korespondensi + '",' +
        '"' + this.rtrwkorespondensi + '",' +
        '"' + this.kelurahankorespondensi + '",' +
        '"' + this.kotakorespondensi + '",' +
        '"' + this.kodeposkorespondensi + '",' +
        '"' + this.telpalamatkorespondensi + '",' +
        '"' + this.faxalamatkorespondensi + '",' +
        '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
        '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
        '"' + this.datapost['alamatnegarakorespondensi'] + '"' +
        "); "
      this.dbProvider.executeQuery(querykorespondensi).then((res: any) => {
        this.doCreateClientTax(maxClientID)
      }, err => {
        console.log(err)
      });
    }
    else {
      this.doCreateClientTax(maxClientID)
    }
  }
  doCreateClientTax(maxClientID) {
    if (this.clientforeigntax.length != 0) {
      var cmd = []
      for (let i = 0; i < this.clientforeigntax.length; i++) {
        var query = "INSERT INTO tr_client_foreign_tax (client_id, foreign_tax_type, foreign_tax_country, foreign_tax_tin, foreign_tax_tin_remark, create_date, last_update, foreign_tax_seq) " +
          "VALUES(" +
          '"' + maxClientID + '",' +
          '"' + this.datapost['npwpasing'] + '",' +
          '"' + this.clientforeigntax[i].foreign_tax_country + '",' +
          '"' + this.clientforeigntax[i].foreign_tax_tin + '",' +
          '"' + this.clientforeigntax[i].foreign_tax_tin_remark + '",' +
          '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
          '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
          '(SELECT CAST(IFNULL(MAX(CAST(foreign_tax_seq as INT)), 0) + 1 as TEXT) as seq FROM tr_client_foreign_tax WHERE client_id = ' + '"' + maxClientID + '")' +
          "); "
        cmd.push(query)
      }
      this.dbProvider.executeQueryArr(cmd).then(() => {
        this.doCreateClientPenghasilan(maxClientID)
      }, err => {
        this.doToastError(err)
      })
    }
    else {
      this.doCreateClientPenghasilan(maxClientID)
    }
  }
  doCreateClientPenghasilan(maxClientID) {
    if (this.clientincome.length != 0) {
      var cmd = []
      for (let i = 0; i < this.clientincome.length; i++) {
        var query = "INSERT INTO tr_client_source_income (client_id, salary_code, salary_seq, salary_remark, create_date, update_date) " +
          "VALUES(" +
          '"' + maxClientID + '",' +
          '"' + this.clientincome[i].salary_code + '",' +
          '(SELECT CAST(IFNULL(MAX(CAST(salary_seq as INT)), 0) + 1 as TEXT) as seq FROM tr_client_source_income WHERE client_id = ' + '"' + maxClientID + '"),' +
          '"' + this.clientincome[i].salary_remark + '",' +
          '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
          '"' + moment().format('YYYY-MM-DD HH:mm') + '"' +
          '' +
          "); "
        cmd.push(query)
      }
      this.dbProvider.executeQueryArr(cmd).then(() => {
        this.doCreateClientPurpose(maxClientID)
      }, err => {
        this.doToastError(err)
      })
    }
    else {
      this.doCreateClientPurpose(maxClientID)
    }
  }
  doCreateClientPurpose(maxClientID) {
    if (this.clientpurpose.length != 0) {
      var cmd = []
      for (let i = 0; i < this.clientpurpose.length; i++) {
        var query = "INSERT INTO tr_client_purpose (client_id, purpose_seq, purpose_code, purpose_remark, create_date, update_date) " +
          "VALUES(" +
          '"' + maxClientID + '",' +
          '(SELECT CAST(IFNULL(MAX(CAST(purpose_seq as INT)), 0) + 1 as TEXT) as seq FROM tr_client_purpose WHERE client_id = ' + '"' + maxClientID + '"),' +
          '"' + this.clientpurpose[i].purpose_code + '",' +
          '"' + this.clientpurpose[i].purpose_remark + '",' +
          '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
          '"' + moment().format('YYYY-MM-DD HH:mm') + '"' +
          "); "
        cmd.push(query)
      }
      this.dbProvider.executeQueryArr(cmd).then(() => {
        this.doCancelAddProspek()
        this.doCancelUpdProspek()
        this.doToastSuccess('Sukses')
        this.client = [];
        this.clients = [];
        this.clientgroup = [];
        this.doGetClient().then((res) => {
          console.log(res[0].clientdet[0])
          this.doGetProfil(res[0].clientdet[0])
        })
      }, err => {
        this.doToastError(err)
      })
    }
    else {
      this.doCancelAddProspek()
      this.doCancelUpdProspek()
      this.doToastSuccess('Sukses')
      this.client = [];
      this.clients = [];
      this.clientgroup = [];
      this.doGetClient().then((res) => {
        console.log(res[0].clientdet[0])
        this.doGetProfil(res[0].clientdet[0])
      })
    }
  }
  doClearData() {
    this.listoptions = [];
    this.titleoption = '';
    this.nama = '';
    this.tipeid = '';
    this.noid = '';
    this.tgllahir = '';
    this.kota = '';
    this.negara = '';
    this.jkel = '';
    this.kelaspekerjaan = '';
    this.namaperusahaan = '';
    this.bidangusaha = '';
    this.jabatan = '';
    this.uraianpekerjaan = '';
    this.email = '';
    this.nohp = '';
    this.statuspernikahan = '';
    this.kewarganegaraan = '';
    this.pendidikan = '';
    this.resikohobi = '';
    this.hobi = '';
    this.alamat1 = '';
    this.alamat2 = '';
    this.rtrw = '';
    this.kelurahan = '';
    this.kotaalamat = '';
    this.kodepos = '';
    this.alamatnegara = '';
    this.telpalamat = '';
    this.faxalamat = '';
    this.alamatkorespondensi = '';
    this.tipealamatkorespondensi = '';
    this.alamat1korespondensi = '';
    this.alamat2korespondensi = '';
    this.rtrwkorespondensi = '';
    this.kelurahankorespondensi = '';
    this.kotakorespondensi = '';
    this.kodeposkorespondensi = '';
    this.alamatnegarakorespondensi = '';
    this.telpalamatkorespondensi = '';
    this.faxalamatkorespondensi = '';
    this.npwpkorespondensi = '';
    this.npwpasing = '';
    this.negaranpwpasing = '';
    this.tin = '';
    this.notetin = '';
    this.penghasilan = '';
    this.notepenghasilan = '';
    this.penghasilankotor = '';
    this.tujuanpembelian = '';
    this.notepembelian = '';
    this.namarekening = '';
    this.matauangrekening = '';
    this.norekening = '';
    this.namabank = '';
    this.cabangbank = '';
    this.kotabank = '';
    this.catatan = ''
    this.clientforeigntax = [];
    this.clientincome = [];
    this.clientpurpose = [];
    this.datapost = [];
  }
  doAddTin() {
    console.log(this.clientforeigntax)
    this.clientforeigntax.push({ 'foreign_tax_type': this.datapost['npwpasing'], 'foreign_tax_country': this.datapost['negaranpwpasing'], 'code_desc1': this.negaranpwpasing, 'foreign_tax_tin': this.tin, 'foreign_tax_tin_remark': this.notetin })
    this.datapost['npwpasing']
    this.datapost['negaranpwpasing']
    this.negaranpwpasing = '';
    this.tin = '';
    this.notetin = '';
    console.log(this.clientforeigntax)
  }
  doDeleteTin(foreigntax) {
    for (var i = this.clientforeigntax.length - 1; i >= 0; i--) {
      console.log('aa', i, this.clientforeigntax[i], foreigntax)
      if (this.clientforeigntax[i].code_desc1 === foreigntax.code_desc1 && this.clientforeigntax[i].foreign_tax_tin === foreigntax.foreign_tax_tin && this.clientforeigntax[i].foreign_tax_tin_remark === foreigntax.foreign_tax_tin_remark) {
        this.clientforeigntax.splice(i, 1);
      }
    }
  }
  doAddPenghasilan() {
    console.log(this.clientincome)
    this.clientincome.push({ 'salary_code': this.datapost['penghasilan'], 'code_desc1': this.penghasilan, 'salary_remark': this.notepenghasilan })
    this.datapost['penghasilan']
    this.penghasilan = '';
    this.notepenghasilan = '';
    console.log(this.clientincome)
  }
  doDeletePenghasilan(income) {
    for (var i = this.clientincome.length - 1; i >= 0; i--) {
      console.log('aa', i, this.clientincome[i], income)
      if (this.clientincome[i].code_desc1 === income.code_desc1 && this.clientincome[i].salary_remark === income.salary_remark) {
        this.clientincome.splice(i, 1);
      }
    }
  }
  doAddPembelianAsuransi() {
    console.log(this.clientpurpose)
    this.clientpurpose.push({ 'purpose_code': this.datapost['tujuanpembelian'], 'code_desc2': this.tujuanpembelian, 'purpose_remark': this.notepembelian })
    this.datapost['tujuanpembelian']
    this.tujuanpembelian = ''
    this.notepembelian = '';
    console.log(this.clientpurpose)
  }
  doDeletePembelianAsuransi(purpose) {
    for (var i = this.clientpurpose.length - 1; i >= 0; i--) {
      console.log('aa', i, this.clientpurpose[i], purpose)
      if (this.clientpurpose[i].code_desc2 === purpose.code_desc2 && this.clientpurpose[i].purpose_remark === purpose.purpose_remark) {
        this.clientpurpose.splice(i, 1);
      }
    }
  }
  doGetProfilDetail() {
    return new Promise((resolve, reject) => {
      var query = "SELECT (select b.code_desc1 from ms_client a " +
        "INNER JOIN gomsapplication.ms_code b ON a.client_marriage = TRIM(b.code_value) " +
        "WHERE " +
        "TRIM(b.code_key) = 'Marital Status' " +
        "AND a.client_id = '" + this.clientdetail['client_id'] + "') as marriage," +
        "(select b.code_desc1 from ms_client a " +
        "INNER JOIN gomsapplication.ms_code b ON a.client_business_fields = TRIM(b.code_value) " +
        "WHERE " +
        "TRIM(b.code_key) = 'Field of Work'" +
        "AND a.client_id = '" + this.clientdetail['client_id'] + "') as fieldwork," +
        "(select b.code_desc1 from ms_client a " +
        "INNER JOIN gomsapplication.ms_code b ON a.client_position = TRIM(b.code_value) " +
        "WHERE " +
        "TRIM(b.code_key) = 'Position'" +
        "AND a.client_id = '" + this.clientdetail['client_id'] + "') as position," +
        "(select b.code_desc1 from ms_client a " +
        "INNER JOIN gomsapplication.ms_code b ON a.client_occupation = TRIM(b.code_value) " +
        "WHERE " +
        "TRIM(b.code_key) = 'Occupation'" +
        "AND a.client_id = '" + this.clientdetail['client_id'] + "') as occupation," +
        "(select b.code_desc1 from ms_client a " +
        "INNER JOIN gomsapplication.ms_code b ON a.client_education = TRIM(b.code_value) " +
        "WHERE " +
        "TRIM(b.code_key) = 'Education'" +
        "AND a.client_id = '" + this.clientdetail['client_id'] + "') as education," +
        "(select b.code_desc1 from ms_client a " +
        "INNER JOIN gomsapplication.ms_code b ON a.client_gross_inc = TRIM(b.code_value) " +
        "WHERE " +
        "TRIM(b.code_key) = 'Gross Income'" +
        "AND a.client_id = '" + this.clientdetail['client_id'] + "') as grossincome," +
        "(select b.code_desc1 from ms_client a " +
        "INNER JOIN gomsapplication.ms_code b ON a.client_country = TRIM(b.code_value) " +
        "WHERE " +
        "TRIM(b.code_key) = 'Country'" +
        "AND a.client_id = '" + this.clientdetail['client_id'] + "') as country"
      this.dbProvider.executeQuery(query).then((res: any) => {
        this.nama = this.clientdetail['client_name']
        this.datapost['tipeid'] = this.clientdetail['client_id_type']
        this.tipeid = this.clientdetail['client_id_type']
        this.tgllahir = moment(this.clientdetail['client_dob']).format('YYYY-MM-DD')
        this.noid = this.clientdetail['client_id_no']
        this.kota = this.clientdetail['client_birthplace']
        this.datapost['negara'] = this.clientdetail['client_country']
        this.negara = res.item(0).country
        if (this.clientdetail['client_gender'] == 'M') {
          this.datapost['jkel'] = 'M'
          this.jkel = 'Laki-Laki'
        }
        else {
          this.datapost['jkel'] = 'F'
          this.jkel = 'Perempuan'
        }
        this.datapost['kelaspekerjaan'] = this.clientdetail['client_class']
        this.kelaspekerjaan = 'Kelas ', this.clientdetail['client_class']
        this.namaperusahaan = this.clientdetail['client_company']
        this.datapost['bidangusaha'] = this.clientdetail['client_business_fields']
        this.bidangusaha = res.item(0).fieldwork
        this.datapost['jabatan'] = this.clientdetail['client_position']
        this.jabatan = res.item(0).position
        this.datapost['uraianpekerjaan'] = this.clientdetail['client_occupation']
        this.uraianpekerjaan = res.item(0).occupation
        this.email = this.clientdetail['client_email']
        this.nohp = this.clientdetail['client_mobile_phone']
        this.datapost['statuspernikahan'] = this.clientdetail['client_marriage']
        this.statuspernikahan = res.item(0).marriage
        this.datapost['penghasilankotor'] = this.clientdetail['client_gross_inc']
        this.penghasilankotor = res.item(0).grossincome
        this.datapost['kewarganegaraan'] = this.clientdetail['client_nationality']
        this.kewarganegaraan = this.clientdetail['client_nationality']
        this.datapost['pendidikan'] = this.clientdetail['client_education']
        this.pendidikan = res.item(0).education
        if (this.clientdetail['client_hobby'] == '') {
          this.resikohobi = 'Tidak'
          this.hobi = '-'
        }
        else {
          this.resikohobi = 'Ya'
          this.hobi = this.clientdetail['client_hobby']
        }
        this.npwpkorespondensi = this.clientdetail['client_npwp']
        this.namarekening = this.clientdetail['client_bank_account_name']
        this.datapost['matauangrekening'] = this.clientdetail['client_curr']
        this.matauangrekening = this.clientdetail['client_curr']
        this.norekening = this.clientdetail['client_bank_account_num']
        this.namabank = this.clientdetail['client_bank_name']
        this.cabangbank = this.clientdetail['client_bank_branch']
        this.kotabank = this.clientdetail['client_bank_city']
        this.catatan = this.clientdetail['client_note']
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doGetClientAddress() {
    return new Promise((resolve, reject) => {
      var query = "SELECT a.*,b.code_desc1 FROM tr_client_address a INNER JOIN gomsapplication.ms_code b ON a.address_country = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Country' AND a.client_id=" + "'" + this.clientdetail['client_id'] + "'";
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          if (res.item(i).address_type == 'H') {
            if (res.item(i).address1 != '') {
              this.alamat1 = res.item(i).address1
              this.alamat2 = res.item(i).address2
              this.rtrw = res.item(i).address3
              this.kelurahan = res.item(i).address4
              this.kotaalamat = res.item(i).address_city
              this.kodepos = res.item(i).address_postal_code
              this.datapost['alamatnegara'] = res.item(i).address_country
              this.alamatnegara = res.item(i).code_desc1
              this.telpalamat = res.item(i).address_phone
              this.faxalamat = res.item(i).address_fax
            }
          }
          else {
            if (res.item(i).address_type != '') {
              this.alamatkorespondensi = 'Ya'
              if (res.item(i).address_type == 'O') {
                this.datapost['tipealamatkorespondensi'] = 'O'
                this.tipealamatkorespondensi = "OFFICE"
              }
              else {
                this.datapost['tipealamatkorespondensi'] = 'L'
                this.tipealamatkorespondensi = "OTHER"
              }
              this.alamat1korespondensi = res.item(i).address1
              this.alamat2korespondensi = res.item(i).address2
              this.rtrwkorespondensi = res.item(i).address3
              this.kelurahankorespondensi = res.item(i).address4
              this.kotakorespondensi = res.item(i).address_city
              this.kodeposkorespondensi = res.item(i).address_postal_code
              this.datapost['alamatnegarakorespondensi'] = res.item(i).address_country
              this.alamatnegarakorespondensi = res.item(i).code_desc1
              this.telpalamatkorespondensi = res.item(i).address_phone
              this.faxalamatkorespondensi = res.item(i).address_fax
            }
            else {
              this.alamatkorespondensi = 'Tidak'
            }
          }
        }
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doGetClientForeignTax() {
    return new Promise((resolve, reject) => {
      var query = "SELECT a.*,b.code_desc1 FROM tr_client_foreign_tax a INNER JOIN gomsapplication.ms_code b ON a.foreign_tax_country = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Country' AND a.client_id='" + this.clientdetail['client_id'] + "' ORDER BY a.foreign_tax_seq ASC"
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.datapost['npwpasing'] = 'Y'
          this.npwpasing = 'Ya'
          this.clientforeigntax.push(res.item(i))
        }
        console.log(this.clientforeigntax)
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doGetClientPurpose() {
    return new Promise((resolve, reject) => {
      var query = "SELECT a.*, b.code_desc1,b.code_desc2 FROM tr_client_purpose a INNER JOIN gomsapplication.ms_code b ON a.purpose_code = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Purpose' AND a.client_id= '" + this.clientdetail['client_id'] + "' ORDER BY a.purpose_seq ASC"
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.clientpurpose.push(res.item(i))
        }
        console.log(this.clientpurpose)
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doGetClientIncome() {
    return new Promise((resolve, reject) => {
      var query = "SELECT a.*,b.code_desc1 FROM tr_client_source_income a INNER JOIN gomsapplication.ms_code b ON a.salary_code = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Source Income' AND a.client_id='" + this.clientdetail['client_id'] + "' ORDER BY a.salary_seq"
      this.dbProvider.executeQuery(query).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.clientincome.push(res.item(i))
        }
        console.log(this.clientincome)
        resolve()
      }, err => {
        reject()
      });
    });
  }
  doUpdateProspek() {
    var queryupdatemsclient = 'UPDATE ms_client SET ' +
      'client_name=' + '"' + this.nama + '",' +
      'client_gender=' + '"' + this.datapost['jkel'] + '",' +
      'client_dob=' + '"' + this.tgllahir + '",' +
      'client_class=' + '"' + this.datapost['kelaspekerjaan'] + '",' +
      'client_note=' + '"' + this.catatan + '",' +
      'last_update=' + '"' + moment().format('YYYY-MM-DD HH:mm') + '",' +
      'client_company=' + '"' + this.namaperusahaan + '",' +
      'client_marriage=' + '"' + this.datapost['statuspernikahan'] + '",' +
      'client_business_fields=' + '"' + this.datapost['bidangusaha'] + '",' +
      'client_position=' + '"' + this.datapost['jabatan'] + '",' +
      'client_occupation=' + '"' + this.datapost['uraianpekerjaan'] + '",' +
      'client_education=' + '"' + this.datapost['pendidikan'] + '",' +
      'client_hobby=' + '"' + this.hobi + '",' +
      'client_email=' + '"' + this.email + '",' +
      'client_mobile_phone=' + '"' + this.nohp + '",' +
      'client_nationality=' + '"' + this.datapost['kewarganegaraan'] + '",' +
      'client_npwp=' + '"' + this.npwpkorespondensi + '",' +
      'client_gross_inc=' + '"' + this.datapost['penghasilankotor'] + '",' +
      'client_bank_account_name=' + '"' + this.namarekening + '",' +
      'client_curr=' + '"' + this.datapost['matauangrekening'] + '",' +
      'client_bank_account_num=' + '"' + this.norekening + '",' +
      'client_bank_branch=' + '"' + this.cabangbank + '",' +
      'client_bank_city=' + '"' + this.kotabank + '",' +
      'client_bank_name=' + '"' + this.namabank + '",' +
      'client_birthplace=' + '"' + this.kota + '",' +
      'client_country=' + '"' + this.datapost['negara'] + '",' +
      'client_id_type=' + '"' + this.datapost['tipeid'] + '",' +
      'client_id_no=' + '"' + this.noid + '" ' +
      'WHERE client_id=' + '"' + this.clientdetail['client_id'] + '"'
    this.dbProvider.executeQuery(queryupdatemsclient).then((res: any) => {
      this.doDeleteClientArr()
    }, err => {
      console.log(err)
    });
  }
  doDeleteClientArr() {
    var address = 'DELETE FROM tr_client_address WHERE client_id=' + "'" + this.clientdetail['client_id'] + "'"
    var tax = 'DELETE FROM tr_client_foreign_tax WHERE client_id=' + "'" + this.clientdetail['client_id'] + "'"
    var purpose = 'DELETE FROM tr_client_purpose WHERE client_id=' + "'" + this.clientdetail['client_id'] + "'"
    var income = 'DELETE FROM tr_client_source_income WHERE client_id=' + "'" + this.clientdetail['client_id'] + "'"
    var cmd = [
      address, tax, purpose, income
    ];
    this.dbProvider.executeQueryArr(cmd).then(() => {
      console.log(this.clientforeigntax, this.clientincome, this.clientpurpose)
      this.doCreateClientAddressHome(this.clientdetail['client_id'])
    });
  }
  doOpenSearchProspek() {
    this.namasearch = '';
    this.tgllahirsearch = '';
    this.jkelsearch = '';
    document.getElementById('myModalSearch').style.display = 'block';
    document.getElementById('btnsearch').style.display = 'block';
    document.getElementById('btnmenu').style.display = 'none';
    document.getElementById('clientcount').style.display = 'none';
    document.getElementById('searchprospek').style.display = 'block';
    document.getElementsByName('searchbyname')[0]['checked'] = true
    document.getElementsByName('searchbydatebirth')[0]['checked'] = true
    document.getElementsByName('searchbygender')[0]['checked'] = true
  }
  doCancelSearch() {
    this.namasearch = '';
    this.tgllahirsearch = '';
    this.jkelsearch = '';
    document.getElementById('myModalSearch').style.display = 'none';
    document.getElementById('btnsearch').style.display = 'none';
    document.getElementById('btnmenu').style.display = 'block';
    document.getElementById('clientcount').style.display = 'block';
    document.getElementById('searchprospek').style.display = 'none';
    document.getElementsByName('searchbyname')[0]['checked'] = true
    document.getElementsByName('searchbydatebirth')[0]['checked'] = true
    document.getElementsByName('searchbygender')[0]['checked'] = true
  }
  doCheckSearchName() {
    this.searchname = document.getElementsByName('searchbyname')
    console.log(this.searchname)
  }
  doCheckSearchDateBirth() {
    this.searchdatebirth = document.getElementsByName('searchbydatebirth')
    console.log(this.searchdatebirth)
  }
  doCheckSearchGender() {
    this.searchgender = document.getElementsByName('searchbygender')
    console.log(this.searchgender)
  }
  doDatePickerSearch() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => {
        this.tgllahirsearch = moment(date).format('YYYY-MM-DD')
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  doShowOptionJkelSearch() {
    this.listoptions = [];
    var query = "SELECT * from gomsapplication.ms_code WHERE TRIM(code_key) = 'Sex'"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.listoptions.push(res.item(i))
        this.listoptions[i]['description'] = ''
        this.listoptions[i]['note'] = ''
      }
      this.titleoption = 'Jenis Kelamin Search'
      this.doShowOption()
      console.log(this.listoptions)
    });
  }
  doSearchProspek() {
    var querysearchbyname = ''
    var querysearchbydatebirth = ''
    var querysearchbygender = ''
    if (document.getElementsByName('searchbyname')[0]['checked'] == true) {
      querysearchbyname = "client_name LIKE '%" + this.namasearch + "%' AND "
    }
    else {
      querysearchbyname = ''
    }
    if (document.getElementsByName('searchbydatebirth')[0]['checked'] == true) {
      querysearchbydatebirth = "client_dob= '" + this.tgllahirsearch + "' AND "
    }
    else {
      querysearchbydatebirth = ''
    }
    if (document.getElementsByName('searchbygender')[0]['checked'] == true) {
      querysearchbygender = "client_gender= '" + this.datapost['jkelsearch'] + "' AND"
    }
    else {
      querysearchbygender = ''
    }
    console.log(document.getElementsByName('searchbyname')[0]['checked'], this.namasearch)
    console.log(document.getElementsByName('searchbydatebirth')[0]['checked'], this.tgllahirsearch)
    console.log(document.getElementsByName('searchbygender')[0]['checked'], this.jkelsearch)
    if ((document.getElementsByName('searchbyname')[0]['checked'] == true && this.namasearch != '') || (document.getElementsByName('searchbydatebirth')[0]['checked'] == true && this.tgllahirsearch != '') || (document.getElementsByName('searchbygender')[0]['checked'] == true && this.jkelsearch != '')) {
      this.client = [];
      var querysearch = "SELECT * FROM ms_client WHERE " + querysearchbyname + querysearchbydatebirth + querysearchbygender + " is_delete = 0 ORDER BY UPPER(client_name)"
      this.dbProvider.executeQuery(querysearch).then((res: any) => {
        if (document.getElementsByName('searchbyname')[0]['checked'] == true && this.namasearch == '') {
          this.doToastError('Silahkan isi nama terlebih dahulu !!')
        }
        else if (document.getElementsByName('searchbydatebirth')[0]['checked'] == true && this.tgllahirsearch == '') {
          this.doToastError('Silahkan isi tanggal lahir terlebih dahulu !!')
        }
        else if (document.getElementsByName('searchbygender')[0]['checked'] == true && this.jkelsearch == '') {
          this.doToastError('Silahkan pilih jenis kelamin terlebih dahulu !!')
        }
        else if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            this.client.push(res.item(i))
          }
          const sorted = this.client.sort((a, b) => a.client_name > b.client_name ? 1 : -1);

          const grouped = sorted.reduce((groups, client) => {
            const letter = client.client_name.charAt(0);

            groups[letter] = groups[letter] || [];
            groups[letter].push(client);

            return groups;
          }, {});

          const result = Object.keys(grouped).map(key => ({ key, clientdet: grouped[key] }));
          this.clients = result;
          console.log(this.clients)
          this.doGetProfil(this.clients[0].clientdet[0])
          this.namasearch = '';
          this.tgllahirsearch = '';
          this.jkelsearch = '';
          document.getElementsByName('searchbyname')[0]['checked'] = false
          document.getElementsByName('searchbydatebirth')[0]['checked'] = false
          document.getElementsByName('searchbygender')[0]['checked'] = false
          document.getElementById('myModalSearch').style.display = 'none';
          document.getElementById('btnsearch').style.display = 'none';
          document.getElementById('onsearch').style.display = 'block';
          document.getElementById('clientcount').style.display = 'block';
          document.getElementById('searchprospek').style.display = 'none';
        }
        else {
          this.doToastError('Data tidak ditemukan')
        }
      }, err => {
        this.doToastError('Data tidak ditemukan')
      });
    }
    else {
      this.doToastError('Silahkan pilih opsi pencarian terlebih dahulu !!')
    }
  }
  doClearSearch() {
    this.client = [];
    this.clients = [];
    this.clientgroup = [];
    document.getElementById('onsearch').style.display = 'none';
    document.getElementById('btnmenu').style.display = 'block';
    document.getElementById('clientcount').style.display = 'block';
    this.doGetClient().then((res) => {
      console.log(res[0].clientdet[0])
      this.doGetProfil(res[0].clientdet[0])
    })
  }
}
