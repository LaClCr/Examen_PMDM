import { useContext, useState } from 'react';
import { View, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import ScreensContext from '../ScreensContext';

const Ejercicio3 = ({navigation}) => {

  const { setIsVideo } = useContext(ScreensContext);
  const [selectedOption, setSelectedOption] = useState(null);


  const handleGoButton = () => {
    if (selectedOption === 'Video') {
      console.log("VIDEO");
      setIsVideo(true);
    } else if (selectedOption === 'Foto') {
      console.log("FOTO");
      setIsVideo(false);
    }

    navigation.navigate('Ejercicio3_2'); 
  };

  const data = [
    { key: '1', value: 'Video' },
    { key: '2', value: 'Foto' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SelectList
        data={data}
        setSelected={(val) => setSelectedOption(val)} 
        save="value"
      />
      <Button title="Go" onPress={handleGoButton} />
    </View>
  );
};

export default Ejercicio3;