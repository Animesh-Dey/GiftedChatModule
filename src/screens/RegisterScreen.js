import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {CommonActions, useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const Navigator = useNavigation();

  const registerHandler = async () => {
    if (!email || !password || !name) {
      alert('Please fill out the empty fields');
    }
    try {
      const newReg = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(newReg);
      await firestore().collection('users').doc(newReg.user.uid).set({
        name: name,
        email: newReg.user.email,
        uid: newReg.user.uid,
      });
      Navigator.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'Home',
              params: {
                user: newReg.user.uid,
              },
            },
          ],
        }),
      );
    } catch (err) {
      alert('Registration Unsuccessful! Try again');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your name"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button
        title="Register"
        style={styles.button}
        onPress={registerHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});

export default RegisterScreen;
