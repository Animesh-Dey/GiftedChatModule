import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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
        <Button title="Sign in" style={styles.button} />
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
