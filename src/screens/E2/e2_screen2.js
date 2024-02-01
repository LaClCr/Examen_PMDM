import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import { getData } from '../../services/functions';

import ScreensContext from '../ScreensContext';

export default function Ejercicio2_2() {
  const [album, setAlbum] = useState("");
  const [title, setTitle] = useState("");
  const [sound, setSound] = useState(null);
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); 

  const { searchTerm } = useContext(ScreensContext);

  useEffect(() => {
    fetchData();
  }, [currentIndex]); 

  const fetchData = async () => {
    try {
      const d = await getData(searchTerm);
      setData(d.data);

      const a = d.data[currentIndex].album.title;
      setAlbum(a);

      const t = d.data[currentIndex].title;
      setTitle(t);

      const s = d.data[currentIndex].preview;
      const { sound } = await Audio.Sound.createAsync({ uri: s });
      setSound(sound);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const playAudio = async () => {
    try {
      if (sound) {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error al reproducir audio:', error);
    }
  };

  const pauseAudio = async () => {
    try {
      if (sound) {
        const result = await sound.getStatusAsync();
        if (result.isLoaded && result.isPlaying) {
          await sound.pauseAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        const result = await sound.getStatusAsync();
        if (result.isLoaded && result.isPlaying) {
          await sound.stopAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeIndex = (newIndex) => {
    const lastIndex = data.length - 1;
  
    if (newIndex < 0) {
      setCurrentIndex(lastIndex); 
    } else if (newIndex > lastIndex) {
      setCurrentIndex(0); 
    } else {
      setCurrentIndex(newIndex); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Album: {album}</Text>
      <Text style={styles.text}>Canción: {title}</Text>
      <View style={styles.audioButtons}>
        <View style={styles.carousel}>
          <AntDesign name="stepbackward" size={75} color="black" onPress={() => changeIndex(currentIndex - 1)} />
        </View>
        <View style={styles.buttons}>
          <MaterialIcons name="play-circle-outline" size={90} color="black" onPress={playAudio} />
          <Ionicons name="pause-circle" size={90} color="black" onPress={pauseAudio} />
        </View>
        <View style={styles.buttons}>
          <Entypo name="controller-stop" size={90} color="black" onPress={stopAudio} />
        </View>
        <View style={styles.carousel}>
          <AntDesign name="stepforward" size={75} color="black" onPress={() => changeIndex(currentIndex + 1)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  },
  audioButtons: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  carousel: {
    padding: 2,
    marginTop: 35,
  },
  buttons: {
    padding: 2,
    marginTop: 30,
  },
});
