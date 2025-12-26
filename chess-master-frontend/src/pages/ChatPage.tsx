import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Chat from "../components/Chat";
import ChatWrapper from "../components/ChatWrapper";
import { useUser } from "../contexts/UserContext";

const ChatPage: React.FC = () => {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const { otherUserId } = useParams<{ otherUserId: string }>();
  if (userLoading === false && !user) {
    navigate("/login");
    return null;
  }
  return user?.id ? (
    <ChatWrapper>
      {otherUserId ? (
        <Chat userId={user?.id!} otherUserId={Number(otherUserId)} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <span className="text-4xl mb-4">💬</span>
          <p className="text-lg font-medium">Select a conversation</p>
          <p className="text-sm">Choose a user from the list to start chatting</p>
        </div>
      )}
    </ChatWrapper>
  ) : null;
};

export default ChatPage;
