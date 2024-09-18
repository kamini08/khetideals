"use server";
import { StreamChat } from "stream-chat";
import serverClient from "./stream";
import { connectUser } from "../clientUtils/chatClient";
import { getUserById } from "../../../data/user";

export async function createNewUser(userId: any) {
  try {
    const user = await getUserById(userId);
    const userName: any = user?.name;
    const id: any = userId;

    const token = serverClient.createToken(userId);
    connectUser(id, userName, token);

    return { userId, token };
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
