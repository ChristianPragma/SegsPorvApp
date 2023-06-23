/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NavigatorMenu from './NavigatorMenu';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';
import { Provider, useDispatch } from 'react-redux';
import Store from './src/core/domain/store/Store';
import { GeneralUseCase } from './src/core/domain/usecases/GeneralUseCase';
import { FillDataGeneral } from './src/core/domain/actions/ActionMap';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
        ? [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        ]
      : [
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ];
    
      const status = await checkMultiple(permission);
    
      if (
        (Platform.OS === 'android' &&
        status[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED &&
        status[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED &&
        status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED &&
        status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED &&
        status[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED 
        ) ||
      (Platform.OS === 'ios' &&
        (status[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED ||
          status[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED))
      ) {
        // Permiso ya concedido, puedes realizar las operaciones necesarias con la ubicación
        console.log('Permiso concedido - I, puedes realizar las operaciones necesarias con la ubicación');
      } else {
        const result = await requestMultiple(permission);
    
        if (
          (Platform.OS === 'android' &&
          result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED &&
          result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED &&
          status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED &&
          status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED &&
          status[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED 
          ) ||
        (Platform.OS === 'ios' &&
          (result[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED ||
            result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED))          
        ) {
          // Permiso concedido, puedes realizar las operaciones necesarias con la ubicación
          console.log('Permiso concedido - II, puedes realizar las operaciones necesarias con la ubicación');
        } else {
          // Permiso denegado, maneja el escenario en consecuencia
          console.log('Permiso denegado, maneja el escenario en consecuencia');
        }
      }
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud de permisos
      console.warn(error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    // // load datos principales
    // const fetchDataGeneral = async () => {
    //   try {
    //     const response = await generalUseCase.getAllGeneral();
    //     dispatch(FillDataGeneral(response));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchDataGeneral();    
    
  }, []);
    
  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         MUNI PORVER APP V.1.0<Text style={styles.highlight}>App.tsx</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View>
    //   </ScrollView>

    // </SafeAreaView>
// <SafeAreaView >    
    <Provider store={Store}>
      <NavigatorMenu/>
    </Provider>
 //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
