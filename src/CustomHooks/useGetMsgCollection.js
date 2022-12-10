import { useState, useEffect } from 'react';

export default function UseGetMsgCollections(roomId, db) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (roomId) {
      (async () => {
        const getCollections = await db
          .collection('rooms')
          .doc(roomId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) => {
            setData(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });

        return () => {
          getCollections();
        };
      })();
    }
  }, [roomId]);
  return { data };
}
