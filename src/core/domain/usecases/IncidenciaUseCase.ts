import { IncidenciaRepository } from "../../infrastructure/repositories/IncidenciaRepository";
import IncidentType from "../enums/IncidentType";
import { IIncidenciaRepository } from "../interfaces/repositories/IIncidenciaRepository";
import { InsertIncidenciaRequestModel } from "../models/InsertIncidenciaRequestModel";
import { SaveIncidenciaMapModel } from "../models/SaveIncidenciaMapModel";
import { SearchGeneralModel } from "../models/SearchGeneralModel";

export class IncidenciaUseCase {

    private incidenciaRepository: IIncidenciaRepository;
    private generalesData: Array<SearchGeneralModel> =[];

    constructor() {
        this.incidenciaRepository = new IncidenciaRepository();
    }

    async createIncidencia(model: SaveIncidenciaMapModel,generales: Array<SearchGeneralModel>): Promise<boolean> {
      this.generalesData = generales;  
      const request: InsertIncidenciaRequestModel = {
              nombres : '',      
              apellidos:'',
              turno:this.fnSelectTurnId(),
              fechaincidencia : new Date(),
              clasificacion:'03db8e11e0924608a3bf60e89fd282a6',
              tipoocurrencia:'b43656995fc44ffea863b172a11ef360',
              operador:'',
              camara:'',
              comisaria:'',
              ubicacion: model.direccion,
              zona:'',
              sector:'',
              apoyo:'',
              estado:'Registrado',
              observaciones:'',
              latitud: model.latitud,
              longitud: model.longitud,
              userid: 'KBnD5O7OsCSQWOCJter1ITweien2',
              imagenes:[
                {
                   txtimg: model.imagen 
                }
              ],
             audios:[{
                txtaud:model.audio
             }] ,
             tipoincidencia:IncidentType.AlertBottom ,
             codrealtime:''
        };
        const response = this.incidenciaRepository.createIncidencia(request);
        return response;
    }

   private fnSelectTurnId = () => {
        const turno=this.fnSelectedTurn();
        const idTipo = this.generalesData.filter(x => x.concepto === turno).map(x => x.id)[0];
        return idTipo;
      } 
      
  private fnSelectedTurn=()=>{
    const date = new Date();
    const hours = date.getHours();
    let turno = '';

    if (hours > 6 && hours < 14) {
      turno = "MAÑANA";
    } else if (hours < 22) {
      turno =  "TARDE";
    } else {
      turno = "NOCHE";
    }
    return turno;     
  } 

}