import React,{useState,useEffect}from 'react';
import {ScrollView,View,ActivityIndicator, SafeAreaView,StyleSheet,  TouchableOpacity,Alert,Linking} from 'react-native';
import {Text,} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { ipconfig } from '../../Ipconfig';


var erreurconnexion=0;
var i,n =0;

const HistoriqueScreen = () => {
  const [poidshist, setpoidshist] = useState([]);
  const [bmihist, setbmihist] = useState([]);
  const [glucosehist, setglucosehist] = useState([]);
  const [hypertensionhist, sethypertensionhist] = useState([]);
  const [Maladiehist, setMaladiehist] = useState([]);

  const [user, setUser] = useState('');
  useEffect(() => {
    let unmounted =false
    const interval = setInterval(() => {
      if (!unmounted){ 
      getdata();

}
    }, 1000);

    return () => {
      clearInterval(interval);
      unmounted=true;
    };
  });
  const getdata = () => {
    AsyncStorage.getItem('Patientuser').then((value) =>setUser(value))
    if(user!==''){
    axios({
      headers: { 'Content-Type': 'application/json'},
      method: 'get',
      url:'http://'+ipconfig+':8000/api/patient/list/',
    }).then(response=>{
      while (n < response.data.length ) {
        if(String(response.data[n].username)===String(user)){
          if (poidshist!==(response.data[n].poids)){
          setpoidshist((response.data[n].poids))}
          if (bmihist!==(response.data[n].bmi)){
            setbmihist((response.data[n].bmi))}
          if (glucosehist!==(response.data[n].avg_glucose_level)){
            setglucosehist((response.data[n].avg_glucose_level))}
          if (hypertensionhist!==(response.data[n].hypertension)){
            sethypertensionhist((response.data[n].hypertension))}
          if (Maladiehist!==(response.data[n].heart_disease)){
            setMaladiehist((response.data[n].heart_disease))}
          break;}
        n++;
      }     setIsLoading(false)
    })
      .catch((error) => {
        if(erreurconnexion==0){
          alert("Erreur de connexion..");
          erreurconnexion=1;
        }       })
    }}
  
  
  const Profil = () =>(
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
          <Text style={{marginTop : 20, marginLeft : 20, fontWeight : 'bold', color : '#85C8D3', fontSize : 20 }}>Poids</Text>
          <View style={{
              marginHorizontal : 20,
              marginBottom : 20,
              marginTop : 20,
              paddingVertical : 15,
              paddingHorizontal : 15,
              shadowColor : 'gray',
              shadowOpacity : 0.5,
              shadowOffset : {  height : 3,  width : 3
              },
              shadowRadius : 4,
              elevation : 4,
              backgroundColor : 'white',
              justifyContent : 'flex-start',
          }}>
              <View style={{ flexDirection: 'row', marginTop : 5,justifyContent:'space-between',alignContent:'center', }}>
              <Text style={styles.head}>DATE  ET HEURE</Text>
              <Text style={styles.head}>VALEURS</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.keys(poidshist).reverse().map((poid) => (
              <Text key={poid} style={styles.prefix}>{poid}</Text>))}              
          </View>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.entries(poidshist).reverse().map((poid) => (
              <Text key={poid[0]} style={styles.tabvalues}>{poid[1]}</Text>))}               
          </View>
          </View>
          </View>

          <Text style={{marginTop : 20, marginLeft : 20, fontWeight : 'bold', color : '#85C8D3', fontSize : 20 }}>Indice IMC</Text>
          <View style={{
              marginHorizontal : 20,
              marginBottom : 20,
              marginTop : 20,
              paddingVertical : 15,
              paddingHorizontal : 15,
              shadowColor : 'gray',
              shadowOpacity : 0.5,
              shadowOffset : {  height : 3,  width : 3
              },
              shadowRadius : 4,
              elevation : 4,
              backgroundColor : 'white',
              justifyContent : 'flex-start',
          }}>
              <View style={{ flexDirection: 'row', marginTop : 5,justifyContent:'space-between',alignContent:'center', }}>
              <Text style={styles.head}>DATE  ET HEURE</Text>
              <Text style={styles.head}>VALEURS</Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.keys(bmihist).reverse().map((bmi) => (
              <Text key={bmi} style={styles.prefix}>{bmi}</Text>))}              
          </View>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.entries(bmihist).reverse().map((bmi) => (
            <Text key={bmi[0]} style={styles.tabvalues}>{bmi[1]}</Text>))}           
          </View>
          </View>
          </View>

          <Text style={{marginTop : 20, marginLeft : 20, fontWeight : 'bold', color : '#85C8D3', fontSize : 20 }}>Niveau de glucose</Text>
          <View style={{
              marginHorizontal : 20,
              marginBottom : 20,
              marginTop : 20,
              paddingVertical : 15,
              paddingHorizontal : 15,
              shadowColor : 'gray',
              shadowOpacity : 0.5,
              shadowOffset : {  height : 3,  width : 3
              },
              shadowRadius : 4,
              elevation : 4,
              backgroundColor : 'white',
              justifyContent : 'flex-start',
          }}>
              <View style={{ flexDirection: 'row', marginTop : 5,justifyContent:'space-between',alignContent:'center', }}>
              <Text style={styles.head}>DATE  ET HEURE</Text>
              <Text style={styles.head}>VALEURS</Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.keys(glucosehist).reverse().map((gluc) => (
              <Text key={gluc} style={styles.prefix}>{gluc}</Text>))}              
          </View>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.entries(glucosehist).reverse().map((gluc) => (
          <Text key={gluc[0]} style={styles.tabvalues}>{gluc[1]}</Text>))}               
          </View>
          </View>
          </View>

          <Text style={{marginTop : 20, marginLeft : 20, fontWeight : 'bold', color : '#85C8D3', fontSize : 20 }}>Hypertension</Text>
          <View style={{
              marginHorizontal : 20,
              marginBottom : 20,
              marginTop : 20,
              paddingVertical : 15,
              paddingHorizontal : 15,
              shadowColor : 'gray',
              shadowOpacity : 0.5,
              shadowOffset : {  height : 3,  width : 3
              },
              shadowRadius : 4,
              elevation : 4,
              backgroundColor : 'white',
              justifyContent : 'flex-start',
          }}>
              <View style={{ flexDirection: 'row', marginTop : 5,justifyContent:'space-between',alignContent:'center', }}>
              <Text style={styles.head}>DATE  ET HEURE</Text>
              <Text style={styles.head}>VALEURS</Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.keys(hypertensionhist).reverse().map((tension) => (
              <Text key={tension} style={styles.prefix}>{tension}</Text>))}              
          </View>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
         
          {Object.entries(hypertensionhist).reverse().map((tension) => (
            <Text key={tension[0]} style={styles.tabvalues}>{tension[1]}</Text>))}              
          </View>
          </View>
          </View>


          <Text style={{marginTop : 20, marginLeft : 20, fontWeight : 'bold', color : '#85C8D3', fontSize : 20 }}>Maladie cardiaque</Text>
          <View style={{
              marginHorizontal : 20,
              marginBottom : 20,
              marginTop : 20,
              paddingVertical : 15,
              paddingHorizontal : 15,
              shadowColor : 'gray',
              shadowOpacity : 0.5,
              shadowOffset : {  height : 3,  width : 3
              },
              shadowRadius : 4,
              elevation : 4,
              backgroundColor : 'white',
              justifyContent : 'flex-start',
          }}>
              <View style={{ flexDirection: 'row', marginTop : 5,justifyContent:'space-between',alignContent:'center', }}>
              <Text style={styles.head}>DATE  ET HEURE</Text>
              <Text style={styles.head}>VALEURS</Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.keys(Maladiehist).reverse().map((maladie) => (
              <Text key={maladie} style={styles.prefix}>{maladie}</Text>))}              
          </View>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {Object.entries(Maladiehist).reverse().map((clé) => (
              <Text key={clé[0]} style={styles.tabvalues}>{clé[1]}</Text>))}              
          </View>
          </View>
          </View>

      </View>

   
   
  </SafeAreaView>)

