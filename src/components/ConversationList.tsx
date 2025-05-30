
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <div className="w-12 h-12 border-4 border-gray-300 rounded-full"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500 mb-4">No results found for selected filters</p>
        <Button 
          variant="default" 
          onClick={() => {/* Clear search logic */}}
          className="bg-black text-white hover:bg-gray-800"
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
          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
          }`}
        >
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gray-200 text-gray-600">
                {conversation.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                {conversation.unread > 0 && (
                  <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
              
              <p className="text-xs text-gray-500 truncate mb-1">{conversation.location}</p>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700 truncate flex-1">{conversation.lastMessage}</p>
                <span className="text-xs text-gray-500 ml-2">{conversation.time}</span>
              </div>
              
              <div className="flex items-center mt-1">
                <Avatar className="w-4 h-4 mr-1">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    H
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">{conversation.sender}</span>
                <div className="w-1 h-1 bg-blue-500 rounded-full ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
