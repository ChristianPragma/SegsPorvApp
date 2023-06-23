import { SearchGeneralModel } from "../models/SearchGeneralModel";

export const ADD_IMAGE_MAP_INCIDENT = 'ADD_IMAGE_MAP_INCIDENT';
export const ADD_AUDIO_MAP_INCIDENT = 'ADD_AUDIO_MAP_INCIDENT';
export const LOADING_MAP_INCIDENT = 'LOADING_MAP_INCIDENT';
export const CLEAR_MAP_INCIDENT = 'CLEAR_MAP_INCIDENT';
export const GENERAL_LIST = 'GENERAL_LIST';


export const AddImageMapIncident = (image: string,imageBlob:string) => ({
  type: ADD_IMAGE_MAP_INCIDENT,
  payload: image,
  payloadBlob: imageBlob,
});

export const AddAudioMapIncident = (audio: string) => ({
  type: ADD_AUDIO_MAP_INCIDENT,
  payload: audio,
});

export const LoadingMapIncident = (loading: boolean) => ({
  type: LOADING_MAP_INCIDENT,
  payload: loading,
});

export const ClearMapIncident = () => ({
  type: CLEAR_MAP_INCIDENT
});

export const FillDataGeneral = (generales: Array<SearchGeneralModel>) => ({
  type: GENERAL_LIST,
  payload: generales,
});