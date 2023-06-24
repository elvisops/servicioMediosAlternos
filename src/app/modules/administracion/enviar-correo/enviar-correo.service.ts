import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnviarCorreoService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private auth: AuthService
  ) { }

  api = environment.api
  private contenidoHTML: any;

  setContenidoHTML(contenido: any) {
    this.contenidoHTML = contenido;
  }

  getContenidoHTML(): string {
    return this.contenidoHTML;
  }

  GetListaSql(crm: string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: 'listar_sql',
      crm: crm
    });
    return this.http.post<any>(`${this.api}/apiMA/proc`, { payload })
    .pipe( 
      tap(),
      catchError(this.handleError('Error al obtener la lista'))
    )
  }

  GetListaDato(Tsql:string, crm:string, idInterno:string):Observable<any>{
    var payload = this.auth.mkpayload({
      columnas: Tsql,
      crm: crm,
      idInterno: idInterno
    })
    return this.http.post<any>(`${this.api}/apiNEO/get`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError('Error al obtener la lista de datos'))
    )
  }

  GetTemplates(crm:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: 'listar_templates',
      crm: crm
    });
    return this.http.post<any>(`${this.api}/apiMA/get`, { payload })
    .pipe(
      tap(),
      catchError(this.handleError('Error al obtener los templates'))
    )
  }

  GetDatosEnvio(template:string):Observable<any>{
    var payload = this.auth.mkpayload({
      proc: 'listar_datos_envio',
      template:template
    });
    return this.http.post<any>(`${this.api}/apiMA/get`, {payload})
    .pipe(
      tap(),
      catchError(this.handleError('Error al obtener los templates'))
    )
  }

  getHTMLContent(){
    return this.http.get('MEDIOSALTERNOS/src/app/modules/administracion/plantillas/crm35-correo-descuento1/crm35-correo-descuento1.component.html', {responseType: 'text'});
  }

  notificacion(msg: string, duration: number = 5000): void {
    this.snack.open(msg, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration,
      // panelClass: 'custom-class',
    });
  }

  private handleError<T>(operation = 'operacion', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Error en la aplicacion: ' + JSON.stringify(error));
      this.notificacion(operation);
      console.log(error);
      return of(result as T);
    };
  }
}
