
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image,Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
     
      
      AsyncStorage.getItem('Patientuser').then((value) =>
        {
          if(value === null)
         {AsyncStorage.getItem('Medecineuser').then((value) =>
         navigation.replace(value === null ? 'Auth' : 'MedDrawerNavigationRoutes'))}
         else {  
          navigation.replace('DrawerNavigationRoutes');
        }
      }

      );
     
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/logoapp.png')}
        style={{width : 160,height : 120, resizeMode: 'stretch', }}
      />
<Text style={styles.text}>  By <Text style={styles.blod}>DHCsys</Text> </Text>
   <ActivityIndicator
        animating={animating}
        color="#7097ab"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height : 80,
  },
  text: {
    fontSize : 17,
    letterSpacing :2,
    textAlign : 'center',
    color: '#000000',
    top : 300
  },
  blod: {
    
    fontWeight: 'bold',
    color: '#000000',
    
  },
});
