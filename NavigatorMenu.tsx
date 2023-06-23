import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ContainerMapComponent from './src/core/presentation/containers/maps/ContainerMap';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BotonCameraMap from './src/core/presentation/containers/maps/BotonCameraMap';
import BotonAudioMap from './src/core/presentation/containers/maps/BotonAudioMap';
import BotonAlertaMap from './src/core/presentation/containers/maps/BotonAlertaMap';
import { useDispatch } from 'react-redux';
import { GeneralUseCase } from './src/core/domain/usecases/GeneralUseCase';
import { FillDataGeneral } from './src/core/domain/actions/ActionMap';

// https://www.youtube.com/watch?v=gPaBicMaib4
// https://github.com/azdravchev/CustomBottomTabs/blob/master/src/components/TabContainer.js
// https://stackoverflow.com/questions/72822409/react-native-bottom-tab-navigator-tabbaroptions-is-deprecated-migrate-the-o

const Tab = createBottomTabNavigator();

const ActionButtonBar: React.FC = ({  }) => {
  return (
    <View style={styles.container}>    
      <View style={styles.buttonContainer}>
        <BotonCameraMap label='Foto' ></BotonCameraMap>
      </View>
      <View style={styles.buttonContainer}>
        <BotonAlertaMap label='Alerta'></BotonAlertaMap>
      </View>            
      <View style={styles.buttonContainer}>
        <BotonAudioMap label='Audio'></BotonAudioMap>
      </View>
    </View>
  );
};

function TabsMenuNavegator() {
  return (
    <Tab.Navigator         
        initialRouteName='Incident'
        screenOptions={{
          tabBarActiveTintColor: 'purple',
          tabBarShowLabel:false,
          tabBarStyle:{
            position: 'absolute',
            bottom:10,
            left:10,
            right:10,
            elevation:0,
            backgroundColor:'#ffffff',
            borderRadius:15,
            height:70
          }
        }}
        tabBar={() => <ActionButtonBar />}       
      >
      <Tab.Screen name="Incident"       
        options={{
        tabBarLabel:"Mapa",
        headerShown:false, 
      }} component={ContainerMapComponent} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
         width:0,
         height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:10,
    left:10,
    right:10,
    elevation:0,
    backgroundColor:'#ffffff',
    borderRadius:15,
    height:70    
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  }
}); 

export default function NavigatorMenu(){
  const dispatch = useDispatch();
  const generalUseCase = new GeneralUseCase();
  React.useEffect(() => {
    // load datos principales
    const fetchDataGeneral = async () => {
      try {
        const response = await generalUseCase.getAllGeneral();
        console.log('response-general',response)
        dispatch(FillDataGeneral(response));
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataGeneral();    
    
  }, []);

  return (
      <NavigationContainer>
          <TabsMenuNavegator></TabsMenuNavegator>
      </NavigationContainer>
  );
}
