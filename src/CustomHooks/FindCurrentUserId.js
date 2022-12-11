function FindCurrentUserId(auth, userData) {
  const curruser = auth.currentUser;

  const findId = userData?.find((user) => {
    return user.data.uid === curruser.uid;
  });

  return findId;
}

export default FindCurrentUserId;
