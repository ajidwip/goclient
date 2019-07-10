import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import moment from 'moment';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@IonicPage()
@Component({
  selector: 'page-clientdetail',
  templateUrl: 'clientdetail.html',
})
export class ClientdetailPage {
  public client = [];
  public clientdetail = [];
  public clientaddress = [];
  public clientforeigntax = [];
  public clientpurpose = [];
  public clientincome = [];
  public clientname = '';
  public clienttypeid = '';
  public clientidno = '';
  public clientcity = '';
  public clientcountry = '';
  public clientgender = '';
  public clientclass = '';
  public clientcompany = '';
  public clientbussines = '';
  public clientposition = '';
  public clientoccupation = '';
  public clientemail = '';
  public clientphoneno = '';
  public clientmarriage = '';
  public clientnationaly = '';
  public clienteducation = '';
  public clienthobby = '';
  public clientnpwp = '';
  public clientdateupdate = '';
  public clientgrossinc = '';
  public clientaddressmessage = '';
  public clientcitymessage = '';
  public clientpostcodemessage = '';
  public clientcountrymessage = '';
  public clientphonenomessage = '';
  public clientfaxmessage = '';
  public clientaddr = '';
  public clientcityaddr = '';
  public clientpostcodeaddr = '';
  public clientcountryaddr = '';
  public clientphonenoaddr = '';
  public clientfaxaddr = '';
  public clientbankaccname = '';
  public clientcurr = '';
  public clientbanknum = '';
  public clientbankname = '';
  public clientbankbranch = '';
  public clientbankcity = '';
  public clientnote = '';
  public scroll = 0;


