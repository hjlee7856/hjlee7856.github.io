import { auth, db } from '@/firestore/firesbase';
import useUserStore from '@/store/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';

export const useAuthListener = () => {
  const setUser = useUserStore((state: { setUser: any }) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // DB에서 로그인 한 유저의 데이터 가져옴
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        if (!data) return;
        setUser({
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          providerId: data.providerId.replace('.com', ''),
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
};
