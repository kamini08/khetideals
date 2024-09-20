import { StreamChat } from "stream-chat";

import { connectUser } from "../clientUtils/chatClient";
import { getUserById } from "../../../data/user";

export async function createNewUser(userId: any) {
  try {
    const user = await getUserById(userId);
    
    const userName: any = user?.name;
    const id: any = userId;
    const response = await fetch(`/api/chat/getToken/${id}`);
  
    const data = await response.json();
   
    const token = data.userToken2;
    connectUser(id, userName, token);

    console.log("user upserted");

    

    return { userId, token };
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