  constructor(
    public navCtrl: NavController,
    public dbProvider: SqlProvider,
    public screenOrientation: ScreenOrientation,
    public platform: Platform,
    public androidFullScreen: AndroidFullScreen,
    public navParam: NavParams) {
    this.client = this.navParam.get('client')
    this.doGetProfilDetail()
    this.doGetClientAddress()
    this.doGetClientForeignTax()
    this.doGetClientPurpose()
    this.doGetClientIncome()
  }
  onScroll(e) {
    var em = document.getElementById("toolbardetail");
    var opacity = window.getComputedStyle(em).getPropertyValue("opacity");
    console.log('opacity', opacity, em)
    if (e.scrollTop > 0 && e.scrollTop > this.scroll) {
      document.getElementById('toolbardetail').style.opacity = (parseFloat(opacity) - 0.05).toString()
      console.log('opacity', parseFloat(opacity) - 0.05)
      if (parseFloat(opacity) < 0.2) {
        document.getElementById("toolbardetail").style.zIndex = '1'
      }
      else {
        document.getElementById("toolbardetail").style.zIndex = '999'
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
      document.getElementById('toolbardetail').style.opacity = '1'
      document.getElementById("toolbardetail").style.zIndex = '999'
      this.scroll = e.scrollTop
    }
  }
  ionViewDidEnter() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch(err => console.log(err));
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  doGetProfilDetail() {
    var query = "SELECT (select b.code_desc1 from ms_client a " +
      "INNER JOIN gomsapplication.ms_code b ON a.client_marriage = TRIM(b.code_value) " +
      "WHERE " +
      "TRIM(b.code_key) = 'Marital Status' " +
      "AND a.client_id = '" + this.client['client_id'] + "') as marriage," +
      "(select b.code_desc1 from ms_client a " +
      "INNER JOIN gomsapplication.ms_code b ON a.client_business_fields = TRIM(b.code_value) " +
      "WHERE " +
      "TRIM(b.code_key) = 'Field of Work'" +
      "AND a.client_id = '" + this.client['client_id'] + "') as fieldwork," +
      "(select b.code_desc1 from ms_client a " +
      "INNER JOIN gomsapplication.ms_code b ON a.client_position = TRIM(b.code_value) " +
      "WHERE " +
      "TRIM(b.code_key) = 'Position'" +
      "AND a.client_id = '" + this.client['client_id'] + "') as position," +
      "(select b.code_desc1 from ms_client a " +
      "INNER JOIN gomsapplication.ms_code b ON a.client_occupation = TRIM(b.code_value) " +
      "WHERE " +
      "TRIM(b.code_key) = 'Occupation'" +
      "AND a.client_id = '" + this.client['client_id'] + "') as occupation," +
      "(select b.code_desc1 from ms_client a " +
      "INNER JOIN gomsapplication.ms_code b ON a.client_education = TRIM(b.code_value) " +
      "WHERE " +
      "TRIM(b.code_key) = 'Education'" +
      "AND a.client_id = '" + this.client['client_id'] + "') as education," +
      "(select b.code_desc1 from ms_client a " +
      "INNER JOIN gomsapplication.ms_code b ON a.client_gross_inc = TRIM(b.code_value) " +
      "WHERE " +
      "TRIM(b.code_key) = 'Gross Income'" +
      "AND a.client_id = '" + this.client['client_id'] + "') as grossincome," +
      "(select b.code_desc1 from ms_client a " +
      "INNER JOIN gomsapplication.ms_code b ON a.client_country = TRIM(b.code_value) " +
      "WHERE " +
      "TRIM(b.code_key) = 'Country'" +
      "AND a.client_id = '" + this.client['client_id'] + "') as country"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.clientdetail.push(res.item(i))
      }
      this.clientname = this.client['client_name']
      this.clienttypeid = this.client['client_id_type']
      this.clientidno = this.client['client_id_no']
      this.clientcity = this.client['client_birthplace']
      this.clientcountry = this.clientdetail[0].country
      if (this.client['client_gender'] == 'M') {
        this.clientgender = 'Laki-Laki'
      }
      else {
        this.clientgender = 'Perempuan'
      }
      this.clientclass = 'Kelas ', this.client['client_class']
      this.clientcompany = this.client['client_company']
      this.clientbussines = this.clientdetail[0].fieldwork
      this.clientposition = this.clientdetail[0].position
      this.clientoccupation = this.clientdetail[0].occupation
      this.clientemail = this.client['client_email']
      this.clientphoneno = this.client['client_mobile_phone']
      this.clientmarriage = this.clientdetail[0].marriage
      this.clientnationaly = this.client['client_nationality']
      this.clienteducation = this.clientdetail[0].education
      if (this.client['client_hobby'] == '') {
        this.clienthobby = '-'
      }
      else {
        this.clienthobby = 'Ya, ' + this.client['client_hobby']
      }
      this.clientnpwp = this.client['client_npwp']
      this.clientdateupdate = moment(this.client['last_update']).format('DD MMMM YYYY HH:mm:ss')
      this.clientgrossinc = this.clientdetail[0].grossincome
      this.clientbankaccname = this.client['client_bank_account_name']
      this.clientcurr = this.client['client_curr']
      this.clientbanknum = this.client['client_bank_account_num']
      this.clientbankname = this.client['client_bank_name']
      this.clientbankbranch = this.client['client_bank_branch']
      this.clientbankcity = this.client['client_bank_city']
      this.clientnote = this.client['client_note']
    }, err => {
    });
  }
  doGetClientAddress() {
    var query = "SELECT a.*,b.code_desc1 FROM tr_client_address a INNER JOIN gomsapplication.ms_code b ON a.address_country = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Country' AND a.client_id=" + "'" + this.client['client_id'] + "'";
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        if (res.item(i).address_type == 'H') {
          if (res.item(i).address1 != '') {
            this.clientaddr = res.item(i).address1 + ", RT/RW: " + res.item(i).address3 + ", KEC/KEL: " + res.item(i).address4
            this.clientcityaddr = res.item(i).address_city
            this.clientpostcodeaddr = res.item(i).address_postal_code
            this.clientcountryaddr = res.item(i).code_desc1
            this.clientphonenoaddr = res.item(i).address_phone
            this.clientfaxaddr = res.item(i).address_fax
          }
        }
        else {
          if (res.item(i).address_type == 'O') {
            this.clientaddressmessage = "OFFICE : " + res.item(i).address1 + ", RT/RW: " + res.item(i).address3 + ", KEC/KEL: " + res.item(i).address4
          }
          else {
            this.clientaddressmessage = "OTHER : " + res.item(i).address1 + ", RT/RW: " + res.item(i).address3 + ", KEC/KEL: " + res.item(i).address4
          }
          this.clientcitymessage = res.item(i).address_city
          this.clientpostcodemessage = res.item(i).address_postal_code
          this.clientcountrymessage = res.item(i).code_desc1
          this.clientphonenomessage = res.item(i).address_phone
          this.clientfaxmessage = res.item(i).address_fax
        }
        this.clientaddress.push(res.item(i))
      }
      console.log(this.clientaddress)
    }, err => {
    });
  }
  doGetClientForeignTax() {
    var query = "SELECT a.*,b.code_desc1 FROM tr_client_foreign_tax a INNER JOIN gomsapplication.ms_code b ON a.foreign_tax_country = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Country' AND a.client_id='" + this.client['client_id'] + "' ORDER BY a.foreign_tax_seq ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.clientforeigntax.push(res.item(i))
      }
      console.log(this.clientforeigntax)
    }, err => {
    });
  }
  doGetClientPurpose() {
    var query = "SELECT a.*, b.code_desc1,b.code_desc2 FROM tr_client_purpose a INNER JOIN gomsapplication.ms_code b ON a.purpose_code = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Purpose' AND a.client_id= '" + this.client['client_id'] + "' ORDER BY a.purpose_seq ASC"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.clientpurpose.push(res.item(i))
      }
      console.log(this.clientpurpose)
    }, err => {
    });
  }
  doGetClientIncome() {
    var query = "SELECT a.*,b.code_desc1 FROM tr_client_source_income a INNER JOIN gomsapplication.ms_code b ON a.salary_code = TRIM(b.code_value) WHERE TRIM(b.code_key) = 'Source Income' AND a.client_id='" + this.client['client_id'] + "' ORDER BY a.salary_seq"
    this.dbProvider.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.clientincome.push(res.item(i))
      }
      console.log(this.clientincome)
    }, err => {
    });
  }

}
