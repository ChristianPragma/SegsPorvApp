import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import IButtonMapProps from '../../../domain/interfaces/props/IButtonMapProps';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { AddImageMapIncident } from '../../../domain/actions/ActionMap';

// const BotonCameraMap: React.FC<IButtonMapProps> = ({ label, onPress }) => {
//  style={styles.button}
const BotonCameraMap: React.FC<IButtonMapProps> = ({ label }) => {

  const dispatch = useDispatch();
  const onCameraPress = useCallback(() => {
    const options : ImagePicker.CameraOptions = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false,      
    };
    ImagePicker.launchCamera(options, response => { 
      //console.log('Response = ', response);
    if (response.didCancel) { 
      console.log('User cancelled image picker');
    } else { 
      //console.log('response 1',(response.assets? response.assets[0].base64:'') );
     // console.log('response', JSON.stringify(response));
      const today = new Date();
      const urlimg = (response.assets? response.assets[0].uri? response.assets[0].uri:'':'');      
     // const imgblob = (response.assets? response.assets[0].base64? response.assets[0].base64:'':'');            
      dispatch(AddImageMapIncident(urlimg,''));

      // const newItemPhoto : ItemDataAlert = {
      //     id : uuid.v4().toString(),
      //     name: today.toISOString(),
      //     type :'photo',
      //     content : (response.assets? response.assets[0].uri:'')
      // };
      // setDataAlert(current => [...current, newItemPhoto]);

    } });
  }, []);
        
    return (
      <TouchableOpacity onPress={onCameraPress}>
        <View style={styles.container}>
          <Icon 
              name="camera-plus" 
              size={30}
              style={styles.button}            
              />                    
        </View>
      </TouchableOpacity>
    );
  };

  const styles =  StyleSheet.create({
    container: {
      flex : 1,
      flexDirection: 'row'
    },    
    button: {
      color:'#706e6e',
      width:'100%',
      textAlign:'center',
      verticalAlign:'middle',
      // paddingRight:25,
      // paddingLeft:25
    },
    label: {
      color: '#FFFFFF',
      fontSize: 8
    },
  });
  
export default BotonCameraMap;