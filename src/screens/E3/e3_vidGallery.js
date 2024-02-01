import { useContext, useEffect, useState } from 'react';
import ScreensContext from '../ScreensContext';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import { Video } from 'expo-av';

export default function Ejercicio3_3({ navigation }) {
  const { mediaUriName } = useContext(ScreensContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUri, setSelectedUri] = useState('');
  const [status, setStatus] = useState({});

  useEffect(() => {
    console.log(mediaUriName);
  }, []);

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
        <Video
          style={styles.video}
          source={{
            uri: selectedUri,
          }}
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={(newStatus) => setStatus(newStatus)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: 350,
    height: 220,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
