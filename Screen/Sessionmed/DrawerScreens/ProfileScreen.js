import React,{useState,useEffect}from 'react';
import {View, SafeAreaView, StyleSheet,  ScrollView} from 'react-native';
import {Title,Caption,Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Placeholder,PlaceholderMedia,PlaceholderLine,Fade} from 'rn-placeholder';
import { ipconfig } from '../../Ipconfig';
var n =0;
const ProfileScreen = () => {

  const [firstnamenouvelle, setfirstnamenouvelle] = useState('');
  const [lastnamenouvelle, setlastnamenouvelle] = useState('');
  const [telephonenouvelle, settelephonenouvelle] = useState('');
  const [emailnouvelle, setemailnouvelle] = useState('');
  const [postionnouvelle, setpostionnouvelle] = useState('');

  const [user, setUser] = useState('');

  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [telephone, settelephone] = useState('');
  const [email, setemail] = useState('');
  const [postion, setpostion] = useState('');
    
  useEffect(() => {
    const interval = setInterval(() => {
      getdata();
      if (firstnamenouvelle!==firstname || lastname!==lastnamenouvelle || telephone!==telephonenouvelle || email!==emailnouvelle  || postion !==postionnouvelle
       ){
      
      setfirstname(firstnamenouvelle)
      setpostion(postionnouvelle)
      settelephone(telephonenouvelle)
      setlastname(lastnamenouvelle)
      setemail(emailnouvelle)

      AsyncStorage.setItem('Medecineemail',String( emailnouvelle));
      AsyncStorage.setItem('Medecinelastname',String( lastnamenouvelle ));
      AsyncStorage.setItem('Medecinetelephone', String( telephonenouvelle));
      AsyncStorage.setItem('Medecinepostion', String( postionnouvelle));
      AsyncStorage.setItem('Medecinefirstname',String( firstnamenouvelle));
 
      setIsLoading(false)

     }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  async function getdata () {
    AsyncStorage.getItem('Medecineuser').then((value) =>setUser(value))
  
    if(user!==''){
    axios({
      headers: { 'Content-Type': 'application/json'},
      method: 'get',
      url:'http://'+ipconfig+':8000/api/medecine/list/',
    }).then(response=>{
      while (n < response.data.length ) {
        if(String(response.data[n].username)===String(user)){
      setfirstnamenouvelle(String( response.data[n].first_name))
      setpostionnouvelle(String( response.data[n].postion))
      settelephonenouvelle(String( response.data[n].telephone))
      setlastnamenouvelle(String( response.data[n].last_name))
      setemailnouvelle(String( response.data[n].email))
      break;}
        n++;
      }})
      .catch((error) => {
        alert("Erreur de connexion..");
       })
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

    <View style={[styles.userInfoSection,{marginTop : 30}]}>
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

    <View style={[styles.userInfoSection,{marginTop : 50}]}>
      <View style={styles.row}>
      <PlaceholderLine width={5} />
      <PlaceholderLine width={50} style={{marginLeft : 15}} />
      </View>
      <View style={styles.row}>
      <PlaceholderLine width={5} />
      <PlaceholderLine width={50} style={{marginLeft : 15}} />
      </View>
      <View style={styles.row}>
      <PlaceholderLine width={5} />
      <PlaceholderLine width={50} style={{marginLeft : 15}} />
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
marginVertical: 50  },
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

