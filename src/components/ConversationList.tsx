
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const conversations = [
  {
    id: 1,
    name: "Sampath Goud",
    location: "Piscataway, New Jersey, United States | Sr. US IT...",
    lastMessage: "Hi, Hrishikesh",
    sender: "Hrishikesh Vibhandik",
    time: "13/05/2025",
    unread: 1,
    avatar: null
  },
  {
    id: 2,
    name: "Mahammad Fahad Khadeer",
    location: "Cumming, Georgia, United States | US IT Bench...",
    lastMessage: "Hi, Hrishikesh",
    sender: "Hrishikesh Vibhandik",
    time: "13/05/2025",
    unread: 1,
    avatar: null
  },
  {
    id: 3,
    name: "Vamsi Mutyam",
    location: "Alpharetta, Georgia, United States | Sr. Bench...",
    lastMessage: "I hope you're doing good",
    sender: "Hrishikesh Vibhandik",
    time: "12/05/2025",
    unread: 2,
    avatar: null
  },
  {
    id: 4,
    name: "SAIRA .",
    location: "United States | Sr. Bench Sales Recruiter | Email...",
    lastMessage: "hai how are you doing",
    sender: "Hrishikesh Vibhandik",
    time: "12/05/2025",
    unread: 1,
    avatar: null
  }
];

interface ConversationListProps {
  searchTerm: string;
  activeFilter: string;
  selectedConversation: any;
  onSelectConversation: (conversation: any) => void;
}

export const ConversationList = ({ 
  searchTerm, 
  activeFilter, 
  selectedConversation, 
  onSelectConversation 
}: ConversationListProps) => {
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "Unread") return matchesSearch && conv.unread > 0;
    if (activeFilter === "Favorite") return matchesSearch; // Add favorite logic
    return matchesSearch;
  });

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
      {filteredConversations.map((conversation) => (
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
                {conversation.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 truncate text-sm">{conversation.name}</h4>
                {conversation.unread > 0 && (
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center shadow-sm">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
              
              <p className="text-xs text-gray-500 truncate mb-2 font-medium">{conversation.location}</p>
              
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-700 truncate flex-1 font-medium">{conversation.lastMessage}</p>
                <span className="text-xs text-gray-400 ml-2 font-medium">{conversation.time}</span>
              </div>
              
              <div className="flex items-center">
                <Avatar className="w-4 h-4 mr-2">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    H
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500 font-medium">{conversation.sender}</span>
                <div className="w-1 h-1 bg-blue-500 rounded-full ml-2"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
