import UseGetCollections from './UseGetCollections';
import UseGetMsgCollections from './useGetMsgCollection';

export default function useUsersInaGroup(roomId, db) {
  const userData = UseGetCollections('users', db).data;
  const messages = UseGetMsgCollections(roomId, db).data;

  let filtered = userData.filter((user) => {
    return messages.find((msg) => {
      return user.data.uid === msg.data.userUID;
    });
  });

  return filtered;

  // let finddd = userData.find(function (value) {
  //   return value.data.displayName == 'farhan ahzan';
  // });
  // console.log(finddd);

  // let mapped = userData.map((user) => {
  //   return user.data.uid;
  // });
  // console.log(mapped);
  // return finddd;
}