const LoadingCard = () => (
  <SafeAreaView style={{flex: 1,   backgroundColor: '#ffffff',marginBottom :10}}>
  <View style={{alignContent:'center',alignItems:'center' ,marginTop :'20%'}}>
  <ActivityIndicator size='large' color='#495D7D'></ActivityIndicator>   
</View>
</SafeAreaView>);
const [isLoading, setIsLoading] = useState(true);

  return (
    <ScrollView
    style={{    backgroundColor: '#ffffff',
  }}
    showsVerticalScrollIndicator={false}
  >
     
        
          {isLoading ? <LoadingCard /> : <Profil />}
       
  
    
  </ScrollView>
    
  );
};

export default HistoriqueScreen;

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    height : 80,
  },
  profileHeaderPicCircle: {
    marginTop :10,
    width : 60,
    height : 60,
    borderRadius: 60 / 2,
    backgroundColor: '#E8F9FD',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom : 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight : 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom : 15,
  },
  infoBoxWrapper: {
    
    flexDirection: 'row',
    height : 100,
  },
  infoBox: {
    width : '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefix: {
    fontWeight: '300',
    color: '#455156',
    marginRight : 5 , 
    fontSize: 19,
},
head: {
  fontSize: 17,
  fontWeight: '300',
  color: '#455156',
  fontWeight : 'bold'
},

tabvalues: {
  fontSize: 19,
  fontWeight: '300',
  color: '#455156',
},
});

