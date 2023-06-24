import {Component,OnInit,ViewChild,ComponentFactoryResolver}from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnviarCorreoService } from './enviar-correo.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ListarDatosEnvio, ListarTemplates, TraerSql } from './enviar-correo';
import { HttpClient } from '@angular/common/http';
import { DynamicHostDirective } from '../../../directive/dynamic-host.directive';
import { Crm35CorreoDescuento1Component } from '../plantillas/crm35-correo-descuento1/crm35-correo-descuento1.component';
import { Crm35CorreoConfirmacion1Component } from '../plantillas/crm35-correo-confirmacion1/crm35-correo-confirmacion1.component';
import { Crm35CorreoPNC1Component } from '../plantillas/crm35-correo-pnc1/crm35-correo-pnc1.component';
import { Crm14CorreoOfrecimiento1Component } from '../plantillas/crm14-correo-ofrecimiento1/crm14-correo-ofrecimiento1.component';
import { Crm14CorreoPNC1Component } from '../plantillas/crm14-correo-pnc1/crm14-correo-pnc1.component';
import { Crm14CorreoConfirmacion1Component } from '../plantillas/crm14-correo-confirmacion1/crm14-correo-confirmacion1.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-enviar-correo',
  templateUrl: './enviar-correo.component.html',
  styleUrls: ['./enviar-correo.component.css'],
})
export class EnviarCorreoComponent implements OnInit {
  @ViewChild(DynamicHostDirective) public dynamicHost!: DynamicHostDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private service: EnviarCorreoService,
    private auth: AuthService,
    private http: HttpClient
  ) 
  {
    this.route.params.subscribe((params) => (this.tipo = params['tipo']));
    this.route.params.subscribe((params) => (this.crm = params['crm']));
    this.route.params.subscribe((params) => (this.usuario = params['usuario']));
    this.route.params.subscribe((params) => (this.id = params['id']));
    this.route.params.subscribe((params) => (this.contacto = params['contacto'])
    );
  }
  //variables de la url
  tipo: string = '';
  crm: string = '';
  usuario: string = '';
  id: string = '';
  contacto: string = '';

  //variables de los metodos que preparan templates y correos
  Tsql: string = '';
  temp: string = '';
  arreglo: any[] = [];
  arregloPlantilla: any[] = [];
  opcionPlantillaId: number | string = 0;
  opcionPlantilla: any;
  Plantillas: any[] = [];
  ListaTemplates: ListarTemplates[] = [];

  //variables para datos del cliente
  nombre: string = '';
  saldo: string = '';

  componente: any;
  hidden: boolean = false;
  ListarDatosDeEnvio: ListarDatosEnvio[] = [];
  deshabilitarBoton: boolean = false; //deshabilitar boton
  isLoading: boolean = false; //efecto de carga

  contenidoHTML: string = ''; //plantillas html
  ngOnInit() {
    this.TraerSql();
    this.ListarTemplates();
  }

  //Listar sql, trae el query que se utilizara para traer datos del cliente segun la campaña
  TraerSql() {
    this.service.GetListaSql(this.crm).subscribe((r) => {
      var respuesta = this.auth.desencriptar(r.response);
      respuesta = JSON.parse(respuesta);
      respuesta = respuesta[0];
      if (respuesta.status == 1) {
        this.Tsql = respuesta.data;
        this.ListarDato();
      } else {
        console.log('Ocurrio un error al obtener los datos');
      }
    });
  }

  // traer los datos del cliente para anexarlos
  ListarDato() {
    if (this.crm.length == 1) {
      this.crm = '000' + this.crm;
    } else if (this.crm.length == 2) {
      this.crm = '00' + this.crm;
    } else if (this.crm.length == 3) {
      this.crm = '0' + this.crm;
    } else if (this.crm.length == 4) {
      this.crm = this.crm;
    } else {
      this.crm = '0';
    }

    this.service.GetListaDato(this.Tsql, this.crm, this.id).subscribe((r) => {
      var respuesta = this.auth.desencriptar(r.response);
      respuesta = JSON.parse(respuesta);
      respuesta = respuesta[0];
      this.nombre = respuesta.nombre;
      this.saldo = respuesta.saldo;
    });
  }

  // lista los templates de los crm
  ListarTemplates() {
    this.service.GetTemplates(this.crm).subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      this.ListaTemplates = JSON.parse(data);

      let contador = 0;
      for (let i = 0; i < this.ListaTemplates.length; i++) {
        if (i == 0) {
          if (this.tipo == '1' && this.ListaTemplates[i]['tipo'] == 'Correo') {
            let arreglo = {
              TIPO: this.ListaTemplates[i]['tipo'],
              NOMBRE: this.ListaTemplates[i]['nombre'],
              TEMPLATE: this.ListaTemplates[i]['template'],
            };
            this.arreglo.push(arreglo);
          } else if (
            this.tipo == '2' &&
            this.ListaTemplates[i]['tipo'] == 'SMS'
          ) {
            let arreglo = {
              TIPO: this.ListaTemplates[i]['tipo'],
              NOMBRE: this.ListaTemplates[i]['nombre'],
              TEMPLATE: this.ListaTemplates[i]['template'],
            };

            this.arreglo.push(arreglo);
          }
        } else {
          if (this.tipo == '1' && this.ListaTemplates[i]['tipo'] == 'Correo') {
            let arreglo = {
              TIPO: this.ListaTemplates[i]['tipo'],
              NOMBRE: this.ListaTemplates[i]['nombre'],
              TEMPLATE: this.ListaTemplates[i]['template'],
            };

            this.arreglo.push(arreglo);
          } else if (
            this.tipo == '2' &&
            this.ListaTemplates[i]['tipo'] == 'SMS'
          ) {
            if (this.temp == '[') {
              let arreglo = {
                TIPO: this.ListaTemplates[i]['tipo'],
                NOMBRE: this.ListaTemplates[i]['nombre'],
                TEMPLATE: this.ListaTemplates[i]['template'],
              };

              this.arreglo.push(arreglo);
            } else {
              let arreglo = {
                TIPO: this.ListaTemplates[i]['tipo'],
                NOMBRE: this.ListaTemplates[i]['nombre'],
                TEMPLATE: this.ListaTemplates[i]['template'],
              };

              this.arreglo.push(arreglo);
            }
          }
        }
        contador++;
      }
      this.llenarInputs();
    });
  }

  llenarInputs() {
    let contador = 1;
    for (let i = 0; i < this.arreglo.length; i++) {
      if (i == 0) {
        let plantilla = {
          ID: contador.toString(),
          OPCION: this.arreglo[i].TIPO,
          TEMPLATE: this.arreglo[i].TEMPLATE,
        };
        this.arregloPlantilla.push(plantilla);
      }
      contador++;
    }
  }

  onOpcionChange() {
    if (this.Plantillas.length === 0) {
      var contador = 1;
      for (let i = 0; i < this.arreglo.length; i++) {
        let plantilla = {
          ID: contador.toString(),
          OPCION: this.arreglo[i].NOMBRE,
          TEMPLATE: this.arreglo[i].TEMPLATE,
        };
        this.Plantillas.push(plantilla);
        contador++;
      }
    }
  }

  OnOpcionChange2() {
    if (this.opcionPlantilla === undefined) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
    this.createComponent();
  }

  public createComponent() {
    this.traerComponente();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componente);
    this.dynamicHost.viewContainerRef.clear();
    const componentRef = this.dynamicHost.viewContainerRef.createComponent(componentFactory);
    const componenteCreado = componentRef.instance as any;

    if (componenteCreado) {
      componenteCreado.nombre = this.nombre; // Establece el valor de la variable en el componente creado
      componenteCreado.saldo = this.saldo;
    }
  }

  traerComponente() {
    switch (this.opcionPlantilla) {
      case 'Crm35CorreoDescuento1Component':
        this.componente = Crm35CorreoDescuento1Component;
        break;
      case 'Crm35CorreoConfirmacion1Component':
        this.componente = Crm35CorreoConfirmacion1Component;
        break;
      case 'Crm35CorreoPNC1Component':
        this.componente = Crm35CorreoPNC1Component;
        break;
      case 'Crm14CorreoOfrecimiento1Component':
        this.componente = Crm14CorreoOfrecimiento1Component;
        break;
      case 'Crm14CorreoPNC1Component':
        this.componente = Crm14CorreoPNC1Component;
        break;
      case 'Crm14CorreoConfirmacion1Component':
        this.componente = Crm14CorreoConfirmacion1Component;
        break;
      default:
        break;
    }
  }

  //obtener los datos que se utilizaran para el envio del correo
  ListarDatosEnvio() {
    this.service.GetDatosEnvio(this.opcionPlantilla).subscribe((r) => {
      var data = this.auth.desencriptar(r.data);
      this.ListarDatosDeEnvio = JSON.parse(data);
      this.enviarCorreo();
    });
  }

  enviarCorreo() {
    this.deshabilitarBoton = true;
    this.isLoading = true;
    //obtener plantilla html
    this.contenidoHTML = this.service.getContenidoHTML();
    var host, port, user, pass, nombre, remitente;

    for (let i = 0; i < this.ListarDatosDeEnvio.length; i++) {
      const element = this.ListarDatosDeEnvio[i];
      host = element.host; port = element.puerto; user = element.correo;
      pass = element.pass; nombre = element.nombre;
    }

    for (let i = 0; i < this.arreglo.length; i++) {
      const element = this.arreglo[i];
      remitente = element.nombre;
    }

    let params = {
      host: host, port: port, user: user, pass: pass, nombre: remitente,
      email: this.contacto, asunto: nombre, mensaje: this.contenidoHTML,
    };

    // var url = 'http://localhost:3000/send-email';
    var url = 'http://10.8.8.115:3000/send-email';
    this.http.post(url, params).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        Swal.fire({
          // title: 'Correo enviado correctamente',
          text: 'Correo enviado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0c6cfc'
        })
      },
      (error) => {
        console.error(error);
        this.isLoading = false;

        Swal.fire({
          title: 'Error al Enviar Correo',
          text: JSON.stringify(error.error),
          // text: JSON.stringify(error),
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0c6cfc'
        })
        this.deshabilitarBoton = false;
      }
    );
  }
}
