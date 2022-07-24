import React,{useState,useEffect}from 'react';
import {View, SafeAreaView, StyleSheet,  ScrollView,} from 'react-native';
import {Title, Caption,Text,} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { ipconfig } from '../../Ipconfig';
import {Placeholder,PlaceholderMedia,PlaceholderLine,Fade} from 'rn-placeholder';

var erreurconnexion=0;
var n =0;
const ProfileScreen = () => {
  const [firstnamenouvelle, setfirstnamenouvelle] = useState('');
  const [lastnamenouvelle, setlastnamenouvelle] = useState('');
  const [telephonenouvelle, settelephonenouvelle] = useState('');
  const [emailnouvelle, setemailnouvelle] = useState('');
  const [poidsnouvelle, setpoidsnouvelle] = useState('');
  const [bminouvelle, setbminouvelle] = useState('');
  const [gendernouvelle, setgendernouvelle] = useState('');
  const [avg_glucose_levelnouvelle, setavg_glucose_levelnouvelle] = useState('');
  const [ever_marriednouvelle, setever_marriednouvelle] = useState('');
  const [smoking_statusnouvelle, setsmoking_statusnouvelle] = useState('');
  const [strokenouvelle, setstrokenouvelle] = useState('');
  const [birthdaynouvelle, setbirthdaynouvelle] = useState('');
  const [medecinenouvelle, setmedecinenouvelle] = useState('');
  const [postionnouvelle, setpostionnouvelle] = useState('');
  const [hypertensionnouvelle, sethypertensionnouvelle] = useState('');
  const [heart_diseasenouvelle, setheart_diseasenouvelle] = useState('');
  const [type_de_travailnouvelle, settype_de_travailnouvelle] = useState('');

  const [user, setUser] = useState('');

  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [telephone, settelephone] = useState('');
  const [email, setemail] = useState('');
  const [poids, setpoids] = useState('');
  const [bmi, setbmi] = useState('');
  const [gender, setgender] = useState('');
  const [avg_glucose_level, setavg_glucose_level] = useState('');
  const [ever_married, setever_married] = useState('');
  const [smoking_status, setsmoking_status] = useState('');
  const [stroke, setstroke] = useState('');
  const [birthday, setbirthday] = useState('');
  const [medecine, setmedecine] = useState('');
  const [postion, setpostion] = useState('');
  const [hypertension, sethypertension] = useState('');
  const [heart_disease, setheart_disease] = useState('');
  const [type_de_travail, settype_de_travail] = useState('');
  
  useEffect(() => {
    let unmounted =false
    const interval = setInterval(() => {
      if (!unmounted){ 
      getdata();
      if (firstnamenouvelle!==firstname || lastname!==lastnamenouvelle || telephone!==telephonenouvelle || email!==emailnouvelle || poids!==poidsnouvelle
      || bmi !== bminouvelle || gender!==gendernouvelle || avg_glucose_level!==avg_glucose_levelnouvelle || ever_married!==ever_marriednouvelle || smoking_status!==smoking_statusnouvelle 
      || stroke !== strokenouvelle || birthday !== birthdaynouvelle || medecine !== medecinenouvelle  || postion !==postionnouvelle|| hypertension !==hypertensionnouvelle
      || type_de_travail !==type_de_travailnouvelle || heart_disease !==heart_diseasenouvelle  ){
      
      setstroke(strokenouvelle)
      setever_married(ever_marriednouvelle)
      setfirstname(firstnamenouvelle)
      setgender(gendernouvelle)
      setpoids(poidsnouvelle)
      setpostion(postionnouvelle)
      setsmoking_status(smoking_statusnouvelle)
      settelephone(telephonenouvelle)
      setmedecine(medecinenouvelle)
      setlastname(lastnamenouvelle)
      setemail(emailnouvelle)
      setbmi(bminouvelle)
      setbirthday(birthdaynouvelle)
      setavg_glucose_level(avg_glucose_levelnouvelle)
      setheart_disease(heart_diseasenouvelle)
      sethypertension(hypertensionnouvelle)
      settype_de_travail(type_de_travailnouvelle)
      setIsLoading(false)

      AsyncStorage.setItem('Patientavg_glucose_level', String(avg_glucose_levelnouvelle));
      AsyncStorage.setItem('Patientbirthday',String( birthdaynouvelle ));
      AsyncStorage.setItem('Patientbmi', String(bminouvelle));
      AsyncStorage.setItem('Patientemail',String( emailnouvelle));
      AsyncStorage.setItem('Patientlastname',String( lastnamenouvelle ));
      AsyncStorage.setItem('Patientmedecine',String(medecinenouvelle));
      AsyncStorage.setItem('Patienttelephone', String( telephonenouvelle));
      AsyncStorage.setItem('Patientsmoking_status',String( smoking_statusnouvelle ));
      AsyncStorage.setItem('Patientpostion', String( postionnouvelle));
      AsyncStorage.setItem('Patientpoids', String(poidsnouvelle));
      AsyncStorage.setItem('Patientgender', String( gendernouvelle));
      AsyncStorage.setItem('Patientfirstname',String( firstnamenouvelle));
      AsyncStorage.setItem('Patientever_married',String( ever_marriednouvelle));
      AsyncStorage.setItem('Patientstroke', String(strokenouvelle));
      AsyncStorage.setItem('heart_disease', String(heart_diseasenouvelle));
      AsyncStorage.setItem('hypertension', String(hypertensionnouvelle));
      AsyncStorage.setItem('type_de_travail', String(type_de_travailnouvelle));
      
     }}
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
      setstrokenouvelle(String(response.data[n].stroke))
      setever_marriednouvelle(String( response.data[n].ever_married))
      setfirstnamenouvelle(String( response.data[n].firstname))
      setgendernouvelle(String( response.data[n].gender))
      setpoidsnouvelle( String(response.data[n].poids[Object.keys(response.data[n].poids)[Object.keys(response.data[n].poids).length - 1]]))
      setpostionnouvelle(String( response.data[n].postion))
      setsmoking_statusnouvelle(String( response.data[n].smoking_status))
      settelephonenouvelle(String( response.data[n].telephone))
      setmedecinenouvelle(String( response.data[n].medecine))
      setlastnamenouvelle(String( response.data[n].lastname))
      setemailnouvelle(String( response.data[n].email))
      setbminouvelle(String(response.data[n].bmi[Object.keys(response.data[n].bmi)[Object.keys(response.data[n].bmi).length - 1]]))
      setbirthdaynouvelle(String( response.data[n].birthday))
      setavg_glucose_levelnouvelle(String(response.data[n].avg_glucose_level[Object.keys(response.data[n].avg_glucose_level)[Object.keys(response.data[n].avg_glucose_level).length - 1]]))
      setheart_diseasenouvelle(String(response.data[n].heart_disease[Object.keys(response.data[n].heart_disease)[Object.keys(response.data[n].heart_disease).length - 1]]))
      sethypertensionnouvelle(String(response.data[n].hypertension[Object.keys(response.data[n].hypertension)[Object.keys(response.data[n].hypertension).length - 1]]))
      settype_de_travailnouvelle(String(response.data[n].type_de_travail)
      
      ) 
          break;}
        n++;
      } })
      .catch((error) => {
        if(erreurconnexion==0){
          alert("Erreur de connexion..");
          erreurconnexion=1;
        }       })
    }}
  
  
  const Profil = () =>(
  <SafeAreaView style={styles.container}>
    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop : 15,justifyContent:'center'}}>
      <View style={styles.profileHeaderPicCircle}>
        <Text style={{fontSize: 25, color: '#495D7D'}}>
          {firstname.toUpperCase().charAt(0)+'.'}{lastname.toUpperCase().charAt(0)}
        </Text>
      </View>
        <View style={{marginLeft : 20}}>
          <Title style={[styles.title, {
            marginTop :15,
            marginBottom : 5,
          }]}>{firstname}</Title>
          <Caption style={styles.caption}>{lastname}</Caption>
        </View>
       
      </View>
    </View>

    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        <Icon name="map-marker-radius" color="#495D7D" size={25}/>
        <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>{postion}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" color="#495D7D" size={25}/>
        <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>{telephone}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="email" color="#495D7D" size={25}/>
        <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>{email}</Text>
      </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox]}>
          <Title>{poids}</Title>
          <Caption  style={{color:"#495D7D"}}>Poids</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{bmi}</Title>
          <Caption style={{color:"#495D7D"}} >Indice IMC</Caption>
        </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,]}>
          <Title>{avg_glucose_level}</Title>
          <Caption style={{color:"#495D7D"}}>Niveau de glucose</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{hypertension}</Title>
          <Caption style={{color:"#495D7D"}}>hypertension</Caption>
        </View>
    </View>
    
    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,]}>
          <Title>{heart_disease === '0' ? 'Pas de maladie' : 'Maladie'}</Title>
          <Caption style={{color:"#495D7D"}}>Maladie cardiaque</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{ever_married === 'Oui' ? 'Marié' : 'Non marié'}</Title>
          <Caption style={{color:"#495D7D"}}>Statut social</Caption>
        </View>
    </View>
    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,]}>
          <Title>{smoking_status}</Title>
          <Caption style={{color:"#495D7D"}}>Le tabagisme</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{today.getFullYear()-parseInt(birthday.slice(0,4))} ans</Title>
          <Caption style={{color:"#495D7D"}}>Age</Caption>
        </View>
    </View>

   
  </SafeAreaView>)

