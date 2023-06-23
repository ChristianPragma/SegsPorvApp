import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Platform, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import IButtonMapProps from '../../../domain/interfaces/props/IButtonMapProps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AddAudioMapIncident, AddImageMapIncident, LoadingMapIncident } from '../../../domain/actions/ActionMap';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import { DocumentDirectoryPath, readFile } from 'react-native-fs';
import { IncidenciaUseCase } from '../../../domain/usecases/IncidenciaUseCase';
import { SaveIncidenciaMapModel } from '../../../domain/models/SaveIncidenciaMapModel';

// const BotonCameraMap: React.FC<IButtonMapProps> = ({ label, onPress }) => {
//  style={styles.button}
const BotonAlertaMap: React.FC<IButtonMapProps> = ({ label }) => {

  const incidenciaUseCase = new IncidenciaUseCase();
  const imageIncident = useSelector((state: any) => state.image);
  const audioIncident = useSelector((state: any) => state.audio);
  const [imageBase64, setImageBase64] = useState('');
  const [audioBase64, setAudioBase64] = useState('');
  const [loading, setLoading] = useState(false);

  // https://github.com/zmxv/react-native-sound/issues/510
  // https://stackoverflow.com/questions/34908009/react-native-convert-image-url-to-base64-string
  // https://stackoverflow.com/questions/64515157/trying-to-create-a-base64-string-from-a-wav-file-in-react-native-to-store-on-ser

  const dispatch = useDispatch();
  const onHandledSendIncidencia = async () => {
    console.log('Alert incidencia ');
    dispatch(LoadingMapIncident(true));
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onHandledSendIncidencia}
    >
      <View>
        <Icon name="alarm-light-outline" size={30} />
      </View>
    </TouchableOpacity>    
  );
};

const styles = StyleSheet.create({
  button: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d0342c',
    shadow: {
      shadowColor: '#7F5DF0',
      shadowOffset: {
           width:0,
           height:10
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5
    }
  },
  label: {
    color: '#FFFFFF',
    fontSize: 10
  }
});

export default BotonAlertaMap;