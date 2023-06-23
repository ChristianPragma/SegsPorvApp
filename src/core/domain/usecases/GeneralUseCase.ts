import { GeneralRepository } from "../../infrastructure/repositories/GeneralRepository";
import { IGeneralRepository } from "../interfaces/repositories/IGeneralRepository";
import { SearchGeneralModel } from "../models/SearchGeneralModel";

export class GeneralUseCase {

    private generalRepository: IGeneralRepository;

    constructor() {
        this.generalRepository = new GeneralRepository();
    }

    async getAllGeneral(): Promise<Array<SearchGeneralModel>> {
        const request : SearchGeneralModel = {
            cod :'',
            concepto:'',
            descripcion:'',
            id:'',
            tipo:''
        } ;
        const response = this.generalRepository.searchGeneral(request);
        return response;
    }

}