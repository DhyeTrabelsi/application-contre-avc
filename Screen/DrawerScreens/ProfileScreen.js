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
          
          <View style={{marginRight : 20}}>
            <Title style={[styles.title, {
              marginTop :15,
              marginBottom : 5,
            }]}>Ben foulen</Title>
            <Caption style={styles.caption}>Flen</Caption>
          </View>
          <Avatar.Image 
          backgroundColor="#9E7777"
            source={{
            }}
            size={80}
          />
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#7D5A50" size={25}/>
          <Text style={{color:"#7D5A50", marginLeft : 25,marginTop :5}}>Position</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#7D5A50" size={25}/>
          <Text style={{color:"#7D5A50", marginLeft : 25,marginTop :5}}>Telephone</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#7D5A50" size={25}/>
          <Text style={{color:"#7D5A50", marginLeft : 25,marginTop :5}}>Email address</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#FDF6F0',
            borderRightWidth : 1
          }]}>
            <Title>40.50 Kg</Title>
            <Caption>Poids</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Indice IMC</Caption>
          </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#FDF6F0',
            borderRightWidth : 1
          }]}>
            <Title>228.69</Title>
            <Caption>Niveau de glucose</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>67</Title>
            <Caption>hypertension</Caption>
          </View>
      </View>
      
      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#FDF6F0',
            borderRightWidth : 1
          }]}>
            <Title>Non</Title>
            <Caption>Maladie cardiaque</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>Non marié</Title>
            <Caption>Statut social</Caption>
          </View>
      </View>
      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#FDF6F0',
            borderRightWidth : 1
          }]}>
            <Title>Inconnu</Title>
            <Caption>Le tabagisme</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>50 ans</Title>
            <Caption>Age</Caption>
          </View>
      </View>

     
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
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
    borderBottomColor: '#FDF6F0',
    borderBottomWidth: 1,
    borderTopColor: '#FDF6F0',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#7D5A50',
    marginLeft : 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight : 26,
    width:150,

  },
  menuItemTextstatus: {
    color: '#000000',
    marginLeft : 35,
    fontWeight: '700',
    fontSize: 16,
    lineHeight : 26,
  },
});

