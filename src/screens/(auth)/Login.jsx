import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    const user = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      axios.post('http://192.168.1.181:3001/login', user).then(response => {
        const token = response.data.token;
        setEmail('');
        setPassword('');
        if (token) {
          const decodedToken = jwtDecode(token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigation.navigate('Profile', {user: decodedToken});
        } else {
          console.log('No token found');
        }
        AsyncStorage.setItem('authToken', token);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <View style={{marginTop: 80}}>
        <Text style={{fontSize: 16, fontWeight: '500', color: '#0066b2'}}>
          Prijava
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: '600', marginTop: 20}}>
            Prijavite se pomoću svog računa
          </Text>
        </View>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#E0E0E0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Icon
              style={{marginLeft: 8}}
              name="mail-outline"
              size={30}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 290,
                fontSize: 20,
              }}
              placeholder="Unesite email"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#E0E0E0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <Icon
              style={{marginLeft: 8}}
              name="lock-closed-outline"
              size={30}
              color="gray"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 290,
                fontSize: 20,
              }}
              placeholder="Unesite lozinku"
            />
          </View>

          <View style={{marginTop: 60}}>
            <Pressable
              onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: '#6699CC',
                padding: 15,
                borderRadius: 6,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Prijava
              </Text>
            </Pressable>

            <Pressable
              style={{marginTop: 15}}
              onPress={() => navigation.navigate('Register')}>
              <Text style={{textAlign: 'center', fontSize: 15, color: 'gray'}}>
                Nemate korisnički račun? Registrirajte se
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
