import React, { useEffect, useRef, useContext, useState } from 'react';

import { LoginUserContext } from '../../App';

import EnlargeImageView from './ImageEnlarger/EnlargeImageView';

import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

import ChatMessage from './ChatMessage';

function ChatBody({ messages }) {
  const { roomId } = useParams();
  const [getmsgId, setGetmsgId] = useState('');

  const messagesEndRef = useRef(null);
  const { login } = useContext(LoginUserContext);

  const [showEnlarge, setShowEnlarge] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setGetmsgId(snapshot.docs.map((doc) => doc.id))
        );
    }
  }, [roomId]);

  const handleImagePreview = (url) => {
    setShowEnlarge(true);
    setPreviewImage(url);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  //const [showRight, setShowRight] = useState('');

  for (let i = 0; i < messages.length; i++) {
    messages[i]['id'] = getmsgId[i];
  }

  return (
    <>
      <EnlargeImageView
        showEnlarge={showEnlarge}
        setShowEnlarge={setShowEnlarge}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
      {messages.map((msg, id) => (
        <ChatMessage
          key={id}
          id={id}
          msg={msg}
          login={login}
          handleImagePreview={handleImagePreview}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}

export default ChatBody;
