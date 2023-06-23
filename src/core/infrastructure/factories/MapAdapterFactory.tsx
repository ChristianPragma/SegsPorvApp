import React from 'react';
import { IMapAdapter } from "../../domain/interfaces/adapters/IMapAdapter";
import { GoogleMapFAdapter  } from '../providers/adapters/GoogleMapFAdapter';
// import GoogleMapAdapter from "../providers/adapters/GoogleMapAdapter";
// import MapboxAdapter from "../providers/adapters/MapboxAdapter";
// import MapCustomAdapter from '../providers/adapters/MapCustomAdapter';

// export default class MapAdapterFactory {
//     static createMapAdapter(mapProvider: string): IMapAdapter {
//       switch (mapProvider) {
//         case 'google':
//           // return <GoogleMapAdapter />
//           return new GoogleMapAdapter({});          
//         case 'mapbox':
//          // return new MapboxAdapter();
//         case 'custom':
//           //return new MapCustomAdapter();          
//         default:
//           throw new Error('Proveedor de mapa no válido');
//       }
//     }
//   }


export const createMapAdapter = (
  type: string,
): IMapAdapter  => {
  switch (type) {
    case 'google':
      return {
        render: () => <GoogleMapFAdapter />
      };
    default:
      return {
        render: () => <GoogleMapFAdapter />
      };
  }
};