import Ejercicio2 from './src/screens/E2/e2_screen1';
import Ejercicio2_2 from './src/screens/E2/e2_screen2';
import Ejercicio3 from './src/screens/E3/e3_pantalla1';
import Ejercicio4 from './src/screens/E4/e4_pantalla1';
import Home from './src/screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ScreensProvider } from './src/screens/ScreensContext';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function Examen() {
  return (
    <ScreensProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Ejercicio2" component={Ejercicio2} />
          <Stack.Screen name="Ejercicio2_2" component={Ejercicio2_2} />
          <Stack.Screen name="Ejercicio3" component={Ejercicio3} />
          <Stack.Screen name="Ejercicio4" component={Ejercicio4} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScreensProvider>
  );
}

