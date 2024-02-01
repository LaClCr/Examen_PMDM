import { View, Button } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';
import ScreensContext from '../ScreensContext';

const Ejercicio4_2 = ({ navigation }) => {
    const { uris, setUris } = useContext(ScreensContext);
    const [currentAudio, setCurrentAudio] = useState(0);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        loadAndPlayAudio();
    }, [currentAudio]);

    const loadAndPlayAudio = async () => {
        try {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            const playbackObject = new Audio.Sound();
            await playbackObject.loadAsync({ uri: uris[currentAudio] });
            setSound(playbackObject);
            await playbackObject.playAsync();
        } catch (error) {
            console.log('Error en el método loadAndPlayAudio', error.message);
        }
    };

    const handlePrevious = () => {
        if (currentAudio === 0) {
            setCurrentAudio(uris.length - 1);
        } else {
            setCurrentAudio(currentAudio - 1);
        }
    };

    const handleNext = () => {
        if (currentAudio === uris.length - 1) {
            setCurrentAudio(0);
        } else {
            setCurrentAudio(currentAudio + 1);
        }
    };

    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <Button title="Anterior" onPress={handlePrevious} />
            <Button title="Siguiente" onPress={handleNext} />
        </View>
    );
};

export default Ejercicio4_2;
