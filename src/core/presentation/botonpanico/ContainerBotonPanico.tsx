import * as React from 'react';
import { FlatList, Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  gifAlertButton from '../../../assets/AlertPanicoGf.gif';
import  gifAddMicro from '../../../assets/microphone-recording.gif';
import  gifAddCamera from '../../../assets/camera-photo.gif';
import { useCallback, useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerResponse } from 'react-native-image-picker';
import {  SwipeablePanelProps } from 'rn-swipeable-panel/dist/Panel';
import { SwipeablePanel } from 'rn-swipeable-panel';
import uuid from 'react-native-uuid';
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/themed';

//import classescss from './ContainerBotonPanico.module.css';

type ItemDataAlert = {
  id: string;
  name: string;
  type: string;
  content: string | undefined ;
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    backgroundColor: 'white'
  },
  avatar: {
    alignItems: 'center',
    marginTop: '50%',
  },
  avatarImage: {
    height: 250,
    width: 250,
    overflow: 'hidden',
    // borderColor: '#ffffff',
    // borderWidth: 4,
    // borderRadius: 200 / 2,
  },
  addButton: {
    height: 70,
    width: 70,
    backgroundColor: '#f2f2fC',
    borderRadius: 40,
    position: 'absolute',
    right: 50, //104,
    bottom: 30,
  },
  addButtonIcon: {
    height: 66,
    width: 66,
  },
  addButtonCamera: {
    height: 70,
    width: 70,
    backgroundColor: '#f2f2fC',
    borderRadius: 40,
    position: 'absolute',
    left: 50, //104,
    bottom: 30,
  },
  modal: {
    justifyContent: 'flex-end',
    height: '60',
    overflow: 'scroll',
    margin: 0,
  },  
  screen: {
    flex: 1,
    backgroundColor: '#f2f2fC',
  },  
  pnlList :{
    backgroundColor: '#f2f2fC'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },  
});


type ItemProps = {
  item: ItemDataAlert;
  onPress: () => void;
};

const Item = ({item, onPress}: ItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{marginTop: 0}}>
    <ListItem bottomDivider containerStyle={{ backgroundColor: '#f2f2fC' }}>
     <ListItem.Content style={{alignItems: 'center'}}>
       <ListItem.Title style={{ fontSize: 14}}>{item.name}</ListItem.Title>
       {/* <ListItem.Subtitle >{item.type}</ListItem.Subtitle> */}
     </ListItem.Content>
      <Avatar rounded 
        size={48}
        source={{uri: item.content}}     
        /> 
   </ListItem>
    </View>    
  </TouchableOpacity>
);

function ContainerBotonPanico() : JSX.Element  {

  const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse|null>(null);
  const [visible, setVisible] = useState(false);
  const [dataAlert, setDataAlert] = useState<ItemDataAlert[]>([]);
  const [selectedId, setSelectedId] = useState<string>();

  const [panelProps, setPanelProps] = useState<SwipeablePanelProps>({
    isActive: true,
    onClose: () => closePanel(),
    showCloseButton: false,
    fullWidth: true,
    noBackgroundOpacity: true,
    style: styles.pnlList,
    // closeRootStyle?: object;
    // closeIconStyle?: object;
    closeOnTouchOutside: true,
    // onlyLarge?: boolean;
    onlySmall: true,
    //openLarge: false,
    smallPanelHeight: 250,
    // noBar?: boolean;
    // barStyle?: object;
    // barContainerStyle?: object;
     allowTouchOutside: true,
    // scrollViewProps?: ScrollViewProps;
  });

    // onPressCloseButton: () => closePanel(),
    // ...or any prop you want

  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };  

  const onCameraPress = useCallback(() => {
    const options : ImagePicker.CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, response => { 
      console.log('Response = ', response);
    if (response.didCancel) { 
      console.log('User cancelled image picker');
    } else { 
      console.log('response', JSON.stringify(response));
      const today = new Date();
      const urlimg = '';

      const newItemPhoto : ItemDataAlert = {
          id : uuid.v4().toString(),
          name: today.toISOString(),
          type :'photo',
          content : (response.assets? response.assets[0].uri:'')
      };
      setDataAlert(current => [...current, newItemPhoto]);

    } });
  }, []);
    

  const renderItem = ({item}: {item: ItemDataAlert}) => {
    // const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        //textColor={color}
      />
    );
  };

  const myItemSeparator = () => {
    return <View style={{ height: 0.5, backgroundColor: "grey",marginHorizontal:5}} />;
    };
    
    return (
      <View style={styles.screen}>      
      <View
      style={styles.imageBackground}  >
      <View style={styles.avatar}>
        <Image
          style={styles.avatarImage}
          source={gifAlertButton}
        />
        <TouchableOpacity style={styles.addButtonCamera} onPress={onCameraPress}>
          <Image style={styles.addButtonIcon} source={gifAddCamera} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)}>
          <Image style={styles.addButtonIcon} source={gifAddMicro} />
        </TouchableOpacity>
      </View>      
    </View>
    <SwipeablePanel {...panelProps}>
      <ScrollView horizontal={false} style={{flex: 1}}>
        <ScrollView
        horizontal={true}
        contentContainerStyle={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
              data={dataAlert}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              // ItemSeparatorComponent={myItemSeparator}
            />  
          </SafeAreaView> 
        </ScrollView>       
      </ScrollView>        
    </SwipeablePanel>    
    
    </View>
    );
  }
  // onPress={onPress} 
  // https://snack.expo.dev/@sharpkel/customized-flatlist?platform=android
  export default ContainerBotonPanico