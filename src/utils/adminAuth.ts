import { app } from '@/utils/firesbase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const adminAutoLogin = async () => {
  const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!;

  const user = getAuth(app).currentUser;

  if (user) return user;

  try {
    const result = await signInWithEmailAndPassword(getAuth(), email, password);
    return result.user;
  } catch (error) {
    console.error('관리자 자동 로그인 실패:', error);
    throw error;
  }
};
