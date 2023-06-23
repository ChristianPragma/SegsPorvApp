import { IMapAdapter } from "../../../domain/interfaces/adapters/IMapAdapter";

// implements IMapAdapter
export default class MapCustomAdapter  implements IMapAdapter {
    render(): JSX.Element {
      // Lógica para renderizar el mapa customizado
      return <div>Renderizar mapa customizado</div>;
    }
  }
  