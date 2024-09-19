"use client";

import { useEffect, useState } from "react";

import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { useParams } from "next/navigation";
import { createNewUser } from "@/lib/serverUtils/createChatUser";

export default function WhatsAppChat() {
  const { id }: any = useParams(); // Get the farmerId and buyerId from the UR
  const farmerId = id;
  let otherId: string;
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || "Set API Key";
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstId, setFirstId] = useState('');

  useEffect(() => {
    // Ensure IDs are available before continuing

    const setupChat = async () => {
      try {
        // Fetch user token for the farmer

        await createNewUser(farmerId);
        const response = await fetch(`/api/chat/getToken/${farmerId}`);
        const data = await response.json();
        const buyerId: string = data.userId;
        const buyerName: string = data.name;
        console.log(buyerName);
        // const buyerId = '09876';
        otherId = buyerId;
        const userToken = data.userToken;
        setFirstId(buyerId);


        // Initialize the Stream chat client
        const client = StreamChat.getInstance(apiKey);
        // Connect the farmer (current user)

        await client.connectUser({ id: buyerId, name: buyerName }, userToken);

        // Set up the channel for the farmer and buyer
        const channel = client.channel("messaging", {
          members: [farmerId, buyerId], // Both users in the channel
        });

        await channel.create();
        setChatClient(client);
      } catch (error) {
        console.error("Error setting up chat:", error);
      } finally {
        setLoading(false);
      }
    };

    setupChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [farmerId]); // Depend on farmerId and buyerId for dynamic setup

  if (loading) return <div>Loading chat...</div>;
  const filters: any = { members: { $in: ['', 'cm0rqos7l0000j4spcyrixgdw'] } };

  const sort: any = { last_message_at: -1 };
  return (
    chatClient && (
      <Chat client={chatClient}>
        <ChannelList filters={filters} />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    )
  );
}
