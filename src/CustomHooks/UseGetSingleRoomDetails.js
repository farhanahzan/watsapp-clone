import { useState, useEffect } from 'react';

export default function UseGetSingleRoomDetails(roomId, db) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (roomId) {
      (async () => {
        const getCollections = await db
          .collection('rooms')
          .doc(roomId)
          .onSnapshot((snapshot) => setData(snapshot.data()));

        return () => {
          getCollections();
        };
      })();
    }
  }, [roomId]);
  return { data };
}
