import { IIncidenciaRepository } from '../../domain/interfaces/repositories/IIncidenciaRepository';
import { IIncidenciaApiService } from '../../domain/interfaces/services/IIncidenciaApiService';
import { InsertIncidenciaRequestModel } from '../../domain/models/InsertIncidenciaRequestModel';
import { IncidenciaApiService } from '../services/IncidenciaApiService';

export class IncidenciaRepository implements IIncidenciaRepository {

    private incidenciaApiService: IIncidenciaApiService;

    constructor() {
        this.incidenciaApiService = new IncidenciaApiService();
    }

    async createIncidencia(request: InsertIncidenciaRequestModel): Promise<boolean> {
        const response = await this.incidenciaApiService.createIncidencia(request);
        return response.DataResponse;
    }

}
