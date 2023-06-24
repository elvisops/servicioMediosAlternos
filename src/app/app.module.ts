import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialsModule } from './modules/public/materials/materials/materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnviarCorreoComponent } from './modules/administracion/enviar-correo/enviar-correo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicHostDirective } from './directive/dynamic-host.directive';
import { DatePipe } from '@angular/common';
import { Crm35CorreoDescuento1Component } from './modules/administracion/plantillas/crm35-correo-descuento1/crm35-correo-descuento1.component';
import { Crm35CorreoConfirmacion1Component } from './modules/administracion/plantillas/crm35-correo-confirmacion1/crm35-correo-confirmacion1.component';
import { Crm35CorreoPNC1Component } from './modules/administracion/plantillas/crm35-correo-pnc1/crm35-correo-pnc1.component';
import { Crm14CorreoOfrecimiento1Component } from './modules/administracion/plantillas/crm14-correo-ofrecimiento1/crm14-correo-ofrecimiento1.component';
import { Crm14CorreoPNC1Component } from './modules/administracion/plantillas/crm14-correo-pnc1/crm14-correo-pnc1.component';
import { Crm14CorreoConfirmacion1Component } from './modules/administracion/plantillas/crm14-correo-confirmacion1/crm14-correo-confirmacion1.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    EnviarCorreoComponent,
    DynamicHostDirective,
    Crm35CorreoDescuento1Component,
    Crm35CorreoConfirmacion1Component,
    Crm35CorreoPNC1Component,
    Crm14CorreoOfrecimiento1Component,
    Crm14CorreoPNC1Component,
    Crm14CorreoConfirmacion1Component,
    FooterComponent
  ],
  // entryCompones:[
  //   CorreoDescuento1Component
  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
