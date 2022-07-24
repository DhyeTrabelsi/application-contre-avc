import React, {useState} from 'react';
import {ScrollView,View, SafeAreaView,StyleSheet,ActivityIndicator,Linking,  TouchableOpacity,Alert,Platform} from 'react-native';

import {Title, Caption,Text, Modal,} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarChart from 'react-native-bar-chart';


const HistoriquePatient = ({ route }) => {

  function ReadMorepoids() {
    const [figure, setfigure] = useState(false)
    const [isShow, setIsShowLess] = useState(true)
    
    return(
        <View>
               <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {isShow ? Object.keys(route.params.patient.patient.poids).reverse().slice(0, 3).map((poid) => (
      <Text key={poid} style={styles.prefix}>{poid}</Text>)) : Object.keys(route.params.patient.patient.poids).reverse().map((poid) => (
        <Text key={poid} style={styles.prefix}>{poid}</Text>))}            
          </View>
          <View style={{ flexDirection: 'column', marginTop : 5 }}>
          {isShow ? Object.entries(route.params.patient.patient.poids).reverse().slice(0, 3).map((poid) => (
              <Text key={poid[0]} style={styles.tabvalues}>{poid[1]}</Text>)): Object.entries(route.params.patient.patient.poids).reverse().map((poid) => (
                <Text key={poid[0]} style={styles.tabvalues}>{poid[1]}</Text>)) }               
          </View></View>
          {Object.keys(route.params.patient.patient.poids).length > 3 ?
          <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>

           <Text style={{  marginTop : 5 ,color:"#808080"}}  onPress={()=> setIsShowLess(!isShow)}>
                {isShow ? "Lire la suite >> " : "Lire moins <<"}
            </Text>
            <View>
              <TouchableOpacity style={styles.buttonOpacity} onPress={() => setfigure((prev) => !prev)}>
                <Text style={styles.buttonText}> Courbe </Text>
              </TouchableOpacity>
                <Modal animationType="slide" transparent={true} visible={figure}>
                <View style={[styles.centeredView, { marginTop : -350,marginLeft :-235 }]}>
                    <View style={styles.modalView}>
                    <View style={{flexDirection:'row', alignItems: "center", justifyContent: "space-between"}}>

                    <Text style={{ fontSize: 18, fontWeight: 'bold' ,marginBottom : 10}}> Poids </Text>
                    <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => setfigure((prev) => !prev)}>
                    <Icon name='close' size={30}/> 
                    </TouchableOpacity>
                    </View>
                    <View>
                    <BarChart data={Object.values(route.params.patient.patient.poids).reverse()} horizontalData={Object.keys(route.params.patient.patient.poids).reverse()} backgroundColor="#E8F9FD" barColor='#495D7D'  labelColor='#495D7D' barLabelColor ='#808080'/>
                  </View></View></View>
                </Modal>
            </View>
        </View>

            :<></>}
        </View>
    )}

    function ReadMoreimc() {
      const [isShow, setIsShowLess] = useState(true)
      const [figure, setfigure] = useState(false)
     
      return(
          <View>
                 <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
            <View style={{ flexDirection: 'column', marginTop : 5 }}>
            {isShow ? Object.keys(route.params.patient.patient.bmi).reverse().slice(0, 3).map((bmi) => (
        <Text key={bmi} style={styles.prefix}>{bmi}</Text>)) : Object.keys(route.params.patient.patient.bmi).reverse().map((bmi) => (
          <Text key={bmi} style={styles.prefix}>{bmi}</Text>))}            
            </View>
            <View style={{ flexDirection: 'column', marginTop : 5 }}>
            {isShow ? Object.entries(route.params.patient.patient.bmi).reverse().slice(0, 3).map((bmi) => (
                <Text key={bmi[0]} style={styles.tabvalues}>{bmi[1]}</Text>)): Object.entries(route.params.patient.patient.bmi).reverse().map((bmi) => (
                  <Text key={bmi[0]} style={styles.tabvalues}>{bmi[1]}</Text>)) }               
            </View></View>
            {Object.keys(route.params.patient.patient.bmi).length > 3 ?
          <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>

              <Text style={{  marginTop : 5 ,color:"#808080"}}  onPress={()=> setIsShowLess(!isShow)}>
                  {isShow ? "Lire la suite >> " : "Lire moins <<"}
              </Text>
              <View>
              <TouchableOpacity style={styles.buttonOpacity} onPress={() => setfigure((prev) => !prev)}>
                <Text style={styles.buttonText}> Courbe </Text>
              </TouchableOpacity>
                <Modal animationType="slide" transparent={true} visible={figure}>
                <View style={[styles.centeredView, { marginTop : -350,marginLeft :-235 }]}>
                    <View style={styles.modalView}>
                    <View style={{flexDirection:'row', alignItems: "center", justifyContent: "space-between"}}>

                    <Text style={{ fontSize: 18, fontWeight: 'bold' ,marginBottom : 10}}> Indice de masse corporelle </Text>
                    <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => setfigure((prev) => !prev)}>
                    <Icon name='close' size={30}/> 
                    </TouchableOpacity>
                    </View>
                    <View>
                    <BarChart data={Object.values(route.params.patient.patient.bmi).reverse()} horizontalData={Object.keys(route.params.patient.patient.bmi).reverse()} backgroundColor="#E8F9FD" barColor='#495D7D'  labelColor='#495D7D' barLabelColor ='#808080'/>
                  </View></View></View>
                </Modal>
            </View>
        </View>
              :<></>}
          </View>
      )}

      function ReadMoreavg() {
        const [isShow, setIsShowLess] = useState(true)
        const [figure, setfigure] = useState(false)

        return(
            <View>
                   <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
              <View style={{ flexDirection: 'column', marginTop : 5 }}>
              {isShow ? Object.keys(route.params.patient.patient.avg_glucose_level).reverse().slice(0, 3).map((avg) => (
          <Text key={avg} style={styles.prefix}>{avg}</Text>)) : Object.keys(route.params.patient.patient.avg_glucose_level).reverse().map((avg) => (
            <Text key={avg} style={styles.prefix}>{avg}</Text>))}            
              </View>
              <View style={{ flexDirection: 'column', marginTop : 5 }}>
              {isShow ? Object.entries(route.params.patient.patient.avg_glucose_level).reverse().slice(0, 3).map((avg) => (
                  <Text key={avg[0]} style={styles.tabvalues}>{avg[1]}</Text>)): Object.entries(route.params.patient.patient.avg_glucose_level).reverse().map((avg) => (
                    <Text key={avg[0]} style={styles.tabvalues}>{avg[1]}</Text>)) }               
              </View></View>
              {Object.keys(route.params.patient.patient.avg_glucose_level).length > 3 ?
              <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>

                <Text style={{  marginTop : 5 ,color:"#808080"}}  onPress={()=> setIsShowLess(!isShow)}>
                    {isShow ? "Lire la suite >> " : "Lire moins <<"}
                </Text>
                
                <View>
                <TouchableOpacity style={styles.buttonOpacity} onPress={() => setfigure((prev) => !prev)}>
                  <Text style={styles.buttonText}> Courbe </Text>
                </TouchableOpacity>
                  <Modal animationType="slide" transparent={true} visible={figure}>
                  <View style={[styles.centeredView, { marginTop : -350,marginLeft :-235 }]}>
                      <View style={styles.modalView}>
                      <View style={{flexDirection:'row', alignItems: "center", justifyContent: "space-between"}}>
  
                      <Text style={{ fontSize: 18, fontWeight: 'bold' ,marginBottom : 10}}> Glucose </Text>
                      <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => setfigure((prev) => !prev)}>
                      <Icon name='close' size={30}/> 
                      </TouchableOpacity>
                      </View>
                      <View>
                      <BarChart data={Object.values(route.params.patient.patient.avg_glucose_level).reverse()} horizontalData={Object.keys(route.params.patient.patient.avg_glucose_level).reverse()} backgroundColor="#E8F9FD" barColor='#495D7D'  labelColor='#495D7D' barLabelColor ='#808080'/>
                    </View></View></View>
                  </Modal>
              </View>
              </View>

                :<></>}
            </View>
        )}

        function ReadMorehypertension() {
          const [figure, setfigure] = useState(false)
          const [isShow, setIsShowLess] = useState(true)
          return(
              <View>
                     <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
                <View style={{ flexDirection: 'column', marginTop : 5 }}>
                {isShow ? Object.keys(route.params.patient.patient.hypertension).reverse().slice(0, 3).map((hypertension) => (
            <Text key={hypertension} style={styles.prefix}>{hypertension}</Text>)) : Object.keys(route.params.patient.patient.hypertension).reverse().map((hypertension) => (
              <Text key={hypertension} style={styles.prefix}>{hypertension}</Text>))}            
                </View>
                <View style={{ flexDirection: 'column', marginTop : 5 }}>
                {isShow ? Object.entries(route.params.patient.patient.hypertension).reverse().slice(0, 3).map((hypertension) => (
                    <Text key={hypertension[0]} style={styles.tabvalues}>{hypertension[1]}</Text>)): Object.entries(route.params.patient.patient.hypertension).reverse().map((hypertension) => (
                      <Text key={hypertension[0]} style={styles.tabvalues}>{hypertension[1]}</Text>)) }               
                </View></View>
      {Object.keys(route.params.patient.patient.hypertension).length > 3 ?
                    <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>

                  <Text style={{  marginTop : 5 ,color:"#808080"}}  onPress={()=> setIsShowLess(!isShow)}>
                      {isShow ? "Lire la suite >> " : "Lire moins <<"}
                  </Text>
                  <View>
                <TouchableOpacity style={styles.buttonOpacity} onPress={() => setfigure((prev) => !prev)}>
                  <Text style={styles.buttonText}> Courbe </Text>
                </TouchableOpacity>
                  <Modal animationType="slide" transparent={true} visible={figure}>
                  <View style={[styles.centeredView, { marginTop : -350,marginLeft :-235 }]}>
                      <View style={styles.modalView}>
                      <View style={{flexDirection:'row', alignItems: "center", justifyContent: "space-between"}}>
  
                      <Text style={{ fontSize: 18, fontWeight: 'bold' ,marginBottom : 10}}> Hypertension </Text>
                      <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => setfigure((prev) => !prev)}>
                      <Icon name='close' size={30}/> 
                      </TouchableOpacity>
                      </View>
                      <View>
                      <BarChart data={Object.values(route.params.patient.patient.hypertension).reverse()} horizontalData={Object.keys(route.params.patient.patient.hypertension).reverse()} backgroundColor="#E8F9FD" barColor='#495D7D'  labelColor='#495D7D' barLabelColor ='#808080'/>
                    </View></View></View>
                  </Modal>
              </View>
              </View>
                  
                  :<></>}
              </View>
          )}

          function ReadMoreheart_disease() {
            const [figure, setfigure] = useState(false)
            const [isShow, setIsShowLess] = useState(true)
            return(
                <View>
                       <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>
                  <View style={{ flexDirection: 'column', marginTop : 5 }}>
                  {isShow ? Object.keys(route.params.patient.patient.heart_disease).reverse().slice(0, 3).map((disease) => (
              <Text key={disease} style={styles.prefix}>{disease}</Text>)) : Object.keys(route.params.patient.patient.heart_disease).reverse().map((disease) => (
                <Text key={disease} style={styles.prefix}>{disease}</Text>))}            
                  </View>
                  <View style={{ flexDirection: 'column', marginTop : 5 }}>
                  {isShow ? Object.entries(route.params.patient.patient.heart_disease).reverse().slice(0, 3).map((disease) => (
                      <Text key={disease[0]} style={styles.tabvalues}>{disease[1]}</Text>)): Object.entries(route.params.patient.patient.heart_disease).reverse().map((disease) => (
                        <Text key={disease[0]} style={styles.tabvalues}>{disease[1]}</Text>)) }               
                  </View></View>
                  {Object.keys(route.params.patient.patient.heart_disease).length > 3 ?
                    <View style={{ flexDirection: 'row', marginTop : 5, justifyContent:'space-between',alignContent:'center', }}>

                    <Text style={{  marginTop : 5 ,color:"#808080"}}  onPress={()=> setIsShowLess(!isShow)}>
                        {isShow ? "Lire la suite >> " : "Lire moins <<"}
                    </Text> 
                    <View>
                <TouchableOpacity style={styles.buttonOpacity} onPress={() => setfigure((prev) => !prev)}>
                  <Text style={styles.buttonText}> Courbe</Text>
                </TouchableOpacity>
                  <Modal animationType="slide" transparent={true} visible={figure}>
                  <View style={[styles.centeredView, { marginTop : -350,marginLeft :-235 }]}>
                      <View style={styles.modalView}>
                      <View style={{flexDirection:'row', alignItems: "center", justifyContent: "space-between"}}>
  
                      <Text style={{ fontSize: 18, fontWeight: 'bold' ,marginBottom : 10}}> Maladie cardiaque </Text>
                      <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => setfigure((prev) => !prev)}>
                      <Icon name='close' size={30}/> 
                      </TouchableOpacity>
                      </View>
                      <View>
                      <BarChart data={Object.values(route.params.patient.patient.heart_disease).reverse()} horizontalData={Object.keys(route.params.patient.patient.heart_disease).reverse()} backgroundColor="#E8F9FD" barColor='#495D7D'  labelColor='#495D7D' barLabelColor ='#808080'/>
                    </View></View></View>
                  </Modal>
              </View>
              </View>
                    :<></>}
                </View>
            )}