const LoadingCard = () => (
  <Placeholder Animation={Fade}>
    
    <SafeAreaView style={styles.container}>
    <View style={{justifyContent:'center',alignContent:'center', marginLeft :'30%', marginBottom :25}}>
      <View style={{flexDirection: 'column', marginTop : 25,justifyContent:'center',alignContent:'center'}}>
      <PlaceholderMedia style={{ borderRadius: 30 }} size={60} />
      <PlaceholderLine width={25} style={{ marginTop : -45 ,marginLeft : 80}} />
      <PlaceholderLine width={25} style={{ marginTop : -5 ,marginLeft : 80}} />

      </View>
    </View>

    <View style={[styles.userInfoSection]}>
      <View style={styles.row}>
      <PlaceholderLine width={50} style={{marginLeft : 15}} />
      </View>
      <View style={styles.row}>
        <PlaceholderLine width={50} style={{marginLeft : 15}} />
      </View>
      <View style={styles.row}>
      <PlaceholderLine width={50} style={{marginLeft : 15}} />
      </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox]}>
      <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
        <View style={styles.infoBox}>
        <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,]}>
        <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
        <View style={styles.infoBox}>
        <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
    </View>
    
    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,]}>
        <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
        <View style={styles.infoBox}>
        <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
    </View>
    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox,]}>
        <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
        <View style={styles.infoBox}>
        <PlaceholderLine width={15} style={{marginLeft : 15}} />
      <PlaceholderLine width={30} style={{marginLeft : 15}} />
        </View>
    </View>

   
  </SafeAreaView>
   
  </Placeholder>
);
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

export default ProfileScreen;

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
  

});

