
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import ScreensContext from '../ScreensContext';

const Ejercicio3_2 = ({ navigation }) => {
  const { isVideo, mediaUriName, setMediaUriName } = useContext(ScreensContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const camera = useRef(null);

  const [mediaName, setMediaName] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true };
      const img = await camera.current.takePictureAsync(options);
      setPhoto(img.uri);
      setShowCamera(false);
    }
  };

  const takeVideo = async () => {
    if (camera.current) {
      try {
        const videoData = await camera.current.recordAsync();
        setPhoto(videoData.uri);
      } catch (error) {
        console.error('Error recording video', error);
      }
    }
  };

  const stopVideo = async () => {
    if (camera.current) {
      camera.current.stopRecording();
      setShowCamera(false);
    }
  };

  const saveMedia = () => {
    if (mediaName) {
      if (isVideo) {
        let videoObj = { name: mediaName, uri: photo };
        let updatedMedia = [...mediaUriName];
        updatedMedia.push(videoObj);
        setMediaUriName(updatedMedia);

        console.log("VIDEO SAVED: " + mediaName + " uri: " + photo);
      } else {
        let photoObj = { name: mediaName, uri: photo };
        let updatedMedia = [...mediaUriName, photoObj];
        setMediaUriName(updatedMedia);

        console.log("PHOTO SAVED: " + mediaName + " uri: " + photo);

      }
      setMediaName('');
    }
  };

  const renderCameraPhoto = () => {
    return (
      <Camera style={styles.camera} ref={camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
            <MaterialIcons
              onPress={() => takePicture()}
              name="play-circle-outline"
              size={75}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  };

  const renderCameraVideo = () => {
    return (
      <Camera style={styles.camera} ref={camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
            <MaterialIcons
              onPress={() => takeVideo()}
              name="play-circle-outline"
              size={75}
              color="black"
            />
            <Entypo
              onPress={() => stopVideo()}
              name="controller-stop"
              size={90}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        isVideo ? renderCameraVideo() : renderCameraPhoto()
      ) : (
        <View>
          <Button title={isVideo ? 'Start Recording' : 'Take Photo'} onPress={() => setShowCamera(true)} />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter media name"
              value={mediaName}
              onChangeText={(text) => setMediaName(text)}
              style={styles.input}
            />
            <Button title='Save' onPress={saveMedia} />
            {
              isVideo ?(
                <Button title='Go to video gallery' onPress={() => navigation.navigate('Ejercicio3_3')} />

              ) : (
                <Button title='Go to pic gallery' onPress={() => navigation.navigate('Ejercicio3_4')} />
              )
            }
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Ejercicio3_2;
