
import React,{useState,useEffect}from 'react';
import {View, Text, Alert, StyleSheet,  ImageBackground,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import {DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
import { ipconfig } from '../../Ipconfig';
import AsyncStorage from '@react-native-community/async-storage';

const CustomSidebarMenu = (props) => {
  var n =0;
  const [user, setUser] = useState('');
    useEffect(() => {
        getdata();
       });  
    async function getdata () {
      AsyncStorage.getItem('Medecineuser').then((value) =>setUser(value))
    }    
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ffffff', '#ffffff']}  style={stylesSidebar.sideMenuContainer} >
      <ImageBackground style={stylesSidebar.profileHeader}  source={require("../../../Image/headerdrawer.png")}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#495D7D'}}>
            {'user'.toUpperCase().charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>{user}</Text>
      </ImageBackground>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => <Text style={{          fontWeight: 'bold',
          fontSize: 15,color:'#495D7D',          
        }}>Logout</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Déconnexion',
              'Êtes-vous sûr? Vous voulez vous déconnecter ?',
              [
                {
                  text: 'Annuler',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirmer',
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
  },
  profileHeader: {
    height : 150,
    flexDirection: 'row',
    padding: 15,
    marginBottom : 30,

  },

  profileHeaderPicCircle: {
    marginTop :20,
    width : 60,
    height : 60,
    borderRadius: 60 / 2,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    marginTop:-20,
    color: '#495D7D',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize:17
  },

});