const Listpatients = () =>(
    <ScrollView>

<View style={styles.container}>

<View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop : 15,justifyContent:'center'}}>
        <View>
          <Title style={[styles.title, {
            marginTop :15,
            marginBottom : 5,
          }]}>{route.params.patient.patient.firstname}</Title>
          <Caption style={styles.caption}>{route.params.patient.patient.lastname}</Caption>
        </View>
       
      </View>
    </View>

    <View style={[styles.userInfoSection,]}>
      <View style={styles.row}>
        <Icon name="map-marker-radius" color="#495D7D" size={25}/>
        <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>{route.params.patient.patient.postion}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" color="#495D7D" size={25}/>
        <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>{route.params.patient.patient.telephone}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="email" color="#495D7D" size={25}/>
        <Text style={{color:"#000000", marginLeft : 25,marginTop :5}}>{route.params.patient.patient.email}</Text>
      </View>
      <View style={styles.rowa}>
      <Text style={{color:"#ff0000", marginLeft : 25}}>{route.params.patient.patient.stroke == 1 ? "Vous devez contacter rapidement ce patient, notre système à détecter des signes dangerous" : ""}</Text>
      </View>

    </View>

          <Text style={{ marginLeft : 20, color : '#495D7D', fontSize : 18 }}>Poids</Text>
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
          <ReadMorepoids>
           </ReadMorepoids>
          </View>

          <Text style={{ marginLeft : 20, color : '#495D7D', fontSize : 18 }}>Indice IMC</Text>
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
           <ReadMoreimc>
           </ReadMoreimc>     
          </View>

          <Text style={{ marginLeft : 20, color : '#495D7D', fontSize : 18 }}>Niveau de glucose</Text>
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
          <ReadMoreavg>
           </ReadMoreavg>
          </View>

          <Text style={{ marginLeft : 20, color : '#495D7D', fontSize : 18 }}>Hypertension</Text>
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
          <ReadMorehypertension></ReadMorehypertension>
          </View>

          <Text style={{ marginLeft : 20, color : '#495D7D', fontSize : 18 }}>Maladie cardiaque</Text>
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
          <ReadMoreheart_disease></ReadMoreheart_disease>
          
          </View>
          <View style={{ flexDirection: 'row' ,marginBottom : 22, justifyContent:'center',alignContent:'center', }}>

          <TouchableOpacity style={styles.commandButton} onPress={() =>{
            Alert.alert(
              'Envoyer email',
              "Vous étes sure d'envoyer un email à "+route.params.patient.patient.username,
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
                    Linking.openURL('mailto:'+route.params.patient.patient.email)},
                },
              ],
              {cancelable: false},
            );
            }}>
          <Text style={styles.panelButtonTitle}>Envoyer Mail</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.commandButton} onPress={() =>{
             Alert.alert(
              'Appel',
              "Vous étes sure d'appeler "+route.params.patient.patient.username,
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
                    let phoneNumber = '';
                    if (Platform.OS === 'android') { phoneNumber = `tel:${route.params.patient.patient.telephone}`; }
                    else {phoneNumber = `telprompt:${route.params.patient.patient.telephone}`; }
                    Linking.openURL(phoneNumber);},
                },
              ],
              {cancelable: false},
            );
          
            }}>
          <Text style={styles.panelButtonTitle}>Appeler</Text>

          </TouchableOpacity>
          </View> 

      </View>
    </ScrollView>);

   
  return (
    <ScrollView
    style={{   backgroundColor: '#ffffff'}}
    showsVerticalScrollIndicator={false}>
       <ScrollView>
       <Listpatients/>
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
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom : 15,
  },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
  }, row: {
    flexDirection: 'row',
    marginBottom : 15,
  },
  rowa: {
    flexDirection: 'row',
  },
  commandButton: {
    padding: 18,
    width : 130,

    borderRadius: 28,
    backgroundColor: '#495D7D',
    alignItems: 'center',
    marginHorizontal:12

  },



  panelButtonTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#E8F9FD',
  },
  buttonOpacity: {
    backgroundColor: '#222f3e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000', shadowOffset: {
    width : 2,
    height : 2,}, 
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    }, 
    buttonText:
     { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    }, 
    modalView: {
    width : '100%',
    backgroundColor: 'white', borderRadius: 10,
    paddingHorizontal:20, paddingTop : 10,
    paddingBottom : 20,
    shadowColor: '#000', shadowOffset: {
    width : 0,
    height : 2,
    }, shadowOpacity: 0.5,
    shadowRadius: 3.84, elevation: 50, },

});

export default HistoriquePatient;

