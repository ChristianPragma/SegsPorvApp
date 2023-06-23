import { ADD_AUDIO_MAP_INCIDENT, ADD_IMAGE_MAP_INCIDENT, CLEAR_MAP_INCIDENT, GENERAL_LIST, LOADING_MAP_INCIDENT } from "../actions/ActionMap";
import IMapIncidentState from "../interfaces/states/IMapIncidentState";

const initialState: IMapIncidentState = {
    address: "",
    image: null,
    imageBlob:null,
    audio: null,
    loadingSendAlert : false,
    generales : []
};

const appReducerMap = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_IMAGE_MAP_INCIDENT:
      return {
        ...state,
        image: action.payload,
        imageBlob: action.payloadBlob
      };
    case ADD_AUDIO_MAP_INCIDENT:
      return {
        ...state,
        audio: action.payload,
      };     
    case LOADING_MAP_INCIDENT:
      return {
        ...state,
        loadingSendAlert: action.payload,
      };   
    case CLEAR_MAP_INCIDENT:
      return {
        ...state,
        audio:null,
        image:null,
        imageBlob:null
      };  
    case GENERAL_LIST:
      return {
        ...state,
        generales: action.payload,
      };                
    default:
      return state;
  }
};

export default appReducerMap;
