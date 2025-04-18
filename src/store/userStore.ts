import { create } from 'zustand';

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerId: string;
  createdAt?: string;
};

type UserStore = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
}));

export default useUserStore;
