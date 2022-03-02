import { useContext } from "react";
import { UserContext } from "context/userContext";

export const useUserContext = () => useContext(UserContext);
