// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Screens
import MedecineScreen from './DrawerScreens/MedecineScreen';
import EditProfile from './DrawerScreens/EditProfile';
import ProfileScreen from './DrawerScreens/ProfileScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const profilestack = createStackNavigator();

const MedecineScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MedecineScreen">
      <Stack.Screen
        name="MedecineScreen"
        component={MedecineScreen}
        options={{
          title: 'Medecine', //Set Header Title
          headerLeft : () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#E8F9FD', //Set Header color
          },
          headerTintColor: '#495D7D', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
       
    </Stack.Navigator>
  );
};

const ProfileScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
       
        headerStyle: {
          backgroundColor: '#E8F9FD', //Set Header color
        },
        headerTintColor: '#495D7D', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          headerLeft : () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#E8F9FD', //Set Header color
          },
          headerRight : () => (
            <Icon name="account-edit" size={25} color='#495D7D'
            onPress={() => navigation.navigate('EditProfile')}
            style={{ marginRight :15}}
          />
          ), //Set Header Title
        }}
      />
      <profilestack.Screen
        name="EditProfile"
        options={{
          title: 'Editer le profil',
          headerStyle: {
            backgroundColor: '#E8F9FD', //Set Header color
          },
          headerTintColor: '#495D7D', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
  
      screenOptions={{headerShown: false,
        drawerStyle: {
          width : 250,
        },
        overlayColor: null,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor:'#495D7D',
        drawerInactiveTintColor: '#495D7D',
        drawerActiveBackgroundColor: '#E8F9FD',
      }}
      drawerContent={CustomSidebarMenu}>
      
      <Drawer.Screen
        name="ProfileScreenStack"
        options={{drawerLabel: 'Profile'}}
        component={ProfileScreenStack}
      />
      <Drawer.Screen
        name="MedecineScreenStack"
        options={{drawerLabel: 'Medecine'}}
        component={MedecineScreenStack}
        
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
