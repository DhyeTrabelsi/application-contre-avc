
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PatientScreen from './Sessionmed/DrawerScreens/PatientScreen';
import EditProfile from './Sessionmed/DrawerScreens/EditProfile';
import ProfileScreen from './Sessionmed/DrawerScreens/ProfileScreen';
import DemandesScreen from './Sessionmed/DrawerScreens/DemandesScreen';
import CustomSidebarMenu from './Sessionmed/Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Sessionmed/Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const profilestack = createStackNavigator();

const PatientScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="PatientScreen">
      <Stack.Screen
        name="PatientScreen"
        component={PatientScreen}
        options={{
          title: 'Patients', //Set Header Title
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

const DemandesScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="DemandesScreen">
      <Stack.Screen
        name="Demandes"
        component={DemandesScreen}
        options={{
          title: 'Demandes', //Set Header Title
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
        name="PatientScreenStack"
        options={{drawerLabel: 'Patient'}}
        component={PatientScreenStack}
        
      />
      <Drawer.Screen
        name="DemandesScreenStack"
        options={{drawerLabel: 'Demandes'}}
        component={DemandesScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
