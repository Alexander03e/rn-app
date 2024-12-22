import { create } from '@/shared/utils/create';
import { StateCreator } from 'zustand';

export interface UserState {
    profile: {
        id: number;
        name: string;
    } | null;

    isLoading: boolean;
    error: string | null;
}

interface UserActions {
    setProfile: (val: UserState['profile']) => void;
    setLoading: (val: boolean) => void;
    setError: (val: UserState['error']) => void;
}

type UserStore = UserState & UserActions;

const userSlice: StateCreator<UserStore> = (set, get) => ({
    profile: null,
    error: null,
    isLoading: false,

    setLoading: isLoading => set({ isLoading }),
    setProfile: profile => set({ profile }),
    setError: error => set({ error }),
});

export const useUserStore = create(userSlice);
