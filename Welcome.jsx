import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

const WelcomeScreen = ({navigation}) => {
  const handleBMI = () => {
    navigation.navigate('BMI');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to get my app</Text>
        <Image
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }}
          style={styles.image}
        />
      </View>
       <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.bmi]} onPress={handleBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#1d1d1d',
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 39,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'space-around',
  },
  button: {
    width: '48%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bmi: {
    backgroundColor: '#1d1d1d',
  },
});

export default WelcomeScreen;
