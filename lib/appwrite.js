import { Account,Avatars,Client,ID,Storage,Query} from "appwrite";
import { Databases } from "react-native-appwrite";
export const appwriteconfig = {
    endpoint : 'https://cloud.appwrite.io/v1',
    platform :  "com.sansu.aora",
    projectId : '673e91e7001ab30dcbc5',
    databaseId : '673e943e00001ba37ac8',
    videoCollectionId : '673e9471002519b695b9',
    userCollectionId : '673e945c00353dbbeae7',
    storageId : '673e9649003076ea2894'

}

const client = new Client();

client
    .setEndpoint(appwriteconfig.endpoint)
     // Your Appwrite Endpoint
    .setProject(appwriteconfig.projectId) // Your project ID
    
;

const account = new Account(client);
const avatar  = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)
export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
      console.log("Account created:", newAccount);
      const avatarUrl = avatar.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwriteconfig.databaseId,
        appwriteconfig.userCollectionId,
        ID.unique(), 
        
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
      console.log("User document created:", newUser);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Sign In
  export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get Account
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get Current User
  export const getCurrentUser = async () => {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.userCollectionId,
        [Query.equal("userId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Sign Out
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Upload File
  export async function uploadFile(file, type) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        appwriteconfig.storageId,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(appwriteconfig.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          appwriteconfig.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create Video Post
  export async function createVideoPost(form) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        appwriteconfig.databaseId,
        appwriteconfig.videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
  
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get all video Posts
  export async function getAllPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.videoCollectionId
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get video posts created by user
  export async function getUserPosts(userId) {
    try {
      const posts = await databases.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.videoCollectionId,
        [Query.equal("creator", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get video posts that matches search query
  export async function searchPosts(query) {
    try {
      const posts = await databases.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.videoCollectionId,
        [query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get latest created video posts
  export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.videoCollectionId,
        [query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }
