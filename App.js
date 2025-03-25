
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import ClassRoom from './ClassRoom';
import DetailsRoom from './DetailsRoom';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name= "ClassRoom" component={ClassRoom} options={{ headerShown: false}}/>
        <Stack.Screen name='DetailsRoom' component={DetailsRoom}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
