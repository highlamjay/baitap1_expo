import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import { getMoviesFromApi } from './fetchAPI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [employees, setEmployees] = useState([]);

  const getAllEmployee = async () => {
          try {
              const response = await fetch('http://blackntt.net:88/api/v1/employees');
              const data = await response.json();
              setEmployees(data);
          } catch (error) {
              console.error('Lỗi khi gọi API:', error);
          }
      }
  
      useEffect(() => {
          getAllEmployee();
      }, [])
  

  const navigation = useNavigation();

  const handleLogin = () => {
    Keyboard.dismiss();
    employees.map((employee, index) => {
      if (email === employee.id){
        navigation.navigate("EmployeePage")
      } else {
        console.log("Khong ton tai ID");
      }
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          keyboardType='numeric'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#1d1d1d',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
