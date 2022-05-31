
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ipconfig } from '../../Ipconfig';
const NavigationDrawerHeader = (props) => {
  
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
      <Icon name="menu-outline" size={25} color='#495D7D'
          style={{ marginLeft :15}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;
