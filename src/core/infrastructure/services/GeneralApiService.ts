import { IGeneralApiService } from "../../domain/interfaces/services/IGeneralApiService";
import { GenericResponseApiModel } from "../../domain/models/GenericResponseApiModel";
import { SearchGeneralModel } from "../../domain/models/SearchGeneralModel";
import { BaseApiService } from "./BaseApiService";

export class GeneralApiService extends BaseApiService implements IGeneralApiService  {

  async searchGeneral(request: SearchGeneralModel): Promise<GenericResponseApiModel<SearchGeneralModel[]>> {
    return await this.post<GenericResponseApiModel<SearchGeneralModel[]>>("https://muniporvenirapisegsporv20220614195344.azurewebsites.net/api/general/search",request);
  }

}
