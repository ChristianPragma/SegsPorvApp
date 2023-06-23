import { Component } from "react";
import {createMapAdapter } from "../../../infrastructure/factories/MapAdapterFactory";
import MapComponent from "../../components/maps/Map";
import { Text } from "react-native";

export default class ContainerMapComponent extends Component {
    render() {
      const mapProvider = 'google'; // Puedes cambiarlo a 'mapbox' si lo prefieres
      const mapAdapter = createMapAdapter(mapProvider);
      //const mapAdapter = MapAdapterFactory.createMapAdapter(mapProvider);

      return <MapComponent mapAdapter={mapAdapter} />;
    }
  }