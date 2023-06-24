import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
//obtener fecha y hora
import * as moment from 'moment';
import { EnviarCorreoService } from '../../enviar-correo/enviar-correo.service';
moment.locale("es");

@Component({
  selector: 'app-crm14-correo-pnc1',
  templateUrl: './crm14-correo-pnc1.component.html',
  styleUrls: ['./crm14-correo-pnc1.component.css']
})
export class Crm14CorreoPNC1Component implements OnInit{
  fechaActual: string = '';
  mesAnio: string = '';
  @Input() nombre: any;

  @ViewChild('html', {static: true}) htmlRef! : ElementRef;
  constructor(private http: EnviarCorreoService){}
  ngOnInit(): void {
    // alert(this.saldo)
    const fecha = moment().locale('es').format('D [de] MMMM [del] YYYY');
    this.fechaActual = fecha;
  }

  ngAfterViewInit(){
    const contenidoHTML = this.htmlRef.nativeElement.innerHTML;
    this.http.setContenidoHTML(contenidoHTML);
  }
}
