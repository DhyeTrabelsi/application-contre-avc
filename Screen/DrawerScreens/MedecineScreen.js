// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView,StyleSheet,Image} from 'react-native';

const MedecineScreen = () => {
  return (
    <SafeAreaView style={{flex: 1,   backgroundColor: '#FDF6F0',}}>
      <View style={styles.container}>
        <Text style={{ marginTop : 10, marginLeft :20 , fontWeight: 'bold', color:'#455156', fontSize: 20 }}>Votre medecine</Text>
        <View style={{
            marginHorizontal: 20,
            marginTop : 20,
            paddingVertical: 40,
            shadowColor: 'gray',
            shadowOpacity: 0.5,
            shadowOffset: {
                height : 3,
                width : 3
            },
            shadowRadius: 4,
            elevation: 4,
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <Image style={{ marginBottom : 10 }} />
            <View style={{ flexDirection: 'row', marginTop : 5 }}>
                <Text style={styles.prefix}>Medecine</Text>
                <Text style={styles.content}>Flen ben foulen</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop : 5 }}>
                <Text style={styles.prefix}>Email</Text>
                <Text style={styles.content}>Flenbenfoulen@gmail.com</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop : 5 }}>
                <Text style={styles.prefix}>Location</Text>
                <Text style={styles.content}>Sfax, bla bla</Text>
            </View>

        </View>
    </View>
    </SafeAreaView>
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
  }

});

export default MedecineScreen;
