import { auth } from '@/firestore/firesbase';
import useUserStore from '@/store/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export const useAuthListener = () => {
  const setUser = useUserStore((state: { setUser: any }) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
};
