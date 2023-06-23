import { GenericResponseApiModel } from "../../models/GenericResponseApiModel";
import { InsertIncidenciaRequestModel } from "../../models/InsertIncidenciaRequestModel";


export interface IIncidenciaApiService {
    createIncidencia(request: InsertIncidenciaRequestModel): Promise<GenericResponseApiModel<boolean>>;
}