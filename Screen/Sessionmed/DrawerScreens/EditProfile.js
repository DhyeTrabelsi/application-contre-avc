import React, {useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,TextInput,StyleSheet,Alert,ToastAndroid} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ipconfig } from '../../Ipconfig';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const EditProfile = () => {
  const [user, setUser] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [telephone, settelephone] = useState('');
  const [email, setemail] = useState('');
  const [postion, setpostion] = useState('');
  useEffect(() => {
    if (user===''){
    AsyncStorage.getItem('Medecineuser').then((value) =>setUser(value));
    AsyncStorage.getItem('Medecineemail').then((value) =>setemail(value));
    AsyncStorage.getItem('Medecinelastname').then((value) =>setlastname(value));
    AsyncStorage.getItem('Medecinetelephone').then((value) =>settelephone(value));
    AsyncStorage.getItem('Medecinepostion').then((value) =>setpostion(value));
    AsyncStorage.getItem('Medecinefirstname').then((value) =>setfirstname(value));}
  });

  const handleupdatemed = () => {
    if (!firstname ||!lastname ||!telephone ||!email ||!postion ) {
      alert("Veuillez remplir bien vos données");
      return;
    }
    const updateJson = { "username": String(user), "email":String(email), "first_name":String(firstname),  "telephone":String(telephone), 
    "last_name":String(lastname), "postion":String(postion),};
    console.log(updateJson);
    Alert.alert(
      'Modification des données',
      'Vous étes sure ?',
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
            axios({
              headers: { 'Content-Type': 'application/json'},
              method: 'patch',
              url:'http://'+ipconfig+':8000/api/update/medecine/',
              data: updateJson,
            }).then(response=>{
              ToastAndroid.show('Les données sont bien modifées',2000)       })
              .catch((error) => {
                alert("Erreur d'enregistrer les données..");
               })
        },},
      ],
      {cancelable: false},
    );
  
      
  }
  return (
    <View style={styles.container}>
    
        <View style={{alignItems: 'center'}}>
          <Text style={{marginBottom : 25, fontSize: 18, fontWeight: 'bold' ,color:'#495D7D'}}>
          {user}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color='#495D7D' size={20} />
          <TextInput
            placeholderTextColor="#666666"
            placeholder='First name'
            onChangeText={(firstname) => setfirstname(firstname)}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color:'#000000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color='#495D7D' size={20} />
          <TextInput
            placeholder='Last name'
            onChangeText={(lastname) => setlastname(lastname)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000000'
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color='#495D7D' size={20} />
          <TextInput
            placeholder='Telephone'
            placeholderTextColor="#666666"
            onChangeText={(telephone) => settelephone(telephone)}
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color:'#000000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color='#495D7D' size={20} />
          <TextInput
            placeholder='Email'
            onChangeText={(email) => setemail(email)}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color:'#000000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color='#495D7D' size={20} />
          <TextInput
            placeholder='Postion'
            onChangeText={(postion) => setpostion(postion)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000000',
              },
            ]}
          />
        </View>
      
        <TouchableOpacity style={styles.commandButton} onPress={() => { handleupdatemed()}}>
          <Text style={styles.panelButtonTitle}>Enregistrer</Text>
        </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop : 80
  },
  commandButton: {
    padding: 15,
    borderRadius: 25,
    marginHorizontal:100,
    backgroundColor: '#495D7D',
    alignItems: 'center',
    marginTop : 40,
  },
  

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#E8F9FD',
  },
  action: {
    flexDirection: 'row',
    marginTop : 10,
    marginHorizontal:30,
    marginBottom : 10,
    borderBottomWidth : 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom :  5,
  },

  textInput: {
    flex: 1,
    marginTop : Platform.OS === 'ios' ? 0 : -12,
    paddingLeft : 20,
    color: '#05375a',
  },
});