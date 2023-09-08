import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiguiendoPageRoutingModule } from './siguiendo-routing.module';

import { SiguiendoPage } from './siguiendo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiguiendoPageRoutingModule
  ],
  declarations: [SiguiendoPage]
})
export class SiguiendoPageModule {}
