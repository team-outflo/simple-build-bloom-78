
import { useState } from "react";
import { Search, Filter, Star, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConversationList } from "@/components/ConversationList";

interface InboxContentProps {
  selectedConversation: any;
  onSelectConversation: (conversation: any) => void;
}

export const InboxContent = ({ selectedConversation, onSelectConversation }: InboxContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Favorite", "Unread"];

  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inbox</h1>
            <p className="text-sm text-orange-500 font-medium">Free trial ends on May 21st</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Search Tag */}
        {searchTerm && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
              t
              <button 
                onClick={() => setSearchTerm("")}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={`px-4 ${
                activeFilter === filter 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <ConversationList 
        searchTerm={searchTerm}
        activeFilter={activeFilter}
        selectedConversation={selectedConversation}
        onSelectConversation={onSelectConversation}
      />
    </div>
  );
};
