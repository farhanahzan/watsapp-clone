import { useState, useEffect } from 'react';

export default function UseGetCollections(collectionPath, db) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const getCollections = await db
        .collection(collectionPath)
        ?.onSnapshot((snapshot) => {
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
  }, [collectionPath]);

  return { data };
}
