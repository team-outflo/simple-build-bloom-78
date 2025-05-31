
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Conversation } from "@/types/inbox";
import { getConversations } from "@/api/inbox";

interface ConversationListProps {
  searchTerm: string;
  activeFilter: string;
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export const ConversationList = ({ 
  searchTerm, 
  activeFilter, 
  selectedConversation, 
  onSelectConversation 
}: ConversationListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await getConversations([], searchTerm, false);
        setConversations(response.conversations);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [searchTerm]);

  const filteredConversations = conversations.filter(conv => {
    if (activeFilter === "Unread") return true; // Add unread logic when available
    if (activeFilter === "Favorite") return true; // Add favorite logic when available
    return true;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-gray-500">Loading conversations...</div>
      </div>
    );
  }

  if (searchTerm && filteredConversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 border-4 border-gray-300 rounded-full"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500 mb-6">No conversations match your search criteria</p>
        <Button 
          variant="default" 
          onClick={() => {/* Clear search logic */}}
          className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
        >
          Clear search
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredConversations.map((conversation) => {
        const primaryAccount = conversation.accounts[0];
        const fullName = `${primaryAccount.firstName} ${primaryAccount.lastName}`;
        const initials = `${primaryAccount.firstName[0]}${primaryAccount.lastName[0]}`;
        
        return (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-all duration-200 ${
              selectedConversation?.id === conversation.id 
                ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-sm' 
                : 'hover:shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-gray-100">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 truncate text-sm">{fullName}</h4>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center shadow-sm">
                    1
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-500 truncate mb-2 font-medium">
                  {/* Location would come from additional account data */}
                  LinkedIn Connection
                </p>
                
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-700 truncate flex-1 font-medium">
                    {conversation.lastMessage.text}
                  </p>
                  <span className="text-xs text-gray-400 ml-2 font-medium">
                    {new Date(conversation.lastActivityAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Avatar className="w-4 h-4 mr-2">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      H
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-500 font-medium">Hrishikesh Vibhandik</span>
                  <div className="w-1 h-1 bg-blue-500 rounded-full ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
