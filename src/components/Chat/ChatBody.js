import React, { useEffect, useRef, useContext, useState, useMemo } from 'react';

import { LoginUserContext } from '../../App';

import EnlargeImageView from './ImageEnlarger/EnlargeImageView';

import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

import { MessageContext } from './Chat';

import ChatMessage from './ChatMessage';

function ChatBody({ messages }) {
  const { roomId } = useParams();
  const [getmsgId, setGetmsgId] = useState('');

  const messagesEndRef = useRef(null);
  const { login } = useContext(LoginUserContext);

  const [showEnlarge, setShowEnlarge] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const { query, setQuery } = useContext(MessageContext);

  const handleImagePreview = (url) => {
    setShowEnlarge(true);
    setPreviewImage(url);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.data]);

  const filteredMessage = useMemo(() => {
    return messages.filter((message) => {
      return message.data.message.toLowerCase().includes(query.toLowerCase());
    });
  }, [messages, query]);

  return (
    <>
      <EnlargeImageView
        showEnlarge={showEnlarge}
        setShowEnlarge={setShowEnlarge}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
      {filteredMessage.map((msg, id) => (
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
