import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const userSignin = async () => {
    if (!email || !password) {
      alert('Please fill out the empty fields');
    }
    try {
      const newReg = await auth().signInWithEmailAndPassword(email, password);
      navigation.dispatch(
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
      console.log('Sign in done');
      return newReg;
    } catch (err) {
      alert('Email or Password incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your email"
        label="Email"
        // leftIcon={{type: 'material', name: 'email'}}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        // leftIcon={{type: 'material', name: 'lock'}}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <View style={{width: '100%'}}>
        <Button title="Sign in" style={styles.button} onPress={userSignin} />
        <View style={{height: 10}} />
        <Button
          title="Register"
          style={styles.button}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // marginTop: 100,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});

export default LoginScreen;
