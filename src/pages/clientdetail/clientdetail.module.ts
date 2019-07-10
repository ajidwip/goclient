import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientdetailPage } from './clientdetail';

@NgModule({
  declarations: [
    ClientdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientdetailPage),
  ],
})
export class ClientdetailPageModule {}
