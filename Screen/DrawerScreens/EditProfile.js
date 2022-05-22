import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


const EditProfile = () => {



  return (
    <View style={styles.container}>
    
        <View style={{alignItems: 'center'}}>
          <Text style={{marginBottom : 25, fontSize: 18, fontWeight: 'bold'}}>
            John Doe
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color='#000000' size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color:'#000000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color='#000000' size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000000'
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color='#000000' size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color:'#000000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color='#000000' size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color:'#000000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color='#000000' size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="account-supervisor-circle" color='#000000' size={20} />
          <TextInput
            placeholder="Statut social"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000000',
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Enregistrer</Text>
        </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
    justifyContent:'center'
  },
  commandButton: {
    padding: 15,
    borderRadius: 25,
    marginHorizontal:100,
    backgroundColor: '#9E7777',
    alignItems: 'center',
    marginTop : 10,
  },
  

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FDF6F0',
  },
  action: {
    flexDirection: 'row',
    marginTop : 10,
    marginHorizontal:30,
    marginBottom : 10,
    borderBottomWidth : 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom :  5,
  },

  textInput: {
    flex: 1,
    marginTop : Platform.OS === 'ios' ? 0 : -12,
    paddingLeft : 20,
    color: '#05375a',
  },
});