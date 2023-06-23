import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Text, Platform, SafeAreaView, StyleSheet } from 'react-native';
import IButtonMapProps from '../../../domain/interfaces/props/IButtonMapProps';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { AddAudioMapIncident, AddImageMapIncident } from '../../../domain/actions/ActionMap';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {DocumentDirectoryPath} from 'react-native-fs';

// const BotonCameraMap: React.FC<IButtonMapProps> = ({ label, onPress }) => {
//  style={styles.button}
const BotonAudioMap: React.FC<IButtonMapProps> = ({ label }) => {

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const [audioPath, setAudioPath] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');

  const pathAudio = Platform.select({
    ios: 'hello.m4a',
    android: `${DocumentDirectoryPath}/hello.mp4`,
  });  
  const meteringEnabled = false; 
  
  const dispatch = useDispatch();
  const startRecording = React.useCallback(async () => { 
    try {
      await audioRecorderPlayer.startRecorder(pathAudio,{
        AudioEncoderAndroid : AudioEncoderAndroidType.AAC,
        //OutputFormatAndroid: OutputFormatAndroidType.,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,        
      },meteringEnabled);
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {   
        setRecordSecs(e.currentPosition);
        setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));         
    });  
      setIsRecording(true);
    } catch (error) {
      console.log('Error starting recording:', error);
    }
}, []);

const stopRecording = React.useCallback(async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();      
      setRecordSecs(0);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(0)));   
      setIsRecording(false);
      audioRecorderPlayer.removeRecordBackListener();
      console.log('Recorded audio path:', audioPath);
      console.log('result audio path:', result);
      const urlPath = (pathAudio? pathAudio:'');            
      setAudioPath(result);
      dispatch(AddAudioMapIncident(result));
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
}, []);

    return (
      <TouchableOpacity>
        <View style={styles.container}>   
          <Icon 
              name={isRecording ? "record-circle-outline":"microphone-plus" }
              size={30}
              style={styles.button}
              onPress={isRecording ? stopRecording : startRecording}
              />  
            {isRecording? <Text style={styles.txtRecordCounter}>{recordTime}</Text>:null }                                              
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create( {
    container: {
      flex : 1,
      flexDirection: 'row',
      //justifyContent: 'center',
      //alignItems: 'center',
    },    
    button: {
      color:'#706e6e',
      width:'100%',
      height:'100%',
      textAlign:'center',
      verticalAlign:'middle',
      //backgroundColor:'red'
    },
    label: {
      color: '#FFFFFF',
      fontSize: 10
    },
    txtRecordCounter: {
      marginTop: 0,
      color: '#455A64',
      fontSize: 10,
      textAlignVertical: 'center',
      verticalAlign:'middle',
      width:'100%',
      fontWeight: '100',
      fontFamily: 'Helvetica Neue',
      letterSpacing: 1,
      zIndex:-1,
      marginLeft:-100,
      marginBottom:-45,      
    },    
  });
  
export default BotonAudioMap;