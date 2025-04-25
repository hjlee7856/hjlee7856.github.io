import { create } from 'zustand';

type ModalStore = {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  loginModalOpen: false,
  setLoginModalOpen: (open) => set({ loginModalOpen: open }),
}));

export default useModalStore;
