import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';

const Home = ({route}) => {
  const [users, setUsers] = useState([]);
  const [useDetails, setUserDetails] = useState(null);
  console.log(route.params.user, 'route');

  const fetchUserDetails = async () => {
    const querySanp = await firestore()
      .collection('users')
      .where('uid', '==', route.params.user)
      .get();
    const userDetails = querySanp.docs.map(docSnap => docSnap.data());
    console.log(userDetails[0], 'userDetails');
    setUserDetails(userDetails[0]);
    await getUsers();
  };

  const getUsers = async () => {
    const querySanp = await firestore()
      .collection('users')
      .where('uid', '!=', route.params.user)
      .get();
    const allUsers = querySanp.docs.map(docSnap => docSnap.data());
    console.log(allUsers, 'all users');
    setUsers(allUsers);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={{padding: 30, backgroundColor: 'blue'}}>
        <Text
          style={{
            color: 'white',
          }}>{`${useDetails?.name} - ${useDetails?.email}`}</Text>
      </View>

      {users.length > 0 && (
        <FlatList
          contentContainerStyle={{flex: 1}}
          data={users}
          renderItem={({item}) => {
            console.log(item);
            return (
              <TouchableOpacity
                style={{paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={{color: 'black'}}>{item.name}</Text>
                <Text style={{color: 'black'}}>{item.email}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default Home;
