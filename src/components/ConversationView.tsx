
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Plus, MoreHorizontal, Star, Settings, Paperclip, Mic } from "lucide-react";
import { EmojiPicker } from "@/components/EmojiPicker";
import { Conversation, ConversationDetail, Message } from "@/types/inbox";
import { getMessages, postMessage } from "@/api/inbox";

interface ConversationViewProps {
  conversation: Conversation | null;
  onClose: () => void;
  onProfilePreview: (conversation: Conversation) => void;
}

export const ConversationView = ({ conversation, onProfilePreview }: ConversationViewProps) => {
  const [message, setMessage] = useState("");
  const [conversationDetail, setConversationDetail] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (conversation) {
      const fetchMessages = async () => {
        try {
          setLoading(true);
          const response = await getMessages(conversation.id);
          setConversationDetail(response.conversation);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [conversation]);

  const handleSendMessage = async () => {
    if (!message.trim() || !conversation) return;

    try {
      await postMessage(conversation.id, message);
      setMessage("");
      
      // Refresh messages after sending
      const response = await getMessages(conversation.id);
      setConversationDetail(response.conversation);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative mb-8">
          {/* Enhanced illustration */}
          <div className="w-40 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center relative border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl transform rotate-12 shadow-lg"></div>
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-80 blur-sm"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 border-2 border-blue-300 border-dashed rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Select a conversation</h2>
        <p className="text-gray-500 text-lg">Choose a conversation from the sidebar to start chatting</p>
        <div className="mt-6 flex items-center space-x-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>Powered by Aimfox AI</span>
        </div>
      </div>
    );
  }

  const primaryAccount = conversation.accounts[0];
  const fullName = `${primaryAccount.firstName} ${primaryAccount.lastName}`;
  const initials = `${primaryAccount.firstName[0]}${primaryAccount.lastName[0]}`;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-gray-900 text-lg">{fullName}</h3>
                <Star size={16} className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600 font-medium">LinkedIn Connection</p>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <span>Origin: Profile Connections</span>
                <span>•</span>
                <span className="text-green-600">Active now</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onProfilePreview(conversation)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 font-medium"
            >
              Profile Preview
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="mt-4 text-gray-600 border-gray-300 hover:bg-gray-50">
          <Plus size={16} className="mr-2" />
          Add label
        </Button>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        <div className="text-center">
          <span className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 font-medium">
            {conversationDetail ? new Date(conversationDetail.createdAt).toLocaleDateString() : 'Today'}
          </span>
        </div>

        {conversationDetail?.messages.map((msg: Message) => {
          const isOwn = msg.senderUrn !== primaryAccount.urn;
          
          return (
            <div key={msg.urn} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                isOwn 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
                <div className={`text-xs mt-2 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                  {new Date(msg.sentAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Message Input */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Input
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 rounded-xl py-3"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              <Button variant="ghost" size="sm" className="p-2 h-8 w-8 text-gray-400 hover:text-gray-600">
                <Paperclip size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-8 w-8 text-gray-400 hover:text-gray-600">
                <Mic size={16} />
              </Button>
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-sm"
          >
            <Send size={16} className="mr-2" />
            Send
          </Button>
        </div>
        
        {/* Enhanced Footer Info */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>First Name</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Last Name</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Occupation</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>Location</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Sender:</span>
            <Avatar className="w-4 h-4">
              <AvatarFallback className="bg-blue-500 text-white text-xs">H</AvatarFallback>
            </Avatar>
            <span className="font-medium">Hrishikesh Vibhandik</span>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <Settings size={12} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
