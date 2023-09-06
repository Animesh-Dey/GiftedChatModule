import {View, Text} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const userCheck = auth().onAuthStateChanged(userExist => {
      console.log(userExist);
      if (userExist) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home'}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Login'}],
          }),
        );
      }
    });
    return () => {
      userCheck();
    };
  });
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
