import React, { useState, useContext} from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';
import ScreensContext from '../ScreensContext';

const Ejercicio4 = ({ navigation }) => {
  const { uris, setUris } = useContext(ScreensContext);
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [uri, setUri] = useState();

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    await recording.stopAndUnloadAsync();
    setUri(recording.getURI());
    setIsRecording(false);
  };

  const saveRecording = () => {
    if (uri) {
      setUris((prevUris) => [...prevUris, uri]);
      console.log("Recording saved");
    }
  };

  const playRecording = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing recording', error);
    }
  };

  const navigateToSecondScreen = () => {
    navigation.navigate('Ejercicio4_2');
  };

  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />

      <>
        <Button title="Play Recording" onPress={playRecording} />
        <Button title="Save Recording" onPress={saveRecording} />
      </>

      <Button title="Listen..." onPress={navigateToSecondScreen} />
    </View>
  );
};

export default Ejercicio4;
