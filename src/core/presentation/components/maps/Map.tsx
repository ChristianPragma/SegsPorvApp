import React, { Component, createRef } from "react";
import IMapProps from "../../../domain/interfaces/props/IMapProps";
import IMapState from "../../../domain/interfaces/states/IMapState";
import GetLocation from 'react-native-get-location';
import GoogleMapAdapter from "../../../infrastructure/providers/adapters/GoogleMapAdapter";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeRouter, Route } from 'react-router-native';

export default class MapComponent extends Component<IMapProps> {

//IMapState

    render() {
      const { mapAdapter } = this.props;
      //const map = mapAdapter.renderMap(this.state.longitude,this.state.latitude,this.mapRef,this.markerRef);
      const map = mapAdapter.render();  
      return map;
     // return <GoogleMapAdapter></GoogleMapAdapter>
    }
  }

  // {map}