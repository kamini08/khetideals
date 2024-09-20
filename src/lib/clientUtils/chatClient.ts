import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY!;
const chatClient = StreamChat.getInstance(apiKey);

export const connectUser = async (
  userId: string,
  userName: string,
  token: string
) => {
  console.log("Connecting user with ID:", userId);
  console.log("Using token:", token); // Debugging token

  try {
    // Ensure user is upserted before connecting
   

    console.log('user upserted', userId);

    // Connect user
    await chatClient.connectUser(
      {
        id: userId,
        name: userName, // Replace with actual user name
      },
      token
    );
    console.log("User connected successfully");
    chatClient.disconnectUser();
    return true;
  } catch (error) {
    console.error("Error in connectUser:", error);
  }
};

export const createChannel = async (
  currentUserId: string,
  otherUserId: string,
  channelId: string
) => {
  try {
    // Ensure both users exist
    await chatClient.upsertUsers([
      { id: currentUserId, name: "Current User" },
      { id: otherUserId, name: "Other User" },
    ]);

    // Create the channel
    const newChannel = chatClient.channel("messaging", channelId, {
      name: `Chat between ${currentUserId} and ${otherUserId}`,
      members: [currentUserId, otherUserId],
    });

    await newChannel.watch();
    console.log("Channel created:", newChannel);
    return newChannel;
  } catch (error) {
    console.error("Error creating channel:", error);
  }
};

export const disconnectUser = async () => {
  try {
    await chatClient.disconnectUser();
    console.log("User disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting user:", error);
  }
};

export default chatClient;
