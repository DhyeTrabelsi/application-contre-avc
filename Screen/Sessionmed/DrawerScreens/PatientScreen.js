import React,{useState,useEffect} from 'react';
import {ScrollView,View, Text, SafeAreaView,StyleSheet,ActivityIndicator,Linking,  TouchableOpacity,Alert} from 'react-native';
import axios from 'axios';
import { ipconfig } from '../../Ipconfig';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";
import ShowMore from 'react-native-show-more-button';

var erreurconnexion=0;

const PatientScreen = ({navigation}) => {

 
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
              <Text style={styles.prefix}>Age</Text>
              <Text style={styles.content}>{today.getFullYear()-parseInt(patient.birthday.slice(0,4))} Ans</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Poids</Text>
              <Text style={styles.content}>{patient.poids[Object.keys(patient.poids)[Object.keys(patient.poids).length - 1]]} Kg</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Taux de glucose</Text>
              <Text style={styles.content}>{patient.avg_glucose_level[Object.keys(patient.avg_glucose_level)[Object.keys(patient.avg_glucose_level).length - 1]]}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Hypertension</Text>
              <Text style={styles.content}>{patient.hypertension[Object.keys(patient.hypertension)[Object.keys(patient.hypertension).length - 1]]}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Indice de Masse Corporelle</Text>
              <Text style={styles.content}>{patient.bmi[Object.keys(patient.bmi)[Object.keys(patient.bmi).length - 1]]}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Type de travail</Text>
              <Text style={styles.content}>{patient.type_de_travail}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5 }}>
              <Text style={styles.prefix}>Maladie cardiaque</Text>
              <Text style={styles.content}>{patient.heart_disease[Object.keys(patient.heart_disease)[Object.keys(patient.heart_disease).length - 1]]}</Text>
          </View>
          
          <Text style={{color:"#ff0000", marginLeft : 25,    marginVertical : 8}}>{patient.stroke == 1 ? "Vous devez contacter rapidement ce patient, notre système à détecter des signes dangerous" : ""}</Text>
          <TouchableOpacity style={styles.commandButton} onPress={() =>{
            navigation.push('HistoriquePatient',{"patient":{patient}});
            
            }}>
          <Text style={styles.panelButtonTitle}>Consulter</Text>
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
const createChannels = (patient) => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: patient.username+ ", des signes drangrous detectées",
      message: "Aprés la derniere mise a jour de votre dossier médicale,nous vous demandons de contacter rapidement votre patient",
      date: new Date(Date.now()),

   })
}  


useEffect(() => {
    const interval = setInterval(() => {

    getdatapatient();
    
    if (patients.length!==0){         
         setIsLoading(false);
         
         patients.map((patient) => 
         
         {           


        if((patient.notifier===0)&(patient.stroke===1)){
             const notifierJson = { "username": String(patient.username), "notifier":1};
             axios({
              headers: { 'Content-Type': 'application/json'},
              method: 'patch',
              url:'http://'+ipconfig+':8000/api/notifier/patient/',
              data: notifierJson,
            }).then(response=>{ 
              getdatapatient();
              createChannels(patient);

              })
              .catch((error) => {
                alert("Erreur d'enregistrer les données..");
               })

         }
        else{
          
        }}
         
         );        } 
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
  },
  

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#E8F9FD',
  },

});

export default PatientScreen;

