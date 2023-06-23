import { IMapAdapter } from "../../../domain/interfaces/adapters/IMapAdapter";

// implements IMapAdapter 
export default class MapboxAdapter implements IMapAdapter {
    render(): JSX.Element {
      // Lógica para renderizar el mapa utilizando Mapbox API
      return <div>Renderizar mapa de Mapbox</div>;
    }
  }
  