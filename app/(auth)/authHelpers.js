import { Account } from "appwrite";
import { account } from "../../lib/appwrite";

export const handleLogin = async (email, password) => {
    if (!account) {
        console.error("Appwrite Account instance is undefined.");
        return;
      }
      
  try {
    // Check if a session already exists
    const currentUser = await account.get();
    if (currentUser) {
      console.log("User already logged in:", currentUser);
      return currentUser;
    }


    // Create a new session
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);

    // Fetch the current user after session creation
    const user = await account.get()
    console.log("Current user:", user);
    return user;
  } catch (error) {
    console.error("Error handling login:", error);
    throw error;
  }
};
