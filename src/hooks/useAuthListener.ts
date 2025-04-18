import { updateAuth } from '@/firestore/auth';
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
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerId: user.providerData[0].providerId.replace('.com', ''),
        });
        updateAuth(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
};
