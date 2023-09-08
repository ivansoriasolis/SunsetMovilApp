import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisfotosPageRoutingModule } from './misfotos-routing.module';

import { MisfotosPage } from './misfotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisfotosPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MisfotosPage],
})
export class MisfotosPageModule {}
