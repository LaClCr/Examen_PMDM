import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={{justifyContent:'center', flex:1, }}>
      <Button
        title="Ejercicio 2"
        onPress={() => navigation.navigate('Ejercicio2')}
      />
      <Button
        title="Ejercicio 3"
        onPress={() => navigation.navigate('Ejercicio3')}
      />
      <Button
        title="Ejercicio 4"
        onPress={() => navigation.navigate('Ejercicio4')}
      />
    </View>
  );
};

export default Home;