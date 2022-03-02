import { createContext, FC, useEffect, useState } from "react";

interface IUserContext {
  userId: string;
  jwtToken: string;
  login: () => void;
  logout: () => void;
}

const doNothing = () => undefined;

export const UserContext = createContext<IUserContext>({
  userId: "",
  jwtToken: "",
  login: doNothing,
  logout: doNothing,
});

const UserContextProvider: FC = ({ children }) => {
  const [userId, setUserID] = useState<string>("");
  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    // TODO: login when cookie has jwt token
    // TODO: remove hard-coded userId
    setUserID("694bedd3-8776-40fe-be5a-584d1021ebae");

    return logout;
  }, []);

  function login() {
    // TODO: fetch user info
    // TODO: Apply user info from JWT token
  }

  function logout() {
    setUserID("");
    setJwtToken("");
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        jwtToken,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
