import { create } from "zustand";

interface AuthUser {
    id: string;
    email: string;
    name?: string;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
    avatarUrl?: string;
}

interface UserStore {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    login: (user: AuthUser, token: string) => void;
    logout: () => void;
    setUser: (user: AuthUser) => void;
    setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    token: null,
    isLoading: false,

    login: (user, token) => {
        localStorage.setItem("token", token);
        set({ user, token });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },

    setUser: (user) => set({ user }),

    setLoading: (loading) => set({ isLoading: loading }),
}));
