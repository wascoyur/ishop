import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Profile } from "../entities/User.ts";

type ProfileState = {
  token: string | null;
  user: Profile | null;
};
type ProfileAction = {
  setToken: (token: ProfileState["token"]) => void;
  clearToken: () => void;
  isUserAuth: () => boolean;
  editUser: (user: ProfileState["user"]) => void;
};
export const useProfileStore = create(
  devtools(
    persist(
      immer<ProfileState & ProfileAction>((set, get) => ({
        token: null,
        user: null,
        setToken: (newToken: string | null) => set(() => ({ token: newToken })),
        clearToken: () =>
          set(() => ({
            token: null,
          })),
        isUserAuth: () => {
          return Boolean(get().token);
        },
        editUser: (user: Profile | null) => {
          if (user !== null)
            set((state) => {
              if (!state.user) state.user = {} as Profile;
              state.user.name = user.name || "";
              state.user.id = user.id;
              state.user.signUpDate = user.signUpDate;
            });
        },
      })),
      {
        name: `token`,
        partialize: (state) => ({
          token: state.token,
        }),
      },
    ),
    { store: "Profile" },
  ),
);
