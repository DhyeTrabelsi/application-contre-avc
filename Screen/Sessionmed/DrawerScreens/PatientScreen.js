import React,{useState,useEffect} from 'react';
import {ScrollView,View, Text, SafeAreaView,StyleSheet,ActivityIndicator,  TouchableOpacity} from 'react-native';
import axios from 'axios';
import { ipconfig } from '../../Ipconfig';
import AsyncStorage from '@react-native-community/async-storage';
var erreurconnexion=0;

const PatientScreen = () => {
const [patients,setpatients] = useState([]);
var today = new Date();
const [user, setUser] = useState('');

const Loaddata = () =>(
    
    <SafeAreaView style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
          <View style={{alignContent:'center',alignItems:'center' ,marginTop :'20%'}}>
      <ActivityIndicator size='large' color='#495D7D'></ActivityIndicator>
    </View>
    </SafeAreaView>)

const Listpatients = () =>(
    <ScrollView>
    {patients.map((patient) => (
    <SafeAreaView key={patient.username} style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
        <View style={styles.container}>
          <View style={{
              marginHorizontal: 20,
              marginTop : 20,
              paddingVertical: 20,
              paddingHorizontal: 20,
              shadowColor: 'gray',
              shadowOpacity: 0.5,
              shadowOffset: {  height : 3,  width : 3
              },
              shadowRadius: 4,
              elevation: 4,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
          }}>
          <Text style={{ alignContent:'center',alignItems:'center', fontWeight: 'bold', color:'#455156', fontSize: 20 }}>{patient.username}</Text>
              <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Patient</Text>
              <Text style={styles.content}>{patient.firstname} {patient.lastname}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Sexe</Text>
              <Text style={styles.content}>{patient.gender}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Location</Text>
              <Text style={styles.content}>{patient.postion}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Telephone</Text>
              <Text style={styles.content}>{patient.telephone}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Email</Text>
              <Text style={styles.content}>{patient.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Age</Text>
              <Text style={styles.content}>{today.getFullYear()-parseInt(patient.birthday.slice(0,4))} Ans</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Poids</Text>
              <Text style={styles.content}>{patient.poids} Kg</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Taux de glucose</Text>
              <Text style={styles.content}>{patient.avg_glucose_level}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Indice de Masse Corporelle</Text>
              <Text style={styles.content}>{patient.bmi}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Type de travail</Text>
              <Text style={styles.content}>Travail {patient.type_de_travail}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Maladie cardiaque</Text>
              <Text style={styles.content}>{patient.heart_disease == '0' ? 'Pas de maladie' : 'Maladie existe'}</Text>
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Envoyer un mail</Text>
        </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>))}
    </ScrollView>);

var n=0;
async function getdatapatient  ()  {
    AsyncStorage.getItem('Medecineuser').then((value) =>setUser(value))
    if(user!==''){
    axios({
      headers: { 'Content-Type': 'application/json'},
      method: 'get',
      url:'http://'+ipconfig+':8000/api/patient/listmed/'+String(user)+'/',
    }).then(response=>{
        setpatients(response.data); })
    .catch((error) => {
        if(erreurconnexion==0){
            alert("Erreur de connexion..");
            erreurconnexion=1;
          }})}}
    
const [isLoading, setIsLoading] = useState(true);
 
useEffect(() => {
    const interval = setInterval(() => {

    getdatapatient();
    
    if (patients.length!==0){         
         setIsLoading(false);} 
    else{setIsLoading(true);}
        }
    , 1000);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <ScrollView
    style={{   backgroundColor: '#ffffff'}}
    showsVerticalScrollIndicator={false}>
       <ScrollView>
       {isLoading ? <Loaddata/> : <Listpatients/>}
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
    padding: 12,
    borderRadius: 40,
    marginLeft :"50%",
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

export default PatientScreen;

