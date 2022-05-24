import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop : 15,justifyContent:'center'}}>
           <Avatar.Image 
          backgroundColor="#E8F9FD"
            source={{
            }}
            size={80}
          />
          <View style={{marginLeft : 20}}>
            <Title style={[styles.title, {
              marginTop :15,
              marginBottom : 5,
            }]}>Ben foulen</Title>
            <Caption style={styles.caption}>Flen</Caption>
          </View>
         
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#495D7D" size={25}/>
          <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>Position</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#495D7D" size={25}/>
          <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>Telephone</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#495D7D" size={25}/>
          <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>Email address</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox]}>
            <Title>40.50 Kg</Title>
            <Caption  style={{color:"#495D7D"}}>Poids</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption style={{color:"#495D7D"}} >Indice IMC</Caption>
          </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox,]}>
            <Title>228.69</Title>
            <Caption style={{color:"#495D7D"}}>Niveau de glucose</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>67</Title>
            <Caption style={{color:"#495D7D"}}>hypertension</Caption>
          </View>
      </View>
      
      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox,]}>
            <Title>Non</Title>
            <Caption style={{color:"#495D7D"}}>Maladie cardiaque</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>Non marié</Title>
            <Caption style={{color:"#495D7D"}}>Statut social</Caption>
          </View>
      </View>
      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox,]}>
            <Title>Inconnu</Title>
            <Caption style={{color:"#495D7D"}}>Le tabagisme</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>50 ans</Title>
            <Caption style={{color:"#495D7D"}}>Age</Caption>
          </View>
      </View>

     
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
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
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoBoxWrapper: {
    
    flexDirection: 'row',
    height : 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

});

