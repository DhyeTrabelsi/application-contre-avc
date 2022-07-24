import 'react-native-gesture-handler';
 
// Import React and Component
import React from 'react';
import { Platform } from 'react-native';
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import MedDrawerNavigationRoutes from './Screen/MedDrawerNavigationRoutes';

import OnboardingScreen from './Screen/OnboardingScreen';

const Stack = createStackNavigator();
 
const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
   
    </Stack.Navigator>
  );
};

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => { (async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }

  
  })();
}, []);
  return (
    isAppFirstLaunched != null && (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen">
      {isAppFirstLaunched && (
 <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{headerShown: false}}
        /> )}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />

       
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MedDrawerNavigationRoutes"
          component={MedDrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
  );
};
 
export default App;