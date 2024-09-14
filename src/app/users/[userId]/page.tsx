"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/index.css";
import {
  Chat,
  Channel,
  MessageList,
  Window,
  MessageInput,
  ChannelHeader,
  Thread,
} from "stream-chat-react";
import { useParams } from "next/navigation";

const ChatPage = () => {
  const [client, setClient] = useState<any>();
  const [channel, setChannel] = useState<any>();
  const [token, setToken] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const { chatId } = useParams();
  const otherId = chatId;

  useEffect(() => {
    const setupChatClient = async () => {
      const chatClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || ""
      );

      // Fetch user details
      const response = await fetch("/api/chat/getId", {
        method: "GET",
      });
      const detail = await response.json();
      const user1 = detail?.user;
      console.log(user1);
      console.log(detail);

      if (!user1) {
        console.error("User not found");
        return;
      }

      setUser(user1);

      // Get token for the user
      const tokenResponse = await fetch(`/api/chat/getToken/${user1.id}`, {
        method: "GET",
      });
      const tokenData = await tokenResponse.json();

      if (!tokenData?.token) {
        console.error("Failed to fetch token");
        return;
      }

      setToken(tokenData.token);

      // Connect the user to Stream Chat
      await chatClient.connectUser(
        { id: user1.id, name: user1.name }, // Customize the user information here
        tokenData.token
      );

      setClient(chatClient);

      // Create or get a channel between farmer and buyer
      const newChannel = chatClient.channel("messaging", {
        members: [user1.id, otherId], // Farmer and Buyer
      });

      await newChannel.watch(); // Start watching the channel
      setChannel(newChannel);
    };

    setupChatClient();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [client, otherId]);

  if (!channel) return <div>Loading chat...</div>;

  return (
    <div className="chat-container">
      <Chat client={client} theme="messaging-dark">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <div className="chat-messages">
              <MessageList />
            </div>
            <div className="chat-input">
              <MessageInput />
            </div>
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );

};

export default ChatPage;