import { View, Button } from 'react-native';

const Ejercicio3 = ({navigation}) => {

  return (
    <View style={{flex:1, justifyContent:'center'}}>
      <Button style={{margin:15}} title="Reproducir audio" onPress={() => navigation.navigate('Screen 1')} />
    </View>
  );
};


export default Ejercicio3;