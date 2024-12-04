import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect } from "react";
import { useRouter } from "expo-router";

const AppNavigator = ({ children }) => {
  const {isLoggedIn,isLoading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if(isLoggedIn){
        router.replace("/home");
      }
 
       else {
        router.replace("/");
      }
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    
    return null; 
  }

  return children;
};

export default AppNavigator;
