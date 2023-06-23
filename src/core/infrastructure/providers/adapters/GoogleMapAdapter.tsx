import React, { Component, createRef } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import  {IMapAdapter} from "../../../domain/interfaces/adapters/IMapAdapter";
import MapView, { Marker } from 'react-native-maps';
import IMapState from '../../../domain/interfaces/states/IMapState';
import Geolocation from 'react-native-geolocation-service';

// implements IMapAdapter 
export default class GoogleMapAdapter extends Component<{},IMapState>   {
  
  watchId :any;
  mapRef : any;

  constructor(props: {}) {
    console.log('constructor');  
    super(props);
    this.mapRef = createRef();    
    this.state = {
      latitude: -8.11599,
      longitude:-79.02998
    }
  } 

  componentDidMount(): void {
    console.log('componentDidMount');  
    Geolocation.getCurrentPosition(
      (position) => {
        // Manejar la posición obtenida correctamente
        console.log('position');  
        console.log(position);
        this.handleMarkerUpdate(position.coords.latitude,position.coords.longitude);  
      },
      (error) => {
        // Manejar errores al obtener la ubicación
        console.log(error);
      },
      { timeout: 15000, maximumAge: 10000, enableHighAccuracy: true ,showLocationDialog : true, forceRequestLocation: true }
    );

  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 1000,         
  // })
  // .then(location => {
  //   console.log('location');  
  //   this.handleMarkerUpdate(location.latitude,location.longitude);      
  //   console.log(location);
  // })
  // .catch(error => {
  //     const { code, message } = error;
  //     console.warn(code, message);
  // });          
  }


  componentDidUpdate() {
    console.log('componentDidUpdate');  
    // Si necesitas reiniciar el seguimiento de la ubicación cuando haya cambios en el componente
    this.startWatchingLocation();
  }

  startWatchingLocation() {
    console.log('startWatchingLocation');  
    this.watchId = Geolocation.watchPosition(
      (position) => {
        // Manejar la actualización de la posición aquí
        console.log('New position:', position);
        this.handleMarkerUpdate(position.coords.latitude,position.coords.longitude);               
      },
      (error) => {
        // Manejar errores de geolocalización aquí
        console.log('Geolocation error:', error);
      },
      { enableHighAccuracy: true , 
        distanceFilter:10, // Distancia minima para recibir la actualización
        interval: 5000, // Intervalo de tiempo (en milisegundos) para recibir actualizaciones
        fastestInterval: 2000, // Intervalo de tiempo más rápido (en milisegundos)
        showLocationDialog : true, 
        forceRequestLocation: true}
    );
  }
      
  handleMarkerUpdate = (latitude:number,longitude:number) => {
    this.setState(prevState => ({
      latitude : latitude,
      longitude: longitude       
    }));       
    if (this.mapRef.current) {
      this.mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }        

  };

  componentWillUnmount() {
    console.log('Componente desmontado');
  }

  // ref={(ref) => (this.mapRef = ref)}

    render(): JSX.Element {
      return (
        <View style={styles.container}>    
          <MapView             
            ref={this.mapRef}
            style={styles.map}
            initialRegion={{
              latitude :this.state.latitude,
              longitude :this.state.longitude,
              latitudeDelta :0.005,
              longitudeDelta : 0.005
            }}
          >
            <Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title="Mi ubicación"
              description="Puedes enviar tu incidencia"
            />
          </MapView>            
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map:{
      width:'100%',
      height:'100%'
    }
  });