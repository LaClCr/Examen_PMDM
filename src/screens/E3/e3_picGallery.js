
import { useContext, useEffect, useState, useRef } from 'react';
import ScreensContext from '../ScreensContext';
import { View, StyleSheet, Button, TextInput, Image } from 'react-native';
import { Video } from 'expo-av';

export default function Ejercicio3_4({ navigation }) {

    const { mediaUriName } = useContext(ScreensContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUri, setSelectedUri] = useState('');
  
    const handleSearch = () => {
      for (let i = 0; i < mediaUriName.length; i++) {
        const media = mediaUriName[i];
        if (media.name && media.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          console.log(media.name);
          setSelectedUri(media.uri);
          break;
        }
      }
    };
  
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder="Search by name"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button onPress={handleSearch} title="Search"></Button>
  
        {selectedUri && (
          <Image
            style={styles.image}
            source={{
              uri: selectedUri,
            }}
          />
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    image: {
      width: 350,
      height: 220,
      resizeMode: 'contain',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
  });