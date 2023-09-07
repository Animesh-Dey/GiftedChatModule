import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {user, uid} = route.params;
  const getAllMessages = async () => {
    const chatid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const msgResponse = await firestore()
      .collection('Chats')
      .doc(chatid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allTheMsgs = msgResponse.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate(),
      };
    });
    setMessages(allTheMsgs);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = msgArray => {
    const msg = msgArray[0];
    const usermsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, usermsg),
    );
    const chatid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;

    firestore()
      .collection('Chats')
      .doc(chatid)
      .collection('messages')
      .add({...usermsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  return (
    <GiftedChat
      style={{flex: 1}}
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default Chat;
