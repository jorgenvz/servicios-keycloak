import 'react-native-get-random-values';
import React from 'react';
import '../shim.js';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
//import { OfflineModel } from './managers/OfflineModel';
//import DatapointPage from './pages/DatapointPage';
import ConnectionPage from './pages/ConnectionPage';
import { PermissionsAndroid } from 'react-native';
import MainPage from './pages/MainPage';
import TrajectoryPage from './pages/TrajectoryPage';

import { ReactNativeKeycloakProvider } from '@react-keycloak/native';
import loginpage from './pages/LoginPage';
import keycloak from './pages/keycloak';

interface IProps {

}

export default class App extends React.Component<IProps> {
  //public offlineModel: OfflineModel;

  constructor(props: IProps) {
    super(props);
  //  this.offlineModel = new OfflineModel();
  }

  async componentDidMount() {
 
    /*await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Pagoda-localization',
        message: 'Pagoda-localization requires access to your location.',
        buttonPositive: 'Accept',
        buttonNeutral: 'Later',
        buttonNegative: 'Deny'
      }
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Pagoda-localization',
        message: 'Pagoda-localization requires access to your location.',
        buttonPositive: 'Accept',
        buttonNeutral: 'Later',
        buttonNegative: 'Deny'
      }
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: 'Pagoda-localization',
        message: 'Pagoda-localization requires access to your location in background.',
        buttonPositive: 'Accept',
        buttonNeutral: 'Later',
        buttonNegative: 'Deny'
      }
    );
    const sc = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Pagoda-localization',
        message: 'Pagoda-localization requires scanning for nearby bluetooth devices.',
        buttonPositive: 'Accept',
        buttonNeutral: 'Later',
        buttonNegative: 'Deny'
      });
      if (sc === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can scan BT devices");
      } else {
        console.log("bluetooth scan permission denied");
      } */
  /*    
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Pagoda-localization',
          message: 'Pagoda-localization requires connecting to nearby bluetooth devices.',
          buttonPositive: 'Accept',
          buttonNeutral: 'Later',
          buttonNegative: 'Deny'
        });
      
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          {
            title: 'Pagoda-localization',
            message: 'Pagoda-localization requires advertising to nearby bluetooth devices.',
            buttonPositive: 'Accept',
            buttonNeutral: 'Later',
            buttonNegative: 'Deny'
          });
*/
    //this.offlineModel.init();
  }

  render() {
    return (
      <ReactNativeKeycloakProvider
      authClient={keycloak}
      initOptions={{ redirectUri: "pagodaposicionamiento://ConnectionPage", inAppBrowserOptions: {},}}
      >

      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="login" component={loginpage} initial={true} />
          <Scene key="connect" component={ConnectionPage} />
          <Scene key="map" component={MainPage}/>
          <Scene key="trajectory" component={TrajectoryPage}/>
        </Scene>
      </Router>
      
      </ReactNativeKeycloakProvider>
    );
  }
}
