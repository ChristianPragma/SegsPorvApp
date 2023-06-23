import { InsertIncidenciaRequestModel } from "../../models/InsertIncidenciaRequestModel";

export interface IIncidenciaRepository {
    createIncidencia(request: InsertIncidenciaRequestModel): Promise<boolean>;
}