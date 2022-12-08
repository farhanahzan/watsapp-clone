import React, { useContext, useEffect, useMemo } from 'react';
import { LoginUserContext } from '../../../App';
import { db } from '../../../firebase';

function AddUser() {
  const { login, allUsers } = useContext(LoginUserContext);
  console.log(allUsers);

  const verifyUserAlreadyRegistered = () => {
    let verify = false;
    verify = allUsers.some((item) => item.data.uid == login.uid);
    console.log(verify);
    return verify;
  };
  const AddUser1 = () => {
    if (!verifyUserAlreadyRegistered()) {
      db.collection('users')
        .set({
          displayName: login.displayName,
          email: login.email,
          createdAt: parseInt(login.createdAt),
          lastLoginAt: parseInt(login.lastLoginAt),
          photoURL: login.photoURL,
          apiKey: login.apiKey,
          uid: login.uid,
        })
        .then(() => {
          console.log('user Added');
        });
    }
  };
  AddUser1();
  return;
}

export default AddUser;
