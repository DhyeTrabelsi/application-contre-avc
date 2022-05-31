import React,{useState,useEffect} from 'react';
import {ScrollView,View, Text, SafeAreaView,StyleSheet,ActivityIndicator,TouchableOpacity,Alert,ToastAndroid} from 'react-native';
import axios from 'axios';
import { ipconfig } from '../../Ipconfig';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';

const DemandesScreen = () => {
const [demandes,setdemandes] = useState([]);
const [user, setUser] = useState('');
const [vide, setvide] = useState('');

const [isLoading, setIsLoading] = useState(true);
const [loading, setLoading] = useState(false);
const [load, setLoad] = useState(true);
const AcceptReponse = (patient,id) => {
  setLoading(true);
  console.log(patient+' devient votre nouveau patient..')
  console.log(user)

  const ReponseJson = { "username": String(patient), "medecine":String(user)};

  axios({
    headers: { 'Content-Type': 'application/json'},
    method: 'patch',
    url:'http://'+ipconfig+':8000/api/reponse/patient/',
    data: ReponseJson,
  }).then(response=>{
    console.log(user)

    Reponse(id);
    setLoading(false);
    console.log(' devient votre nouveau patient..')
    alert(patient+' devient votre nouveau patient..');
    
      })
      .catch((error) => {
      if(error.response !== undefined){
        setLoading(false);
        alert("Impossible...");
        }
        
        else {
          setTimeout(() => {
            setLoading(false);
          alert("Erreur de connexion...");

           }, 1000);
     
    }})
}
const Reponse = (id) => {
  axios({
    headers: { 'Content-Type': 'application/json'},
    method: 'delete',
    url:'http://'+ipconfig+':8000/demandes/remove/'+String(id)+'/',
  })    
  ToastAndroid.show('Les données sont bien enregistrées',2000)       

}
const Loaddata = () =>(
  <SafeAreaView style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
      <View style={{alignContent:'center',alignItems:'center' ,marginTop :'20%'}}>
      {load ? <ActivityIndicator size='large' color='#495D7D'></ActivityIndicator> :
      <Text style={{color:'#73777B', fontSize: 16 ,}} >{vide}</Text> }
    </View>
  </SafeAreaView>)

const Listdemandes = () =>(
  <ScrollView>
  <Loader loading={loading} />

  {demandes.map((demande) => (
    <SafeAreaView key={demande.id} style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
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
          <Text style={{ fontWeight: 'bold', color:'#455156', fontSize: 20 }}>{demande.patient}</Text>
          <View style={{ flexDirection: 'row',    alignItems: 'center',justifyContent:'center'}}>
          <TouchableOpacity style={styles.commandButtonanulle} onPress={() => {
          Alert.alert(
            'Nouveau patient',
            'Vous étes sure de supprimer '+demande.patient,
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
                  setLoading(true);
                  Reponse(demande.id);
                },
              },
            ],
            {cancelable: false},
          );
          }}>
          <Text style={styles.panelButtonTitleanulle}> Refuser </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton} onPress={() => {
          Alert.alert(
            'Nouveau patient',
            'Vous étes sure de mettre '+demande.patient+' un de vos patients',
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
                  AcceptReponse(demande.patient,demande.id);
                },
              },
            ],
            {cancelable: false},
          );
          
          }}>
          <Text style={styles.panelButtonTitle}>Accepter</Text>
        </TouchableOpacity>
      </View>
      </View>
    
      </View>
    </SafeAreaView>))}</ScrollView>);
async function getdemandes ()  {
  AsyncStorage.getItem('Medecineuser').then((value) =>setUser(value))
    if(user!==''){
    axios({
      headers: { 'Content-Type': 'application/json'},
      method: 'get',
      url:'http://'+ipconfig+':8000/demandes/med/'+String(user)+'/',
    }).then(response=>{
      setdemandes(response.data);
      setLoading(false);
    })
    .catch((error) => {
      alert("Erreur de connexion..");
     })
  }}
useEffect(() => {
  const interval = setInterval(() => {

  getdemandes();  
  if (demandes.length!==0){setIsLoading(false);} 
  else{
    if(vide===''){
    setIsLoading(true);

    setTimeout(() => {
    setvide('Aucune demande trouvé')
  }, 2000);}
    if(vide==='Aucune demande trouvé'){
      setIsLoading(true);

      setLoad(false);
    }

  } }
  , 500);

  return () => {
    clearInterval(interval);
  };
});

  return (
    <ScrollView
    style={{   backgroundColor: '#ffffff'}}
    showsVerticalScrollIndicator={false}>
    <ScrollView>
      {isLoading ? <Loaddata/> : <Listdemandes/>}
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
    borderRadius: 20,
    backgroundColor: '#495D7D',
    alignItems: 'center',
    marginTop : 15,
  },
  commandButtonanulle: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#E8F9FD',
    alignItems: 'center',
    marginTop : 15,
    marginRight : 20
  },
    panelButtonTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#E8F9FD',
  },
  panelButtonTitleanulle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#495D7D',
  },
});
export default DemandesScreen;

