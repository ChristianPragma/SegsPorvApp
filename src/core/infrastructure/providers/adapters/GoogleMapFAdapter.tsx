import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Modal, Image, Platform, ActivityIndicator } from 'react-native';
import MapView, { Marker, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import MarkerIncidentMap from '../../../../assets/MarkerIncidentMap.gif';
import MarkerIncidentMapMessage from '../../../../assets/MarkerIncidentMapMessage.gif';
import { Card, IconButton, ProgressBar, Title } from 'react-native-paper';
import AudioRecorderPlayer, { PlayBackType } from 'react-native-audio-recorder-player';
import { DocumentDirectoryPath, readFile } from 'react-native-fs';
import { ClearMapIncident, LoadingMapIncident } from '../../../domain/actions/ActionMap';
import { SaveIncidenciaMapModel } from '../../../domain/models/SaveIncidenciaMapModel';
import { IncidenciaUseCase } from '../../../domain/usecases/IncidenciaUseCase';
import Geocoder from 'react-native-geocoding';



//import { interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';


// implements IMapAdapter 

// Componente funcional concreto 1
export const GoogleMapFAdapter: React.FC = () => {

  Geocoder.init('AIzaSyAon9qDYlZ1UWi5rIh8s1BtfyKa-K7i2ZY');

  const audioRecorderPlayer = new AudioRecorderPlayer();
  const incidenciaUseCase = new IncidenciaUseCase();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const imageIncident = useSelector((state: any) => state.image);
  const imageBlobIncident = useSelector((state: any) => state.imageBlob);
  const audioIncident = useSelector((state: any) => state.audio);
  const generalesData = useSelector((state: any) => state.generales);

  const loadingSendAlertIncident = useSelector((state: any) => state.loadingSendAlert);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [playDuration, setPlayDuration] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [iconColor, setIconColor] = useState('#333333');
  const [imageBase64, setImageBase64] = useState('');
  const [audioBase64, setAudioBase64] = useState('');
  const [addressIncident, setAddressIncident] = useState('');
  const dispatch = useDispatch();

  let timer: number | undefined;

  const [modalVisible, setModalVisible] = useState(false);  
  const [coordenate, setCoordenate] = useState({
    latitude : -8.11599,
    longitude: -79.02998       
  });
  const mapRef = useRef<MapView>(null);
  let watchId : any= null;

  // const [mapRef, setMapRef] = useState(createRef());

  // Equivalente a componentDidMount
  useEffect(() => {
    // Limpiar variables (minimizar el riesgo)
    dispatch(ClearMapIncident());
    // Lógica a ejecutar cuando el componente se monta
    firstCall();
  }, []);

  // // Equivalente a componentDidUpdate
  useEffect(() => {
    // Lógica a ejecutar cuando data cambia
    console.log('componentDidUpdate',imageIncident,audioIncident);    
    startWatchingLocation();
    if(imageIncident){
      // getUriToBase64(imageIncident)
      // .then((response)=>{
      //   setImageBase64(response);
      // });

       handleChangeBlob(imageIncident,'image');
    }
    if(audioIncident){
      // getUriToBase64(audioIncident)
      // .then((response)=>{
      //   setAudioBase64(response);
      // }); audioIncident
      handleChangeBlob(audioIncident,'audio');
    }      
  }, [coordenate,imageIncident,audioIncident]);
  
  // // Equivalente a componentDidUpdate
  useEffect(() => {
    // Lógica a ejecutar cuando data cambia
    console.log('componentDidUpdate-loadingSendAlertIncident',loadingSendAlertIncident);
    if(loadingSendAlertIncident){
      onHandledSendIncidencia();
    }       
  }, [loadingSendAlertIncident]);  

  const firstCall =()=> {
    Geolocation.getCurrentPosition(
      (position) => {
        handleMarkerUpdate(position.coords.latitude,position.coords.longitude);  
      },
      (error) => {
        // Manejar errores al obtener la ubicación
        console.log(error);
      },
      { timeout: 15000, maximumAge: 10000, enableHighAccuracy: true ,showLocationDialog : true, forceRequestLocation: true }
    );

  }

const startWatchingLocation=()=> {
    console.log('startWatchingLocation');  
    watchId = Geolocation.watchPosition(
      (position) => {
        // Manejar la actualización de la posición aquí
        console.log('New position:', position);
        handleMarkerUpdate(position.coords.latitude,position.coords.longitude);               
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

 const handleMarkerUpdate = (latitude:number,longitude:number) => {
    setCoordenate({
      latitude : latitude,
      longitude: longitude       
    });
     
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }        

    Geocoder.from(latitude, longitude)
            .then((res)=>{
              if (res.results.length > 0) {
                const address = res.results[0].formatted_address;
                setAddressIncident(address);
              } else {
                console.log('No se encontró la dirección para las coordenadas proporcionadas');
              }   
            })
  };


  const handleMarkerPress = () => {
    setModalVisible(!modalVisible);
  };

  const handleToggleModal = ()=> {
    setModalVisible(!modalVisible);
  }

  const PlayRecording = React.useCallback(async () => {
    try {
      if(isAudioPlaying)
          return;

      const pathAudio = Platform.select({
        ios: 'hello.m4a',
        android: `${DocumentDirectoryPath}/hello.mp4`,
      });    
      console.log('Playing audio path:', pathAudio);
      setIsAudioPlaying(true);
      const msg = await audioRecorderPlayer.startPlayer(pathAudio);
      const volume = await audioRecorderPlayer.setVolume(1.0);
      console.log(msg);
      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        setCurrentPositionSec(e.currentPosition);
        setCurrentDurationSec(e.duration);
        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition),));
        setPlayDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration))); 
        if(e.currentPosition == e.duration){
            setIsAudioPlaying(false);
            stopTimerIcon();
            setPlayTime('00:00:00');
            setPlayDuration('00:00:00');
            setCurrentPositionSec(0);
            setCurrentDurationSec(0);
          }                
      });
      startTimerIcon();   
    } catch (error) {
      console.log('Error playing :', error);
    }
  }, []);  


  const startTimerIcon = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setInterval(() => {
      setIconColor((prevColor) => (prevColor === '#E91E63' ? '#333333' : '#E91E63'));
    }, 250);
  };

  const stopTimerIcon = () => {
    if (timer) {
      setIconColor('#333333');
      clearTimeout(timer);
      timer = undefined;
    }
  };

  async function getUriToBase64(uri:string) {
    const base64String = await readFile(uri, "base64");
    return base64String
  }  

