
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import ClassRoom from './ClassRoom';
import DetailsRoom from './DetailsRoom';
import EmployeePage from './EmployeePage';
import EmployeeDetail from './EmployeeDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name= "ClassRoom" component={ClassRoom} options={{ headerShown: false}}/>
        <Stack.Screen name='DetailsRoom' component={DetailsRoom}/>
        <Stack.Screen name="EmployeePage" component={EmployeePage}/> 
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetail}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
