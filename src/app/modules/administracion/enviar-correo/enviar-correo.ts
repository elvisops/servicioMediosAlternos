export interface EnviarCorreo {
}

export interface TraerSql{
    Tsql:string
}

export interface ListarTemplates{
    id:number,
    id_credenciales:number,
    crm:string,
    tipo:string,
    nombre:string,
    template:string,
    sp:number,
    fecha_creacion:string,
    fecha_modificacion:string,
}

export interface ListarDatosEnvio{
    correo: string,
    pass: string,
    responder:string,
    nombre:string,
    host:string, 
    puerto:string
}