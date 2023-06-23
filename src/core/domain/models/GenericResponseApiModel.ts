import { StatusResponseModel } from "./StatusResponseModel";

export interface GenericResponseApiModel<T>{
    DataResponse : T,
    DataRequest : any,
    StatusResponse: StatusResponseModel
}