import { FC, useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
//import { useSession, signOut } from "next-auth/react";

import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext, authReducer } from "./";

import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  //const { data, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //const [auth, setAuth] = useState<IUser>();

//   useEffect(() => {
//     if (status === "authenticated") {
//       dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
//     }
//   }, [status, data]);

  useEffect(() => {
      checkToken();
  }, [])

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }

    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      //setAuth(user);
      dispatch({ type: "[Auth] - Login", payload: user });
     // router.push("/");
    } catch (error) {
      Cookies.remove("token");
    }
  };


  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      setLoading(true);
      const { data } = await tesloApi.post("/user/login", {
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      setLoading(false);
      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };



  const logout = () => {
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

   // signOut();
   router.push("auth/login");
    //router.reload();
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        checkToken,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
