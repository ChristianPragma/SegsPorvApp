import { SearchGeneralModel } from "../../models/SearchGeneralModel";

export interface IGeneralRepository {
    searchGeneral(request: SearchGeneralModel): Promise<Array<SearchGeneralModel>>;
}