
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Plus, MoreHorizontal, Star, Settings } from "lucide-react";

interface ConversationViewProps {
  conversation: any;
  onClose: () => void;
}

export const ConversationView = ({ conversation }: ConversationViewProps) => {
  const [message, setMessage] = useState("");

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="relative mb-8">
          {/* Envelope illustration */}
          <div className="w-32 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center relative">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-600 rounded-sm transform rotate-12"></div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-80"></div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 border-2 border-purple-300 border-dashed rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select a conversation</h2>
        <p className="text-gray-500">Chat with your leads directly through Aimfox</p>
      </div>
    );
  }

  const messages = [
    {
      id: 1,
      sender: "You",
      content: "Hi Sampath,\nThanks for connecting!",
      time: "6:54 PM",
      isOwn: true
    },
    {
      id: 2,
      sender: "Sampath Goud",
      content: "Hi, Hrishikesh",
      time: "7:42 PM",
      isOwn: false
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gray-200 text-gray-600">
                {conversation.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                <Star size={16} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">{conversation.location}</p>
              <p className="text-xs text-gray-400">Origin: Profile Connections</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
              Profile Preview
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="mt-3 text-gray-600">
          <Plus size={16} className="mr-1" />
          Add label
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="text-sm text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
            Tuesday, 6:54 p.m.
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.isOwn 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className="text-xs mt-1 opacity-70">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <Input
              placeholder="Write a message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none border-gray-300 focus:border-blue-500"
            />
          </div>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            Send <Send size={16} className="ml-1" />
          </Button>
        </div>
        
        {/* Footer Info */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>First Name</span>
            <span>Last Name</span>
            <span>Occupation</span>
            <span>Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Sender:</span>
            <Avatar className="w-4 h-4">
              <AvatarFallback className="bg-blue-500 text-white text-xs">H</AvatarFallback>
            </Avatar>
            <span>Hrishikesh Vibhandik</span>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <Settings size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};
