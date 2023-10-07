import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  isAuth: boolean;
  userType: string;
  id: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
};

type Actions = {
  setIsAuth: (isAuth: boolean) => void;
  setUserType: (userType: string) => void;
  setId: (id: string) => void;
  setNombres: (nombres: string) => void;
  setApellidoPaterno: (apellidoPaterno: string) => void;
  setApellidoMaterno: (apellidoPaterno: string) => void;
};

export const useUserData = create(
  persist<State & Actions>(
    (set) => ({
      isAuth: false,
      userType: "",
      id: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",

      // setters
      setIsAuth: (isAuth: boolean) =>
        set(() => ({
          isAuth,
        })),
      setUserType: (userType: string) =>
        set(() => ({
          userType,
        })),
      setId: (id: string) =>
        set(() => ({
          id,
        })),
      setNombres: (nombres: string) =>
        set(() => ({
          nombres,
        })),
      setApellidoPaterno: (apellidoPaterno: string) =>
        set(() => ({
          apellidoPaterno,
        })),
      setApellidoMaterno: (apellidoMaterno: string) =>
        set(() => ({
          apellidoMaterno,
        })),
    }),
    { name: "userData" },
  ),
);
