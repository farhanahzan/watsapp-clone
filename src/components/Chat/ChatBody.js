import React, { useEffect, useRef, useContext, useState, useMemo } from 'react';

import { LoginUserContext } from '../../App';

import EnlargeImageView from './ImageEnlarger/EnlargeImageView';

import { MessageContext } from './Chat';

import ChatMessage from './ChatMessage';
import DataFilter from '../../CustomHooks/DataFilter';

function ChatBody({ messages }) {
  const messagesEndRef = useRef(null);
  const { login } = useContext(LoginUserContext);

  const [showEnlarge, setShowEnlarge] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const { query } = useContext(MessageContext);

  const handleImagePreview = (url) => {
    setShowEnlarge(true);
    setPreviewImage(url);
  };

  const filteredMessage = DataFilter(messages, query);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessage.data]);

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
