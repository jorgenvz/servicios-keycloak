import React from 'react';
import { View, Text, Button } from 'react-native';
import { useKeycloak } from '@react-keycloak/native';
//import { useKeycloak } from '../../src/useKeycloak';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { OfflineModel } from '../managers/OfflineModel';

const loginpage = () => {
  const { keycloak } = useKeycloak();
  let modelc: OfflineModel;
  modelc = new OfflineModel();
  modelc.init();

  return (
    <View style={styles.container}>

      <Text>{`You are ${keycloak?.authenticated? '' : 'NOT '}authenticated with Keycloak`}</Text>
      
      <View style={styles.containerButtons}>

            <View style={styles.containerButtonwidth}>
            <Button onPress={() => keycloak?.login().then(() => Actions.push("connect", {model: modelc}))}  title="Login" />
            </View>

            <View style={styles.containerButtonwidth}>
            <Button onPress={() => keycloak?.logout()} title="Logout" />
            </View>
                  
      </View> 
    </View>
  );
};

export default loginpage;