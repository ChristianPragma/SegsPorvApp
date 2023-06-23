import { GenericResponseApiModel } from "../../models/GenericResponseApiModel";
import { SearchGeneralModel } from "../../models/SearchGeneralModel";


export interface IGeneralApiService {
    searchGeneral(request: SearchGeneralModel): Promise<GenericResponseApiModel<Array<SearchGeneralModel>>>;
}