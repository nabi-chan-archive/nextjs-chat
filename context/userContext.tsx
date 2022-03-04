import { createContext, FC, useEffect, useState } from "react";
import { getCookies } from "cookies-next";

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
    // early return when userId is set
    if (!!userId) return;

    // get userId cookie and set userId
    const { userId: userIdCookie } = getCookies();
    if (!userIdCookie) return;

    setUserID(userIdCookie);
  }, [userId]);

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
