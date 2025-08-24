import { create } from 'zustand';

export interface IUserFormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  age?: string;
  gender?: 'male' | 'female';
  accept?: boolean;
  avatarBase64?: string | null;
  country?: string;
}

interface IUserStore {
  userData: IUserFormData | null;
  setUserData: (_data: Partial<IUserFormData>) => void;
  clearUserData: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  userData: null,
  setUserData: (data) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...data,
      },
    })),
  clearUserData: () => set({ userData: null }),
}));
