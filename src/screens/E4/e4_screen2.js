import { View, Button } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';
import ScreensContext from '../ScreensContext';


const Ejercicio4_2 = ({ navigation }) => {

    const { uris, setUris } = useContext(ScreensContext);
    const [currentAudio, setCurrentAudio] = useState(0);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        playCurrentAudio();
      }, [currentAudio]);

    const playCurrentAudio = async () => {
        console.log("CURRENT AUDIO: " + currentAudio);
        try {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            const playbackObject = new Audio.Sound();
            await playbackObject.loadAsync(
                { uri: uris[currentAudio] },
                { shouldPlay: true }
            );
            setSound(playbackObject);
        } catch (error) {
            console.log('Error en el método play', error.message);
        }
    };

    const handlePrevious = async () => {
        if (currentAudio === 0) {
            setCurrentAudio(uris.length - 1);
        } else {
            setCurrentAudio(currentAudio - 1);
        }
        playCurrentAudio();
    };

    const handleNext = async () => {
        if (currentAudio === uris.length - 1) {
            setCurrentAudio(0);
        } else {
            setCurrentAudio(currentAudio + 1);
        }
        playCurrentAudio();
    };

    return (
        <View style={{ justifyContent: 'center', flex: 1, }}>
            <Button
                title="Anterior"
                onPress={handlePrevious}
            />
            <Button
                title="Siguiente"
                onPress={handleNext}
            />
        </View>
    );
};


export default Ejercicio4_2;