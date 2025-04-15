import { create } from 'zustand';

type User = {
  uid: string;
  email: string | null;
  name: string | null;
  photo: string | null;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
};

const useUserStore = create<UserStore>(
  (set: (data: { user: any; isLoggedIn: boolean }) => any) => ({
    user: null,
    setUser: (user: any) => set({ user, isLoggedIn: !!user }),
    isLoggedIn: false,
  })
);

export default useUserStore;
