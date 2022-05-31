import React, { useState, useEffect , createRef} from 'react';
import {StyleSheet,Text,View,ScrollView,StatusBar,TextInput,ImageBackground,Image,TouchableOpacity,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView} from 'react-native';
import Loader from './Sessionpat/Components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { ipconfig } from './Ipconfig';
export default function LoginScreen({navigation}) {
  const loginsuccesspatient = () => { navigation.replace('DrawerNavigationRoutes');}
  const loginsuccessmedecine = () => { navigation.replace('MedDrawerNavigationRoutes');}
  const [activeTab, setActiveTab] = useState('Loginpatient');

  useEffect(function () {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  function switchTab() {
    if (activeTab === 'Loginpatient') {
      setActiveTab('Loginmedecine');
    } else {
      setActiveTab('Loginpatient');
    }
  }

  function Loginpatient() {
    const handleSubmitPresspatient = () => {
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
      const LoginJson = { "username": String(user), "password":String(userPassword)};
      axios({
        headers: { 'Content-Type': 'application/json'},
        method: 'post',
        url:'http://'+ipconfig+':8000/api/login/patient/',
        data: LoginJson,
      }).then(response=>{

        AsyncStorage.setItem('Patientuser', user);
        AsyncStorage.setItem('Patientbirthday', response.data.data.birthday);
        AsyncStorage.setItem('Patientbmi', String(response.data.data.bmi));
        AsyncStorage.setItem('Patientemail', String(response.data.data.email));
        AsyncStorage.setItem('Patientlastname', String(response.data.data.lastname));
        AsyncStorage.setItem('Patientmedecine', String(response.data.data.medecine));
        AsyncStorage.setItem('Patienttelephone',String( response.data.data.telephone));
        AsyncStorage.setItem('Patientpostion', String(response.data.data.postion));
        AsyncStorage.setItem('Patientgender', String(response.data.data.gender));
        AsyncStorage.setItem('Patientfirstname', String(response.data.data.firstname));
        AsyncStorage.setItem('Patientpoids', String(response.data.data.poids));

        AsyncStorage.setItem('Patientsmoking_status',String( response.data.data.smoking_status));
        AsyncStorage.setItem('Patientever_married',String( response.data.data.ever_married));
        AsyncStorage.setItem('Patientavg_glucose_level', String(response.data.data.avg_glucose_level));
        AsyncStorage.setItem('type_de_travail', String( response.data.data.type_de_travail));
        AsyncStorage.setItem('heart_disease', String( response.data.data.heart_disease));
        AsyncStorage.setItem('hypertension', String( response.data.data.hypertension));

        AsyncStorage.setItem('Patientstroke', String(response.data.data.stroke));
        loginsuccesspatient();
          })
          .catch((error) => {
          if(error.response.data !== undefined){

          if(error.response.data.detail === 'User not found!'){
            setLoading(false);
            alert("il n'y a pas de compte patient avec ce nom...");
            }
            if(error.response.data.detail ===  'Incorrect password!'){
              setLoading(false);
              alert("Mot de passe du compte patient incorrect avec ce nom...");
  
            }}
            else {
              setTimeout(() => {
                setLoading(false);
              alert("Erreur de connexion...");

               }, 1000);
         
        }})
  }
    const [user, setUser] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const passwordInputRef = createRef();
    return (
      <View style={styles.mainBody}>
           <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            marginTop : 50
          }}>
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{alignItems: 'center'}}>
               
              </View>
              <View style={styles.SectionStyle}>
  
                <TextInput
                
                  style={styles.inputStyle}
                  onChangeText={(User) => setUser(User)}
                  placeholder="Entrer le nom de patient"
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
                onPress={handleSubmitPresspatient}>
                <Text style={styles.buttonTextStyle}>Connexion</Text>
              </TouchableOpacity>
              <Text
                style={styles.TextStyle}
              >
                <Text style={styles.text}><Text style={styles.blod}>Pas encore de compte ?</Text>  vous êtes intéressé, contacter rapidement notre service administratif <Text style={styles.blod}>DHCsys</Text> </Text>
              </Text>

            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  }

  function Loginmedecine() {
    const handleSubmitPressmedecine = () => {
      setErrortextmedecine('');
      if (!usermedecine) {
        alert("Veuillez remplir votre nom d'utilisateur");
        return;
      }
      if (!userPasswordmedecine) {
        alert('Veuillez remplir votre mot de passe');
        return;
      }
      setLoading(true);
      const LoginJson = { "username": String(usermedecine), "password":String(userPasswordmedecine)};
  
      axios({
        headers: { 'Content-Type': 'application/json'},
        method: 'post',
        url:'http://'+ipconfig+':8000/api/login/medecine/',
        data: LoginJson,
      }).then(response=>{
        AsyncStorage.setItem('Medecineuser', usermedecine);
        AsyncStorage.setItem('Medecineemail', String(response.data.data.email));
        AsyncStorage.setItem('Medecinelastname', String(response.data.data.last_name));
        AsyncStorage.setItem('Medecinetelephone',String( response.data.data.telephone));
        AsyncStorage.setItem('Medecinepostion', String(response.data.data.postion));
        AsyncStorage.setItem('Medecinefirstname', String(response.data.data.first_name));

        loginsuccessmedecine();
          })
          .catch((error) => {
            if(error.response.data !== undefined){
  
            if(error.response.data.detail === 'User not found!'){
              setLoading(false);
              alert("il n'y a pas de compte medecine avec ce nom...");
              }
              if(error.response.data.detail ===  'Incorrect password!'){
                setLoading(false);
                alert("Mot de passe du compte medecine incorrect avec ce nom...");
    
              }}
              else {
                setTimeout(() => {
                  setLoading(false);
                alert("Erreur de connexion...");
  
                 }, 1000);
           
          }})
  } 
  const [usermedecine, setUsermedecine] = useState('');
  const [userPasswordmedecine, setUserPasswordmedecine] = useState('');
  const [errortextmedecine, setErrortextmedecine] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRefmedecine = createRef();
    return (
      <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          marginTop : 50
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
             
            </View>
            <View style={styles.SectionStyle}>

              <TextInput
              
                style={styles.inputStyle}
                onChangeText={(User) => setUsermedecine(User)}
                placeholder="Entrer le nom de medecine"
                placeholderTextColor="#8b9cb5"
                color="#15143a"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRefmedecine.current && passwordInputRefmedecine.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
              
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPasswordmedecine(UserPassword)}
                placeholder="Entrer votre mot de passe" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                color="#15143a"
                ref={passwordInputRefmedecine}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortextmedecine != '' ? (
              <Text style={styles.errorTextStyle}> {errortextmedecine} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPressmedecine}>
              <Text style={styles.buttonTextStyle}>Connexion</Text>
            </TouchableOpacity>
            <Text
              style={styles.TextStyle}
            >
            </Text>

          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View  style={styles.container}>
      <View           style={{height : 210,}}           
 >
                <ImageBackground
                  source={require("../Image/header.png")}
                  style={styles.imageBackground}
                >
                 <Image
                  source={require('../Image/logoapp.png')}
                  style={{
                    width : '50%',
                    height : 100,
                    resizeMode: 'contain',
                    marginTop : -30,
                  }}
                />
                </ImageBackground>
            </View>
        <View style={styles.switchTabsView}>
          <TouchableOpacity
            style={{
              borderBottomWidth : activeTab === 'Loginpatient' ? 4 : 0,
              borderBottomColor: '#495D7D',
              paddingHorizontal: 4,
              marginRight : 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth : activeTab === 'Loginmedecine' ? 4 : 0,
              borderBottomColor: '#495D7D',
              paddingHorizontal: 4,
              marginRight : 14,
            }}
            onPress={() => switchTab()}
          >
            <Text style={styles.switchText}>Médecin</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'Loginpatient' ? <Loginpatient /> : <Loginmedecine />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

  },

  switchTabsView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop : 60,
    color: '#000',
    justifyContent:'center',
    alignContent:'center'
  },
  switchText: {
    padding: 2,
    fontSize: 20,
    color: '#495D7D',
  },
  inputView: {
    height : 40,
    borderBottomWidth : 1,
    borderBottomColor: '#000',
    marginTop : 10,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height : 40,
    fontSize: 16,
    fontFamily: 'NSLight',
    paddingHorizontal: 4,
    color: '#fff',
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#fafafa',
    marginTop : 12,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width : 0,
      height : 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { fontFamily: 'NSRegular', fontSize: 16, color: '#E44D26' },
  forgotPasswordText: {
    marginHorizontal: 20,
    marginTop : 20,
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'NSBold',
  },
  socialLoginView: {
    marginTop : 40,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLoginTouchable: {
    backgroundColor: '#fff',
    width : 40,
    height : 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  mainBody: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
  imageBackground:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width :400,
    height :210
    
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
    backgroundColor: '#637FA8',
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
 TextStyle: {
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