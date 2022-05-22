// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';

const CustomSidebarMenu = (props) => {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F8E2CF', '#FDF6F0']}  style={stylesSidebar.sideMenuContainer} >
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#7D5A50'}}>
            {'Flen ben foulen'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>Flen ben foulen</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => <Text style={{          fontWeight: 'bold',
          fontSize: 15,color:'#7D5A50',          
        }}>Logout</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width : '100%',
    height : '100%',
    paddingTop : 40,

  },
  profileHeader: {
    flexDirection: 'row',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width : 60,
    height : 60,
    borderRadius: 60 / 2,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: '#7D5A50',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize:17
  },
  profileHeaderLine: {
    height : 1,
    marginHorizontal: 20,
    backgroundColor: '#f2f2f2',
    marginTop : 15,
  },
});
