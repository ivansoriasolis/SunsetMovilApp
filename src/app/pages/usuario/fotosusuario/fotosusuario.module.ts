import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosusuarioPageRoutingModule } from './fotosusuario-routing.module';

import { FotosusuarioPage } from './fotosusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosusuarioPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FotosusuarioPage],
})
export class FotosusuarioPageModule {}
