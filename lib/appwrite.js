import { Account,Avatars,Client,ID } from "appwrite";
import SignIn from "../app/(auth)/sign-in";
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

export const createUser = async (email,password,username) => {
    try {
        const NewAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )
        if(!NewAccount) throw Error;

        const avatarUrl = avatar.getInitials(username)
        await signIn()
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
 export async function signIn(email,password) {
    try {
        const session = await account.createEmailPasswordSession
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
 }
