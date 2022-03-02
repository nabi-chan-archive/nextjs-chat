import { createContext, FC, useEffect, useState } from "react";

interface IUserInfo {
  userId: string;
  jwtToken: string;
}

interface IUserContext {
  userId: string;
  jwtToken: string;
  setUserInfo: (user: IUserInfo) => void;
  logout: () => void;
}

const doNothing = () => undefined;

export const UserContext = createContext<IUserContext>({
  userId: "",
  jwtToken: "",
  setUserInfo: doNothing,
  logout: doNothing,
});

const UserContextProvider: FC = ({ children }) => {
  const [userId, setUserID] = useState<string>("");
  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    return logout;
  }, []);

  function setUserInfo({ userId, jwtToken }: IUserInfo) {
    setUserID(userId);
    setJwtToken(jwtToken);
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
        setUserInfo,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
