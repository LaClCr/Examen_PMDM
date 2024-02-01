import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ScreensContext from '../ScreensContext'; 
import getData from '../../services/functions';

const Ejercicio2 = ({ navigation }) => {
  const {searchTerm, setSearchTerm} = useContext(ScreensContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese término de búsqueda"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Buscar" onPress={() => navigation.navigate('Ejercicio2_2')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
    width: '80%',
  },
});

export default Ejercicio2;
