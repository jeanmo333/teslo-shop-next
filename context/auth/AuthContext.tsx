import { createContext, Dispatch, SetStateAction } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  checkToken: () => Promise<void>;

  logout: () => void;


  loginUser: (email: string, password: string) => Promise<{
    hasError: boolean;
    message?: string;
}>
}

export const AuthContext = createContext({} as ContextProps);
