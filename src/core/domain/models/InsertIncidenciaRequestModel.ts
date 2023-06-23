import { InsertIncidenciaAudioRequestModel } from "./InsertIncidenciaAudioRequestModel";
import { InsertIncidenciaImagenRequestModel } from "./InsertIncidenciaImagenRequestModel";

export interface InsertIncidenciaRequestModel {
    nombres:string;
    apellidos:string;
    turno:string;
    clasificacion :string;
    operador:string;
    camara:string;
    tipoocurrencia:string;
    ubicacion:string;
    zona:string;
    comisaria:string;
    sector:string;
    apoyo:string;
    observaciones:string;
    latitud?:number ;
    longitud?:number ;
    userid:string;
    estado:string;
    fechaincidencia:Date ;
    imagenes: Array<InsertIncidenciaImagenRequestModel>;
    audios: Array<InsertIncidenciaAudioRequestModel>;
    tipoincidencia:number ;
    codrealtime:string;
  }