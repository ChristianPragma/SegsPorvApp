import { IGeneralRepository } from '../../domain/interfaces/repositories/IGeneralRepository';
import { IGeneralApiService } from '../../domain/interfaces/services/IGeneralApiService';
import { SearchGeneralModel } from '../../domain/models/SearchGeneralModel';
import { GeneralApiService } from '../services/GeneralApiService';

export class GeneralRepository implements IGeneralRepository {

    private generalApiService: IGeneralApiService;

    constructor() {
        this.generalApiService = new GeneralApiService();
    }

    async searchGeneral(request: SearchGeneralModel): Promise<SearchGeneralModel[]> {
        const response = await this.generalApiService.searchGeneral(request);
        return response.DataResponse;        
    }

}
