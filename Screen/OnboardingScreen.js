import React from 'react';
import {SafeAreaView,Image,StyleSheet,FlatList,View,Text,StatusBar,TouchableOpacity,Dimensions,} from 'react-native';
const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#ffffff', black: '#000'};

const slides = [
  {
    id: '1',
    image: require('../Image/onbording_one.png'),
    title: 'Vous aves des problémes',
    subtitle: 'Faiblesse, chute du visage, difficultés de parole ...',
  },
  {
    id: '2',
    image: require('../Image/onbording_two.png'),
    title: 'Trouvez vous un médecine',
    subtitle: 'Contacter un neurologue qui nous suivi ...',
  },
  {
    id: '3',
    image: require('../Image/onbording_three.png'),
    title: 'Utiliser CONTRE AVC',
    subtitle: 'Cette application vous permet de minimiser les dégats des AVC',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image}
        style={{marginTop : 100,height : '50%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height : height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop : 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.black,
                  width : 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom : 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height : 50}}>
              <TouchableOpacity
                 style={[
                  styles.btn,
                  {
                    borderColor: COLORS.black,
                    borderWidth : 1,
                    backgroundColor: 'transparent',
marginHorizontal:90                  },
                ]}
                onPress={() => navigation.replace('SplashScreen')}>
                <Text style={{fontWeight: 'bold', fontSize: 15,                    color: COLORS.black,
}}>
                COMMENCER</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.black,
                    borderWidth : 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    
                  }}>
                  PASSER
                </Text>
              </TouchableOpacity>
              <View style={{width : 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.black,
                    borderWidth : 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={goToNextSlide}
                >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.black,

                  }}>
                  SUIVANT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height : height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.black,
    fontSize: 13,
    marginTop : 10,
    maxWidth : '70%',
    textAlign: 'center',
    lineHeight : 23,
  },
  title: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop : 20,
    textAlign: 'center',
  },
  image: {
    height : '100%',
    width : '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height : 2.5,
    width : 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height : 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;