const onHandledSendIncidencia = async () => {
    console.log('Enviando incidencia a la nube ');
    
    const incidenciaSave : SaveIncidenciaMapModel={
       audio:audioBase64,
       direccion:addressIncident,
       imagen :imageBase64, //imageBase64,
       latitud:coordenate.latitude,
       longitud:coordenate.longitude       
    } ;
    await incidenciaUseCase
          .createIncidencia(incidenciaSave,generalesData)
          .then((response)=>{
            if(response){
              dispatch(ClearMapIncident());
            }          
          })
          .finally(()=>{
            dispatch(LoadingMapIncident(false));
          });

  }

  const handleChangeBlob = async (event:any,tipo:string)=>{
    let mediaBlobUrl = event;
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const fileReader = new FileReader();
    fileReader.onload = function() {
      var dataUrl = fileReader.result;
      console.log("dataUrl to base64: " + dataUrl.slice(0,100));
      if(tipo==='image'){
        setImageBase64(dataUrl.toString());  
      }else{
        setAudioBase64(dataUrl.toString());
      }      
      //data:image/png;base64,
      //data:image/jpeg;base64,
    };
   fileReader.readAsDataURL(audioBlob);
  };

  const render = () => {
    return (
      <View style={styles.container}>    
      <MapView             
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude :coordenate.latitude,
          longitude :coordenate.longitude,
          latitudeDelta :0.001,
          longitudeDelta : 0.001
        }}
      >
        <Marker
          coordinate={{
            latitude: coordenate.latitude,
            longitude: coordenate.longitude,
          }}
          onPress={() =>
            handleMarkerPress()
          }>
           
            <Image style={styles.alermapmarker} source={ (imageIncident  || audioIncident)? MarkerIncidentMapMessage : MarkerIncidentMap} />
        </Marker>
      </MapView>     

    <Modal visible={modalVisible} onDismiss={handleToggleModal} animationType="slide">
    <View style={styles.modalContainer}>
        <IconButton
          icon="close"
          size={24}
          onPress={handleToggleModal}
          style={styles.closeButton}
        />
        <Title style={styles.title}>Detalle de incidencia</Title>
        <Title style={styles.subtitle}>{addressIncident}</Title>
        <Card style={styles.card}>          
          {imageIncident? <Card.Cover source={{ uri: imageIncident }} style={{height:'100%'}} /> : null} 
        </Card>
        <Card style={styles.cardAudio}>
          <Card.Content style={{padding:0,margin:0}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton
                      icon= { isAudioPlaying? 'google-podcast':'play'}
                      size={30}
                      style={{padding:0,margin:0, marginTop:-5}}
                      onPress={PlayRecording}
                      animated = {true}
                      iconColor={iconColor}
                    />                 
              <View style={{ flex: 1, marginLeft: 2 , marginTop:12}}>
                <ProgressBar
                   style={{marginTop:0}}
                  progress={currentDurationSec !== 0 ? currentPositionSec / currentDurationSec : 0}
                />
                <Text style={{ alignSelf: 'flex-end' }}> {playTime} / {playDuration}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>        
        </View>
      </Modal>

      <Modal visible={loadingSendAlertIncident} animationType="fade">
         <View style={styles.modalContainerLoading}>
           <Title style={styles.subtitleLoading}>Alertando a la central de monitoreo</Title>     
           {/* <ActivityIndicator size="large" color="#00ff00"  />; */}
           <ActivityIndicator animating={true} color="#00ff00" size={'large'} />

        </View> 
      </Modal>

    </View>
    );
  };

  return render();
};
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map:{
      width:'100%',
      height:'100%'
    },
    alermapmarker:{
      width:150,
      height:150
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 18,
      marginBottom: 15, 
      fontWeight : "bold"     
    },
    subtitle: {
      fontSize: 15,
      marginBottom: 10,
      marginLeft:10
    },  
    subtitleLoading: {
      fontSize: 18,
      marginBottom: 20
    },       
    card: {
      width: '100%',
      height: '70%',
      marginBottom: 10,
    },
    cardAudio: {
      width: '100%',
      height:70,
      // backgroundColor: '#eeeeee',
      padding : 0,
      borderRadius:15
      //marginBottom: 10,
    },    
    audioSection: {
      width: '100%',
      backgroundColor: '#eeeeee'
    },    
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
    }, 
    modalContainerLoading: {
      flex:1,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
      alignContent:'center',
      justifyContent:'center',
      textAlignVertical:'center',
      textAlign:'center',
      verticalAlign:'middle',      
    },        
  });


