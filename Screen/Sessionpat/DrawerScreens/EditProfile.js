import React ,{useState,useEffect,createRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,ToastAndroid,
  StyleSheet,Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const ipconfig='192.168.1.115'

const EditProfile = () => {
  const [user, setUser] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [telephone, settelephone] = useState('');
  const [email, setemail] = useState('');
  const [ever_married, setever_married] = useState('');
  const [postion, setpostion] = useState('');
  const [typework, settypework] = useState('');

  const handleupdatepatient = () => {
    if (!firstname ||!lastname ||!telephone ||!email ||!ever_married ||!postion ||!typework) {
      alert("Veuillez remplir bien vos données");
      return;
    }
  
    const updateJson = { "username": String(user), "email":String(email), "firstname":String(firstname),  "telephone":String(telephone), 
    "lastname":String(lastname), "postion":String(postion), "ever_married":String(ever_married), "type_de_travail":String(typework)
  
  };
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
            url:'http://'+ipconfig+':8000/api/update/patient/',
            data: updateJson,
          }).then(response=>{
            ToastAndroid.show('Les données sont bien mmodifées',2000)       })
      },},
    ],
    {cancelable: false},
  );

    
}

  useEffect(() => {
    console.log(firstname)
    AsyncStorage.getItem('Patientuser').then((value) =>setUser(value));


  });

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
            placeholder="First Name"
            onChangeText={(firstname) => setfirstname(firstname)}
            placeholderTextColor="#666666"
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
            placeholder="Last Name"
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
            placeholder="Phone"
            onChangeText={(telephone) => settelephone(telephone)}
            placeholderTextColor="#666666"
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
            placeholder="Email"
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
            placeholder="Country"
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
        <View style={styles.actioncountry}>
          <Icon name="account-supervisor-circle" color='#495D7D' size={20} />
          <View style={{marginHorizontal :20 ,marginTop :-35}}>
          <Picker
  selectedValue={ever_married}
  onValueChange={(itemValue, itemIndex) =>
    setever_married(itemValue)
  }>
  <Picker.Item label="Non Marié" value="Non" />
  <Picker.Item label="Marié" value="Oui" />
</Picker></View>
        </View>
        <View style={styles.actioncountry}>
          <Icon name="format-list-bulleted-type" color='#495D7D' size={20} />
          <View style={{marginHorizontal :20 ,marginTop :-35}}>
          <Picker
  selectedValue={typework}
  onValueChange={(itemValue, itemIndex) =>
    settypework(itemValue)
  }>
  <Picker.Item label="Gouvernement" value="gouvernement" />
  <Picker.Item label="Privé" value="privé" />
  <Picker.Item label="Indépendant" value="indépendant" />
  <Picker.Item label="Pas encore" value="Pas encore" />
</Picker></View>
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => handleupdatepatient()}>
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
  actioncountry: {
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