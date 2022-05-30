import React,{useState,useEffect} from 'react';
import {ScrollView,View, Text, SafeAreaView,StyleSheet,ActivityIndicator} from 'react-native';
import axios from 'axios';
const ipconfig='192.168.1.59'
import AsyncStorage from '@react-native-community/async-storage';

const DemandesScreen = () => {
const [demandes,setdemandes] = useState([]);
const [user, setUser] = useState('');
const [isLoading, setIsLoading] = useState(true);

const Loaddata = () =>(
    
  <SafeAreaView style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
      <View style={{alignContent:'center',alignItems:'center' ,marginTop :'20%'}}>
      <ActivityIndicator size='large' color='#495D7D'></ActivityIndicator>
    </View>
  </SafeAreaView>)

const Listdemandes = () =>(
  <ScrollView>
  {demandes.map((demande) => (
    <SafeAreaView key={demande.id} style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
        <View style={styles.container}>
          <Text style={{ marginTop : 10, marginLeft :20 , fontWeight: 'bold', color:'#455156', fontSize: 20 }}>{demande.patient}</Text>
      
      </View>
    </SafeAreaView>))}</ScrollView>);

var n=0;
async function getdemandes ()  {
  AsyncStorage.getItem('Medecineuser').then((value) =>setUser(value))
    if(user!==''){
    axios({
      headers: { 'Content-Type': 'application/json'},
      method: 'get',
      url:'http://'+ipconfig+':8000/demandes/list/',
    }).then(response=>{
      setdemandes(response.data);  
      console.log(response.data)
}
    )}}
    
  
useEffect(() => {
  const interval = setInterval(() => {

    getdemandes();  
  if (demandes.length!==0){ 
    console.log(demandes.length)
        
       setIsLoading(false);} 
  else{setIsLoading(true);}
      }
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

export default DemandesScreen;

