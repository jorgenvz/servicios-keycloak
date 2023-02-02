import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0, left: 0, 
    right: 0, bottom: 0, 
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  containerButtonwidth: {
    width:150,
    padding: 14,
  },
});

export default styles;