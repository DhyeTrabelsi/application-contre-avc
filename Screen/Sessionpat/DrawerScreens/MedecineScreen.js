import React,{useState,useEffect} from 'react';
import {ScrollView,View, Text, SafeAreaView,StyleSheet,Image,  TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Loader from '../Components/Loader';

import { ipconfig } from '../../Ipconfig';
const MedecineScreen = () => {
const [users,setusers] = useState([]);
const Profilmed = () =>(
    
<SafeAreaView style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
    <View style={styles.container}>
      <Text style={{ marginTop : 10, marginLeft :20 , fontWeight: 'bold', color:'#455156', fontSize: 20 }}>Votre medecine</Text>
      <View style={{
          marginHorizontal: 20,
          marginTop : 20,
          paddingVertical: 40,
          shadowColor: 'gray',
          shadowOpacity: 0.5,
          shadowOffset: {
              height : 3,
              width : 3
          },
          shadowRadius: 4,
          elevation: 4,
          backgroundColor: 'white',
          justifyContent: 'flex-start',
          alignItems: 'center'
      }}>
          <Image style={{ marginBottom : 10 }} />
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Medecine</Text>
              <Text style={styles.content}>{first_name} {last_name}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Email</Text>
              <Text style={styles.content}>{email}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Location</Text>
              <Text style={styles.content}>{postion}</Text>
          </View> 
           <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Telephone</Text>
              <Text style={styles.content}>{telephone}</Text>
          </View>

      </View>
  </View>
</SafeAreaView>)
const Demmandemed = () =>(
    <ScrollView>
      <Loader loading={loading} />

    {users.map((user) => (

    <SafeAreaView key={user.username} style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
        <View style={styles.container}>
          <Text style={{ marginTop : 10, marginLeft :20 , fontWeight: 'bold', color:'#455156', fontSize: 20 }}>{user.username}</Text>
          <View style={{
              marginHorizontal: 20,
              marginTop : 20,
              paddingVertical: 15,
              paddingHorizontal: 15,
              shadowColor: 'gray',
              shadowOpacity: 0.5,
              shadowOffset: {  height : 3,  width : 3
              },
              shadowRadius: 4,
              elevation: 4,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
          }}>
              <Image style={{ marginBottom : 10 }} />
              <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Medecine</Text>
              <Text style={styles.content}>{user.first_name} {user.last_name}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Email</Text>
              <Text style={styles.content}>{user.email}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Location</Text>
              <Text style={styles.content}>{user.postion}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Telephone</Text>
              <Text style={styles.content}>{user.telephone}</Text>
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={() => {
             Alert.alert(
              'Envoyer demande',
              "Vous étes sure d'envoyer une demande à "+user.username,
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
                    Demande(user.username);
                  },
                },
              ],
              {cancelable: false},
            );
            }}>
          <Text style={styles.panelButtonTitle}>Demander</Text>
        </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>))}
    </ScrollView>);
const [isLoading, setIsLoading] = useState(true);
const [med, setmed] = useState('');
const [first_name, setfirst_name] = useState('');
const [last_name, setlast_name] = useState('');
const [telephone, settelephone] = useState('');
const [email, setemail] = useState('');
const [postion, setpostion] = useState('');
const getdatamed = () => {
   

    axios({
      headers: { 'Content-Type': 'application/json'},
      method: 'get',
      url:'http://'+ipconfig+':8000/api/medecine/list/',
    }).then(response=>{
      var n=0;
      if(med === 'null'){
       setusers(response.data)}  
       else{
        while (n < response.data.length ) {
          if(String(response.data[n].username)===String(med)){
        setfirst_name(String( response.data[n].first_name))
        setlast_name(String( response.data[n].last_name))
        setemail(String( response.data[n].email))
        setpostion( String(response.data[n].postion))
        settelephone(String( response.data[n].telephone))
            break;
          }n++;
        }}})
        .catch((error) => {
          alert("Erreur de connexion..");
         })
    }
  
useEffect(() => {
  let unmounted =false
  const interval = setInterval(() => {

if(!unmounted){
    getdatamed();
    AsyncStorage.getItem('Patientmedecine').then((value) =>setmed(value));
    AsyncStorage.getItem('Patientuser').then((value) =>setUser(value));
    if(med === 'null'){setIsLoading(false)}
    else{setIsLoading(true);}}},1000);
    return () => {
      clearInterval(interval);
      unmounted=true;
    };
})

const [loading, setLoading] = useState(false);
const [user, setUser] = useState('');
const Demande = (medecine) => {
  const DemandeJson = { "patient": String(user), "medecine":String(medecine),"resultat":"true"};
  console.log(DemandeJson)
 
          axios({
            headers: { 'Content-Type': 'application/json'},
            method: 'post',
            url:'http://'+ipconfig+':8000/demande/',
            data: DemandeJson,
          }).then(response=>{
            console.log(response)
            if(response.data.message === "Demmande created successfully"){
              alert('Demande envoyé avec succès..');
            }  })
          
            .catch((error) => {
           alert("Erreur d'envoyer la demande..");
          }) 
}
  return (
  <ScrollView
     style={{backgroundColor: '#ffffff'}}showsVerticalScrollIndicator={false}>
    <ScrollView>
    {isLoading ? <Profilmed/> : <Demmandemed/>}
    </ScrollView>
  </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
  },
  prefix: {
      fontWeight: '300',
      color: '#455156',
      marginRight : 5
  },
  content: {
      fontWeight: '600',
      color: '#455156'
  },
  commandButton: {
    padding: 15,
    borderRadius: 40,
    marginLeft :"60%",
    backgroundColor: '#495D7D',
    alignItems: 'center',
    marginTop : 15,
  },
  

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#E8F9FD',
  },

});

export default MedecineScreen;
