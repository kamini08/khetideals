import { StreamChat } from "stream-chat";

// Initialize GetStream server-side client
const apiKey: string = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY
  ? process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY
  : "";
const serverClient = StreamChat.getInstance(
  apiKey,
  process.env.REACT_APP_STREAM_SECRET
);

export default serverClient;
