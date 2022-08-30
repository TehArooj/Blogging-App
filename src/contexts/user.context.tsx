import { createContext, ReactNode, useState } from "react";

interface UserContextInterface {
  currentUser: null;
  setCurrentUser: (currentUser: null) => void;
}

export const UserContext = createContext<UserContextInterface>({
  currentUser: null,
  setCurrentUser: () => {},
});

interface Props {
  children?: ReactNode;
}
export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
