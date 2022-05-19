// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!user) {
      alert("Veuillez remplir votre nom d'utilisateur");
      return;
    }
    if (!userPassword) {
      alert('Veuillez remplir votre mot de passe');
      return;
    }
    setLoading(true);
    let dataToSend = {user_email: user, user_password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://aboutreact.herokuapp.com/login.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          AsyncStorage.setItem('user_id', user);
          console.log(AsyncStorage.getItem('user_id'));
          navigation.replace('DrawerNavigationRoutes');
        } else {
          AsyncStorage.setItem('user_id', user);
          console.log(AsyncStorage.getItem('user_id'));
          navigation.replace('DrawerNavigationRoutes');
        }
      })
      .catch((error) => {
        console.log('3');
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Image/logoapp.png')}
                style={{
                  width : '50%',
                  height : 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(User) => setUser(User)}
                placeholder="Entrer le nom d'utilisateur" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                color="#15143a"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Entrer votre mot de passe" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                color="#15143a"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Connexion</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
            >
              <Text style={styles.text}><Text style={styles.blod}>Pas encore de compte ?</Text>  vous êtes intéressé, contacter rapidement notre service administratif <Text style={styles.blod}>DHCsys</Text> </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height : 40,
    marginTop : 20,
    marginLeft : 35,
    marginRight : 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7097ab',
    borderWidth : 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height : 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft : 120,
    marginRight : 120,
    marginTop : 35,
    marginBottom : 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft : 15,
    paddingRight : 15,
    borderWidth : 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000000',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  text: {
    fontSize : 17,
    letterSpacing :2,
    textAlign : 'center',
    bottom : -50, 

  },
  blod: {
    fontWeight: 'bold'

  },
});
