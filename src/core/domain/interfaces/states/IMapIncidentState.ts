import { SearchGeneralModel } from "../../models/SearchGeneralModel";

export default interface IMapIncidentState {
    address: string ;
    image: string | null;
    imageBlob: string | null;
    audio: string | null;
    loadingSendAlert: boolean;
    generales :  Array<SearchGeneralModel>
  }