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
import { getId } from "@/lib/serverUtils/getId";
import { useParams } from "next/navigation";
import { getUserById } from "../../../../data/user";


const ChatPage = () => {
  const [client, setClient] = useState<any>();
  const [channel, setChannel] = useState<any>();
  const [token, setToken] = useState<any>();
  const [user, setUser] = useState<any>();
 

  const {chatId} = useParams();
  const otherId = chatId;
  



  useEffect(() => {

    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {

        setUser(data.user);
      })
      .catch(err => console.log(err))
        
      });
      }, []);
      useEffect(() => {

      /*
    const getData = async() => {
      const response = await fetch('/api/chat/getId', {
        method: 'GET',
      });
      const detail = await response.json();
      
      console.log(detail.user);
      setUser(detail.user);
      console.log(user);
    }
      getData();
*/
    async function getToken() {
      const response = await fetch(`/api/chat/getToken/${user.id}`, {
        method: "GET",
      })
        .then(async (response) => await response.json())
        .then((data) => {
          setToken(data.token);
          console.log(token);
        })
        .catch((error) => console.error("Error:", error));
    }
    getToken();
    const setupChatClient = async () => {
      const chatClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY
          ? process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY
          : ""
      );
      
      // Connect user to Stream Chat
      await chatClient.connectUser(
        { id: user.id, name: user.name }, // Customize the name
        token
      );
      setClient(chatClient);

      // Create or get a channel between farmer and buyer
      const newChannel = chatClient.channel("messaging", {
        members: [user.id, otherId], // Farmer and Buyer
      });

      await newChannel.watch(); // Start watching the channel
      setChannel(newChannel);
    };

    setupChatClient();

    return () => {
      if (client) client.disconnectUser();
    };
  }, []);

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
