import { IIncidenciaApiService } from "../../domain/interfaces/services/IIncidenciaApiService";
import { GenericResponseApiModel } from "../../domain/models/GenericResponseApiModel";
import { InsertIncidenciaRequestModel } from "../../domain/models/InsertIncidenciaRequestModel";
import { BaseApiService } from "./BaseApiService";

export class IncidenciaApiService extends BaseApiService implements IIncidenciaApiService  {

  async createIncidencia(request: InsertIncidenciaRequestModel): Promise<GenericResponseApiModel<boolean>> {
    console.log("llamando api de crear incidencia");
    return await this.post<GenericResponseApiModel<boolean>>("https://muniporvenirapisegsporv20220614195344.azurewebsites.net/api/incidencia",request);
  }

}
